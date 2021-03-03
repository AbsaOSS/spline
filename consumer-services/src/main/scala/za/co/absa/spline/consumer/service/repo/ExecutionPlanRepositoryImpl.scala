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
import za.co.absa.spline.consumer.service.internal.model.{ExecutionPlanDAG, VersionInfo}
import za.co.absa.spline.consumer.service.model.DataSourceActionType.{Read, Write}
import za.co.absa.spline.consumer.service.model.ExecutionPlanInfo.Id
import za.co.absa.spline.consumer.service.model.{AttributeGraph, DataSourceActionType, LineageDetailed}
import za.co.absa.spline.consumer.service.repo.ExecutionPlanRepositoryImpl.ExecutionPlanDagPO
import za.co.absa.spline.persistence.model.Edge

import scala.concurrent.{ExecutionContext, Future}

@Repository
class ExecutionPlanRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends ExecutionPlanRepository {

  import za.co.absa.spline.persistence.ArangoImplicits._

  override def findById(execId: Id)(implicit ec: ExecutionContext): Future[LineageDetailed] = {
    db.queryOne[LineageDetailed](
      """
        |WITH executionPlan, executes, operation, follows, emits, schema, consistsOf, attribute
        |LET exec = FIRST(FOR ex IN executionPlan FILTER ex._key == @execId RETURN ex)
        |LET writeOp = FIRST(FOR v IN 1 OUTBOUND exec executes RETURN v)
        |
        |LET opsWithInboundEdges = (
        |    FOR opi, ei IN 0..99999
        |        OUTBOUND writeOp follows
        |        COLLECT op = opi INTO edgesByVertex
        |        LET schemaId = FIRST(
        |            FOR schema IN 1
        |                OUTBOUND op emits
        |                RETURN schema._id
        |        )
        |        RETURN {
        |            "op"  : op,
        |            "es"  : UNIQUE(edgesByVertex[* FILTER NOT_NULL(CURRENT.ei)].ei),
        |            "sid" : schemaId
        |        }
        |    )
        |
        |LET ops = opsWithInboundEdges[*].op
        |LET edges = opsWithInboundEdges[*].es[**]
        |LET schemaIds = UNIQUE(opsWithInboundEdges[*].sid)
        |
        |LET attributes = (
        |    FOR sid IN schemaIds
        |        FOR a IN 1
        |            OUTBOUND sid consistsOf
        |            RETURN DISTINCT {
        |                "id"   : a._key,
        |                "name" : a.name,
        |                "dataTypeId" : a.dataType
        |            }
        |)
        |
        |LET inputs = FLATTEN(
        |    FOR op IN ops
        |        FILTER op.type == "Read"
        |        RETURN op.inputSources[* RETURN {
        |            "source"    : CURRENT,
        |            "sourceType": op.extra.sourceType
        |        }]
        |    )
        |
        |LET output = FIRST(
        |    ops[*
        |        FILTER CURRENT.type == "Write"
        |        RETURN {
        |            "source"    : CURRENT.outputSource,
        |            "sourceType": CURRENT.extra.destinationType
        |        }]
        |    )
        |
        |RETURN exec && {
        |    "graph": {
        |        "nodes": ops[* RETURN {
        |                "_id"  : CURRENT._key,
        |                "type": CURRENT.type,
        |                "name" : CURRENT.extra.name
        |            }],
        |        "edges": edges[* RETURN {
        |                "source": PARSE_IDENTIFIER(CURRENT._to).key,
        |                "target": PARSE_IDENTIFIER(CURRENT._from).key
        |            }]
        |    },
        |    "executionPlan": {
        |        "_id"       : exec._key,
        |        "systemInfo": exec.systemInfo,
        |        "agentInfo" : exec.agentInfo,
        |        "extra"     : MERGE(exec.extra, { attributes }),
        |        "inputs"    : inputs,
        |        "output"    : output
        |    }
        |}
        |""".stripMargin,
      Map("execId" -> execId)
    ).filter(null.!=)
  }

