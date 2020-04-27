/*
 * Copyright 2020 ABSA Group Limited
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

package za.co.absa.spline.consumer.service.internal.model

import java.util.UUID

import za.co.absa.spline.consumer.service.internal.model.ExecutionPlanDAG._
import za.co.absa.spline.persistence.model.{Edge, Operation}

class ExecutionPlanDAG(
  val id: UUID,
  val systemInfo: VersionInfo,
  val agentInfo: VersionInfo,
  val operations: Array[_ <: Operation],
  edges: Array[Edge]) {

  val operationById: Map[OperationId, Operation] = operations.map(op => op._key -> op).toMap

  private val outboundEdges: Map[OperationId, Array[Edge]] = edges.groupBy(_._from).withDefaultValue(Array.empty)
  private val inboundEdges: Map[OperationId, Array[Edge]] = edges.groupBy(_._to).withDefaultValue(Array.empty)

  val outputSchemaArray: Map[OperationId, Array[AttributeId]] =
    operations.map(op => {
      op._key -> op.outputSchema
        .asInstanceOf[Option[Array[AttributeId]]]
        .getOrElse(Array.empty)
    }).toMap

  val inputSchemaArray: Map[OperationId, Array[AttributeId]] =
    operations.map(op => {
      op._key -> precedingOps(op).flatMap(p => outputSchemaArray(p._key))
    }).toMap

  val outputSchemaSet: Map[OperationId, Set[AttributeId]] = outputSchemaArray.mapValues(_.toSet)
  val inputSchemaSet: Map[OperationId, Set[AttributeId]] = inputSchemaArray.mapValues(_.toSet)

  def precedingOps(op: Operation): Array[Operation] =
    outboundEdges(op._key)
      .map(e => operationById(e._to))

  def followingOps(op: Operation): Array[Operation] =
    inboundEdges(op._key)
      .map(e => operationById(e._from))

  def findOriginOperationForAttr(attributeId: AttributeId): Option[Operation] =
    operations.find(op =>
      outputSchemaSet(op._key).contains(attributeId) &&
        !inputSchemaSet(op._key).contains(attributeId))
}

object ExecutionPlanDAG {
  private type OperationId = String
  private type AttributeId = String
}
