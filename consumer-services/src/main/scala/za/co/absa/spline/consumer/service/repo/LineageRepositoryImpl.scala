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

import com.arangodb.ArangoDatabaseAsync
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.consumer.service.model.{Lineage, LineageOverview}

import scala.concurrent.{ExecutionContext, Future}

@Repository
class LineageRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends LineageRepository {

  import za.co.absa.spline.persistence.ArangoImplicits._

  override def findByApplicationIdAndPath(path: String, applicationId: String, depth: String)(implicit ec: ExecutionContext): Future[LineageOverview] = {
    db.queryOne[LineageOverview](
      """
        LET endNode = (
            FOR ds IN dataSource
                FILTER ds.uri == @path
                RETURN MERGE(UNSET(ds, "_rev", "_id", "_key", "uri" ), {"_id" : ds._key, "_class" : "za.co.absa.spline.consumer.service.model.DataSourceNode", "name" : ds.uri})
        )

        LET endExecutionKey = FIRST(
            FOR w IN operation
              FILTER w.properties.outputSource == @path
              FOR exec IN executes
                  FILTER exec._to == w._id
                  FOR ex IN execution
                      FILTER ex._id == exec._from
                      RETURN ex._key
        )

        LET pairTimestampStartExecutionKeys = FIRST(
          FOR p IN progress
            FILTER p.extra.appId == @applicationId
            LET timestamp = p.timestamp
            LET startExecutionKeys = (
                FOR po IN progressOf
                    FILTER po._from == p._id
                    FOR exec IN executes
                        FILTER exec._from == po._to
                        FOR ex IN execution
                            FILTER ex._id == exec._from
                            RETURN ex._key
            )
            RETURN {"timestamp": timestamp, "startExecutionKeys" : startExecutionKeys}
        )

        LET finalExecutionKey = CONTAINS(pairTimestampStartExecutionKeys.startExecutionKeys, endExecutionKey) == true ? endExecutionKey  : null
        LET previousExecutionsKeys = SPLINE::FIND_PREVIOUS_EXECUTIONS(finalExecutionKey, pairTimestampStartExecutionKeys.timestamp, @depth)
        LET allExecutionKeys = APPEND(previousExecutionsKeys, finalExecutionKey)

        LET lineage = FIRST(
        LET lineageGraph = (
        FOR exec IN execution
            FILTER exec._key IN allExecutionKeys
                LET allNodes = (
                  FOR v, e IN 1..99999
                  OUTBOUND exec executes, follows, readsFrom, writesTo
                  OPTIONS {uniqueEdges: "none"}
                  FILTER IS_SAME_COLLECTION("readsFrom", e) || IS_SAME_COLLECTION("writesTo",e)
                  RETURN MERGE(
                    UNSET(v, "_rev", "_id", "_key", "uri"),
                    IS_SAME_COLLECTION("writesTo", e)
                    ? {"_id": exec._key, "_class" : "za.co.absa.spline.consumer.service.model.ExecutionNode", "writesTo" : v._key, "name": exec.extra.appName}
                    : {"_id": v._key, "name": v.uri, "_class" : "za.co.absa.spline.consumer.service.model.DataSourceNode" }
                  )
                )

                LET dataSourceNodes = (
                    FOR op IN allNodes
                    FILTER op.writesTo == null
                    RETURN op
                )
                LET executionNode = FIRST(
                    FOR op IN allNodes
                    FILTER op.writesTo != null
                    RETURN op
                )
                LET edgesFromRead = (
                    FOR op IN dataSourceNodes
                        LET inboundEdge = {
                            "source": op._id,
                            "target": executionNode._id
                        }
                        RETURN inboundEdge
                )

                LET edgeFromWrite = {
                    "source" : executionNode._id,
                    "target" : executionNode.writesTo
                }

                RETURN  { "nodes" : allNodes, "edges" : APPEND(edgesFromRead, edgeFromWrite) }
        )

        LET appendedNodes = ( FOR i IN lineageGraph RETURN APPEND([], i.nodes) )
        LET appendedEdges = ( FOR i IN lineageGraph RETURN APPEND([], i.edges) )

        RETURN {"nodes" : FLATTEN(APPEND(appendedNodes, endNode)), "edges": FLATTEN(appendedEdges) }
        )

        LET lineageInfo = { "timestamp" : pairTimestampStartExecutionKeys.timestamp, "applicationId" : @applicationId }
        RETURN allExecutionKeys == [] ? null  : { "lineage" : lineage, "lineageInfo" : lineageInfo }

      """,
      Map("path" -> path, "applicationId" -> applicationId, "depth" -> depth)
    )
  }
}
