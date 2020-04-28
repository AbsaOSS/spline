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

package za.co.absa.spline.consumer.service.attrresolver

import za.co.absa.spline.consumer.service.attrresolver.AttributeDependencyResolver._
import za.co.absa.spline.persistence.model.Operation

import scala.collection.JavaConverters._
import scala.collection.mutable

object SparkAttributeDependencyResolverImpl extends AttributeDependencyResolver {
  override def resolve(
    op: Operation,
    inputSchema: => Seq[AttributeId],
    outputSchema: => Seq[AttributeId]
  ): Map[AttributeId, Set[AttributeId]] =
    op.extra("name") match {
      case "Project" => resolveExpressionList(asScalaListOfMaps(op.params("projectList")), outputSchema)
      case "Aggregate" => resolveExpressionList(asScalaListOfMaps(op.params("aggregateExpressions")), outputSchema)
      case "SubqueryAlias" => resolveSubqueryAlias(inputSchema, outputSchema)
      case "Generate" => resolveGenerator(op)
      case _ => Map.empty
    }

  private def resolveExpressionList(exprs: Seq[mutable.Map[String, Any]], schema: Seq[AttributeId]): Map[AttributeId, Set[AttributeId]] = {
    assume(schema.length == exprs.length)
    exprs
      .zip(schema)
      .map { case (expr, attrId) => attrId -> expressionDependencies(expr) }
      .toMap
  }

  private def resolveSubqueryAlias(inputSchema: Seq[AttributeId], outputSchema: Seq[AttributeId]): Map[AttributeId, Set[AttributeId]] =
    inputSchema
      .zip(outputSchema)
      .map { case (inAtt, outAtt) => outAtt -> Set(inAtt) }
      .toMap

  private def resolveGenerator(op: Operation): Map[AttributeId, Set[AttributeId]] = {
    val expression = asScalaMap[String, Any](op.params("generator"))
    val dependencies = expressionDependencies(expression)
    val keyId = asScalaListOfMaps[String, String](op.params("generatorOutput")).head("refId")
    Map(keyId -> dependencies)
  }

  private def expressionDependencies(expr: mutable.Map[String, Any]): Set[AttributeId] = expr("_typeHint") match {
    case "expr.AttrRef" =>
      Set(expr("refId").asInstanceOf[String])
    case "expr.Alias" =>
      expressionDependencies(asScalaMap[String, Any](expr("child")))
    case _ =>
      val children = expr.getOrElse("children", java.util.Collections.EMPTY_LIST)
      asScalaListOfMaps[String, Any](children)
        .toSet
        .flatMap(expressionDependencies)
  }

  private def asScalaMap[K, V](javaMap: Any) =
    javaMap.asInstanceOf[java.util.Map[K, V]].asScala

  private def asScalaListOfMaps[K, V](javaList: Any) =
    javaList.asInstanceOf[java.util.List[java.util.Map[K, V]]].asScala.map(_.asScala)


}
