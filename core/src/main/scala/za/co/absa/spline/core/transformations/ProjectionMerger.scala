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

import java.util.UUID.randomUUID

import za.co.absa.spline.common.transformations.Transformation
import za.co.absa.spline.model.expr.Expression
import za.co.absa.spline.model.op.{NodeProps, Operation, Projection}

/**
  * The class is responsible for the logic that merges compatible projections into one node.
  */
object ProjectionMerger extends Transformation[Seq[Operation]] {

  /**
    * The method transforms an input instance by a custom logic.
    *
    * @param input An input instance
    * @return A transformed result
    */
  override def apply(input: Seq[Operation]): Seq[Operation] = {
    val wrappedNodes = input.zipWithIndex.map(i => new OperationNodeTransformationWrapper(i._2, i._1))
    wrappedNodes.foldLeft((List.empty[OperationNodeTransformationWrapper], wrappedNodes))(
      (collection, value) => collection match {
        case (Nil, x) => (List(value), x)
        case (x :: xs, allNodes) =>
          if (canMerge(x, value)) {
            val m = merge(x, value)
            val allNodesWithM = allNodes :+ m
            updateReferences(m.position, allNodesWithM)
            (m :: xs, allNodesWithM)
          } else {
            (value :: collection._1, allNodes)
          }
      }
    )._1.reverseMap(_.compileNodeWithNewReferences())
  }

  private def canMerge(a: OperationNodeTransformationWrapper, b: OperationNodeTransformationWrapper): Boolean = {
    def transformationsAreCompatible(ats: Seq[Expression], bts: Seq[Expression]) = {
      val inputAttributeNames = ats.flatMap(_.inputAttributeNames)
      val outputAttributeNames = bts.flatMap(_.outputAttributeNames)
      (inputAttributeNames intersect outputAttributeNames).isEmpty
    }

    /*(a.node, b.node) match {
      case (Projection(_, ats), Projection(_, bts))
        if (a.childRefs.length == 1 && a.childRefs.head == b.position
          && b.parentRefs.length == 1 && b.parentRefs.head == a.position) => transformationsAreCompatible(ats, bts)
      case _ => false
    }*/
    ???
  }

  private def merge(a: OperationNodeTransformationWrapper, b: OperationNodeTransformationWrapper): OperationNodeTransformationWrapper = {
    val mainPropsA = a.node.mainProps
    val mainPropsB = b.node.mainProps
    val projectNodeA = a.node.asInstanceOf[Projection]
    val projectNodeB = b.node.asInstanceOf[Projection]
    val node = Projection(
      NodeProps(
        randomUUID,
        mainPropsB.name,
        mainPropsB.rawString + ", " + mainPropsA.rawString,
        mainPropsB.inputs,
        mainPropsA.output
//        a.parentRefs,
//        b.childRefs
      ),
      projectNodeB.transformations ++ projectNodeA.transformations
    )

    new OperationNodeTransformationWrapper(a.position, node)
  }

  private def updateReferences(threshold: Int, collection: Seq[OperationNodeTransformationWrapper]): Unit = {
    /*val updatePositionFunction = (r: Int) => if (r > threshold) r - 1 else r
    collection.foreach(
      o => {
        o.position = updatePositionFunction(o.position)
        o.childRefs = o.childRefs.map(updatePositionFunction)
        o.parentRefs = o.parentRefs.map(updatePositionFunction)
      }
    )*/
    ???
  }
}
