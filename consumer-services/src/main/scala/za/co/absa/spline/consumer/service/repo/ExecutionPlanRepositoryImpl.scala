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
import za.co.absa.spline.consumer.service.model.{DataSourceInfo, ExecutedLogicalPlan}
import za.co.absa.spline.consumer.service.model.ExecutionInfo.Id

import scala.concurrent.{ExecutionContext, Future}

@Repository
class ExecutionPlanRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends ExecutionPlanRepository {

  import za.co.absa.spline.persistence.ArangoImplicits._

  override def findById(execId: Id)
                       (implicit ec: ExecutionContext): Future[ExecutedLogicalPlan] = {
    db.queryOne[ExecutedLogicalPlan](
      """
      FOR exec IN execution
          FILTER exec._key == @execId
          LET opWithEdgePairs = (
              FOR v, e IN 1..99999
              OUTBOUND exec executes, follows
              OPTIONS {uniqueEdges: "none"}
                  LET operation = MERGE(KEEP(v, "_type", "name", "properties"), {"_id": v._key})
                  LET inboundEdge = {
                      "source": PARSE_IDENTIFIER(e._to).key,
                      "target": PARSE_IDENTIFIER(e._from).key
                  }
                  RETURN [operation, inboundEdge]
          )
          LET nodes = (FOR pair IN opWithEdgePairs RETURN pair[0])
          LET edges = (FOR pair IN SLICE(opWithEdgePairs, 1) RETURN pair[1])

          LET inputSources = FLATTEN(
            FOR node IN nodes
                FILTER node._type == "Read"
                LET sources = (
                     FOR s IN node.properties.inputSources
                         RETURN { "sourceType" : node.properties.sourceType , "source" : s}
                )
                RETURN sources
          )

          LET outputSource = (
            FOR node IN nodes
              FILTER node._type == "Write"
                RETURN { "sourceType": node.properties.destinationType, "source": node.properties.outputSource }
          )

          LET simpleNodes = (
            FOR n IN nodes
              RETURN KEEP(n, "_id", "_type", "name")
          )

          RETURN {
            "plan": {"nodes" : simpleNodes, "edges" : edges},
            "execution": {"_id": exec._key, "extra" : MERGE(exec.extra, {"inputSources" : inputSources, "outputSource": FIRST(outputSource)}) }
          }
      """,
      Map("execId" -> execId)
    )
  }

  override def findInputDataSourceInfoById(execId: Id)
                                (implicit ec: ExecutionContext): Future[Array[DataSourceInfo]] = {

    db.queryOne[Array[DataSourceInfo]](
      """
        FOR exec IN execution
            FILTER exec._key == @execId
        
            LET sources = FIRST(
              FOR v, e IN 1..99999
                OUTBOUND exec executes, follows, readsFrom
                FILTER v._type == "Read"
                RETURN v.properties
            )
        
            LET inputDataSourceInfo = (
                FOR inputSource IN sources.inputSources
                RETURN {
                  "sourceType" : sources.sourceType,
                  "source" : inputSource
                }
            )
            
            RETURN inputDataSourceInfo
      """,
      Map("execId" -> execId)
    )
  }
}
