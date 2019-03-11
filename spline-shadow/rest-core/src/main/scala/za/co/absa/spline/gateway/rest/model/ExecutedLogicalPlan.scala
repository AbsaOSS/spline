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

package za.co.absa.spline.gateway.rest.model

import java.util.UUID

import za.co.absa.spline.gateway.rest.model.ExecutedLogicalPlan._

case class ExecutedLogicalPlan
(
  execution: ExecutionInfo,
  plan: LogicalPlan
) {
  def this() = this(null, null)
}

object ExecutedLogicalPlan {
  type OperationID = UUID

  case class LogicalPlan(nodes: Array[Operation], edges: Array[Transition]) extends Graph {
    def this() = this(null, null)

    override type Node = Operation
    override type Edge = Transition
  }

  case class Operation(id: OperationID, operationType: String, name: String) extends Graph.Node {
    def this() = this(null, null, null)

    override type Id = OperationID
  }

  case class Transition(source: OperationID, target: OperationID) extends Graph.Edge {
    def this() = this(null, null)

    override type JointId = OperationID
  }

}