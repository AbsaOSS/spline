package za.co.absa.spline.gateway.rest.model

trait Graph {
  type Node <: Graph.Node
  type Edge <: Graph.Edge {type JointId = Node#Id}
  val nodes: Seq[Node]
  val edges: Seq[Edge]
}

object Graph {

  trait Node {
    type Id
    val _id: Id
  }

  trait Edge {
    type JointId
    val _from: JointId
    val _to: JointId
  }

}