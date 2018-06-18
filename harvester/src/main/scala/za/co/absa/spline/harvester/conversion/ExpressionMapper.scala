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

package za.co.absa.spline.harvester.conversion

import org.apache.spark.sql.catalyst.expressions
import za.co.absa.spline.model._

import scala.language.implicitConversions

/**
  * The trait represents a mapper translating Spark expressions to expressions specified by Spline library.
  */
trait ExpressionMapper extends DataTypeMapper {

  val attributeFactory : AttributeFactory

  /**
    * The method translates a Spark expression to an expression specified by Spline library.
    *
    * @param sparkExpr An input Spark expression
    * @return A Spline expression
    */
  implicit def fromSparkExpression(sparkExpr: org.apache.spark.sql.catalyst.expressions.Expression): expr.Expression = sparkExpr match {
    case a: expressions.Alias => expr.Alias(a.name, a.simpleString, fromSparkDataType(a.dataType, a.nullable), a.children map fromSparkExpression)
    case a: expressions.AttributeReference => expr.AttributeReference(attributeFactory.getOrCreate(a.exprId.id, a.name, a.dataType, a.nullable), a.name, fromSparkDataType(a.dataType, a.nullable))
    case bo: expressions.BinaryOperator => expr.Binary(bo.nodeName, bo.symbol, bo.simpleString, fromSparkDataType(bo.dataType, bo.nullable), bo.children map fromSparkExpression)
    case u: expressions.ScalaUDF => expr.UserDefinedFunction(u.udfName getOrElse u.function.getClass.getName, u.simpleString, fromSparkDataType(u.dataType, u.nullable), u.children map fromSparkExpression)
    case x => expr.Generic(x.nodeName, x.simpleString, fromSparkDataType(x.dataType, x.nullable), x.children map fromSparkExpression)
  }
}
