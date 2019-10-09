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
import za.co.absa.spline.consumer.service.model.ExecutionInfo.Id
import za.co.absa.spline.consumer.service.model.{DataSourceInfo, ExecutedLogicalPlan}

import scala.concurrent.{ExecutionContext, Future}

@Repository
class ExecutionPlanRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends ExecutionPlanRepository {

  import za.co.absa.spline.persistence.ArangoImplicits._

  override def findById(execId: Id)(implicit ec: ExecutionContext): Future[ExecutedLogicalPlan] = {
    db.queryOne[ExecutedLogicalPlan](
      """
        LET exec = FIRST(FOR ex IN execution FILTER ex._key == @execId RETURN ex)
        LET writeOp = FIRST(FOR v IN 1 OUTBOUND exec executes RETURN v)

        LET opsWithInboundEdges = (
            FOR vi, ei IN 0..99999
                OUTBOUND writeOp follows
                COLLECT v=vi INTO edgesByVertex
                RETURN {
                    "op": v,
                    "es": UNIQUE(edgesByVertex[* FILTER NOT_NULL(CURRENT.ei)].ei)
                }
            )

        LET ops = opsWithInboundEdges[*].op
        LET edges = opsWithInboundEdges[*].es[**]

        LET inputSources = FLATTEN(
            FOR op IN ops
                FILTER op._type == "Read"
                RETURN op.properties.inputSources[* RETURN {
                    "source": CURRENT,
                    "sourceType": op.properties.sourceType
                }]
            )

        LET outputSource = FIRST(
            ops[*
                FILTER CURRENT._type == "Write"
                RETURN {
                    "source": CURRENT.properties.outputSource,
                    "sourceType": CURRENT.properties.destinationType
                }]
            )

        RETURN {
            "plan": {
                "nodes": ops[* RETURN MERGE(
                        {"_id": CURRENT._key},
                        KEEP(CURRENT, "_type", "name")
                    )],
                "edges": edges[* RETURN {
                        "source": PARSE_IDENTIFIER(CURRENT._to).key,
                        "target": PARSE_IDENTIFIER(CURRENT._from).key
                    }]
            },
            "execution": {
                "_id": exec._key,
                "extra" : MERGE(
                    exec.extra, {
                    "inputSources" : inputSources,
                    "outputSource": outputSource
                })
            }
        }""",
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
