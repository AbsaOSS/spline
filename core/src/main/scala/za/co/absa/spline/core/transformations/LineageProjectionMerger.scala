/*
 * Copyright 2017 ABSA Group Limited
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

import java.util.UUID
import java.util.UUID.randomUUID

import za.co.absa.spline.common.transformations.AsyncTransformation
import za.co.absa.spline.model.expr.{Alias, AttrRef, Expression}
import za.co.absa.spline.model.op.{Operation, OperationProps, Projection}
import za.co.absa.spline.model.{Attribute, DataLineage}

import scala.concurrent.{ExecutionContext, Future}

/**
  * The object is responsible for the logic that merges compatible projections into one node within lineage graph.
  */
object LineageProjectionMerger extends AsyncTransformation[DataLineage] {

  private val pipeline = Seq(
    mergeProjections _,
    cleanupReferences _)

  /**
    * The method transforms an input instance by a custom logic.
    *
    * @param lineage An input instance
    * @return A transformed result
    */
  override def apply(lineage: DataLineage)(implicit ec: ExecutionContext): Future[DataLineage] =
    Future.successful((lineage /: pipeline) ((lin, f) => f(lin)))

  private[transformations] def cleanupReferences(lineage: DataLineage): DataLineage = {
    lineage.rectified
  }

  private[transformations] def mergeProjections(lineage: DataLineage): DataLineage = {
    val attributeById = lineage.attributes.map(attr => attr.id -> attr).toMap
    val mergedOperations = lineage.operations.foldLeft(List.empty[Operation])(
      (collection, value) => collection match {
        case Nil => List(value)
        case x :: xs =>
          if (canMerge(x, value, lineage.operations, attributeById))
            merge(x, value) :: xs
          else
            value :: collection
      }
    ).reverse
    lineage.copy(operations = mergedOperations)
  }

  private def canMerge(a: Operation, b: Operation, allOperations: Seq[Operation], attributesById: Map[UUID, Attribute]): Boolean = {
    def transformationsAreCompatible(ats: Seq[Expression], bts: Seq[Expression]) = {
      val inputAttributeNames = ats.
        flatMap(_.allRefLikeChildrenFlattened).
        flatMap({
          case ref: AttrRef => Some(attributesById(ref.refId).name)
          case _ => None
        })

      val outputAttributeNames = bts.
        flatMap(_.allRefLikeChildrenFlattened).
        flatMap({
          case alias: Alias => Some(alias.alias)
          case _ => None
        })

      (inputAttributeNames intersect outputAttributeNames).isEmpty
    }

    (a, b) match {
      case (Projection(am, ats), Projection(bm, bts))
        if am.inputs.length == 1
          && am.inputs.head == bm.output
          && (allOperations.flatMap(_.mainProps.inputs) count bm.output.==) == 1 =>
        transformationsAreCompatible(ats, bts)
      case _ => false
    }
  }

  private def merge(a: Operation, b: Operation): Operation = {
    val mainPropsA = a.mainProps
    val mainPropsB = b.mainProps
    val projectNodeA = a.asInstanceOf[Projection]
    val projectNodeB = b.asInstanceOf[Projection]
    val node = Projection(
      OperationProps(
        randomUUID,
        mainPropsB.name,
        mainPropsB.inputs,
        mainPropsA.output
      ),
      projectNodeB.transformations ++ projectNodeA.transformations
    )

    node
  }
}
