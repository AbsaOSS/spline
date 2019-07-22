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

package za.co.absa.spline.producer.service.model

import java.lang.Iterable
import java.util.UUID.randomUUID

import com.arangodb.velocypack.VPackSlice
import za.co.absa.spline.persistence.model._
import za.co.absa.spline.producer.rest.model._
import za.co.absa.spline.producer.service.model.ArangoParams._

import scala.language.implicitConversions

case class ExecutionPlanTransactionParams
(
  operation: Iterable[VPackSlice],
  follows: Iterable[VPackSlice],
  dataSource: Iterable[VPackSlice],
  writesTo: Iterable[VPackSlice],
  readsFrom: Iterable[VPackSlice],
  executes: Iterable[VPackSlice],
  execution: Iterable[VPackSlice]
) extends ArangoParams

object ExecutionPlanTransactionParams {

  import za.co.absa.spline.common.OptionImplicits._

  def apply(executionPlan: ExecutionPlan, uriToNewKey: Map[String, String], uriToKey: Map[String, String]): ExecutionPlanTransactionParams = {

    ExecutionPlanTransactionParams(
      ser(createOperations(executionPlan)),
      ser(createFollows(executionPlan)),
      ser(createDataSources(uriToNewKey)),
      ser(createWriteTo(executionPlan, uriToKey)),
      ser(createReadsFrom(executionPlan, uriToKey)),
      ser(createExecutes(executionPlan)),
      ser(createExecution(executionPlan))
    )
  }

  private def createExecutes(executionPlan: ExecutionPlan): Executes = {
    Executes(
      _from = s"execution/${executionPlan.id}",
      _to = s"operation/${executionPlan.id}:${executionPlan.operations.write.id}",
      _key = Some(executionPlan.id.toString)
    )
  }

  private def createExecution(executionPlan: ExecutionPlan): Execution = {
    val extras = executionPlan
      .extraInfo
      .updated("systemInfo", executionPlan.systemInfo)
      .optionally[AgentInfo](_.updated("agentInfo", _), executionPlan.agentInfo)

    val id = executionPlan.id.toString
    Execution(
      extra = extras,
      _key = Some(id),
      _id = Some(s"execution/$id")
    )
  }

  private def createReadsFrom(executionPlan: ExecutionPlan, dsUriToKey: Map[String, String]): Seq[ReadsFrom] = {
    for {
      reads <- executionPlan.operations.reads
      readSource <- reads.inputSources
      readsFrom = ReadsFrom(
        _from = s"operation/${executionPlan.id}:${reads.id}",
        _to = s"dataSource/${dsUriToKey(readSource)}",
        _key = Some(randomUUID.toString)
      )
    } yield readsFrom
  }

  private def createWriteTo(executionPlan: ExecutionPlan, dsUriToKey: Map[String, String]): WritesTo = {
    val executionPlanId = executionPlan.id
    val writeOperationId = executionPlan.operations.write.id
    val dataSourceId = dsUriToKey(executionPlan.operations.write.outputSource)
    WritesTo(
      _from = s"operation/$executionPlanId:$writeOperationId",
      _to = s"dataSource/$dataSourceId")
  }

  private def createDataSources(dsUriToNewKey: Map[String, String]): Seq[DataSource] = {
    dsUriToNewKey.toSeq.map {
      case (uri, key) =>
        DataSource(uri, Some(key))
    }
  }

  private def createOperations(executionPlan: ExecutionPlan): Seq[Operation] = executionPlan.operations.all.map {
    case r: ReadOperation =>
      Read(
        name = r.params.get("name").map(n => n.toString).orNull,
        properties = r.params + ("inputSources" -> r.inputSources),
        outputSchema = r.schema,
        _key = Some(s"${executionPlan.id}:${r.id.toString}")
      )
    case w: WriteOperation =>
      Write(
        name = w.params.get("name").map(n => n.toString).orNull,
        properties = w.params + ("outputSource" -> w.outputSource) + ("childIds" -> w.childIds) + ("append" -> w.append),
        outputSchema = w.schema,
        _key = Some(s"${executionPlan.id}:${w.id.toString}")
      )
    case t: DataOperation =>
      Transformation(
        name = t.params.get("name").map(n => n.toString).orNull,
        properties = t.params + ("childIds" -> t.childIds),
        outputSchema = t.schema,
        _key = Some(s"${executionPlan.id}:${t.id.toString}")
      )
  }

  private def createFollows(executionPlan: ExecutionPlan): Seq[Follows] = {
    // Operation inputs and outputs ids may be shared across already linked lineages. To avoid saving linked lineages or
    // duplicate indexes we need to not use these.
    for {
      operation <- executionPlan.operations.all
      child <- operation.childIds
      follows = Follows(
        _from = s"operation/${executionPlan.id}:${operation.id}",
        _to = s"operation/${executionPlan.id}:$child",
        _key = Some(randomUUID.toString)
      )
    } yield follows
  }
}

