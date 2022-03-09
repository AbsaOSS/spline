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

import za.co.absa.spline.producer.model.v1_2.OperationLike.Schema
import za.co.absa.spline.producer.model.v1_2._
import za.co.absa.spline.testdatagen.generators.Graph

class Chain(readCount: Int, dataOpCount: Int, attCount: Int)
  extends Graph(readCount, dataOpCount, attCount) {

  override def generateDataOperationsAndExpressions(opCount: Int, reads: Seq[(ReadOperation, Seq[Attribute])]):
  Seq[(DataOperation, Seq[(Attribute, FunctionalExpression, Literal)])] = {

    val (read: ReadOperation, readAttr: Seq[Attribute]) = reads.head

    val initialAttExpLit: Seq[(Attribute, FunctionalExpression, Literal)] = generateAttributesFromNewExpressions(readAttr)
    val initialDataOp: DataOperation = generateDataOperation(Seq(read.id), initialAttExpLit.map(_._1.id))
    (1 until opCount.toInt).scanLeft((initialDataOp, initialAttExpLit)) {
      case ((prevDataOp: DataOperation, prevAttrs: Seq[(Attribute, FunctionalExpression, Literal)]), _) => {
        val attExpLit = generateAttributesFromNewExpressions(prevAttrs.map(_._1))
        val generatedOperation = generateDataOperation(Seq(prevDataOp.id), attExpLit.map(_._1.id))
        (generatedOperation, attExpLit)
      }
    }
  }

  override def getWriteLinkedOperation(dataOperations: Seq[DataOperation]): (Seq[String], Schema) = {
    (Seq(dataOperations.last.id), dataOperations.last.output.getOrElse(Seq.empty))
  }

}
