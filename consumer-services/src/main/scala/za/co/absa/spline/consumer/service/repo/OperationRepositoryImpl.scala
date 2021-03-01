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

package za.co.absa.spline.consumer.service.repo

import com.arangodb.async.ArangoDatabaseAsync
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.commons.lang.{CachingConverter, Converter}
import za.co.absa.spline.common.JsonPath
import za.co.absa.spline.consumer.service.model.{Operation, OperationDetails}
import za.co.absa.spline.consumer.service.repo.OperationRepositoryImpl._

import java.{util => ju}
import scala.collection.JavaConverters._
import scala.concurrent.{ExecutionContext, Future}

@Repository
class OperationRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends OperationRepository {

  import za.co.absa.spline.persistence.ArangoImplicits._

  override def findById(operationId: Operation.Id)(implicit ec: ExecutionContext): Future[OperationDetails] = {
    val eventualDetails = db.queryOne[OperationDetails](
      """
        |WITH executionPlan, executes, operation, follows
        |FOR ope IN operation
        |    FILTER ope._key == @operationId
        |
        |    LET inputs = (
        |        FOR v IN 1..1
        |            OUTBOUND ope follows
        |            RETURN v
        |    )
        |
        |    LET schemas = (
        |        FOR op IN APPEND(inputs, ope)
        |            LET schema = (
        |                FOR attr IN 2 OUTBOUND op emits, consistsOf
        |                    RETURN {
        |                        "id": attr._key,
        |                        "name": attr.name,
        |                        "dataTypeId": attr.dataType
        |                    }
        |            )
        |            RETURN schema
        |    )
        |
        |    LET dataTypesFormatted = (
        |        FOR v IN 1..9999
        |            INBOUND ope follows, executes
        |            FILTER IS_SAME_COLLECTION("executionPlan", v)
        |            FOR d IN v.extra.dataTypes
        |                RETURN MERGE(
        |                    KEEP(d,  "id", "name", "fields", "nullable", "elementDataTypeId"),
        |                    {
        |                        "_class": d._typeHint == "dt.Simple" ?  "za.co.absa.spline.consumer.service.model.SimpleDataType"
        |                                : d._typeHint == "dt.Array"  ?  "za.co.absa.spline.consumer.service.model.ArrayDataType"
        |                                :                               "za.co.absa.spline.consumer.service.model.StructDataType"
        |                    }
        |                )
        |    )
        |
        |    LET expressionGraph = FIRST(
        |        LET ps = (
        |            FOR v, e IN 1..999
        |                OUTBOUND ope uses, takes
        |                RETURN [v, e]
        |        )
        |        RETURN [
        |            UNIQUE(ps[*][0]),
        |            UNIQUE(ps[*][1])
        |        ]
        |    )
        |
        |    RETURN {
        |        "operation": {
        |            "_id"       : ope._key,
        |            "type"      : ope.type,
        |            "name"      : ope.extra.name,
        |            "properties": MERGE(
        |                {
        |                    "inputSources": ope.inputSources,
        |                    "outputSource": ope.outputSource,
        |                    "append"      : ope.append,
        |                    "_$$_expressionGraph": expressionGraph,
        |                },
        |                ope.params,
        |                ope.extra
        |            )
        |        },
        |        "dataTypes": dataTypesFormatted,
        |        "schemas"  : schemas,
        |        "inputs"   : LENGTH(inputs) > 0 ? RANGE(0, LENGTH(inputs) - 1) : [],
        |        "output"   : LENGTH(schemas) - 1
        |    }
        |""".stripMargin,
      Map("operationId" -> operationId)
    )

    eventualDetails.map(details => {
      val Seq(vs: ju.List[Node], es: ju.List[Link]) =
        details.operation.properties(ExpressionGraphProp).asInstanceOf[ju.List[_]].asScala
      details.copy(
        operation = details.operation.copy(
          properties = attachExpressions(
            details.operation.properties - ExpressionGraphProp,
            vs.asScala -> es.asScala
          ))
      )
    })
  }

  def attachExpressions(opProps: Map[String, Any], expressionGraph: (Seq[Node], Seq[Link])): Map[String, Any] = {
    val (nodes, edges) = expressionGraph
    val (uses, takes) = edges.partition(_.get("_id").asInstanceOf[String].startsWith("uses"))

    val nodeById: Map[String, Node] =
      nodes
        .map(node => node.get("_id").asInstanceOf[NodeId] -> node)
        .toMap

    val operandMapping: Map[NodeId, Seq[NodeId]] = takes
      .groupBy(_.get("_from").asInstanceOf[NodeId])
      .mapValues(_.sortBy(_.get("index").asInstanceOf[Number].intValue).map(_.get("_to").asInstanceOf[NodeId]))

    val nodeToExprConverter = new NodeToExprAssemblyConverter(nodeById, operandMapping) with CachingConverter {
      override protected def keyOf(node: Node): Key = node.get("_id")
    }

    uses.foldLeft(opProps) { (z, u) =>
      val relPath = u.get("path").asInstanceOf[String].stripPrefix("$['params']")
      val jsonPath = JsonPath.parse(relPath)
      val nodeId = u.get("_to").asInstanceOf[NodeId]
      val node = nodeById(nodeId)
      val expr = nodeToExprConverter.convert(node)
      jsonPath.set(z, expr)
    }
  }
}

object OperationRepositoryImpl {
  private val ExpressionGraphProp = "_$$_expressionGraph"

  private type NodeId = String
  private type Node = ju.Map[String, Any]
  private type Link = ju.Map[String, Any]
  private type ExprAssembly = Map[String, Any]

  private class NodeToExprAssemblyConverter(
    nodeById: Map[String, Node],
    operandMapping: Map[NodeId, Seq[NodeId]]
  ) extends Converter {
    override type From = Node
    override type To = ExprAssembly

    override def convert(node: Node): ExprAssembly = {
      val params = node.get("params").asInstanceOf[ju.Map[String, Any]]
      val extra = node.get("extra").asInstanceOf[ju.Map[String, Any]]
      val typeHint = extra.getOrDefault("_typeHint", "expr.AttrRef")

      def children: Seq[ExprAssembly] = {
        val nodeId = node.get("_id").asInstanceOf[NodeId]
        operandMapping
          .getOrElse(nodeId, Nil)
          .map(nodeById)
          .map(convert)
      }

      Map(
        "_typeHint" -> typeHint,
        "dataTypeId" -> node.get("dataType"),
        "name" -> node.get("name")
      ) ++ (typeHint match {
        case "expr.Alias" => Map(
          "alias" -> params.get("name"),
          "child" -> children.head
        )
        case "expr.Binary" => Map(
          "symbol" -> extra.get("symbol"),
          "children" -> children
        )
        case "expr.Literal" => Map(
          "value" -> node.get("value")
        )
        case "expr.AttrRef" => Map(
          "refId" -> node.get("_key")
        )
        case "expr.UDF" => Map(
          "children" -> children
        )
        case "expr.Generic" => Map(
          "exprType" -> extra.get("simpleClassName"),
          "params" -> params,
          "children" -> children
        )
        case "expr.GenericLeaf" => Map(
          "exprType" -> extra.get("simpleClassName"),
          "params" -> params
        )
        case "expr.UntypedExpression" => Map(
          "exprType" -> extra.get("simpleClassName"),
          "params" -> params,
          "children" -> children
        )
      })
    }
  }

}
