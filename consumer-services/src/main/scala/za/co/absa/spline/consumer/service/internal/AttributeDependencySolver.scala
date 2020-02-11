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
import za.co.absa.spline.consumer.service.model.{AttributeGraph, AttributeTransition, AttributeNode}

import scala.collection.JavaConverters._
import scala.collection.mutable

object AttributeDependencySolver {

  def resolveDependencies(operations: Seq[OperationWithSchema], attributeID: UUID): AttributeGraph = {

    val operationsMap = operations.map(op => op._id -> op).toMap
    val inputSchemaResolver = createInputSchemaResolver(operations)

    def findDependencies(
      operation: OperationWithSchema,
      lookingFor: Set[UUID]
    ): (Set[(UUID, UUID)], Map[UUID, String]) = {

      val (found, stillLookingFor) = {
        val inputSchemas = inputSchemaResolver(operation)
        val outputSchema = operation.schema

        lookingFor.partition(id => outputSchema.contains(id) && !inputSchemas.exists(_.contains(id)))
      }

      val newNodes = found.map(_ -> operation._id).toMap

      val dependencyMap = resolveDependencies(operation, inputSchemaResolver)
      val newEdges = found
        .flatMap(x => dependencyMap.get(x).map(x -> _))
        .flatMap { case (k, v) => v.map(inv => (k, inv)) }

      val newLookingFor = stillLookingFor union newEdges.map(_._2)

      val (childEdges, childNodes) : (Set[(UUID, UUID)], Map[UUID, String]) = operation
        .childIds
        .map(operationsMap)
        .filter(_.schema.exists(newLookingFor))
        .map(findDependencies(_, newLookingFor))
        .reduceOption(mergeResults(_, _))
        .getOrElse((Set.empty, Map.empty))

      (childEdges union newEdges, childNodes ++ newNodes)
    }

    def mergeResults[A, B, C](x: (Set[A], Map[B,C]), y: (Set[A], Map[B,C])): (Set[A], Map[B,C]) =
      (x._1 union y._1, x._2 ++ y._2)

    val startOperation = operations.find(_.schema.contains(attributeID)).get

    val (edges, nodes) = findDependencies(startOperation, Set(attributeID))

    val attEdges = edges.map { case (s,t) => AttributeTransition(s.toString, t.toString) }
    val attNodes = nodes.map { case (aId,opId) => AttributeNode(aId.toString, opId) }

    AttributeGraph(attNodes.toArray, attEdges.toArray)
  }

  private def resolveDependencies(op: OperationWithSchema, inputSchemasOf: OperationWithSchema => Seq[Array[UUID]]):
    Map[UUID, Set[UUID]] =
    op.extra("name") match {
      case "Project" => resolveExpressionList(op.params("projectList"), op.schema)
      case "Aggregate" => resolveExpressionList(op.params("aggregateExpressions"), op.schema)
      case "SubqueryAlias" => resolveSubqueryAlias(inputSchemasOf(op).head, op.schema)
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

  private def createInputSchemaResolver(operations: Seq[OperationWithSchema]):
    OperationWithSchema => Seq[Array[UUID]] = {

    val operationMap = operations.map(op => op._id -> op).toMap

    (op: OperationWithSchema) => {
      if (op.childIds.isEmpty) {
        Seq(Array.empty)
      } else {
        op.childIds.map(operationMap(_).schema)
      }
    }
  }

  private def asScalaMap[K, V](javaMap: Any) =
    javaMap.asInstanceOf[java.util.Map[K, V]].asScala

  private def asScalaListOfMaps[K, V](javaList: Any) =
    javaList.asInstanceOf[java.util.List[java.util.Map[K, V]]].asScala.map(_.asScala)

}
