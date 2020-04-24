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

import za.co.absa.spline.consumer.service.internal.model.ExecutionPlanDAG._
import za.co.absa.spline.persistence.model.{Edge, Operation}

class ExecutionPlanDAG(val sysInfo: SystemInfo, val operations: Set[_ <: Operation], edges: Set[Edge]) {
  val operationById: Map[OperationId, Operation] = operations.map(op => op._key -> op).toMap
  val outboundEdges: Map[OperationId, Set[Edge]] = edges.groupBy(_._from).withDefaultValue(Set.empty)
  val inboundEdges: Map[OperationId, Set[Edge]] = edges.groupBy(_._to).withDefaultValue(Set.empty)

  val outputSchema: Map[OperationId, Array[AttributeId]] =
    operations.map(op => {
      op._key -> op.outputSchema
        .asInstanceOf[Option[Array[AttributeId]]]
        .getOrElse(Array.empty)
    }).toMap

  val firsInputSchema: Map[OperationId, Array[AttributeId]] =
    operations.map(op => {
      op._key -> precedingOps(op).headOption.map(p => outputSchema(p._key)).getOrElse(Array.empty)
    }).toMap

  val inputAttributes: Map[OperationId, Set[AttributeId]] =
    operations.map(op => {
      op._key -> precedingOps(op).flatMap(p => outputSchema(p._key))
    }).toMap

  def precedingOps(op: Operation): Set[Operation] =
    outboundEdges(op._key)
      .map(e => operationById(e._to))

  def followingOps(op: Operation): Set[Operation] =
    inboundEdges(op._key)
      .map(e => operationById(e._from))

}

object ExecutionPlanDAG {
  private type OperationId = String
  private type AttributeId = String
}
