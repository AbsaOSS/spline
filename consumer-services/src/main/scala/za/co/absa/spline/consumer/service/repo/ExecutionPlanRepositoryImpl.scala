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

import com.arangodb.async.{ArangoCursorAsync, ArangoDatabaseAsync}
import com.arangodb.model.AqlQueryOptions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.persistence.model.Operation.OperationTypes

import java.lang
import scala.collection.immutable
import scala.compat.java8.StreamConverters._
import scala.concurrent.{ExecutionContext, Future}

@Repository
class ExecutionPlanRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends ExecutionPlanRepository {

  import za.co.absa.spline.persistence.ArangoImplicits._

  /** Expect execPlan to be available */
  private val execPlanToLineageDetailedAQL =
    """
      |LET ops = (
      |    FOR op IN operation
      |        FILTER op._belongsTo == execPlan._id
      |        RETURN op
      |    )
      |LET edges = (
      |    FOR f IN follows
      |        FILTER f._belongsTo == execPlan._id
      |        RETURN f
      |    )
      |LET schemaIds = (
      |    FOR op IN ops
      |        FOR schema IN 1
      |            OUTBOUND op emits
      |            RETURN DISTINCT schema._id
      |    )
      |LET attributes = (
      |    FOR sid IN schemaIds
      |        FOR a IN 1
      |            OUTBOUND sid consistsOf
      |            RETURN DISTINCT {
      |                "id"   : a._key,
      |                "name" : a.name,
      |                "dataTypeId" : a.dataType
      |            }
      |    )
      |LET inputs = FLATTEN(
      |    FOR op IN ops
      |        FILTER op.type == "Read"
      |        RETURN op.inputSources[* RETURN {
      |            "source"    : CURRENT,
      |            "sourceType": op.extra.sourceType
      |        }]
      |    )
      |LET output = FIRST(
      |    ops[*
      |        FILTER CURRENT.type == "Write"
      |        RETURN {
      |            "source"    : CURRENT.outputSource,
      |            "sourceType": CURRENT.extra.destinationType
      |        }]
      |    )
      |RETURN execPlan && {
      |    "graph": {
      |        "nodes": ops[* RETURN {
      |                "_id"  : CURRENT._key,
      |                "_type": CURRENT.type,
      |                "name" : CURRENT.name || CURRENT.type
      |            }],
      |        "edges": edges[* RETURN {
      |                "source": PARSE_IDENTIFIER(CURRENT._to).key,
      |                "target": PARSE_IDENTIFIER(CURRENT._from).key
      |            }]
      |    },
      |    "executionPlan": {
      |        "_id"       : execPlan._key,
      |        "systemInfo": execPlan.systemInfo,
      |        "agentInfo" : execPlan.agentInfo,
      |        "name"      : execPlan.name || execPlan._key,
      |        "extra"     : MERGE(
      |                         execPlan.extra,
      |                         { attributes },
      |                         { "appName"  : execPlan.name || execPlan._key }
      |                      ),
      |        "inputs"    : inputs,
      |        "output"    : output
      |    }
      |}
      |"""

  override def findById(execId: ExecutionPlanInfo.Id)(implicit ec: ExecutionContext): Future[LineageDetailed] = {
    db.queryOne[LineageDetailed](
      s"""
        |WITH executionPlan, executes, operation, follows, emits, schema, consistsOf, attribute
        |LET execPlan = DOCUMENT("executionPlan", @execPlanId)
        $execPlanToLineageDetailedAQL
        |""".stripMargin,
      Map("execPlanId" -> execId)
    ).filter(null.!=)
  }

  override def find(asAtTime: Long, pageRequest: PageRequest, sortRequest: SortRequest)(implicit ec: ExecutionContext): Future[(Seq[LineageDetailed], Long)] = {

    // cannot use:
    //        FOR execPlan IN executionPlan
    //          FOR prog IN 1 OUTBOUND execPlan progressOf
    // because CURRENT's context would be `progress`, not `executionPlan`

    val queryResult: Future[ArangoCursorAsync[LineageDetailed]] = db.queryAs[LineageDetailed](
      s"""
         |WITH progress, progressOf, executionPlan, executes, operation, follows, emits, schema, consistsOf, attribute
         |FOR prog IN progress
         |    FILTER prog.timestamp <= @asAtTime
         |    FOR execPlan IN 1 OUTBOUND prog progressOf
         |
         |        SORT execPlan.@sortField @sortOrder
         |        LIMIT @pageOffset*@pageSize, @pageSize
         |
         $execPlanToLineageDetailedAQL
         |
         |""".stripMargin,
      Map[String, AnyRef](
        "asAtTime" -> Long.box(asAtTime),
        "pageOffset" -> Int.box(pageRequest.page - 1),
        "pageSize" -> Int.box(pageRequest.size),
        "sortField" -> sortRequest.sortField,
        "sortOrder" -> sortRequest.sortOrder

      ),
      new AqlQueryOptions().fullCount(true)
    )

    val findResult: Future[(Seq[LineageDetailed], Long)] = queryResult.map {
      arangoCursorAsync =>
        val items = arangoCursorAsync.streamRemaining().toScala
        val totalCount = arangoCursorAsync.getStats.getFullCount
        items -> totalCount
    }

    findResult
  }

