/*
 * Copyright 2020 ABSA Group Limited
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

package za.co.absa.spline.consumer.service.internal

import java.util.UUID

import za.co.absa.spline.consumer.service.internal.model.OperationWithSchema
import za.co.absa.spline.consumer.service.model.AttributeDependencies

import scala.collection.JavaConverters._
import scala.collection.mutable

object AttributeDependencySolver {

  def resolveDependencies(operations: Seq[OperationWithSchema], attributeID: UUID): AttributeDependencies = {

    val operationsMap = operations.map(op => op._id -> op).toMap
    val inputSchemaResolver = createInputSchemaResolver(operations)

    def findDependenciesStart(
      operation: OperationWithSchema,
      attributeID: UUID
    ): (Set[UUID], Set[String]) = {

      if (operation.schema.contains(attributeID))
        findTransitiveDependencies(operation, Set(attributeID))
      else if (operation.childIds.isEmpty)
        (Set.empty, Set.empty)
      else
        operation
          .childIds
          .map(operationsMap)
          .map(findDependenciesStart(_, attributeID))
          .reduce(elementwiseUnion(_, _))
    }

    def findTransitiveDependencies(
      operation: OperationWithSchema,
      attributeDependencies: Set[UUID]
    ): (Set[UUID], Set[String]) = {

      val dependencyMap = resolveDependencies(operation, inputSchemaResolver)
      val updatedAttributeDependencies = attributeDependencies
        .flatMap(dependencyMap.get(_))
        .flatten
        .union(attributeDependencies)

      val (attrDep, opDep) = operation
        .childIds
        .map(operationsMap)
        .filter(_.schema.exists(updatedAttributeDependencies))
        .map(findTransitiveDependencies(_, updatedAttributeDependencies))
        .reduceOption(elementwiseUnion(_, _))
        .getOrElse((updatedAttributeDependencies, Set.empty[String]))

      (attrDep, opDep + operation._id)
    }

    def elementwiseUnion[A, B](x: (Set[A], Set[B]), y: (Set[A], Set[B])): (Set[A], Set[B]) =
      (x._1 union y._1, x._2 union y._2)


    val writeOp = operations.last
    val (attributeDependencies, operationDependencies) = findDependenciesStart(writeOp, attributeID)

    new AttributeDependencies(attributeDependencies - attributeID, operationDependencies)
  }

  private def resolveDependencies(op: OperationWithSchema, inputSchemaOf: OperationWithSchema => Array[UUID]): Map[UUID, Set[UUID]] =
    op.extra("name") match {
      case "Project" => resolveExpressionList(op.params("projectList"), op.schema)
      case "Aggregate" => resolveExpressionList(op.params("aggregateExpressions"), op.schema)
      case "SubqueryAlias" => resolveSubqueryAlias(inputSchemaOf(op), op.schema)
      case "Generate" => resolveGenerator(op)
      case _ => Map.empty
    }

  private def resolveExpressionList(exprList: Any, schema: Seq[UUID]): Map[UUID, Set[UUID]] =
    asScalaListOfMaps[String, Any](exprList)
      .zip(schema)
      .map { case (expr, attrId) => attrId -> toAttrDependencies(expr) }
      .toMap

  private def resolveSubqueryAlias(inputSchema: Seq[UUID], outputSchema: Seq[UUID]): Map[UUID, Set[UUID]] =
    inputSchema
      .zip(outputSchema)
      .map { case (inAtt, outAtt) => outAtt -> Set(inAtt) }
      .toMap

  private def resolveGenerator(op: OperationWithSchema): Map[UUID, Set[UUID]] = {

    val expression = asScalaMap[String, Any](op.params("generator"))
    val dependencies = toAttrDependencies(expression)

    val keyId = asScalaListOfMaps[String, String](op.params("generatorOutput"))
      .head("refId")

    Map(UUID.fromString(keyId) -> dependencies)
  }

  private def toAttrDependencies(expr: mutable.Map[String, Any]): Set[UUID] = expr("_typeHint") match {
    case "expr.AttrRef" => Set(UUID.fromString(expr("refId").asInstanceOf[String]))
    case "expr.Alias" => toAttrDependencies(asScalaMap[String, Any](expr("child")))
    case _ if expr.contains("children") => asScalaListOfMaps[String, Any](expr("children"))
      .map(toAttrDependencies).reduce(_ union _)
    case _ => Set.empty
  }

  private def createInputSchemaResolver(operations: Seq[OperationWithSchema]): OperationWithSchema => Array[UUID] = {

    val operationMap = operations.map(op => op._id -> op).toMap

    (op: OperationWithSchema) => {
      if (op.childIds.isEmpty) {
        Array.empty
      } else {
        val inputOp = operationMap(op.childIds.head)
        inputOp.schema
      }
    }
  }

  private def asScalaMap[K, V](javaMap: Any) =
    javaMap.asInstanceOf[java.util.Map[K, V]].asScala

  private def asScalaListOfMaps[K, V](javaList: Any) =
    javaList.asInstanceOf[java.util.List[java.util.Map[K, V]]].asScala.map(_.asScala)

}
