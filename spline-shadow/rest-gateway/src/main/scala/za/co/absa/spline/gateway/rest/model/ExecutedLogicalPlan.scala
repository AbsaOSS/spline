package za.co.absa.spline.gateway.rest.model

import java.util.UUID

import za.co.absa.spline.gateway.rest.model.ExecutedLogicalPlan._

case class ExecutedLogicalPlan
(
  app: AppInfo,
  execution: ExecutionInfo,
  dag: LogicalPlan
)

object ExecutedLogicalPlan {
  type OperationID = UUID

  case class LogicalPlan(nodes: Seq[Operation], edges: Seq[Transition]) extends Graph {
    override type Node = Operation
    override type Edge = Transition
  }

  case class Operation(_id: OperationID, _type: String, name: String) extends Graph.Node {
    override type Id = OperationID
  }

  case class Transition(_from: OperationID, _to: OperationID) extends Graph.Edge {
    override type JointId = OperationID
  }

}