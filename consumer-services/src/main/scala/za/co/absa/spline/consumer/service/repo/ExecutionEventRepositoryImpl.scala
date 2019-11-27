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
    asAtTime: Long,
    timestampStart: Long,
    timestampEnd: Long,
    pageRequest: PageRequest,
    sortRequest: SortRequest,
    searchTerm: String,
    applicationId: String,
    dataSourceUri: String
  )(implicit ec: ExecutionContext): Future[PageableExecutionEventsResponse] = {
    import za.co.absa.spline.persistence.ArangoImplicits._

    val eventualTotalDateRange = db.queryOne[Array[Long]](
      """
        |FOR ee IN progress
        |    FILTER ee._created <= @asAtTime
        |    COLLECT AGGREGATE
        |        minTimestamp = MIN(ee.timestamp),
        |        maxTimestamp = MAX(ee.timestamp)
        |    RETURN [
        |        minTimestamp || DATE_NOW(),
        |        maxTimestamp || DATE_NOW()
        |    ]
        |""".stripMargin,
      Map(
        "asAtTime" -> (asAtTime: java.lang.Long)
      ))

    val eventualArangoCursorAsync = db.queryAs[ExecutionEventInfo](
      """
        |FOR ee IN progress
        |    FILTER ee._created <= @asAtTime
        |        && ee.timestamp >= @timestampStart
        |        && ee.timestamp <= @timestampEnd
        |
        |    LET executionEventDetails = FIRST(
        |        FOR v,e,p IN 2 OUTBOUND ee progressOf, executes
        |            LET exec = p.vertices[1]
        |            LET ope = v
        |            RETURN {
        |                "executionEventId" : ee._key,
        |                "executionPlanId" : exec._key,
        |                "frameworkName" : CONCAT(exec.systemInfo.name, " ", exec.systemInfo.version),
        |                "applicationName" : exec.extra.appName,
        |                "applicationId" : ee.extra.appId,
        |                "timestamp" : ee.timestamp,
        |                "dataSourceUri" : ope.outputSource,
        |                "dataSourceType" : ope.properties.destinationType,
        |                "append" : ope.append
        |            }
        |    )
        |
        |    FILTER !LENGTH(@applicationId) || @applicationId == executionEventDetails.applicationId
        |    FILTER !LENGTH(@dataSourceUri) || @dataSourceUri == executionEventDetails.dataSourceUri
        |    FILTER !LENGTH(@searchTerm)
        |        || executionEventDetails.timestamp == @searchTerm
        |        || CONTAINS(LOWER(executionEventDetails.frameworkName), @searchTerm)
        |        || CONTAINS(LOWER(executionEventDetails.applicationName), @searchTerm)
        |        || CONTAINS(LOWER(executionEventDetails.applicationId), @searchTerm)
        |        || CONTAINS(LOWER(executionEventDetails.dataSourceUri), @searchTerm)
        |        || CONTAINS(LOWER(executionEventDetails.dataSourceType), @searchTerm)
        |
        |    SORT executionEventDetails.@sortField @sortOrder
        |    LIMIT @pageOffset*@pageSize, @pageSize
        |
        |    RETURN executionEventDetails
        |""".stripMargin,
      Map(
        "asAtTime" -> (asAtTime: java.lang.Long),
        "timestampStart" -> (timestampStart: java.lang.Long),
        "timestampEnd" -> (timestampEnd: java.lang.Long),
        "pageOffset" -> (pageRequest.page - 1: Integer),
        "pageSize" -> (pageRequest.size: Integer),
        "sortField" -> sortRequest.sortField,
        "sortOrder" -> sortRequest.sortOrder,
        "searchTerm" -> StringUtils.lowerCase(searchTerm),
        "applicationId" -> applicationId,
        "dataSourceUri" -> dataSourceUri
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
        pageRequest.page,
        pageRequest.size,
        totalDateRange)
  }
}