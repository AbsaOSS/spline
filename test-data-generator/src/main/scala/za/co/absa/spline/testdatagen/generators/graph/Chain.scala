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

package za.co.absa.spline.testdatagen.generators.graph

import za.co.absa.spline.producer.model.v1_2._
import za.co.absa.spline.testdatagen.generators.{AttributesGenerator, ExpressionGenerator, Graph}

class Chain(readCount: Int, dataOpCount: Int, attCount: Int)
  extends Graph(readCount, dataOpCount, attCount) {

  override def generateDataOperationsAndExpressions(opCount: Int,
                                                    reads: Map[ReadOperation, Seq[Attribute]]):
  Map[DataOperation, Seq[(Attribute, FunctionalExpression, Literal)]] = {

    val (read, readAttr) = reads.head

    val initialDataOp = generateDataOperation(Seq(read.id), readAttr)

    val initial = generateAttributesFromNewExpressions(readAttr)

    val tuples = (1 until opCount.toInt).scanLeft((initialDataOp, initial)) { case (
      (prevDataOp: DataOperation, prevAttrs: Seq[(Attribute, FunctionalExpression, Literal)]), _) => {
      val expressionsAndLiterals = prevAttrs.map(ael => {
        ExpressionGenerator.generateExpressionAndLiteralForAttribute(ael._1)
      })

      val attExpLit: Seq[(Attribute, FunctionalExpression, Literal)] = expressionsAndLiterals.map {
        case (exp, lit) => {
          val generatedAttribute = AttributesGenerator.generateAttributeFromExprParent(Some(exp.id))
          (generatedAttribute, exp, lit)
        }
      }
      val generatedOperation = generateDataOperation(Seq(prevDataOp.id), attExpLit.map(_._1))
      (generatedOperation, attExpLit)
    }
    }
    tuples.toMap
  }

  override def getWriteLinkedOperations(dataOperations: Seq[DataOperation]): Seq[String] = {
    Seq(dataOperations.last.id)
  }
}
