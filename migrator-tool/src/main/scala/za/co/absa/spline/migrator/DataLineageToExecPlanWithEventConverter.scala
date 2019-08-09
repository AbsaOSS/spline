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

package za.co.absa.spline.migrator

import java.util.UUID

import za.co.absa.spline.common.OptionImplicits._
import za.co.absa.spline.harvester.ModelConstants._
import za.co.absa.spline.model._
import za.co.absa.spline.producer.rest.model._

class DataLineageToExecPlanWithEventConverter(lineage: DataLineage) {

  private type OperationId = Int
  private type AttributeId = UUID
  private type Schema = Seq[AttributeId]

  private val operationIdByDatasetUUID: Map[UUID, OperationId] =
    lineage
      .datasets
      .map(_.id)
      .zipWithIndex
      .toMap

  private val schemaByDatasetUUID: Map[UUID, Schema] =
    lineage
      .datasets
      .map(ds => ds.id -> ds.schema.attrs)
      .toMap

  def convert(): (ExecutionPlan, Option[ExecutionEvent]) = {
    val executionId = lineage.rootDataset.id

    val (opWrite, opReads, opOther) = splitOperationsByType(lineage.operations)

    val operations = Operations(
      write = convertWriteOperation(opWrite),
      reads = opReads.map(convertReadOperation),
      other = opOther.map(convertOtherOperation))

    val executionPlan = ExecutionPlan(
      id = executionId,
      operations = operations,
      systemInfo = SystemInfo(AppMetaInfo.Spark, lineage.sparkVer),
      agentInfo = Some(AgentInfo(AppMetaInfo.Spline, "0.3.x")),
      extraInfo = Map(
        ExecutionPlanExtra.AppName -> lineage.appName,
        ExecutionPlanExtra.DataTypes -> lineage.dataTypes,
        ExecutionPlanExtra.Attributes -> lineage.attributes
      ))

    val maybeExecutionEvent =
      if (lineage.writeIgnored) None
      else Some(
        ExecutionEvent(
          planId = executionId,
          timestamp = lineage.timestamp,
          error = None,
          extra = Map(
            ExecutionEventExtra.AppId -> lineage.appId,
            ExecutionEventExtra.WriteMetrics -> opWrite.writeMetrics,
            ExecutionEventExtra.ReadMetrics -> opWrite.readMetrics
          ).filterNot(entryValueEmptyMapPredicate)))

    (executionPlan, maybeExecutionEvent)
  }

  private val entryValueEmptyMapPredicate: ((_, _)) => Boolean = {
    case (_, v: Map[_, _]) => v.isEmpty
    case _ => false
  }

  private def splitOperationsByType(operations: Seq[op.Operation]): (op.Write, Seq[op.Read], Seq[op.Operation]) = {
    assume(operations.nonEmpty)
    val opWrite = operations.head.asInstanceOf[op.Write]
    val opRest = operations.tail

    val (opReads, opOthers) =
      ((Vector.empty[op.Read], Vector.empty[op.Operation]) /: opRest) {
        case ((accRead, accOther), opRead: op.Read) => (accRead :+ opRead, accOther)
        case ((accRead, accOther), opOther) => (accRead, accOther :+ opOther)
      }

    (opWrite, opReads, opOthers)
  }

  private def convertWriteOperation(opWrite: op.Write): WriteOperation =
    WriteOperation(
      outputSource = opWrite.path,
      append = opWrite.append,
      id = operationIdByDatasetUUID(opWrite.mainProps.output),
      childIds = opWrite.mainProps.inputs.map(operationIdByDatasetUUID),
      schema = schemaByDatasetUUID.get(opWrite.mainProps.output),
      params = Map(
        OperationParams.Name -> opWrite.mainProps.name,
        OperationParams.DestinationType -> opWrite.destinationType
      ))

  private def convertReadOperation(opRead: op.Read): ReadOperation =
    ReadOperation(
      inputSources = opRead.sources.map(_.path),
      id = operationIdByDatasetUUID(opRead.mainProps.output),
      schema = schemaByDatasetUUID.get(opRead.mainProps.output),
      params = Map(
        OperationParams.Name -> opRead.mainProps.name,
        OperationParams.SourceType -> opRead.sourceType
      ))

  private def convertOtherOperation(opOther: op.Operation): DataOperation = {
    val params: Map[String, _] = opOther match {
      case op.Generic(_, rawString) =>
        Map(OperationParams.RawString -> rawString)

      case op.Join(_, maybeCondition, joinType) =>
        Map[String, Any](OperationParams.JoinType -> joinType)
          .optionally(_.updated(OperationParams.Condition, _: Any), maybeCondition)

      case op.Filter(_, condition) =>
        Map[String, Any](OperationParams.Condition -> condition)

      case op.Aggregate(_, groupings, aggregations) =>
        Map[String, Any](
          OperationParams.Groupings -> groupings,
          OperationParams.Aggregations -> aggregations)

      case op.Sort(_, orders) =>
        Map[String, Any](OperationParams.SortOrders -> orders)

      case op.Projection(_, transformations) =>
        Map[String, Any](OperationParams.Transformations -> transformations)

      case op.Alias(_, alias) =>
        Map[String, Any](OperationParams.Alias -> alias)

      case _ => Map.empty
    }

    val maybeSchema: Option[Schema] = opOther.mainProps.inputs match {
      case Seq(singleInput) =>
        val inputSchema = schemaByDatasetUUID(singleInput)
        val outputSchema = schemaByDatasetUUID(opOther.mainProps.output)
        if (inputSchema != outputSchema) Some(outputSchema)
        else None
      case _ => schemaByDatasetUUID.get(opOther.mainProps.output)
    }

    DataOperation(
      id = operationIdByDatasetUUID(opOther.mainProps.output),
      childIds = opOther.mainProps.inputs.map(operationIdByDatasetUUID),
      schema = maybeSchema,
      params = params + (OperationParams.Name -> opOther.mainProps.name))
  }
}
