/*
 * Copyright 2017 Barclays Africa Group Limited
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
