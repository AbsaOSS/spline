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
import za.co.absa.spline.persistence.model._
import za.co.absa.spline.persistence.tx.{ArangoTx, InsertQuery, NativeQuery, TxBuilder}
import za.co.absa.spline.persistence.{ArangoImplicits, Persister}
import za.co.absa.spline.producer.model.v1_2.ExecutionEvent._
import za.co.absa.spline.producer.model.{v1_2 => apiModel}
import za.co.absa.spline.producer.service.UUIDCollisionDetectedException
import za.co.absa.spline.producer.service.model.{ExecutionEventKeyCreator, ExecutionPlanPersistentModel, ExecutionPlanPersistentModelBuilder}

import scala.compat.java8.FutureConverters._
import scala.compat.java8.StreamConverters._
import scala.concurrent.{ExecutionContext, Future}
import scala.util.control.NonFatal

@Repository
class ExecutionProducerRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends ExecutionProducerRepository
  with Logging {

  import ArangoImplicits._
  import ExecutionProducerRepositoryImpl._

  override def insertExecutionPlan(executionPlan: apiModel.ExecutionPlan)(implicit ec: ExecutionContext): Future[Unit] = Persister.execute({
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

    val eventualPersistedDSKeyByURI: Future[Map[DataSource.Uri, DataSource.Key]] = db.queryAs[DataSource](
      s"""
         |WITH ${NodeDef.DataSource.name}
         |FOR ds IN ${NodeDef.DataSource.name}
         |    FILTER ds.uri IN @refURIs
         |    RETURN KEEP(ds, ['_key', 'uri'])
         |    """.stripMargin,
      Map("refURIs" -> executionPlan.dataSources.toArray)
    ).map(_.streamRemaining.toScala.map(ds => ds.uri -> ds._key).toMap)

    for {
      persistedDSKeyByURI <- eventualPersistedDSKeyByURI
      maybeExistingDiscriminatorOpt <- eventualMaybeExistingDiscriminatorOpt
      _ <- maybeExistingDiscriminatorOpt match {
        case Some(existingDiscriminatorOrNull) =>
          // execution plan with the given ID already exists
          ensureNoExecPlanIDCollision(executionPlan.id, executionPlan.discriminator.orNull, existingDiscriminatorOrNull)
          Future.successful(Unit)
        case None =>
          // no execution plan with the given ID found
          createInsertTransaction(executionPlan, persistedDSKeyByURI).execute(db)
      }
    } yield Unit
  })

  override def insertExecutionEvents(events: Array[apiModel.ExecutionEvent])(implicit ec: ExecutionContext): Future[Unit] = Persister.execute({
    createInsertTransaction(events).execute(db)
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

  private def createInsertTransaction(
    executionPlan: apiModel.ExecutionPlan,
    persistedDSKeyByURI: Map[DataSource.Uri, DataSource.Key]
  ) = {
    val eppm: ExecutionPlanPersistentModel =
      ExecutionPlanPersistentModelBuilder.toPersistentModel(executionPlan, persistedDSKeyByURI)

    new TxBuilder()
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

      // data source
      .addQuery(InsertQuery(NodeDef.DataSource, eppm.dataSources))

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

      .buildTx
  }

  private def createInsertTransaction(
    events: Array[apiModel.ExecutionEvent]
  ): ArangoTx = {
    val progressNodesWithPlanKey = events
      .map { e =>
        val key = new ExecutionEventKeyCreator(e).executionEventKey
        val p = Progress(
          timestamp = e.timestamp,
          durationNs = e.durationNs,
          discriminator = e.discriminator,
          labels = e.labels,
          error = e.error,
          extra = e.extra,
          _key = key,
          execPlanDetails = null // the value is populated below in the transaction script
        )
        Array(p, e.planId)
      }

    val progressEdges = progressNodesWithPlanKey
      .map { case Array(p: Progress, planKey) => EdgeDef.ProgressOf.edge(p._key, planKey) }

    new TxBuilder()
      .addQuery(
        NativeQuery(
          query =
            """params.progressNodesWithPlanKey.map(progressWithPlanKey => {
              |    const {_class, ...p} = progressWithPlanKey[0];
              |    const planKey = progressWithPlanKey[1];
              |    const ep = db._document(`executionPlan/${planKey}`);
              |    const {
              |       targetDsSelector,
              |       lastWriteTimestamp,
              |       dataSourceName,
              |       dataSourceUri,
              |       dataSourceType,
              |       append
              |    } = db._query(`
              |       WITH executionPlan, executes, operation, affects, dataSource
              |       LET wo = FIRST(FOR v IN 1 OUTBOUND '${ep._id}' executes RETURN v)
              |       LET ds = FIRST(FOR v IN 1 OUTBOUND '${ep._id}' affects RETURN v)
              |       RETURN {
              |           "targetDsSelector"   : KEEP(ds, ['_id', '_rev']),
              |           "lastWriteTimestamp" : ds.lastWriteDetails.timestamp,
              |           "dataSourceName"     : ds.name,
              |           "dataSourceUri"      : ds.uri,
              |           "dataSourceType"     : wo.extra.destinationType,
              |           "append"             : wo.append
              |       }
              |    `).next();
              |
              |    const execPlanDetails = {
              |      "executionPlanKey" : ep._key,
              |      "frameworkName"    : `${ep.systemInfo.name} ${ep.systemInfo.version}`,
              |      "applicationName"  : ep.name,
              |      "dataSourceUri"    : dataSourceUri,
              |      "dataSourceName"   : dataSourceName,
              |      "dataSourceType"   : dataSourceType,
              |      "append"           : append
              |    }
              |
              |    if (ep.discriminator != p.discriminator) {
              |      // nobody should ever see this happening, but just in case the universe goes crazy...
              |      throw new Error(`UUID collision detected !!! Execution event ID: ${p._key}, discriminator: ${p.discriminator}`)
              |    }
              |
              |    const maybeExistingProgress = db._query(`RETURN DOCUMENT('progress/${p._key}')`).next();
              |    const {_id, _rev, ...pRefined} = maybeExistingProgress || p;
              |    const progressWithPlanDetails = {...pRefined, execPlanDetails};
              |
              |    if (lastWriteTimestamp < p.timestamp) {
              |      db._update(
              |       targetDsSelector,
              |       {lastWriteDetails: progressWithPlanDetails}
              |      );
              |    }
              |
              |    return progressWithPlanDetails;
              |});
              |""".stripMargin,
          params = Map("progressNodesWithPlanKey" -> progressNodesWithPlanKey),
          collectionDefs = Seq(NodeDef.Progress, NodeDef.ExecutionPlan, EdgeDef.Executes, NodeDef.Operation, EdgeDef.Affects, NodeDef.DataSource))
      )
      .addQuery(InsertQuery(NodeDef.Progress).copy(ignoreExisting = true, chainInput = true))
      .addQuery(InsertQuery(EdgeDef.ProgressOf, progressEdges: _*).copy(ignoreExisting = true))
      .buildTx
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