  override def loadExecutionPlanAsDAG(execId: Id)(implicit ec: ExecutionContext): Future[ExecutionPlanDAG] = {
    db.queryOne[ExecutionPlanDagPO](
      """
        |WITH executionPlan, executes, operation, follows
        |FOR ex IN executionPlan
        |    FILTER ex._key == @execId
        |    LET parts = (
        |        FOR op, e IN 1..9999
        |            OUTBOUND ex executes, follows
        |            LET followingOpID = PARSE_IDENTIFIER(e._from)
        |            RETURN [
        |                op,
        |                followingOpID.collection == "operation" && {
        |                    _from: followingOpID.key,
        |                    _to:   op._key
        |                }
        |            ]
        |    )
        |    RETURN {
        |        systemName:     ex.systemInfo.name,
        |        systemVersion:  ex.systemInfo.version,
        |        agentName:      ex.agentInfo.name,
        |        agentVersion:   ex.agentInfo.version,
        |        vertices:       UNIQUE(parts[*][0]),
        |        edges:          UNIQUE(parts[* FILTER CURRENT[1]][1])
        |    }
        |""".stripMargin,
      Map("execId" -> execId)
    ).map {
      case ExecutionPlanDagPO(systemName, systemVersion, agentName, agentVersion, vertices, edges) =>
        new ExecutionPlanDAG(
          execId,
          systemInfo = VersionInfo(systemName, systemVersion),
          agentInfo = VersionInfo(agentName, agentVersion),
          operations = vertices,
          edges = edges)
    }
  }

  override def execPlanAttributeLineage(attrId: String)(implicit ec: ExecutionContext): Future[AttributeGraph] = {
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
        |    FOR op IN 1..9999
        |        OUTBOUND theOriginId follows
        |        RETURN DISTINCT op._id
        |)
        |
        |LET attrsWithEdges = (
        |    FOR v, e IN 1..999
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
        |        RETURN MERGE(a, {
        |            "_id"        : PARSE_IDENTIFIER(a._id).key,
        |            "originOpId" : PARSE_IDENTIFIER(originId).key,
        |            "transOpIds" : transOpIds
        |        })
        |)
        |
        |LET edges = UNIQUE(attrsWithEdges[*][1])
        |
        |RETURN {
        |    "nodes" : PUSH(nodes, {
        |        "_id": @attrId,
        |        "originOpId": PARSE_IDENTIFIER(theOriginId).key,
        |        "transOpIds": []
        |    }),
        |    edges,
        |}
        |""".stripMargin,
      Map(
        "attrId" -> attrId,
      ))
  }

  override def execPlanAttributeImpact(attrId: String)(implicit ec: ExecutionContext): Future[AttributeGraph] = {
    db.queryOne[AttributeGraph](
      """
        |WITH attribute, operation, produces, emits, schema, consistsOf
        |LET theAttr = DOCUMENT("attribute", @attrId)
        |LET originId = FIRST(
        |    FOR op IN 1
        |        INBOUND theAttr produces
        |        RETURN op._id
        |)
        |LET transOpIds = (
        |    FOR op IN 2
        |        INBOUND theAttr consistsOf, emits
        |        FILTER op._id != originId
        |        RETURN op._key
        |)
        |RETURN {
        |    nodes: [{
        |       "_id": theAttr._key,
        |       "originOpId": FIRST(FOR op IN INBOUND theAttr produces RETURN op._key),
        |       "transOpIds": transOpIds
        |    }],
        |    edges: [],
        |}
        |""".stripMargin,
      Map(
        "attrId" -> attrId,
      ))
  }

  override def getDataSources(execPlanId: String, access: Option[DataSourceActionType])(implicit ec: ExecutionContext): Future[Array[String]] = {
    access
      .map({
        case Read => db.queryStream[String](
          """
            |FOR ds IN 1..1
            |OUTBOUND DOCUMENT('executionPlan', @planId) depends
            |RETURN ds.uri
            |""".stripMargin,
          Map("planId" -> execPlanId)
        ).map(_.toArray)

        case Write => db.queryStream[String](
          """
            |FOR ds IN 1..1
            |OUTBOUND DOCUMENT('executionPlan', @planId) affects
            |RETURN ds.uri
            |""".stripMargin,
          Map("planId" -> execPlanId)
        ).map(_.toArray)
      })
      .getOrElse({
        db.queryStream[String](
          """
            |FOR ds IN 1..1
            |OUTBOUND DOCUMENT('executionPlan', @planId) affects, depends
            |RETURN ds.uri
            |""".stripMargin,
          Map("planId" -> execPlanId)
        ).map(_.toArray)
      })
  }
}

object ExecutionPlanRepositoryImpl {

  case class AnyOperation(
    params: Map[String, Any],
    extra: Map[String, Any],
    outputSchema: Option[Array[String]],
    _key: String,
    `type`: String
  ) {
    def this() = this(null, null, null, null, null)
  }

  case class ExecutionPlanDagPO(
    systemName: String,
    systemVersion: String,
    agentName: String,
    agentVersion: String,
    vertices: Array[AnyOperation],
    edges: Array[Edge]) {
    def this() = this(null, null, null, null, null, null)
  }

}
