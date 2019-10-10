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

import com.arangodb.ArangoDatabaseAsync
import org.apache.commons.lang3.StringUtils.wrap
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.common.OptionImplicits._
import za.co.absa.spline.persistence.model._
import za.co.absa.spline.persistence.tx.{InsertQuery, TxBuilder}
import za.co.absa.spline.persistence.{ArangoImplicits, Persister}
import za.co.absa.spline.producer.rest.model._
import za.co.absa.spline.producer.service.repo.ExecutionProducerRepositoryImpl._

import scala.compat.java8.StreamConverters._
import scala.concurrent.{ExecutionContext, Future}

@Repository
class ExecutionProducerRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends ExecutionProducerRepository {

  import ArangoImplicits._

  import scala.concurrent.ExecutionContext.Implicits._

  override def insertExecutionPlan(executionPlan: ExecutionPlan)(implicit ec: ExecutionContext): Future[Unit] = {
    Persister.save(executionPlan, attemptSaveExecutionPlan)
  }

  override def insertExecutionEvents(executionEvents: Array[ExecutionEvent])(implicit ec: ExecutionContext): Future[Unit] = {
    Persister.save(executionEvents, attemptSaveExecutionEvents)
  }

  private def attemptSaveExecutionPlan(executionPlan: ExecutionPlan)(implicit ec: ExecutionContext): Future[Unit] = {
    val referencedDSURIs = {
      val readSources = executionPlan.operations.reads.flatMap(_.inputSources).toSet
      val writeSource = executionPlan.operations.write.outputSource
      readSources + writeSource
    }
    val eventualPersistedDSes = db.queryAs[DataSource](
      s"""
         |FOR ds IN ${Nodes.DataSource}
         |    FILTER ds.uri IN [${referencedDSURIs.map(wrap(_, '"')).mkString(", ")}]
         |    RETURN ds
         |    """.stripMargin
    ).map(_.streamRemaining.toScala.map(ds => ds.uri -> ds._key).toMap)

    for {
      persistedDSes: Map[String, String] <- eventualPersistedDSes
      transientDSes: Map[String, String] = (referencedDSURIs -- persistedDSes.keys).map(_ -> randomUUID.toString).toMap
      _ <- {
        val referencedDSes = transientDSes ++ persistedDSes
        new TxBuilder()
          .addQuery(InsertQuery(Nodes.Operation, createOperations(executionPlan): _*))
          .addQuery(InsertQuery(Edges.Follows, createFollows(executionPlan): _*))
          .addQuery(InsertQuery(Nodes.DataSource, createDataSources(transientDSes): _*))
          .addQuery(InsertQuery(Edges.WritesTo, createWriteTo(executionPlan, referencedDSes)))
          .addQuery(InsertQuery(Edges.ReadsFrom, createReadsFrom(executionPlan, referencedDSes): _*))
          .addQuery(InsertQuery(Edges.Executes, createExecutes(executionPlan)))
          .addQuery(InsertQuery(Nodes.Execution, createExecution(executionPlan)))
          .addQuery(InsertQuery(Edges.Depends, createExecutionDepends(executionPlan, referencedDSes): _*))
          .addQuery(InsertQuery(Edges.Affects, createExecutionAffects(executionPlan, referencedDSes)))
          .buildTx
          .execute(db)
      }
    } yield Unit
  }

  private def attemptSaveExecutionEvents(events: Array[ExecutionEvent])(implicit ec: ExecutionContext): Future[Unit] = {
    val progresses = events.map(e => Progress(
      e.timestamp,
      e.error,
      e.extra,
      randomUUID.toString))

    val progressesOf = progresses
      .zip(events)
      .map({ case (p, e) => Edge(s"${Nodes.Progress}/${p._key}", s"${Nodes.Execution}/${e.planId}") })

    new TxBuilder()
      .addQuery(InsertQuery(Nodes.Progress, progresses: _*))
      .addQuery(InsertQuery(Edges.ProgressOf, progressesOf: _*))
      .buildTx
      .execute(db)
  }
}

object ExecutionProducerRepositoryImpl {

  private def createExecutes(executionPlan: ExecutionPlan) = Edge(
    s"${Nodes.Execution}/${executionPlan.id}",
    s"${Nodes.Operation}/${executionPlan.id}:${executionPlan.operations.write.id}")

  private def createExecution(executionPlan: ExecutionPlan): Execution = {
    val extras = executionPlan
      .extraInfo
      .updated("systemInfo", executionPlan.systemInfo)
      .optionally[AgentInfo](_.updated("agentInfo", _), executionPlan.agentInfo)

    Execution(
      extra = extras,
      _key = executionPlan.id.toString)
  }

  private def createReadsFrom(plan: ExecutionPlan, dsUriToKey: String => String): Seq[Edge] = for {
    ro <- plan.operations.reads
    ds <- ro.inputSources
  } yield Edge(
    s"${Nodes.Operation}/${plan.id}:${ro.id}",
    s"${Nodes.DataSource}/${dsUriToKey(ds)}")

  private def createWriteTo(executionPlan: ExecutionPlan, dsUriToKey: String => String) = Edge(
    s"${Nodes.Operation}/${executionPlan.id}:${executionPlan.operations.write.id}",
    s"${Nodes.DataSource}/${dsUriToKey(executionPlan.operations.write.outputSource)}")

  private def createExecutionDepends(plan: ExecutionPlan, dsUriToKey: String => String): Seq[Edge] = for {
    ro <- plan.operations.reads
    ds <- ro.inputSources
  } yield Edge(
    s"${Nodes.Execution}/${plan.id}",
    s"${Nodes.DataSource}/${dsUriToKey(ds)}")

  private def createExecutionAffects(executionPlan: ExecutionPlan, dsUriToKey: String => String) = Edge(
    s"${Nodes.Execution}/${executionPlan.id}",
    s"${Nodes.DataSource}/${dsUriToKey(executionPlan.operations.write.outputSource)}")

  private def createDataSources(dsUriToKey: Map[String, String]): Seq[DataSource] = dsUriToKey
    .map({ case (uri, key) => DataSource(uri, key) })
    .toVector

  private def createOperations(executionPlan: ExecutionPlan): Seq[Operation] = executionPlan.operations.all.map {
    case r: ReadOperation =>
      Read(
        name = r.params.get("name").map(n => n.toString).orNull,
        properties = r.params + ("inputSources" -> r.inputSources),
        outputSchema = r.schema,
        _key = s"${executionPlan.id}:${r.id.toString}"
      )
    case w: WriteOperation =>
      Write(
        name = w.params.get("name").map(n => n.toString).orNull,
        properties = w.params + ("outputSource" -> w.outputSource) + ("childIds" -> w.childIds) + ("append" -> w.append),
        outputSchema = w.schema,
        _key = s"${executionPlan.id}:${w.id.toString}"
      )
    case t: DataOperation =>
      Transformation(
        name = t.params.get("name").map(n => n.toString).orNull,
        properties = t.params + ("childIds" -> t.childIds),
        outputSchema = t.schema,
        _key = s"${executionPlan.id}:${t.id.toString}"
      )
  }

  private def createFollows(executionPlan: ExecutionPlan): Seq[Edge] =
    for {
      operation <- executionPlan.operations.all
      childId <- operation.childIds
    } yield Edge(
      s"${Nodes.Operation}/${executionPlan.id}:${operation.id}",
      s"${Nodes.Operation}/${executionPlan.id}:$childId")
}