  override def getWriteOperationId(planId: ExecutionPlanInfo.Id)(implicit ec: ExecutionContext): Future[Operation.Id] = {
    db.queryOne[Operation.Id](
      s"""
         |WITH operation
         |FOR op IN operation
         |    FILTER op._belongsTo == CONCAT('executionPlan/', @planId)
         |    FILTER op.type == '${OperationTypes.Write}'
         |    RETURN op._key
         |""".stripMargin,
      Map(
        "planId" -> planId
      ))
  }

  override def execPlanAttributeLineage(attrId: Attribute.Id)(implicit ec: ExecutionContext): Future[AttributeGraph] = {
    db.queryOne[AttributeGraph](
      """
        |WITH attribute, derivesFrom, operation, follows, produces, emits, schema, consistsOf
        |LET theAttr = DOCUMENT("attribute", @attrId)
        |LET theOriginId = FIRST(
        |    FOR op IN 1
        |        INBOUND theAttr produces
        |        RETURN op._id
        |)
        |
        |LET opIdsPrecedingTheOrigin = (
        |    FOR op IN 1..999999
        |        OUTBOUND theOriginId follows
        |        RETURN DISTINCT op._id
        |)
        |
        |LET attrsWithEdges = (
        |    FOR v, e IN 1..999999
        |        OUTBOUND theAttr derivesFrom
        |        LET attr = {
        |            "_id": v._id,
        |            "name": v.name
        |        }
        |        LET edge = {
        |            "source": PARSE_IDENTIFIER(e._from).key,
        |            "target": PARSE_IDENTIFIER(e._to).key
        |        }
        |        RETURN [attr, edge]
        |)
        |
        |LET nodes = (
        |    FOR a IN UNIQUE(attrsWithEdges[*][0])
        |        LET originId = FIRST(
        |            FOR op IN 1
        |                INBOUND a produces
        |                RETURN op._id
        |        )
        |        LET transOpIds = (
        |            FOR op IN 2
        |                INBOUND a consistsOf, emits
        |                FILTER op._id != originId
        |                FILTER op._id IN opIdsPrecedingTheOrigin
        |                RETURN op._key
        |        )
        |        RETURN {
        |            "_id"        : PARSE_IDENTIFIER(a._id).key,
        |            "name"       : a.name,
        |            "originOpId" : PARSE_IDENTIFIER(originId).key,
        |            "transOpIds" : transOpIds
        |        }
        |)
        |
        |LET edges = UNIQUE(attrsWithEdges[*][1])
        |
        |RETURN {
        |    "nodes" : PUSH(nodes, {
        |        "_id"        : @attrId,
        |        "name"       : theAttr.name,
        |        "originOpId" : PARSE_IDENTIFIER(theOriginId).key,
        |        "transOpIds" : []
        |    }),
        |    edges,
        |}
        |""".stripMargin,
      Map(
        "attrId" -> attrId,
      ))
  }

  override def execPlanAttributeImpact(attrId: Attribute.Id)(implicit ec: ExecutionContext): Future[AttributeGraph] = {
    db.queryOne[AttributeGraph](
      """
        |WITH attribute, derivesFrom, operation, produces, emits, schema, consistsOf
        |LET theAttr = DOCUMENT("attribute", @attrId)
        |
        |LET attrsWithEdges = (
        |    FOR v, e IN 0..999999
        |        INBOUND theAttr derivesFrom
        |        LET attr = KEEP(v, ["_id", "name"])
        |        LET edge = e && {
        |            "source": PARSE_IDENTIFIER(e._from).key,
        |            "target": PARSE_IDENTIFIER(e._to).key
        |        }
        |        RETURN [attr, edge]
        |)
        |
        |LET nodes = (
        |    FOR a IN UNIQUE(attrsWithEdges[*][0])
        |        LET originId = FIRST(
        |            FOR op IN 1
        |                INBOUND a produces
        |                RETURN op._id
        |        )
        |        LET transOpIds = (
        |            FOR op IN 2
        |                INBOUND a consistsOf, emits
        |                FILTER op._id != originId
        |                RETURN op._key
        |        )
        |        RETURN {
        |            "_id"        : PARSE_IDENTIFIER(a._id).key,
        |            "name"       : a.name,
        |            "originOpId" : PARSE_IDENTIFIER(originId).key,
        |            "transOpIds" : transOpIds
        |        }
        |)
        |
        |LET edges = UNIQUE(SHIFT(attrsWithEdges)[*][1])
        |
        |RETURN {
        |    nodes,
        |    edges,
        |}
        |""".stripMargin,
      Map(
        "attrId" -> attrId,
      ))
  }

}
