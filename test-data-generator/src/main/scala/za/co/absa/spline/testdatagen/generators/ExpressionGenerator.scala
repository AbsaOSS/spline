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

import za.co.absa.spline.producer.model.v1_2.{AttrOrExprRef, Expressions, FunctionalExpression, Literal}

object ExpressionGenerator {

  def generateExpressions(literalsNr: Int): Expressions = {
    val literals = genLiterals(literalsNr)
    val expressions = genFunctionalExpressions(literals)
    Expressions(expressions, literals)
  }

  private def genFunctionalExpressions(literals: Seq[Literal]): Seq[FunctionalExpression] = {
    val zeroFEx = FunctionalExpression(UUID.randomUUID().toString, childRefs = Seq(), name = "init")
    val functionalExpressions: Seq[FunctionalExpression] = literals.scanLeft(zeroFEx)(
      (prevFuncEx: FunctionalExpression, lit: Literal) => {
        val childref1 = AttrOrExprRef(Some(lit.id), None)
        val childref2 = AttrOrExprRef(None, Some(prevFuncEx.id))
        FunctionalExpression(UUID.randomUUID().toString, name = s"dummy_funcexpr_", childRefs = Seq(childref1, childref2))
      })

    functionalExpressions
  }

  private def genLiterals(numLiterals: Int): Seq[Literal] = {
    1 to numLiterals map (id => {
      Literal(UUID.randomUUID().toString, value = s"val_${id}")
    })
  }

}
