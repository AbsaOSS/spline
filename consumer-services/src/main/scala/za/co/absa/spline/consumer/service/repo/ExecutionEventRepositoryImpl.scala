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
import com.arangodb.model.AqlQueryOptions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.consumer.service.model.{ExecutionEvent, PageRequest, Pageable, SortRequest}

import scala.concurrent.{ExecutionContext, Future}

@Repository
class ExecutionEventRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends ExecutionEventRepository {

  override def findByTimestampRange
  (
    timestampStart: Long,
    timestampEnd: Long,
    pageRequest: PageRequest,
    sortRequest: SortRequest,
    searchTerm: String
  )(implicit ec: ExecutionContext): Future[Pageable[ExecutionEvent]] = {
    import za.co.absa.spline.persistence.ArangoImplicits._

    val arangoCursorAsync = db.queryAs[Array[ExecutionEvent]](
      """
        LET executionEventsFiltered = (
          FOR p IN progress
            FILTER p._creationTimestamp < TO_NUMBER(@asAtTime) && p.timestamp >= TO_NUMBER(@timestampStart) && p.timestamp <= TO_NUMBER(@timestampEnd)
            RETURN p
        )

        LET executionEventsDefault = (
          FOR p IN progress
            FILTER p._creationTimestamp < TO_NUMBER(@asAtTime)
            SORT p.timestamp desc
            LIMIT 100
            RETURN p
        )

        LET executionEvents = @timestampStart == 0 ? executionEventsDefault : executionEventsFiltered
          RETURN (
            FOR ee IN executionEvents
              LET executionEventDetails = FIRST(
                FOR po IN progressOf
                  FILTER po._from == ee._id
                  LET exec = FIRST(
                      FOR exec IN execution
                          FILTER exec._id == po._to
                          RETURN exec
                  )
                  LET ope = FIRST(
                      FOR ex IN executes
                          FILTER ex._from == exec._id
                          LET o = FIRST(
                              FOR op IN operation
                                  FILTER op._id == ex._to
                                  RETURN op
                          )
                          RETURN o
                  )
                RETURN {
                    "frameworkName" : CONCAT([exec.extra.systemInfo.name, " ", exec.extra.systemInfo.version]),
                    "applicationName" : exec.extra.appName,
                    "applicationId" : ee.extra.appId,
                    "timestamp" : ee.timestamp,
                    "datasource" : ope.properties.outputSource,
                    "datasourceType" : ope.properties.destinationType,
                    "append" : ope.properties.append
                }
              )
              FILTER  LENGTH(@searchTerm) == 0 ? : CONTAINS(LOWER(executionEventDetails.frameworkName), LOWER(@searchTerm))
                    || CONTAINS(LOWER(executionEventDetails.applicationName), LOWER(@searchTerm))
                    || SUBSTITUTE(executionEventDetails.applicationId, "-", ",") == SUBSTITUTE(@searchTerm, "-", ",")
                    || CONTAINS(LOWER(executionEventDetails.timestamp), LOWER(@searchTerm))
                    || CONTAINS(LOWER(executionEventDetails.datasource), LOWER(@searchTerm))
                    || CONTAINS(LOWER(executionEventDetails.datasourceType), LOWER(@searchTerm))
                    || CONTAINS(LOWER(executionEventDetails.append), LOWER(@searchTerm))
              SORT executionEventDetails.@sortName @sortDirection
              LIMIT @offset, @size
              RETURN executionEventDetails
          )

      """,
      Map(
        "timestampStart" -> (timestampStart: java.lang.Long),
        "timestampEnd" -> (timestampEnd: java.lang.Long),
        "asAtTime" -> (pageRequest.asAtTime: java.lang.Long),
        "offset" -> (pageRequest.offset: Integer),
        "size" -> (pageRequest.size: Integer),
        "sortName" -> sortRequest.sortName,
        "sortDirection" -> sortRequest.sortDirection,
        "searchTerm" -> searchTerm
      ),
      new AqlQueryOptions().fullCount(true))

    for {
      query <- arangoCursorAsync
      fullCount = query.getStats.getFullCount
      if query.hasNext
    } yield new Pageable[ExecutionEvent](query.next, fullCount, pageRequest.offset, pageRequest.size)
  }
}
