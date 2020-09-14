/*
 * Copyright 2019 ABSA Group Limited
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


import java.util.UUID.randomUUID
import java.{lang => jl}

import com.arangodb.async.ArangoDatabaseAsync
import org.apache.commons.lang3.StringUtils.wrap
import org.slf4s.Logging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.persistence.model._
import za.co.absa.spline.persistence.tx.{ArangoTx, InsertQuery, TxBuilder}
import za.co.absa.spline.persistence.{ArangoImplicits, Persister, model => dbModel}
import za.co.absa.spline.producer.model.{v1_1 => apiModel}
import za.co.absa.spline.producer.service.repo.ExecutionProducerRepositoryImpl._

import scala.compat.java8.FutureConverters._
import scala.compat.java8.StreamConverters._
import scala.concurrent.{ExecutionContext, Future}
import scala.util.control.NonFatal

@Repository
class ExecutionProducerRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends ExecutionProducerRepository
  with Logging {

  import ArangoImplicits._

  override def insertExecutionPlan(executionPlan: apiModel.ExecutionPlan)(implicit ec: ExecutionContext): Future[Unit] = Persister.execute({
    val eventuallyExists = db.queryOne[Boolean](
      s"""
         |WITH ${NodeDef.ExecutionPlan.name}
         |FOR ex IN ${NodeDef.ExecutionPlan.name}
         |    FILTER ex._key == @key
         |    COLLECT WITH COUNT INTO cnt
         |    RETURN TO_BOOL(cnt)
         |    """.stripMargin,
      Map("key" -> executionPlan.id))

    val referencedDSURIs = {
      val readSources = executionPlan.operations.reads.flatMap(_.inputSources).toSet
      val writeSource = executionPlan.operations.write.outputSource
      readSources + writeSource
    }

    val eventualPersistedDSes = db.queryAs[DataSource](
      s"""
         |WITH ${NodeDef.DataSource.name}
         |FOR ds IN ${NodeDef.DataSource.name}
         |    FILTER ds.uri IN [${referencedDSURIs.map(wrap(_, '"')).mkString(", ")}]
         |    RETURN ds
         |    """.stripMargin
    ).map(_.streamRemaining.toScala.map(ds => ds.uri -> ds._key).toMap)

    for {
      persistedDSes: Map[String, String] <- eventualPersistedDSes
      alreadyExists: Boolean <- eventuallyExists
      _ <-
        if (alreadyExists) Future.successful(Unit)
        else createInsertTransaction(executionPlan, referencedDSURIs, persistedDSes).execute(db).map(_ => true)
    } yield Unit
  })

  override def insertExecutionEvents(events: Array[apiModel.ExecutionEvent])(implicit ec: ExecutionContext): Future[Unit] = Persister.execute({
    val allReferencesConsistentFuture = db.queryOne[Boolean](
      """
        |WITH executionPlan
        |LET cnt = FIRST(
        |    FOR ep IN executionPlan
        |        FILTER ep._key IN @keys
        |        COLLECT WITH COUNT INTO cnt
        |        RETURN cnt
        |    )
        |RETURN cnt == LENGTH(@keys)
        |""".stripMargin,
      Map("keys" -> events.map(_.planId))
    )

    val eventualExecPlanDetails = db.queryAs[Map[String, Any]](
      """
        |WITH executionPlan, executes, operation
        |FOR ep IN executionPlan
        |    FILTER ep._key IN @keys
        |
        |    LET writeOp = FIRST(FOR v IN 1 OUTBOUND ep executes RETURN v)
        |
        |    RETURN {
        |        "executionPlanId" : ep._key,
        |        "frameworkName" : CONCAT(ep.systemInfo.name, " ", ep.systemInfo.version),
        |        "applicationName" : ep.extra.appName,
        |        "dataSourceUri" : writeOp.outputSource,
        |        "dataSourceType" : writeOp.extra.destinationType,
        |        "append" : writeOp.append
        |    }
        |""".stripMargin,
      Map("keys" -> events.map(_.planId))
    ).map(_.streamRemaining().toScala.toArray)

    for {
      refConsistent <- allReferencesConsistentFuture
      if refConsistent
      execPlanDetails <- eventualExecPlanDetails
      res <- buildTranscation(events, execPlanDetails).execute(db)
    } yield res
  })

  private def buildTranscation(
    events: Array[apiModel.ExecutionEvent],
    execPlanDetails: Array[Map[String, Any]]
  ): ArangoTx = {
   val progressNodes = (events zip execPlanDetails).map{ case (e, pd) =>
     Progress(
       e.timestamp,
       e.error,
       e.extra,
       createEventKey(e),
       ExecPlanDetails(
         pd("executionPlanId").asInstanceOf[String],
         pd("frameworkName").asInstanceOf[String],
         pd("applicationName").asInstanceOf[String],
         pd("dataSourceUri").asInstanceOf[String],
         pd("dataSourceType").asInstanceOf[String],
         pd("append").asInstanceOf[Boolean]
       )
     )}

    val progressEdges = progressNodes
      .zip(events)
      .map({ case (p, e) => EdgeDef.ProgressOf.edge(p._key, e.planId) })

    new TxBuilder()
      .addQuery(InsertQuery(NodeDef.Progress, progressNodes: _*).copy(ignoreExisting = true))
      .addQuery(InsertQuery(EdgeDef.ProgressOf, progressEdges: _*).copy(ignoreExisting = true))
      .buildTx
  }

  private def createInsertTransaction(
    executionPlan: apiModel.ExecutionPlan,
    referencedDSURIs: Set[String],
    persistedDSes: Map[String, String]
  ) = {
    val transientDSes: Map[String, String] = (referencedDSURIs -- persistedDSes.keys).map(_ -> randomUUID.toString).toMap
    val referencedDSes = transientDSes ++ persistedDSes
    new TxBuilder()
      .addQuery(InsertQuery(NodeDef.Operation, createOperations(executionPlan): _*))
      .addQuery(InsertQuery(EdgeDef.Follows, createFollows(executionPlan): _*))
      .addQuery(InsertQuery(NodeDef.DataSource, createDataSources(transientDSes): _*))
      .addQuery(InsertQuery(EdgeDef.WritesTo, createWriteTo(executionPlan, referencedDSes)))
      .addQuery(InsertQuery(EdgeDef.ReadsFrom, createReadsFrom(executionPlan, referencedDSes): _*))
      .addQuery(InsertQuery(EdgeDef.Executes, createExecutes(executionPlan)))
      .addQuery(InsertQuery(NodeDef.ExecutionPlan, createExecution(executionPlan)))
      .addQuery(InsertQuery(EdgeDef.Depends, createExecutionDepends(executionPlan, referencedDSes): _*))
      .addQuery(InsertQuery(EdgeDef.Affects, createExecutionAffects(executionPlan, referencedDSes)))
      .buildTx
  }

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

  import za.co.absa.commons.json.DefaultJacksonJsonSerDe._

  private[repo] def createEventKey(e: apiModel.ExecutionEvent) =
    s"${e.planId}:${jl.Long.toString(e.timestamp, 36)}"

  private def createExecutes(executionPlan: apiModel.ExecutionPlan) = EdgeDef.Executes.edge(
    executionPlan.id,
    s"${executionPlan.id}:${executionPlan.operations.write.id}")

  private def createExecution(executionPlan: apiModel.ExecutionPlan): dbModel.ExecutionPlan =
    dbModel.ExecutionPlan(
      systemInfo = executionPlan.systemInfo.toJsonAs[Map[String, Any]],
      agentInfo = executionPlan.agentInfo.map(_.toJsonAs[Map[String, Any]]).orNull,
      extra = executionPlan.extraInfo,
      _key = executionPlan.id.toString)

  private def createReadsFrom(plan: apiModel.ExecutionPlan, dsUriToKey: String => String): Seq[Edge] = for {
    ro <- plan.operations.reads
    ds <- ro.inputSources
  } yield EdgeDef.ReadsFrom.edge(
    s"${plan.id}:${ro.id}",
    dsUriToKey(ds))

  private def createWriteTo(executionPlan: apiModel.ExecutionPlan, dsUriToKey: String => String) = EdgeDef.WritesTo.edge(
    s"${executionPlan.id}:${executionPlan.operations.write.id}",
    dsUriToKey(executionPlan.operations.write.outputSource))

  private def createExecutionDepends(plan: apiModel.ExecutionPlan, dsUriToKey: String => String): Seq[Edge] = for {
    ro <- plan.operations.reads
    ds <- ro.inputSources
  } yield EdgeDef.Depends.edge(
    plan.id,
    dsUriToKey(ds))

  private def createExecutionAffects(executionPlan: apiModel.ExecutionPlan, dsUriToKey: String => String) = EdgeDef.Affects.edge(
    executionPlan.id,
    dsUriToKey(executionPlan.operations.write.outputSource))

  private def createDataSources(dsUriToKey: Map[String, String]): Seq[DataSource] = dsUriToKey
    .map({ case (uri, key) => DataSource(uri, key) })
    .toVector

  private def createOperations(executionPlan: apiModel.ExecutionPlan): Seq[dbModel.Operation] = {
    val allOperations = executionPlan.operations.all
    val maybeSchemaFinder = executionPlan.expressions.map(attrs =>
      new RecursiveSchemaFinder(allOperations, attrs.mappingByOperation))

    allOperations.map {
      case r: apiModel.ReadOperation =>
        dbModel.Read(
          inputSources = r.inputSources,
          params = r.params,
          extra = r.extra,
          outputSchema = executionPlan.expressions.flatMap(_.mappingByOperation.get(r.id)),
          _key = s"${executionPlan.id}:${r.id.toString}"
        )
      case w: apiModel.WriteOperation =>
        dbModel.Write(
          outputSource = w.outputSource,
          append = w.append,
          params = w.params,
          extra = w.extra,
          outputSchema = maybeSchemaFinder.flatMap(_.findSchemaOf(w)),
          _key = s"${executionPlan.id}:${w.id.toString}"
        )
      case t: apiModel.DataOperation =>
        dbModel.Transformation(
          params = t.params,
          extra = t.extra,
          outputSchema = maybeSchemaFinder.flatMap(_.findSchemaOf(t)),
          _key = s"${executionPlan.id}:${t.id.toString}"
        )
    }
  }

  private def createFollows(executionPlan: apiModel.ExecutionPlan): Seq[Edge] =
    for {
      operation <- executionPlan.operations.all
      childId <- operation.childIds
    } yield EdgeDef.Follows.edge(
      s"${executionPlan.id}:${operation.id}",
      s"${executionPlan.id}:$childId")
}
