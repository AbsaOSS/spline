package za.co.absa.spline.core.transformations

import za.co.absa.spline.model.OperationNode

/**
  * The class is utilized by transformers for storing modified references of the operation node.
  * @param position A position of a node within a collection
  * @param node A node which positions are going to be modified
  */
class OperationNodeTransformationWrapper(var position : Int, val node : OperationNode){

  var parentRefs = node.mainProps.parentRefs
  var childRefs = node.mainProps.childRefs

  /**
    * The methods creates a copy of the wrapped node with new references applied to it.
    * @return A copy of node with updated references
    */
  def compileNodeWithNewReferences() : OperationNode =
    node.withDifferentMainProps(
      node.mainProps.copy(childRefs = childRefs, parentRefs = parentRefs)
    )
}
