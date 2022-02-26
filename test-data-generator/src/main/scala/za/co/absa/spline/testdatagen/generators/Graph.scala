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
import za.co.absa.spline.producer.model.v1_2._
import za.co.absa.spline.testdatagen.ExpandedConfig
import za.co.absa.spline.testdatagen.GraphType.{DiamondType, TriangleType}
import za.co.absa.spline.testdatagen.generators.AttributesGenerator.generateSchema
import za.co.absa.spline.testdatagen.generators.graph.{Chain, Diamond, Triangle}

abstract class Graph(readCount: Int, opCount: Int, attCount: Int) {
  def generate(): ExecutionPlan = {
    val planId = UUID.randomUUID()
    val (operations: Operations, allAttributes: Seq[Attribute], expressions: Expressions) = generateOperations(opCount, readCount)

    ExecutionPlan(
      id = planId,
      name = Some(s"generated plan $planId"),
      operations = operations,
      attributes = allAttributes,
      expressions = Some(expressions),
      systemInfo = NameAndVersion("spline-data-gen", SplineBuildInfo.Version),
      agentInfo = None,
      extraInfo = Map("graph-type"-> this.getClass.getSimpleName)
    )
  }

  def generateReads(numbSources: Int): Map[ReadOperation, Seq[Attribute]] = {
    val id = UUID.randomUUID().toString
    val sources = (1 to numbSources).map(count => s"file://splinegen/read_${id}_$count.csv")

    val schema = generateSchema(attCount)
    val read = ReadOperation(
      inputSources = sources,
      id = id,
      name = Some(s"generated read $id"),
      output = Some(schema.map(_.id)),
      params = Map.empty,
      extra = Map.empty
    )
    Map(read -> schema)
  }

  def getWriteLinkedOperations(dataOperations: Seq[DataOperation]): Seq[String]

  def generateOperations(dataOpCount: Int, readOpCount: Int): (Operations, Seq[Attribute], Expressions) = {
    val readsMap: Map[ReadOperation, Seq[Attribute]] = generateReads(readOpCount)

    val dataOpsMap: Map[DataOperation, Seq[(Attribute, FunctionalExpression, Literal)]] = generateDataOperationsAndExpressions(dataOpCount, readsMap)

    val linkedOperations = getWriteLinkedOperations(dataOpsMap.keys.toSeq)

    val operations = Operations(
      write = generateWrite(linkedOperations),
      reads = readsMap.keys.toSeq,
      other = dataOpsMap.keys.toSeq
    )

    val dataOpAttributes: Iterable[Attribute] = dataOpsMap.values.flatMap(_.map(_._1))
    val readAttributes: Iterable[Attribute] = readsMap.values.flatten
    val allAttributesSet = (readAttributes ++ dataOpAttributes).toSet

    val functionalExpressions = dataOpsMap.values.flatMap(_.map(_._2)).toSeq
    val literals = dataOpsMap.values.flatMap(_.map(_._3)).toSeq

    val allExpressions = Expressions(functionalExpressions, literals)

    (operations, allAttributesSet.toSeq, allExpressions)
  }

  def generateDataOperationsAndExpressions(opCount: Int, reads: Map[ReadOperation, Seq[Attribute]]):
  Map[DataOperation, Seq[(Attribute, FunctionalExpression, Literal)]]

  def generateAttributesFromNewExpressions(parentAttrs: Seq[Attribute]): Seq[(Attribute, FunctionalExpression, Literal)] = {
    val exprWithLiterals = parentAttrs.map(ExpressionGenerator.generateExpressionAndLiteralForAttribute)

    val attrExpLit = exprWithLiterals.map { case (fexp, lit) => {
      val attribute = AttributesGenerator.generateAttributeFromExpressionParent(Some(fexp.id))
      (attribute, fexp, lit)
    }}
    attrExpLit
  }

  protected def generateDataOperation(childIds: Seq[String], schema: Seq[Attribute]): DataOperation = {
    val id = UUID.randomUUID().toString
    DataOperation(
      id = id,
      name = Some(s"generated data operation $id"),
      childIds = childIds,
      output = Some(schema.map(_.id)),
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
  def apply(config: ExpandedConfig): Graph = {
    config.graphType match {
      case DiamondType => new Diamond(config.reads, config.operations, config.attributes)
      case TriangleType => new Triangle(config.reads, config.operations, config.attributes)
      case _ => new Chain(config.reads, config.operations, config.attributes)
    }
  }
}
