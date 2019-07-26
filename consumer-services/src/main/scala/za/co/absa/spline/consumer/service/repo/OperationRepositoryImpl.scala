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
import za.co.absa.spline.consumer.service.model.{Operation, OperationDetails}

import scala.concurrent.{ExecutionContext, Future}

@Repository
class OperationRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends OperationRepository {

  import za.co.absa.spline.persistence.ArangoImplicits._

  override def findById(operationId: Operation.Id)(implicit ec: ExecutionContext): Future[OperationDetails] = {
    db.queryOne[OperationDetails](
      """
        RETURN SPLINE::FIND_OPERATION_BY_ID(@operationId)
      """,
      Map("operationId" -> operationId)
    )
  }

  override def findBySourceAndApplicationId(source: String, applicationId : String)(implicit ec: ExecutionContext): Future[OperationDetails] = {
    db.queryOne[OperationDetails](
      """
         LET writeOp = FIRST(
             FOR ope IN operation
                 FILTER ope.properties.outputSource == @source
                 LET executionEventFiltered = FIRST(
                     FOR v, e IN 1..9999
                         INBOUND ope executes, progressOf
                         OPTIONS {uniqueEdges: "none"}
                         FILTER v.extra.appId == @applicationId
                         RETURN v
                 )
                 RETURN executionEventFiltered && ope
             )
         
         LET pairExecutionKeyTimestamp = FIRST(
             FOR p IN progress
                 FILTER p.extra.appId == @applicationId
                 LET timestamp = p.timestamp
                 LET executionKey = FIRST(
                     FOR v, e IN 1..9999
                     OUTBOUND p progressOf
                     OPTIONS {uniqueEdges: "none"}
                     RETURN v._key
                 )
                 RETURN { "executionKey" : executionKey, "timestamp" : timestamp }
         )
         LET previousExecutions = SPLINE::FIND_PREVIOUS_EXECUTIONS(pairExecutionKeyTimestamp.executionKey, pairExecutionKeyTimestamp.timestamp, 5)
         
         LET previousApplicationIds = UNIQUE(
             FOR exec in execution
             FILTER CONTAINS(previousExecutions, exec._key)
             LET appId = FIRST(
                 FOR v, e IN 1..9999
                 INBOUND exec progressOf
                 OPTIONS {uniqueEdges: "none"}
                 RETURN v.extra.appId
             )
             RETURN appId
         )
         
         LET readOp = FIRST(
             FOR ope IN operation
                 FILTER CONTAINS(ope.properties.inputSources, @source)
                 LET executionEventFiltered = FIRST(
                     FOR v, e IN 1..9999
                         INBOUND ope follows, executes, progressOf
                         FILTER CONTAINS(APPEND(previousApplicationIds, @applicationId), v.extra.appId)
                         RETURN v
                 )
         
                RETURN executionEventFiltered && ope
         )
         
         LET op = writeOp != null ? writeOp : readOp
         RETURN SPLINE::FIND_OPERATION_BY_ID(op._key)
      """,
      Map("source" -> source, "applicationId" -> applicationId)
    )
  }
}
