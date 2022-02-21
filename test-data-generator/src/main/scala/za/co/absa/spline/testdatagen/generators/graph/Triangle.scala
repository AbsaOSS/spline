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

import za.co.absa.spline.producer.model.v1_2.{DataOperation, ReadOperation}
import za.co.absa.spline.testdatagen.generators.AttributesGenerator.generateSchema
import za.co.absa.spline.testdatagen.generators.Graph

class Triangle(reads: Int, dataOps: Int, attributes: Int, expressions: Int)
  extends Graph(reads, dataOps, attributes, expressions) {
  override def generateReads(numbSources: Int): Seq[ReadOperation] = {
    (1 to numbSources).map(id => {
      val sources = Seq(s"file://splinegen/read_${id}.csv")
      ReadOperation(
        inputSources = sources,
        id = id.toString,
        name = Some(s"generated read $id"),
        output = Some(generateSchema(attributes).map(_.id)),
        params = Map.empty,
        extra = Map.empty
      )
    })
  }

  override def generateDataOperations(opCount: Int, childIds: Seq[String]): Seq[DataOperation] = {
    childIds
      .take(opCount)
      .padTo(opCount, childIds.head)
      .map(childId => generateDataOperation(Seq(childId)))
  }

  override def getWriteLinkedOperations(dataOperations: Seq[DataOperation]): Seq[String] = {
    dataOperations.map(_.id)
  }
}
