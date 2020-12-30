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

package za.co.absa.spline.producer.modelmapper.v1.spark

import za.co.absa.spline.producer.model.{OperationLike => OperationLikeV1}
import za.co.absa.spline.producer.modelmapper.v1.TypesV1.{AttrId, ExprDef, Schema}
import za.co.absa.spline.producer.modelmapper.v1.{AttributeDependencyResolver, FieldNamesV1}

import scala.collection.JavaConverters._

object SparkSpline04AttributeDependencyResolver extends AttributeDependencyResolver {

  override def resolve(
    op: OperationLikeV1,
    inputSchema: => Schema,
    outputSchema: => Schema
  ): Map[AttrId, Set[AttrId]] =
    op.extra(FieldNamesV1.OperationExtraInfo.Name) match {
      case "Project" => resolveExpressionList(asScalaListOfMaps(op.params("projectList")), outputSchema)
      case "Aggregate" => resolveExpressionList(asScalaListOfMaps(op.params("aggregateExpressions")), outputSchema)
      case "SubqueryAlias" => resolveSubqueryAlias(inputSchema, outputSchema)
      case "Generate" => resolveGenerator(op)
      case _ => Map.empty
    }

  private def resolveExpressionList(exprs: Seq[ExprDef], schema: Schema): Map[AttrId, Set[AttrId]] = {
    assume(schema.length == exprs.length)
    exprs
      .zip(schema)
      .map { case (expr, attrId) => attrId -> expressionDependencies(expr) }
      .toMap
  }

  private def resolveSubqueryAlias(inputSchema: Schema, outputSchema: Schema): Map[AttrId, Set[AttrId]] =
    inputSchema
      .zip(outputSchema)
      .map { case (inAtt, outAtt) => outAtt -> Set(inAtt) }
      .toMap

  private def resolveGenerator(op: OperationLikeV1): Map[AttrId, Set[AttrId]] = {
    val expression = asScalaMap[String, Any](op.params("generator"))
    val dependencies = expressionDependencies(expression)
    val keyId = asScalaListOfMaps[String, String](op.params("generatorOutput")).head("refId")
    Map(keyId -> dependencies)
  }

  private def expressionDependencies(expr: ExprDef): Set[AttrId] = expr("_typeHint") match {
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
    javaMap.asInstanceOf[java.util.Map[K, V]].asScala.toMap

  private def asScalaListOfMaps[K, V](javaList: Any): Seq[Map[K, V]] =
    javaList.asInstanceOf[java.util.List[java.util.Map[K, V]]].asScala.map(_.asScala.toMap)


}
