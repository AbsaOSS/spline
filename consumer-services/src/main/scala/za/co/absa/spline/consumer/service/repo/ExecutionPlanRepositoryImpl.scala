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
import za.co.absa.spline.consumer.service.model.{DataSourceActionType, LineageDetailed}
import za.co.absa.spline.consumer.service.repo.ExecutionPlanRepositoryImpl.ExecutionPlanDagPO
import za.co.absa.spline.persistence.model.{Edge, Operation}

import scala.concurrent.{ExecutionContext, Future}

@Repository
class ExecutionPlanRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends ExecutionPlanRepository {

  import za.co.absa.spline.persistence.ArangoImplicits._

  override def findById(execId: Id)(implicit ec: ExecutionContext): Future[LineageDetailed] = {
    db.queryOne[LineageDetailed](
      """
        |WITH executionPlan, executes, operation, follows
        |LET exec = FIRST(FOR ex IN executionPlan FILTER ex._key == @execId RETURN ex)
        |LET writeOp = FIRST(FOR v IN 1 OUTBOUND exec executes RETURN v)
        |
        |LET opsWithInboundEdges = (
        |    FOR vi, ei IN 0..99999
        |        OUTBOUND writeOp follows
        |        COLLECT v = vi INTO edgesByVertex
        |        RETURN {
        |            "op": v,
        |            "es": UNIQUE(edgesByVertex[* FILTER NOT_NULL(CURRENT.ei)].ei)
        |        }
        |    )
        |
        |LET ops = opsWithInboundEdges[*].op
        |LET edges = opsWithInboundEdges[*].es[**]
        |
        |LET inputs = FLATTEN(
        |    FOR op IN ops
        |        FILTER op._type == "Read"
        |        RETURN op.inputSources[* RETURN {
        |            "source"    : CURRENT,
        |            "sourceType": op.extra.sourceType
        |        }]
        |    )
        |
        |LET output = FIRST(
        |    ops[*
        |        FILTER CURRENT._type == "Write"
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
        |                "_type": CURRENT._type,
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
        |        "extra"     : exec.extra,
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

  override def getDataSources(execPlanId: String, access: Option[DataSourceActionType])(implicit ec: ExecutionContext): Future[Array[String]] =  {
    access
      .map({
        case Read =>  db.queryStream[String](
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

  override def getExecutionPlan(dsId: String, access: Option[DataSourceActionType])(implicit ec: ExecutionContext): Future[Array[String]] =  {
    access
      .map({
        case Read =>  db.queryStream[String](
          """
            |FOR execPlan IN 1..1
            |INBOUND DOCUMENT('dataSource', @dsId) depends
            |RETURN execPlan.extra.appName
            |""".stripMargin,
          Map("dsId" -> dsId)
        ).map(_.toArray)

        case Write => db.queryStream[String](
          """
            |FOR execPlan IN 1..1
            |INBOUND DOCUMENT('dataSource', @dsId) affects
            |RETURN execPlan.extra.appName
            |""".stripMargin,
          Map("dsId" -> dsId)
        ).map(_.toArray)
      })
      .getOrElse({
        db.queryStream[String](
          """
            |FOR execPlan IN 1..1
            |INBOUND DOCUMENT('dataSource', @dsId) affects, depends
            |RETURN execPlan.extra.appName
            |""".stripMargin,
          Map("dsId" -> dsId)
        ).map(_.toArray)
      })
  }
}

object ExecutionPlanRepositoryImpl {

  case class AnyOperation(
    override val params: Map[String, Any],
    override val extra: Map[String, Any],
    override val outputSchema: Option[Array[String]],
    override val _key: String,
    override val _type: String
  ) extends Operation {
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
