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
import za.co.absa.spline.testdatagen.generators.AttributesGenerator.generateSchema
import za.co.absa.spline.testdatagen.generators.Graph

class Triangle(readCount: Int, dataOpCount: Int, attCount: Int)
  extends Graph(readCount, dataOpCount, attCount) {

  override def generateReads(numbSources: Int): Map[ReadOperation, Seq[Attribute]] = {
    (1 to numbSources).map(id => {
      val sources = Seq(s"file://splinegen/read_${id}.csv")
      val attributes = generateSchema(attCount)
      val readOp = ReadOperation(
        inputSources = sources,
        id = id.toString,
        name = Some(s"generated read $id"),
        output = Some(attributes.map(_.id)),
        params = Map.empty,
        extra = Map.empty
      )
      (readOp, attributes)
    }).toMap
  }

  override def generateDataOperationsAndExpressions(opCount: Int, reads: Map[ReadOperation, Seq[Attribute]]):
  Map[DataOperation, Seq[(Attribute, FunctionalExpression, Literal)]] = {
    val mapping = reads
      .toSeq
      .take(opCount)
      .padTo(opCount, reads.head)
      .map{ case (readOp: ReadOperation, schema: Seq[Attribute]) => {
        val attExpLit: Seq[(Attribute, FunctionalExpression, Literal)] = generateAttributesFromNewExpressions(schema)
        val dataOperation = generateDataOperation(Seq(readOp.id), attExpLit.map(_._1.id))
        (dataOperation, attExpLit)
      }}


    if (readCount > opCount) {
      val lastReadMappings: Seq[(ReadOperation, Seq[Attribute])] = reads.toSeq.takeRight(reads.size - opCount)
      val (lastDataOp, prevLastAttExpLit) = mapping.last

      val (lastReads: Seq[ReadOperation], lastReadAttrs: Seq[Seq[Attribute]]) = lastReadMappings.unzip

      val newLastDataOp = lastDataOp.copy(childIds = lastDataOp.childIds ++ lastReads.map(_.id))

      val lastReadAttExpLits: Seq[Seq[(Attribute, FunctionalExpression, Literal)]] = lastReadAttrs
        .map(generateAttributesFromNewExpressions)
      val newLastAttExpLit = prevLastAttExpLit ++ lastReadAttExpLits.flatten

      (mapping.init :+ (newLastDataOp, newLastAttExpLit)).toMap
    } else {
      mapping.toMap
    }

  }

  override def getWriteLinkedOperation(dataOperations: Seq[DataOperation]): (Seq[String], Schema) = {
    (dataOperations.map(_.id), dataOperations.flatMap(_.output).flatten)
  }
}
