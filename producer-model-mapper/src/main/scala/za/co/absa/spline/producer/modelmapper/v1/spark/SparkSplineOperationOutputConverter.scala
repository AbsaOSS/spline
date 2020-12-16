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

package za.co.absa.spline.producer.modelmapper.v1.spark

import za.co.absa.spline.producer.model.v1_1
import za.co.absa.spline.producer.modelmapper.v1.{AttributeConverter, AttributeDependencyResolver, ExpressionConverter, FieldNamesV1, OperationOutputConverter, TypesV1}
import za.co.absa.spline.producer.{model => v1}

class SparkSplineOperationOutputConverter(
  attributeConverter: AttributeConverter,
  attributeDefs: Seq[TypesV1.AttrDef],
  operationOutputById: Map[Int, Seq[v1_1.Attribute.Id]],
  maybeAttrDepResolver: Option[AttributeDependencyResolver]
) extends OperationOutputConverter {

  private val attrDefsById: Map[TypesV1.AttrId, TypesV1.AttrDef] =
    attributeDefs
      .groupBy(_ (FieldNamesV1.AttributeDef.Id).toString)
      .mapValues(_.head)

  override def convert(op1: v1.OperationLike): Option[TypesV1.Schema] =
    for (schema <- op1.schema)
      yield {
        val inputAttrIds: Seq[TypesV1.AttrId] = op1.childIds.flatMap(operationOutputById)
        val outputAttrIds = schema.asInstanceOf[Seq[TypesV1.AttrId]]
        val createdAttrIds = outputAttrIds.filterNot(inputAttrIds.toSet)
        val attrDependenciesById = maybeAttrDepResolver
          .map(_.resolve(op1, inputAttrIds, outputAttrIds))
          .getOrElse(Map.empty)

        // todo: remove side effect
        createdAttrIds.foreach(attrId =>
          convertAttribute(attrId, attrDependenciesById(attrId).toSeq)
        )

        outputAttrIds
      }

  private def convertAttribute(attrId: TypesV1.AttrId, dependencies: Seq[TypesV1.AttrId]) = {
    val attrDefWithDependencies = attrDefsById(attrId) + (FieldNamesV1.AttributeDef.Dependencies -> dependencies)
    attributeConverter.convert(attrDefWithDependencies).id
  }
}
