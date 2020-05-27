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

import java.util.UUID

import za.co.absa.spline.producer.model.v1_1.{Attribute, ExpressionLike, FunctionalExpression, Literal}
import za.co.absa.spline.producer.modelmapper.v1.spark.SparkSplineExpressionConverter.{ExprDef, Extras, Params}
import za.co.absa.spline.producer.modelmapper.v1.{ExpressionConverter, FieldNamesV1}

object SparkSplineExpressionConverter {
  type ExprDef = Map[String, Any]
  type Params = Map[String, Any]
  type Extras = Map[String, Any]
}

class SparkSplineExpressionConverter extends ExpressionConverter {

  import za.co.absa.commons.lang.OptionImplicits._

  override def isExpression(obj: Any): Boolean = PartialFunction.cond(obj) {
    case exprDef: ExprDef
      if exprDef.contains(FieldNamesV1.ExpressionDef.TypeHint) =>
      exprDef(FieldNamesV1.ExpressionDef.TypeHint).toString.startsWith("expr.")
  }

  override def convert(exprDef: ExprDef): ExpressionLike = {
    exprDef
      .get(FieldNamesV1.ExpressionDef.TypeHint)
      .map({
        case "expr.Literal" => toLiteral(exprDef)
        case "expr.AttrRef" => toAttributeReference(exprDef)
        case "expr.Alias" => toFunctionalExpression(exprDef, _ => "alias", _.find({ case (k, _) => k == FieldNamesV1.ExpressionDef.Alias }))
        case "expr.Binary" => toFunctionalExpression(exprDef, _ (FieldNamesV1.ExpressionDef.Symbol))
        case "expr.UDF" => toFunctionalExpression(exprDef, _ (FieldNamesV1.ExpressionDef.Name))
        case "expr.Generic" | "expr.GenericLeaf" | "expr.UntypedExpression" => toFunctionalExpression(
          exprDef,
          _ (FieldNamesV1.ExpressionDef.Name),
          _ (FieldNamesV1.ExpressionDef.Params),
          _.find({ case (k, _) => k == FieldNamesV1.ExpressionDef.ExprType }).toMap
        )
      })
      .getOrElse(toAttribute(exprDef))
  }

  private def toAttributeReference(refDef: ExprDef): Attribute = Attribute(
    id = refDef(FieldNamesV1.ExpressionDef.RefId).toString,
    name = "",
    childIds = Nil,
    dataType = None,
    extra = Map.empty
  )

  private def toAttribute(attrDef: ExprDef): Attribute = {
    val childIds = attrDef.get(FieldNamesV1.AttributeDef.Dependencies).map(_.asInstanceOf[Seq[Attribute.Id]]).getOrElse(Nil)
    val attrId = attrDef(FieldNamesV1.AttributeDef.Id).toString
    val attrName = attrDef(FieldNamesV1.AttributeDef.Name).toString
    val maybeDataType = attrDef.get(FieldNamesV1.AttributeDef.DataTypeId)
    Attribute(
      id = attrId,
      name = attrName,
      childIds = childIds,
      dataType = maybeDataType,
      extra = Map.empty
    )
  }

  private def toLiteral(exprDef: ExprDef) = Literal(
    id = newId,
    dataType = exprDef.get(FieldNamesV1.ExpressionDef.DataTypeId).map(_.toString),
    value = exprDef.get(FieldNamesV1.ExpressionDef.Value),
    extra = Map.empty
  )

  private def toFunctionalExpression(
    exprDef: ExprDef,
    getName: ExprDef => Any,
    getParams: ExprDef => Any = _ => Map.empty,
    getExtras: ExprDef => Any = _ => Map.empty
  ): FunctionalExpression = {

    val childIds = exprDef
      .get(FieldNamesV1.ExpressionDef.Children)
      .orElse(exprDef.get(FieldNamesV1.ExpressionDef.Child).toList.asOption)
      .getOrElse(Nil)
      .asInstanceOf[Seq[ExprDef]]
      .map(this.convert(_).id)

    FunctionalExpression(
      id = newId,
      dataType = exprDef.get(FieldNamesV1.ExpressionDef.DataTypeId).map(_.toString),
      name = getName(exprDef).toString,
      childIds = childIds,
      params = getParams(exprDef).asInstanceOf[Params],
      extra = getExtras(exprDef).asInstanceOf[Extras]
    )
  }

  private def newId: String = UUID.randomUUID.toString
}
