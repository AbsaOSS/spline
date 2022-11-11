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

import za.co.absa.spline.producer.model.v1_2.{AttrOrExprRef, ExpressionLike, FunctionalExpression, Literal}
import za.co.absa.spline.producer.modelmapper.v1_0.TypesV10.ExprDef
import za.co.absa.spline.producer.modelmapper.v1_0.{ExpressionConverter, FieldNamesV10, TypesV10}

import java.util.UUID

class SparkSplineExpressionConverter(
  attrRefConverter: AttributeRefConverter
) extends ExpressionConverter {

  import za.co.absa.commons.lang.extensions.TraversableExtension._

  override def isExpression(obj: Any): Boolean = PartialFunction.cond(obj) {
    case exprDef: TypesV10.ExprDef@unchecked => exprDef
      .get(FieldNamesV10.ExpressionDef.TypeHint)
      .map(_.toString)
      .exists(typeHint => typeHint.startsWith("expr.") && typeHint != "expr.AttrRef")
  }

  override def convert(exprDef: TypesV10.ExprDef): ExpressionLike = {
    exprDef(FieldNamesV10.ExpressionDef.TypeHint) match {
      case "expr.Literal" => toLiteral(exprDef)
      case "expr.Alias" => toFunctionalExpression(exprDef, "alias")
      case "expr.Binary" => toFunctionalExpression(exprDef, exprDef(FieldNamesV10.ExpressionDef.Symbol))
      case "expr.UDF" => toFunctionalExpression(exprDef, exprDef(FieldNamesV10.ExpressionDef.Name))
      case "expr.Generic"
           | "expr.GenericLeaf"
           | "expr.UntypedExpression" =>
        toFunctionalExpression(exprDef, exprDef(FieldNamesV10.ExpressionDef.Name))
    }
  }

  private def toLiteral(exprDef: TypesV10.ExprDef) = Literal(
    id = newId,
    dataType = exprDef.get(FieldNamesV10.ExpressionDef.DataTypeId).map(_.toString),
    value = exprDef.get(FieldNamesV10.ExpressionDef.Value).orNull,
    extra = exprDef.filterKeys(FieldNamesV10.ExpressionDef.TypeHint.==)
      ++ exprDef.get(FieldNamesV10.ExpressionDef.ExprType).map("simpleClassName" -> _)
  )

  private def toFunctionalExpression(exprDef: TypesV10.ExprDef, name: Any): FunctionalExpression = {
    val children = exprDef
      .get(FieldNamesV10.ExpressionDef.Children)
      .orElse(exprDef.get(FieldNamesV10.ExpressionDef.Child).toList.asOption)
      .getOrElse(Nil)
      .asInstanceOf[Seq[ExprDef]]

    val childRefs = children.map {
      exprDef =>
        if (attrRefConverter.isAttrRef(exprDef))
          attrRefConverter.convert(exprDef)
        else
          AttrOrExprRef.exprRef(this.convert(exprDef).id)
    }

    FunctionalExpression(
      id = newId,
      dataType = exprDef.get(FieldNamesV10.ExpressionDef.DataTypeId).map(_.toString),
      name = name.toString,
      childRefs = childRefs,

      params = Map.empty
        ++ exprDef.getOrElse(FieldNamesV10.ExpressionDef.Params, Map.empty).asInstanceOf[ExpressionLike.Params]
        ++ exprDef.get(FieldNamesV10.ExpressionDef.Alias).map("name" -> _),

      extra = exprDef.filterKeys(Set(
        FieldNamesV10.ExpressionDef.TypeHint,
        FieldNamesV10.ExpressionDef.Symbol,
      )) ++ exprDef.get(FieldNamesV10.ExpressionDef.ExprType).map("simpleClassName" -> _)
    )
  }

  private def newId: String = UUID.randomUUID.toString
}
