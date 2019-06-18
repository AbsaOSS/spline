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

  def apply(executionPlan: ExecutionPlan, uriToNewKey: Map[String, String], uriToKey: Map[String, String]): ExecutionPlanTransactionParams = {

    ExecutionPlanTransactionParams(
      ser(createOperations(executionPlan)),
      ser(createFollows(executionPlan)),
      ser(createDataSources(uriToNewKey)),
      ser(createWritesTos(executionPlan, uriToKey)),
      ser(createReadsFrom(executionPlan, uriToKey)),
      ser(createExecutes(executionPlan)),
      ser(createExecution(executionPlan))
    )
  }

  private def createExecutes(executionPlan: ExecutionPlan): Seq[Executes] = {
    Seq(
      Executes(
        _from = s"execution/${executionPlan.id}",
        _to = s"operation/${executionPlan.id}:${executionPlan.operations.write.id}",
        _key = Some(executionPlan.id.toString)
      )
    )
  }

  private def createExecution(executionPlan: ExecutionPlan): Seq[Execution] = {
    // TODO : Create dataTypes https://github.com/AbsaOSS/spline/issues/258
    val extraInfos =
      if (executionPlan.extraInfo == null || executionPlan.extraInfo.isEmpty)
        Map.empty
      else
        executionPlan.extraInfo
    val extras = extraInfos ++ Map("systemInfo" -> executionPlan.systemInfo, "agentInfo" -> executionPlan.agentInfo)
    val id = executionPlan.id.toString
    Seq(
      Execution(
        id = s"execution/$id",
        dataTypes = Array.empty,
        startTime = None,
        endTime = None,
        extra = extras,
        _key = Some(id),
        _id = Some(s"execution/$id")
      )
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

  private def createWritesTos(executionPlan: ExecutionPlan, dsUriToKey: Map[String, String]): Seq[WritesTo] = {
    executionPlan.operations.write.childIds.map(
      _ => {
        val executionPlanId = executionPlan.id
        val writeOperationId = executionPlan.operations.write.id
        val dataSourceId = dsUriToKey(executionPlan.operations.write.outputSource)
        WritesTo(
          _from = s"operation/$executionPlanId:$writeOperationId",
          _to = s"dataSource/$dataSourceId")
      }
    )
  }

  private def createDataSources(dsUriToNewKey: Map[String, String]): Seq[DataSource] = {
    dsUriToNewKey.toSeq.map {
      case (uri, key) =>
        DataSource(uri, Some(key))
    }
  }

  private def createOperations(executionPlan: ExecutionPlan): Seq[Operation] = {
    //TODO : Add the outputSchema : https://github.com/AbsaOSS/spline/issues/258
    val allOperations = getAllOperations(executionPlan)
    val operations = allOperations.map {
      case r: ReadOperation =>
        Read(
          name = r.params.get("name").map(n => n.toString).orNull,
          properties = Map.empty,
          format = r.params.get("format").map(f => f.toString).orNull,
          outputSchema = null,
          _key = Some(s"${executionPlan.id}:${r.id.toString}")
        )
      case w: WriteOperation =>
        Write(
          name = w.params.get("name").map(n => n.toString).orNull,
          properties = Map.empty,
          format = w.params.get("format").map(f => f.toString).orNull,
          outputSchema = null,
          _key = Some(s"${executionPlan.id}:${w.id.toString}")
        )
      case o: DataOperation =>
        Read(
          name = o.params.get("name").map(n => n.toString).orNull,
          properties = Map.empty,
          format = o.params.get("format").map(f => f.toString).orNull,
          outputSchema = null,
          _key = Some(s"${executionPlan.id}:${o.id.toString}")
        )
    }
    operations
  }

  private def createFollows(executionPlan: ExecutionPlan): Seq[Follows] = {
    // Operation inputs and outputs ids may be shared across already linked lineages. To avoid saving linked lineages or
    // duplicate indexes we need to not use these.
    for {
      operation <- getAllOperations(executionPlan)
      child <- operation.childIds
      follows = Follows(
        _from = s"operation/${executionPlan.id}:${operation.id}",
        _to = s"operation/${executionPlan.id}:$child",
        _key = Some(randomUUID.toString)
      )
    } yield follows
  }

  private def getAllOperations(executionPlan: ExecutionPlan): Seq[OperationLike] = {
    val reads = executionPlan.operations.reads
    val others = executionPlan.operations.other
    val write = List(executionPlan.operations.write)
    reads ++ others ++ write
  }
}

