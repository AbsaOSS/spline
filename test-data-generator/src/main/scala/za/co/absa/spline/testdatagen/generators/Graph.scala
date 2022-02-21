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

import za.co.absa.spline.common.SplineBuildInfo
import za.co.absa.spline.producer.model.v1_2.{DataOperation, ExecutionPlan, NameAndVersion, Operations, ReadOperation, WriteOperation}
import za.co.absa.spline.testdatagen.Config
import za.co.absa.spline.testdatagen.GraphType.{DiamondType, TriangleType}
import za.co.absa.spline.testdatagen.generators.AttributesGenerator.generateSchema
import za.co.absa.spline.testdatagen.generators.ExpressionGenerator.generateExpressions
import za.co.absa.spline.testdatagen.generators.graph.{Chain, Diamond, Triangle}

abstract class Graph(reads: Int, operations: Int, attributes: Int, expressions: Int) {
  def generate(): ExecutionPlan = {
    val planId = UUID.randomUUID()
    ExecutionPlan(
      id = planId,
      name = Some(s"generated plan $planId"),
      operations = generateOperations(operations, reads),
      attributes = generateSchema(attributes),
      expressions = Some(generateExpressions(expressions)),
      systemInfo = NameAndVersion("spline-data-gen", SplineBuildInfo.Version),
      agentInfo = None,
      extraInfo = Map("graph-type"-> this.getClass.getSimpleName)
    )
  }

  def generateReads(numbSources: Int): Seq[ReadOperation] = {
    val id = UUID.randomUUID().toString
    val sources = (1 to numbSources).map(count => s"file://splinegen/read_${id}_$count.csv")
    Seq(ReadOperation(
      inputSources = sources,
      id = id,
      name = Some(s"generated read $id"),
      output = Some(generateSchema(attributes).map(_.id)),
      params = Map.empty,
      extra = Map.empty
    ))
  }

  def getWriteLinkedOperations(dataOperations: Seq[DataOperation]): Seq[String]

  def generateOperations(dataOpCount: Int, readOpCount: Int): Operations = {
    val reads: Seq[ReadOperation] = generateReads(readOpCount)

    val dataOperations = generateDataOperations(dataOpCount, reads.map(_.id))

    val linkedOperations = getWriteLinkedOperations(dataOperations)

    Operations(
      write = generateWrite(linkedOperations),
      reads = reads,
      other = dataOperations
    )
  }

  def generateDataOperations(opCount: Int, childIds: Seq[String]): Seq[DataOperation]

  protected def generateDataOperation(childIds: Seq[String]): DataOperation = {
    val id = UUID.randomUUID().toString
    DataOperation(
      id = id,
      name = Some(s"generated data operation $id"),
      childIds = childIds,
      output = Some(generateSchema(1).map(_.id)),
      params = Map.empty,
      extra = Map.empty
    )
  }

  private def generateWrite(childIds: Seq[String]): WriteOperation = {
    WriteOperation(
      outputSource = "file://splinegen/write.csv",
      append = false,
      id = UUID.randomUUID().toString,
      name = Some("generatedWrite"),
      childIds = childIds,
      params = Map.empty,
      extra = Map.empty
    )
  }
}

object Graph {
  def apply(config: Config): Graph = {
    if (!config.isExpanded) {
      throw new Exception("Invalid config")
    }
    config.graphType match {
      case DiamondType => new Diamond(config.reads.valueOf(), config.operations.valueOf(),
        config.expressions.valueOf(), config.attributes.valueOf())
      case TriangleType => new Triangle(config.reads.valueOf(), config.operations.valueOf(),
        config.expressions.valueOf(), config.attributes.valueOf())
      case _ => new Chain(config.reads.valueOf(), config.operations.valueOf(),
        config.expressions.valueOf(), config.attributes.valueOf())
    }
  }
}
