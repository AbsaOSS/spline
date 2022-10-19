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

import za.co.absa.spline.common.SplineBuildInfo
import za.co.absa.spline.producer.model.v1_2.OperationLike.{Id, Schema}
import za.co.absa.spline.producer.model.v1_2._
import za.co.absa.spline.testdatagen.ExpandedConfig
import za.co.absa.spline.testdatagen.GraphType.{ChainType, DiamondType, TriangleType}
import za.co.absa.spline.testdatagen.generators.AttributesGenerator.generateSchema
import za.co.absa.spline.testdatagen.generators.graph.{Chain, Diamond, Triangle}

import java.util.UUID

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
      extraInfo = Map(
        "graph-type" -> this.getClass.getSimpleName,
        "operationCount" -> opCount,
        "attributeCount" -> attCount,
        "readCount" -> readCount
      )
    )
  }

  def generateReads(numbSources: Int): Seq[(ReadOperation, Seq[Attribute])] = {
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
    Seq((read, schema))
  }

  def getWriteLinkedOperation(dataOperations: Seq[DataOperation]): (Seq[String], Schema)

  def generateOperations(dataOpCount: Int, readOpCount: Int): (Operations, Seq[Attribute], Expressions) = {
    val readsMap: Seq[(ReadOperation, Seq[Attribute])] = generateReads(readOpCount)

    val (reads: Seq[ReadOperation], readAttributes: Seq[Seq[Attribute]]) = readsMap.unzip

    val (dataOps: Seq[DataOperation], dataAFL: Seq[Seq[(Attribute, FunctionalExpression, Literal)]]) =
      generateDataOperationsAndExpressions(dataOpCount, readsMap).unzip

    val dataOpAttributes: Iterable[Attribute] = dataAFL.flatMap(_.map {
      case (attribute, _, _) => attribute
    })

    val allAttributesSet = (readAttributes.flatten ++ dataOpAttributes).toSet

    val (functionalExpressions: Seq[FunctionalExpression], literals: Seq[Literal]) =
      dataAFL
        .flatMap(_.map { case (_, fex, lit) => (fex, lit) })
        .unzip

    val allExpressions = Expressions(functionalExpressions, literals)

    val (linkedOperations, linkedAttributes: Schema) = getWriteLinkedOperation(dataOps)
    val finalDataOp = generateDataOperation(linkedOperations, linkedAttributes)
    val operations = Operations(
      write = generateWrite(Seq(finalDataOp.id)),
      reads = reads,
      other = dataOps ++ Seq(finalDataOp)
    )

    (operations, allAttributesSet.toSeq, allExpressions)
  }

  def generateDataOperationsAndExpressions(
    opCount: Int,
    reads: Seq[(ReadOperation, Seq[Attribute])]
  ): Seq[(DataOperation, Seq[(Attribute, FunctionalExpression, Literal)])]

  def generateAttributesFromNewExpressions(parentAttrs: Seq[Attribute]): Seq[(Attribute, FunctionalExpression, Literal)] = {
    val exprWithLiterals = parentAttrs.map(ExpressionGenerator.generateExpressionAndLiteralForAttribute)

    val attrExpLit = exprWithLiterals.map {
      case (fexp, lit) =>
        val attribute = AttributesGenerator.generateAttributeFromExpressionParent(fexp.id)
        (attribute, fexp, lit)
    }
    attrExpLit
  }

  protected def generateDataOperation(childIds: Seq[String], schema: Seq[Id]): DataOperation = {
    val id = UUID.randomUUID().toString
    DataOperation(
      id = id,
      name = Some(s"generated data operation $id"),
      childIds = childIds,
      output = Some(schema),
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
      case ChainType => new Chain(config.reads, config.operations, config.attributes)
    }
  }
}
