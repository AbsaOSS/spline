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

import za.co.absa.spline.producer.model.v1_1.{AttrOrExprRef, ExpressionLike, FunctionalExpression, Literal}
import za.co.absa.spline.producer.modelmapper.v1.TypesV1.ExprDef
import za.co.absa.spline.producer.modelmapper.v1.{ExpressionConverter, FieldNamesV1, TypesV1}

import java.util.UUID

class SparkSplineExpressionConverter(
  attrRefConverter: AttributeRefConverter
) extends ExpressionConverter {

  import za.co.absa.commons.lang.OptionImplicits._

  override def isExpression(obj: Any): Boolean = PartialFunction.cond(obj) {
    case exprDef: TypesV1.ExprDef
      if exprDef.contains(FieldNamesV1.ExpressionDef.TypeHint) =>
      val typeHint = exprDef(FieldNamesV1.ExpressionDef.TypeHint).toString
      typeHint.startsWith("expr.") && typeHint != "expr.AttrRef"
  }

  override def convert(exprDef: TypesV1.ExprDef): ExpressionLike = {
    exprDef(FieldNamesV1.ExpressionDef.TypeHint) match {
      case "expr.Literal" => toLiteral(exprDef)
      case "expr.Alias" => toFunctionalExpression(exprDef, _ => "alias", _.find({ case (k, _) => k == FieldNamesV1.ExpressionDef.Alias }))
      case "expr.Binary" => toFunctionalExpression(exprDef, _ (FieldNamesV1.ExpressionDef.Symbol))
      case "expr.UDF" => toFunctionalExpression(exprDef, _ (FieldNamesV1.ExpressionDef.Name))
      case "expr.Generic" | "expr.GenericLeaf" | "expr.UntypedExpression" =>
        toFunctionalExpression(
          exprDef,
          _ (FieldNamesV1.ExpressionDef.Name),
          _ (FieldNamesV1.ExpressionDef.Params),
          _.find({ case (k, _) => k == FieldNamesV1.ExpressionDef.ExprType }).toMap
        )
    }
  }

  private def toLiteral(exprDef: TypesV1.ExprDef) = Literal(
    id = newId,
    dataType = exprDef.get(FieldNamesV1.ExpressionDef.DataTypeId).map(_.toString),
    value = exprDef.get(FieldNamesV1.ExpressionDef.Value),
    extra = Map.empty
  )

  private def toFunctionalExpression(
    exprDef: TypesV1.ExprDef,
    getName: TypesV1.ExprDef => Any,
    getParams: TypesV1.ExprDef => Any = _ => Map.empty,
    getExtras: TypesV1.ExprDef => Any = _ => Map.empty
  ): FunctionalExpression = {

    val children = exprDef
      .get(FieldNamesV1.ExpressionDef.Children)
      .orElse(exprDef.get(FieldNamesV1.ExpressionDef.Child).toList.asOption)
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
      dataType = exprDef.get(FieldNamesV1.ExpressionDef.DataTypeId).map(_.toString),
      name = getName(exprDef).toString,
      childIds = childRefs,
      params = getParams(exprDef).asInstanceOf[TypesV1.Params],
      extra = getExtras(exprDef).asInstanceOf[TypesV1.Extras]
    )
  }

  private def newId: String = UUID.randomUUID.toString
}
