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
import za.co.absa.spline.consumer.service.model.LineageOverview

import scala.concurrent.{ExecutionContext, Future}

@Repository
class LineageRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends LineageRepository {

  import za.co.absa.spline.persistence.ArangoImplicits._

  override def findExecutionEventId(executionEventId : String, depth: String)(implicit ec: ExecutionContext): Future[LineageOverview] = {
    db.queryOne[LineageOverview](
      """
        LET executionEvent = FIRST(
            FOR p IN progress
                FILTER p._key == @executionEventId
                RETURN p
        )

        LET finalExecutions = (
            FOR po in progressOf
                FILTER po._from == executionEvent._id
                RETURN DOCUMENT(po._to)
        )

        LET endNode = (
             FOR a IN affects
             FILTER a._from == finalExecutions[0]._id
             LET ds = DOCUMENT(a._to)
             RETURN MERGE(UNSET(ds, "_rev", "_id", "_key", "uri" ), {"_id" : ds._key, "_class" : "za.co.absa.spline.consumer.service.model.DataSourceNode", "name" : ds.uri})
        )


        LET previousExecutionsKeys = SPLINE::FIND_PREVIOUS_EXECUTIONS(finalExecutions[0]._key, executionEvent.timestamp, @depth)
        LET allExecutionKeys = APPEND(previousExecutionsKeys, finalExecutions[0]._key)

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

        LET lineageInfo = { "timestamp" : executionEvent.timestamp, "applicationId" : executionEvent.extra.appId }
        RETURN allExecutionKeys == [] ? null  : { "lineage" : lineage, "lineageInfo" : lineageInfo }

      """,
      Map("executionEventId" -> executionEventId, "depth" -> depth)
    )
  }
}
