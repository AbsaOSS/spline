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

package za.co.absa.spline.linker.control

import java.util.UUID
import java.util.UUID.randomUUID

import za.co.absa.spline.common.transformations.AsyncTransformation
import za.co.absa.spline.model.expr.{Alias, AttrRef, Expression, TypedExpression}
import za.co.absa.spline.model.op.{ExpressionAware, Operation, OperationProps, Projection}
import za.co.absa.spline.model.{Attribute, DataLineage}

/**
  * The object is responsible for the logic that merges compatible projections into one node within lineage graph.
  */
object LineageProjectionMerger {

  private val pipeline = Seq(
    mergeProjections _,
    cleanupReferences _)

  /**
    * The method transforms an input instance by a custom logic.
    *
    * @param lineage An input instance
    * @return A transformed result
    */
  def apply(lineage: DataLineage): DataLineage =
    (lineage /: pipeline) ((lin, f) => f(lin))

  private[control] def cleanupReferences(lineage: DataLineage): DataLineage = {
    val operations = lineage.operations

    val datasets = {
      val datasetIds =
        (operations.flatMap(_.mainProps.inputs)
          ++ operations.map(_.mainProps.output)).distinct
      lineage.datasets.filter(ds => datasetIds.contains(ds.id))
    }

    val attributes = {
      val attributeIds = datasets.flatMap(_.schema.attrs).distinct
      lineage.attributes.filter(attr => attributeIds.contains(attr.id))
    }

    val dataTypes = {
      val expressions = operations.flatMap {
        case op: ExpressionAware => op.expressions
        case _ => Nil
      }

      val expressionTypeIds: Set[UUID] = {
        def traverseAndCollect(accumulator: Set[UUID], expressions: List[Expression]): Set[UUID] = expressions match {
          case Nil => accumulator
          case exp :: queue =>
            val updatedAccumulator = exp match {
              case tex: TypedExpression => accumulator + tex.dataTypeId
              case _ => accumulator
            }
            val updatedQueue = exp.children.toList ++ queue
            traverseAndCollect(updatedAccumulator, updatedQueue)
        }

        traverseAndCollect(Set.empty, expressions.toList)
      }

      val retainedDataTypes = {
        val allDataTypesById = lineage.dataTypes.map(dt => dt.id -> dt).toMap

        def traverseAndCollectWithChildren(accumulator: Set[UUID], typeIds: List[UUID]): Set[UUID] = typeIds match {
          case Nil => accumulator
          case dtId :: queue => traverseAndCollectWithChildren(
            accumulator = accumulator + dtId,
            typeIds = allDataTypesById(dtId).childDataTypeIds.toList ++ queue
          )
        }

        val referredTypeIds = expressionTypeIds ++ attributes.map(_.dataTypeId)
        val retainedTypeIds = traverseAndCollectWithChildren(Set.empty, referredTypeIds.toList)

        allDataTypesById.filterKeys(retainedTypeIds).values
      }

      retainedDataTypes.toSeq
    }

    lineage.copy(
      operations = operations,
      datasets = datasets,
      attributes = attributes,
      dataTypes = dataTypes)
  }

  private[control] def mergeProjections(lineage: DataLineage): DataLineage = {
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
