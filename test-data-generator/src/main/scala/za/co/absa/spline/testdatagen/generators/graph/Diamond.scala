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
import za.co.absa.spline.testdatagen.generators.Graph

class Diamond(readCount: Int, dataOpCount: Int, attCount: Int)
  extends Graph(readCount, dataOpCount, attCount) {

  override def generateDataOperationsAndExpressions(opCount: Int,
                                                    reads: Map[ReadOperation, Seq[Attribute]]): Map[DataOperation, Seq[(Attribute, FunctionalExpression, Literal)]] = {
    val (read: ReadOperation, readAttr: Seq[Attribute]) = reads.head

    val dataOperationsTuples = (1 to opCount).map(_ => {
      val attExpLit = generateAttributesFromNewExpressions(readAttr)

      val dataOperation = generateDataOperation(Seq(read.id), attExpLit.map(_._1))
      (dataOperation, attExpLit)
    })
    dataOperationsTuples.toMap
  }

  override def getWriteLinkedOperations(dataOperations: Seq[DataOperation]): Seq[String] = {
    dataOperations.map(_.id)
  }
}
