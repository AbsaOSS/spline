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
import za.co.absa.spline.consumer.service.model.ExecutionPlanInfo.Id
import za.co.absa.spline.consumer.service.model.LineageDetailed

import scala.concurrent.{ExecutionContext, Future}

@Repository
class ExecutionPlanRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends ExecutionPlanRepository {

  import za.co.absa.spline.persistence.ArangoImplicits._

  override def findById(execId: Id)(implicit ec: ExecutionContext): Future[LineageDetailed] = {
    db.queryOne[LineageDetailed](
      """
        LET exec = FIRST(FOR ex IN executionPlan FILTER ex._key == @execId RETURN ex)
        LET writeOp = FIRST(FOR v IN 1 OUTBOUND exec executes RETURN v)

        LET opsWithInboundEdges = (
            FOR vi, ei IN 0..99999
                OUTBOUND writeOp follows
                COLLECT v = vi INTO edgesByVertex
                RETURN {
                    "op": v,
                    "es": UNIQUE(edgesByVertex[* FILTER NOT_NULL(CURRENT.ei)].ei)
                }
            )

        LET ops = opsWithInboundEdges[*].op
        LET edges = opsWithInboundEdges[*].es[**]

        LET inputs = FLATTEN(
            FOR op IN ops
                FILTER op._type == "Read"
                RETURN op.properties.inputSources[* RETURN {
                    "source"    : CURRENT,
                    "sourceType": op.properties.sourceType
                }]
            )

        LET output = FIRST(
            ops[*
                FILTER CURRENT._type == "Write"
                RETURN {
                    "source"    : CURRENT.properties.outputSource,
                    "sourceType": CURRENT.properties.destinationType
                }]
            )

        RETURN {
            "graph": {
                "nodes": ops[* RETURN MERGE(
                        {"_id": CURRENT._key},
                        KEEP(CURRENT, "_type", "name")
                    )],
                "edges": edges[* RETURN {
                        "source": PARSE_IDENTIFIER(CURRENT._to).key,
                        "target": PARSE_IDENTIFIER(CURRENT._from).key
                    }]
            },
            "executionPlan": {
                "_id": exec._key,
                "systemInfo": exec.systemInfo,
                "agentInfo" : exec.agentInfo,
                "extra"     : exec.extra,
                "inputs"    : inputs,
                "output"    : output
            }
        }""",
      Map("execId" -> execId)
    )
  }


}
