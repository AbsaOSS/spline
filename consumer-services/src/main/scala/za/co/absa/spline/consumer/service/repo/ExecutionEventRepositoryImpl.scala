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
import org.apache.commons.lang3.StringUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.consumer.service.model._

import scala.compat.java8.StreamConverters._
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
  )(implicit ec: ExecutionContext): Future[PageableExecutionEventsResponse] = {
    import za.co.absa.spline.persistence.ArangoImplicits._

    val eventualTotalDateRange = db.queryOne[Array[Long]](
      """
        |FOR ee IN progress
        |    FILTER ee._creationTimestamp <= @asAtTime
        |    COLLECT AGGREGATE
        |        minTimestamp = MIN(ee.timestamp),
        |        maxTimestamp = MAX(ee.timestamp)
        |    RETURN [
        |        minTimestamp || DATE_NOW(),
        |        maxTimestamp || DATE_NOW()
        |    ]
        |""".stripMargin,
      Map(
        "asAtTime" -> (pageRequest.asAtTime: java.lang.Long)
      ))

    val eventualArangoCursorAsync = db.queryAs[ExecutionEventInfo](
      """
        |FOR ee IN progress
        |    FILTER ee._creationTimestamp <= @asAtTime
        |        && ee.timestamp >= @timestampStart
        |        && ee.timestamp <= @timestampEnd
        |
        |    LET executionEventDetails = FIRST(
        |        FOR v,e,p IN 2 OUTBOUND ee progressOf, executes
        |            LET exec = p.vertices[1]
        |            LET ope = v
        |            RETURN {
        |                "executionEventId" : ee._key,
        |                "frameworkName" : CONCAT(exec.extra.systemInfo.name, " ", exec.extra.systemInfo.version),
        |                "applicationName" : exec.extra.appName,
        |                "applicationId" : ee.extra.appId,
        |                "timestamp" : ee.timestamp,
        |                "datasource" : ope.properties.outputSource,
        |                "datasourceType" : ope.properties.destinationType,
        |                "append" : ope.properties.append
        |            }
        |    )
        |
        |    FILTER LENGTH(@searchTerm) == 0
        |        || executionEventDetails.timestamp == @searchTerm
        |        || CONTAINS(LOWER(executionEventDetails.frameworkName), @searchTerm)
        |        || CONTAINS(LOWER(executionEventDetails.applicationName), @searchTerm)
        |        || CONTAINS(LOWER(executionEventDetails.applicationId), @searchTerm)
        |        || CONTAINS(LOWER(executionEventDetails.datasource), @searchTerm)
        |        || CONTAINS(LOWER(executionEventDetails.datasourceType), @searchTerm)
        |
        |    SORT executionEventDetails.@sortField @sortDirection
        |    LIMIT @offset*@size, @size
        |
        |    RETURN executionEventDetails
        |""".stripMargin,
      Map(
        "timestampStart" -> (timestampStart: java.lang.Long),
        "timestampEnd" -> (timestampEnd: java.lang.Long),
        "asAtTime" -> (pageRequest.asAtTime: java.lang.Long),
        "offset" -> (pageRequest.offset: Integer),
        "size" -> (pageRequest.size: Integer),
        "sortField" -> sortRequest.sortName,
        "sortDirection" -> sortRequest.sortDirection,
        "searchTerm" -> StringUtils.lowerCase(searchTerm)
      ),
      new AqlQueryOptions().fullCount(true)
    )

    for {
      arangoCursorAsync <- eventualArangoCursorAsync
      totalDateRange <- eventualTotalDateRange
    } yield
      PageableExecutionEventsResponse(
        arangoCursorAsync.streamRemaining().toScala.toArray,
        arangoCursorAsync.getStats.getFullCount,
        pageRequest.offset,
        pageRequest.size,
        totalDateRange)
  }

  override def search(applicationId: String, destinationPath: String)(implicit ec: ExecutionContext): Future[ExecutionEvent] = {
    import za.co.absa.spline.persistence.ArangoImplicits._

    db.queryOne[ExecutionEvent](
      """
        |FOR ds IN dataSource
        |    FILTER ds.uri == @destinationPath
        |    FOR e IN 2
        |        INBOUND ds affects, progressOf
        |        FILTER e.extra.appId == @applicationId
        |        RETURN MERGE(
        |            UNSET(e, "_rev", "_id", "_key", "_creationTimestamp"),
        |            {
        |                "creationTimestamp": e._creationTimestamp,
        |                "id": e._key
        |            }
        |        )
        |""".stripMargin,
      Map("applicationId" -> applicationId, "destinationPath" -> destinationPath)
    )
  }
}