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

package za.co.absa.spline.persistence.atlas.conversion

import java.util.UUID

import org.apache.atlas.typesystem.persistence.Id
import za.co.absa.spline.model._
import za.co.absa.spline.persistence.atlas.model._

/**
  * The object is responsible for conversion of [[za.co.absa.spline.model.expr.Expression Spline expressions]] to [[za.co.absa.spline.persistence.atlas.model.Expression Atlas expressions]].
  */
object ExpressionConverter {

  /**
    * The method converts [[za.co.absa.spline.model.expr.Expression Spline expressions]] to [[za.co.absa.spline.persistence.atlas.model.Expression Atlas expressions]].
    *
    * @param qualifiedNamePrefix A prefix helping to ensure uniqueness of qualified names of created expressions
    * @param expression          An input Spline expression
    * @param attributeIdMap A map of Spline attribute ids to Atlas ids
    * @return An Atlas expression
    */
  def convert(qualifiedNamePrefix: String, expression: expr.Expression, attributeIdMap: Map[UUID, Id]): Expression = {
    val qualifiedName = qualifiedNamePrefix + "@" + expression.text
    val children = expression.children.zipWithIndex.map(i => convert(qualifiedName + "@" + i._2, i._1, attributeIdMap))
    val mainProperties = ExpressionCommonProperties(
      qualifiedName,
      expression.text,
      expression.exprType,
      DataTypeConverter.convert(expression.dataType, qualifiedName),
      children
    )

    expression match {
      case expr.Binary(_, symbol, _, _, _) => new BinaryExpression(mainProperties, symbol)
      case expr.AttributeReference(attributeId, attributeName, _, _) => new AttributeReferenceExpression(mainProperties, attributeId, attributeName, attributeIdMap(attributeId))
      case expr.UserDefinedFunction(name, _, _, _) => new UserDefinedFunctionExpression(mainProperties, name)
      case _ => new Expression(mainProperties)
    }
  }
}
