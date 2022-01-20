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

package za.co.absa.spline.producer.modelmapper.v1_0.spark

import za.co.absa.spline.producer.model.v1_2
import za.co.absa.spline.producer.modelmapper.v1_0._
import za.co.absa.spline.producer.{model => v1}

class SparkSplineOperationOutputConverter(
  attributeConverter: AttributeConverter,
  attributeDefs: Seq[TypesV10.AttrDef],
  operationOutputById: Int => v1_2.OperationLike.Schema,
  maybeAttrDepResolver: Option[AttributeDependencyResolver]
) extends OperationOutputConverter {

  private val attrDefsById: Map[TypesV10.AttrId, TypesV10.AttrDef] =
    attributeDefs
      .groupBy(_ (FieldNamesV10.AttributeDef.Id).toString)
      .mapValues(_.head)
      .view.force // see: https://github.com/scala/bug/issues/4776

  override def convert(op1: v1.OperationLike): Option[v1_2.OperationLike.Schema] =
    for (schema <- op1.schema)
      yield {
        val inputAttrIds: Seq[TypesV10.AttrId] = op1.childIds.flatMap(operationOutputById)
        val outputAttrIds = schema.asInstanceOf[Seq[TypesV10.AttrId]]

        val attrDependenciesById = maybeAttrDepResolver
          .map(_.resolve(op1, inputAttrIds, outputAttrIds))
          .getOrElse(Map.empty)
          .withDefaultValue(Nil)

        outputAttrIds.map(attrId =>
          convertAttribute(attrId, attrDependenciesById(attrId).toSeq))
      }

  private def convertAttribute(attrId: TypesV10.AttrId, dependencies: Seq[TypesV10.AttrId]) = {
    val attrDefWithDependencies = attrDefsById(attrId) + (FieldNamesV10.AttributeDef.Dependencies -> dependencies)
    attributeConverter.convert(attrDefWithDependencies).id
  }
}
