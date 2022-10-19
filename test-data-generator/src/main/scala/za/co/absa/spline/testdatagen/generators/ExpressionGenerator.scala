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

package za.co.absa.spline.testdatagen.generators

import java.util.UUID

import za.co.absa.spline.producer.model.v1_2.{AttrOrExprRef, Attribute, FunctionalExpression, Literal}

object ExpressionGenerator {

  //1 func expire with 1 lit per attribute
  def generateExpressionAndLiteralForAttribute(attribute: Attribute): (FunctionalExpression, Literal) = {
    val literal = genLiteral()

    val literalChildRef = AttrOrExprRef(None, Some(literal.id))
    val attributeChildRef = AttrOrExprRef(Some(attribute.id), None)

    val expression = FunctionalExpression(UUID.randomUUID().toString, name = s"dummy_funcexpr", childRefs = Seq(literalChildRef, attributeChildRef))
    (expression, literal)
  }

  private def genLiteral(): Literal = {
    val id = UUID.randomUUID().toString
    Literal(id, value = s"val_$id")
  }

}
