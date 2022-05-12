/*
 * Copyright 2021 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package za.co.absa.spline.producer.service.repo

import com.arangodb.async.ArangoDatabaseAsync
import org.slf4s.Logging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.common.AsyncCallRetryer
import za.co.absa.spline.persistence.ArangoImplicits
import za.co.absa.spline.persistence.model._
import za.co.absa.spline.persistence.tx._
import za.co.absa.spline.producer.model.v1_2.ExecutionEvent._
import za.co.absa.spline.producer.model.{v1_2 => apiModel}
import za.co.absa.spline.producer.service.UUIDCollisionDetectedException
import za.co.absa.spline.producer.service.model.{ExecutionEventKeyCreator, ExecutionPlanPersistentModel, ExecutionPlanPersistentModelBuilder}

import scala.compat.java8.FutureConverters._
import scala.concurrent.{ExecutionContext, Future}
import scala.util.control.NonFatal

@Repository
class ExecutionProducerRepositoryImpl @Autowired()(db: ArangoDatabaseAsync, retryer: AsyncCallRetryer) extends ExecutionProducerRepository
  with Logging {

  import ArangoImplicits._
  import ExecutionProducerRepositoryImpl._

  override def insertExecutionPlan(executionPlan: apiModel.ExecutionPlan)(implicit ec: ExecutionContext): Future[Unit] = retryer.execute({
    val eventualMaybeExistingDiscriminatorOpt: Future[Option[String]] = db.queryOptional[String](
      s"""
         |WITH ${NodeDef.ExecutionPlan.name}
         |FOR ex IN ${NodeDef.ExecutionPlan.name}
         |    FILTER ex._key == @key
         |    LIMIT 1
         |    RETURN ex.discriminator
         |    """.stripMargin,
      Map("key" -> executionPlan.id)
    )

    val eventualPersistedDataSources: Future[Seq[DataSource]] = {
      val dataSources: Set[DataSource] = executionPlan.dataSources.map(DataSource.apply)
      db.queryStream[DataSource](
        s"""
           |WITH ${NodeDef.DataSource.name}
           |FOR ds IN @dataSources
           |    UPSERT { uri: ds.uri }
           |        INSERT KEEP(ds, ['_created', 'uri', 'name'])
           |        UPDATE {} IN ${NodeDef.DataSource.name}
           |        RETURN KEEP(NEW, ['_key', 'uri'])
           |    """.stripMargin,
        Map("dataSources" -> dataSources.toArray)
      )
    }

    for {
      persistedDSKeyByURI <- eventualPersistedDataSources
      maybeExistingDiscriminatorOpt <- eventualMaybeExistingDiscriminatorOpt
      _ <- maybeExistingDiscriminatorOpt match {
        case Some(existingDiscriminatorOrNull) =>
          // execution plan with the given ID already exists
          ensureNoExecPlanIDCollision(executionPlan.id, executionPlan.discriminator.orNull, existingDiscriminatorOrNull)
          Future.successful(Unit)
        case None =>
          // no execution plan with the given ID found
          val eppm = ExecutionPlanPersistentModelBuilder.toPersistentModel(executionPlan, persistedDSKeyByURI)
          val tx = createExecutionPlanTransaction(eppm)
          tx.execute[Any](db)
      }
    } yield Unit
  })

  override def insertExecutionEvent(e: apiModel.ExecutionEvent)(implicit ec: ExecutionContext): Future[Unit] = retryer.execute({

    val key = new ExecutionEventKeyCreator(e).executionEventKey

    val eventualMaybeExistingDiscriminatorOpt: Future[Option[String]] = db.queryOptional[String](
      s"""
         |WITH ${NodeDef.Progress.name}
         |FOR p IN ${NodeDef.Progress.name}
         |    FILTER p._key == @key
         |    LIMIT 1
         |    RETURN p.discriminator
         |    """.stripMargin,
      Map("key" -> key)
    )

    for {
      maybeExistingDiscriminatorOpt <- eventualMaybeExistingDiscriminatorOpt
      _ <- maybeExistingDiscriminatorOpt match {
        case Some(existingDiscriminatorOrNull) =>
          // execution plan with the given ID already exists
          ensureNoExecPlanIDCollision(e.planId, e.discriminator.orNull, existingDiscriminatorOrNull)
          Future.successful(Unit)
        case None =>
          // no execution plan with the given ID found
          val p = Progress(
            timestamp = e.timestamp,
            durationNs = e.durationNs,
            discriminator = e.discriminator,
            labels = e.labels,
            error = e.error,
            extra = e.extra,
            _key = key,
            planKey = e.planId.toString,
            execPlanDetails = null // the value is populated below in the transaction script
          )
          val tx = createExecutionEventTransaction(p)
          tx.execute[Unit](db)
      }
    } yield Unit
  })

  override def isDatabaseOk()(implicit ec: ExecutionContext): Future[Boolean] = {
    try {
      val anySplineCollectionName = NodeDef.ExecutionPlan.name
      val futureIsDbOk = db.collection(anySplineCollectionName).exists.toScala.mapTo[Boolean]
      futureIsDbOk.foreach { isDbOk =>
        if (!isDbOk)
          log.error(s"Collection '$anySplineCollectionName' does not exist. Spline database is not initialized properly!")
      }
      futureIsDbOk.recover { case _ => false }
    } catch {
      case NonFatal(_) => Future.successful(false)
    }
  }
}

object ExecutionProducerRepositoryImpl {

  private def createTxBuilder() = new AppTxBuilder

  private def createExecutionPlanTransaction(eppm: ExecutionPlanPersistentModel) = {
    createTxBuilder()
      // execution plan
      .addQuery(InsertQuery(NodeDef.ExecutionPlan, eppm.executionPlan))
      .addQuery(InsertQuery(EdgeDef.Executes, eppm.executes))
      .addQuery(InsertQuery(EdgeDef.Depends, eppm.depends))
      .addQuery(InsertQuery(EdgeDef.Affects, eppm.affects))

      // operation
      .addQuery(InsertQuery(NodeDef.Operation, eppm.operations))
      .addQuery(InsertQuery(EdgeDef.Follows, eppm.follows))
      .addQuery(InsertQuery(EdgeDef.ReadsFrom, eppm.readsFrom))
      .addQuery(InsertQuery(EdgeDef.WritesTo, eppm.writesTo))
      .addQuery(InsertQuery(EdgeDef.Emits, eppm.emits))
      .addQuery(InsertQuery(EdgeDef.Uses, eppm.uses))
      .addQuery(InsertQuery(EdgeDef.Produces, eppm.produces))

      // schema
      .addQuery(InsertQuery(NodeDef.Schema, eppm.schemas))
      .addQuery(InsertQuery(EdgeDef.ConsistsOf, eppm.consistsOf))

      // attribute
      .addQuery(InsertQuery(NodeDef.Attribute, eppm.attributes))
      .addQuery(InsertQuery(EdgeDef.ComputedBy, eppm.computedBy))
      .addQuery(InsertQuery(EdgeDef.DerivesFrom, eppm.derivesFrom))

      // expression
      .addQuery(InsertQuery(NodeDef.Expression, eppm.expressions))
      .addQuery(InsertQuery(EdgeDef.Takes, eppm.takes))

      .buildTx()
  }

  private def createExecutionEventTransaction(p: Progress): ArangoTx = {
    val txBuilder = createTxBuilder()

    val progressEdge = EdgeDef.ProgressOf.edge(p._key, p.planKey).copy(_key = p._key)

    txBuilder.addQuery(NativeQuery(
      query =
        """
          |const {_class, ...p} = params.progress;
          |const planKey = params.planKey;
          |const ep = db._document(`executionPlan/${planKey}`);
          |const {
          |   targetDsSelector,
          |   lastWriteTimestamp,
          |   dataSourceName,
          |   dataSourceUri,
          |   dataSourceType,
          |   append
          |} = db._query(`
          |   WITH executionPlan, executes, operation, affects, dataSource
          |   LET wo = FIRST(FOR v IN 1 OUTBOUND '${ep._id}' executes RETURN v)
          |   LET ds = FIRST(FOR v IN 1 OUTBOUND '${ep._id}' affects RETURN v)
          |   RETURN {
          |       "targetDsSelector"   : KEEP(ds, ['_id', '_rev']),
          |       "lastWriteTimestamp" : ds.lastWriteDetails.timestamp,
          |       "dataSourceName"     : ds.name,
          |       "dataSourceUri"      : ds.uri,
          |       "dataSourceType"     : wo.extra.destinationType,
          |       "append"             : wo.append
          |   }
          |`).next();
          |
          |const execPlanDetails = {
          |  "executionPlanKey" : ep._key,
          |  "frameworkName"    : `${ep.systemInfo.name} ${ep.systemInfo.version}`,
          |  "applicationName"  : ep.name,
          |  "dataSourceUri"    : dataSourceUri,
          |  "dataSourceName"   : dataSourceName,
          |  "dataSourceType"   : dataSourceType,
          |  "append"           : append
          |}
          |
          |if (ep.discriminator != p.discriminator) {
          |  // nobody should ever see this happening, but just in case the universe goes crazy...
          |  throw new Error(`UUID collision detected !!! Execution event ID: ${p._key}, discriminator: ${p.discriminator}`)
          |}
          |
          |const {_id, _rev, ...pRefined} = p;
          |const progressWithPlanDetails = {...pRefined, execPlanDetails};
          |
          |if (lastWriteTimestamp < p.timestamp) {
          |  db._update(
          |   targetDsSelector,
          |   {lastWriteDetails: progressWithPlanDetails}
          |  );
          |}
          |
          |return [progressWithPlanDetails];
          |""".stripMargin,
      params = Map(
        "progress" -> p,
        "planKey" -> p.planKey,
      ),
      collectionDefs = Seq(NodeDef.Progress, NodeDef.ExecutionPlan, EdgeDef.Executes, NodeDef.Operation, EdgeDef.Affects, NodeDef.DataSource))
    )
    txBuilder.addQuery(InsertQuery(NodeDef.Progress, Query.LastResultPlaceholder))
    txBuilder.addQuery(InsertQuery(EdgeDef.ProgressOf, progressEdge))

    txBuilder.buildTx()
  }

  private def ensureNoExecPlanIDCollision(
    planId: apiModel.ExecutionPlan.Id,
    actualDiscriminator: apiModel.ExecutionPlan.Discriminator,
    expectedDiscriminator: apiModel.ExecutionPlan.Discriminator
  ): Unit = {
    if (actualDiscriminator != expectedDiscriminator) {
      throw new UUIDCollisionDetectedException("ExecutionPlan", planId, actualDiscriminator)
    }
  }
}
