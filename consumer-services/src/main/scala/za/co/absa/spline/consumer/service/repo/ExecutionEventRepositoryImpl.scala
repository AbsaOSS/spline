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
import com.arangodb.model.AqlQueryOptions
import org.apache.commons.lang3.StringUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.consumer.service.repo.ExecutionEventRepositoryImpl.SortFieldMap

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
        |    FILTER !LENGTH(@applicationId) || @applicationId == ee.extra.appId
        |    FILTER !LENGTH(@dataSourceUri) || @dataSourceUri == ee.execPlanDetails.dataSourceUri
        |    FILTER !LENGTH(@searchTerm)
        |        || ee.timestamp == @searchTerm
        |        || CONTAINS(LOWER(ee.execPlanDetails.frameworkName), @searchTerm)
        |        || CONTAINS(LOWER(ee.execPlanDetails.applicationName), @searchTerm)
        |        || CONTAINS(LOWER(ee.extra.appId), @searchTerm)
        |        || CONTAINS(LOWER(ee.execPlanDetails.dataSourceUri), @searchTerm)
        |        || CONTAINS(LOWER(ee.execPlanDetails.dataSourceType), @searchTerm)
        |
        |    SORT ee.@sortField @sortOrder
        |    LIMIT @pageOffset*@pageSize, @pageSize
        |
        |    RETURN {
        |        "executionEventId" : ee._key,
        |        "executionPlanId" : ee.execPlanDetails.executionPlanId,
        |        "frameworkName" : ee.execPlanDetails.frameworkName,
        |        "applicationName" : ee.execPlanDetails.applicationName,
        |        "applicationId" : ee.extra.appId,
        |        "timestamp" : ee.timestamp,
        |        "dataSourceUri" : ee.execPlanDetails.dataSourceUri,
        |        "dataSourceType" : ee.execPlanDetails.dataSourceType,
        |        "append" : ee.execPlanDetails.append
        |    }
        |
        |""".stripMargin,
      Map(
        "asAtTime" -> (asAtTime: java.lang.Long),
        "timestampStart" -> (timestampStart: java.lang.Long),
        "timestampEnd" -> (timestampEnd: java.lang.Long),
        "pageOffset" -> (pageRequest.page - 1: Integer),
        "pageSize" -> (pageRequest.size: Integer),
        "sortField" -> SortFieldMap.getOrElse(sortRequest.sortField, sortRequest.sortField),
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

object ExecutionEventRepositoryImpl {
  val SortFieldMap = Map(
    "executionEventId" -> "_key",
    "executionPlanId" -> List("execPlanDetails", "executionPlanId"),
    "frameworkName" -> List("execPlanDetails", "frameworkName"),
    "applicationName" -> List("execPlanDetails", "applicationName"),
    "applicationId" -> List("extra", "appId"),
    "dataSourceUri" -> List("execPlanDetails", "dataSourceUri"),
    "dataSourceType" -> List("execPlanDetails", "dataSourceType"),
    "append" -> List("execPlanDetails", "append")
  )
}

