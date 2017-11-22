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

import za.co.absa.spline.common.transformations.AsyncTransformation
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.model.expr.Expression
import za.co.absa.spline.model.op.{Operation, OperationProps, Projection}

import scala.concurrent.{ExecutionContext, Future}

/**
  * The object is responsible for the logic that merges compatible projections into one node within lineage graph.
  */
object LineageProjectionMerger extends AsyncTransformation[DataLineage] {

  /**
    * The method transforms an input instance by a custom logic.
    *
    * @param lineage An input instance
    * @return A transformed result
    */
  override def apply(lineage: DataLineage)(implicit ec: ExecutionContext): Future[DataLineage] =
    for {
      mergedOperations <- mergeProjections(lineage.operations)
      updatedLineage <- consolidateReferences(lineage.copy(operations = mergedOperations))
    } yield updatedLineage

  /**
    * The method filters out all unused MetaDatasets and Attributes.
    *
    * @param input An input instance
    * @return A transformed result
    */
  private[transformations] def consolidateReferences(input: DataLineage)(implicit ec: ExecutionContext): Future[DataLineage] = Future.successful {
    val operations = input.operations
    val datasetIds = (operations.flatMap(_.mainProps.inputs) ++ operations.map(_.mainProps.output)).distinct
    val datasets = input.datasets.filter(i => datasetIds.contains(i.id))
    val attributeIds = datasets.flatMap(_.schema.attrs).distinct
    val attributes = input.attributes.filter(i => attributeIds.contains(i.id))
    input.copy(operations = operations, datasets = datasets, attributes = attributes)
  }

  /**
    * The method merges compatible projections into one node.
    *
    * @param input An input instance
    * @return A transformed result
    */
  private[transformations] def mergeProjections(input: Seq[Operation])(implicit ec: ExecutionContext): Future[Seq[Operation]] = Future.successful {
    input.foldLeft(List.empty[Operation])(
      (collection, value) => collection match {
        case Nil => List(value)
        case x :: xs =>
          if (canMerge(x, value, input))
            merge(x, value) :: xs
          else
            value :: collection
      }
    ).reverse
  }

  private def canMerge(a: Operation, b: Operation, allOperations: Seq[Operation]): Boolean = {
    def transformationsAreCompatible(ats: Seq[Expression], bts: Seq[Expression]) = {
      val inputAttributeNames = ats.flatMap(_.inputAttributeNames)
      val outputAttributeNames = bts.flatMap(_.outputAttributeNames)
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
