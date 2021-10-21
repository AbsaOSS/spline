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
import za.co.absa.spline.persistence.tx.{ArangoTx, InsertQuery, TxBuilder}
import za.co.absa.spline.persistence.{ArangoImplicits, Persister}
import za.co.absa.spline.producer.model.v1_1.ExecutionEvent._
import za.co.absa.spline.producer.model.{v1_1 => apiModel}
import za.co.absa.spline.producer.service.InconsistentEntityException
import za.co.absa.spline.producer.service.model.{ExecutionEventKeyCreator, ExecutionPlanPersistentModel, ExecutionPlanPersistentModelBuilder}

import java.util.UUID
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
    val planAlreadyExistsFuture = db.queryOne[Boolean](
      s"""
         |WITH ${NodeDef.ExecutionPlan.name}
         |FOR ex IN ${NodeDef.ExecutionPlan.name}
         |    FILTER ex._key == @key
         |    COLLECT WITH COUNT INTO cnt
         |    RETURN TO_BOOL(cnt)
         |    """.stripMargin,
      Map("key" -> executionPlan.id))

    val eventualPersistedDSKeyByURI: Future[Map[DataSource.Uri, DataSource.Key]] = db.queryAs[DataSource](
      s"""
         |WITH ${NodeDef.DataSource.name}
         |FOR ds IN ${NodeDef.DataSource.name}
         |    FILTER ds.uri IN @refURIs
         |    RETURN ds
         |    """.stripMargin,
      Map("refURIs" -> executionPlan.dataSources.toArray)
    ).map(_.streamRemaining.toScala.map(ds => ds.uri -> ds._key).toMap)

    for {
      persistedDSKeyByURI <- eventualPersistedDSKeyByURI
      planAlreadyExists <- planAlreadyExistsFuture
      _ <-
        if (planAlreadyExists) Future.successful(Unit) // nothing more to do
        else createInsertTransaction(executionPlan, persistedDSKeyByURI).execute(db)
    } yield Unit
  })

  override def insertExecutionEvents(events: Array[apiModel.ExecutionEvent])(implicit ec: ExecutionContext): Future[Unit] = Persister.execute({
    val eventualExecPlanDetails = db.queryStream[ExecPlanDetails](
      s"""
         |WITH executionPlan, executes, operation, dataSource
         |FOR ep IN executionPlan
         |    FILTER ep._key IN @keys
         |
         |    LET wo = FIRST(FOR v IN 1 OUTBOUND ep executes RETURN v)
         |    LET ds = FIRST(FOR v IN 1 OUTBOUND ep affects RETURN v)
         |
         |    RETURN {
         |        "executionPlanKey" : ep._key,
         |        "frameworkName"    : CONCAT(ep.systemInfo.name, " ", ep.systemInfo.version),
         |        "applicationName"  : ep.name,
         |        "dataSourceUri"    : ds.uri,
         |        "dataSourceName"   : ds.name,
         |        "dataSourceType"   : wo.extra.destinationType,
         |        "append"           : wo.append
         |    }
         |""".stripMargin,
      Map("keys" -> events.map(_.planId))
    )

    for {
      execPlansDetails <- eventualExecPlanDetails
      res <- createInsertTransaction(events, execPlansDetails.toArray).execute(db)
    } yield res
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
    events: Array[apiModel.ExecutionEvent],
    execPlansDetails: Array[ExecPlanDetails]
  ): ArangoTx = {
    val referredPlanIds = events.iterator.map(_.planId).toSet
    if (referredPlanIds.size != execPlansDetails.length) {
      val existingIds = execPlansDetails.map(pd => UUID.fromString(pd.executionPlanKey))
      val missingIds = referredPlanIds -- existingIds
      throw new InconsistentEntityException(
        s"Unresolved execution plan IDs: ${missingIds mkString ", "}")
    }

    val progressNodes = events
      .zip(execPlansDetails)
      .map { case (e, pd) =>
        val key = new ExecutionEventKeyCreator(e).executionEventKey
        Progress(e.timestamp, e.durationNs, e.error, e.extra, key, pd)
      }

    val progressEdges = progressNodes
      .zip(events)
      .map { case (p, e) => EdgeDef.ProgressOf.edge(p._key, e.planId) }

    new TxBuilder()
      .addQuery(InsertQuery(NodeDef.Progress, progressNodes: _*).copy(ignoreExisting = true))
      .addQuery(InsertQuery(EdgeDef.ProgressOf, progressEdges: _*).copy(ignoreExisting = true))
      .buildTx
  }

}
