/*
 * Copyright 2019 ABSA Group Limited
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

package za.co.absa.spline.harvester.converter

import org.apache.commons.lang3.StringUtils.substringAfter
import org.apache.spark.sql.catalyst.expressions
import org.apache.spark.sql.catalyst.expressions.{Expression => SparkExpression}
import za.co.absa.spline.common.OptionImplicits._
import za.co.absa.spline.common.ReflectionUtils
import za.co.absa.spline.common.transformations.AbstractConverter
import za.co.absa.spline.model.expr

class ExpressionConverter(
  dataConverter: DataConverter,
  dataTypeConverter: DataTypeConverter,
  attributeConverter: AttributeConverter)
  extends AbstractConverter {

  import ExpressionConverter._

  override type From = SparkExpression
  override type To = expr.Expression

  override def convert(sparkExpr: SparkExpression): expr.Expression = sparkExpr match {

    case a: expressions.Alias =>
      expr.Alias(a.name, convert(a.child))

    case a: expressions.AttributeReference =>
      expr.AttrRef(attributeConverter.convert(a).id)

    case lit: expressions.Literal =>
      expr.Literal(dataConverter.convert((lit.value, lit.dataType)), getDataType(lit).id)

    case bo: expressions.BinaryOperator =>
      expr.Binary(
        bo.symbol,
        getDataType(bo).id,
        bo.children map convert)

    case u: expressions.ScalaUDF =>
      expr.UDF(
        u.udfName getOrElse u.function.getClass.getName,
        getDataType(u).id,
        u.children map convert)

    case e: expressions.LeafExpression =>
      expr.GenericLeaf(
        e.prettyName,
        getDataType(e).id,
        getExpressionSimpleClassName(e),
        getExpressionExtraParameters(e))

    case e: expressions.Expression =>
      expr.Generic(
        e.prettyName,
        getDataType(e).id,
        e.children map convert,
        getExpressionSimpleClassName(e),
        getExpressionExtraParameters(e))
  }

  private def getDataType(expr: SparkExpression) = dataTypeConverter.convert(expr.dataType, expr.nullable)
}

object ExpressionConverter {
  private val basicProperties = Set("children", "dataType", "nullable")

  private def getExpressionSimpleClassName(expr: SparkExpression) = {
    val fullName = expr.getClass.getName
    val simpleName = substringAfter(fullName, "org.apache.spark.sql.catalyst.expressions.")
    if (simpleName.nonEmpty) simpleName else fullName
  }

  private def getExpressionExtraParameters(e: SparkExpression): Option[Map[String, Any]] = {
    val isChildExpression: Any => Boolean = {
      val children = e.children.toSet
      PartialFunction.cond(_) {
        case ei: SparkExpression if children(ei) => true
      }
    }

    val renderedParams =
      for {
        (p, v) <- ReflectionUtils.extractProductElementsWithNames(e)
        if !basicProperties(p)
        if !isChildExpression(v)
        w <- ValueDecomposer.decompose(v, Unit)
      } yield p -> w

    renderedParams.asOption
  }
}

