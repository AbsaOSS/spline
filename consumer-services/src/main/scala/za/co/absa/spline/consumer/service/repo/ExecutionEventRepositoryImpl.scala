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
import za.co.absa.spline.persistence.ArangoImplicits._

import scala.compat.java8.StreamConverters._
import scala.concurrent.{ExecutionContext, Future}

@Repository
class ExecutionEventRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends ExecutionEventRepository {

  override def getTimestampRange(
    asAtTime: Long,
    maybeSearchTerm: Option[String],
    maybeAppend: Option[Boolean],
    maybeApplicationId: Option[String],
    maybeDataSourceUri: Option[String]
  )(implicit ec: ExecutionContext): Future[(Long, Long)] = {
    db.queryOne[Array[Long]](
      """
        |WITH progress
        |FOR ee IN progress
        |    FILTER ee._created <= @asAtTime
        |
        |    FILTER @applicationId == null OR @applicationId == ee.extra.appId
        |    FILTER @dataSourceUri == null OR @dataSourceUri == ee.execPlanDetails.dataSourceUri
        |    FILTER @writeAppend == null   OR @writeAppend   == ee.execPlanDetails.append
        |
        |    FILTER @searchTerm == null
        |            OR @searchTerm == ee.timestamp
        |            OR CONTAINS(LOWER(ee.execPlanDetails.frameworkName), @searchTerm)
        |            OR CONTAINS(LOWER(ee.execPlanDetails.applicationName), @searchTerm)
        |            OR CONTAINS(LOWER(ee.extra.appId), @searchTerm)
        |            OR CONTAINS(LOWER(ee.execPlanDetails.dataSourceUri), @searchTerm)
        |            OR CONTAINS(LOWER(ee.execPlanDetails.dataSourceType), @searchTerm)
        |
        |    COLLECT AGGREGATE
        |        minTimestamp = MIN(ee.timestamp),
        |        maxTimestamp = MAX(ee.timestamp)
        |
        |    RETURN [
        |        minTimestamp || DATE_NOW(),
        |        maxTimestamp || DATE_NOW()
        |    ]
        |""".stripMargin,
      Map(
        "asAtTime" -> Long.box(asAtTime),
        "searchTerm" -> maybeSearchTerm.map(StringUtils.lowerCase).orNull,
        "writeAppend" -> maybeAppend.map(Boolean.box).orNull,
        "applicationId" -> maybeApplicationId.orNull,
        "dataSourceUri" -> maybeDataSourceUri.orNull
      )
    ).map { case Array(from, to) => from -> to }
  }

  override def findByTimestampRange(
    asAtTime: Long,
    timestampStart: Long,
    timestampEnd: Long,
    pageRequest: PageRequest,
    sortRequest: SortRequest,
    maybeSearchTerm: Option[String],
    maybeAppend: Option[Boolean],
    maybeApplicationId: Option[String],
    maybeDataSourceUri: Option[String]
  )(implicit ec: ExecutionContext): Future[(Seq[WriteEventInfo], Long)] = {
    db.queryAs[WriteEventInfo](
      """
        |WITH progress
        |FOR ee IN progress
        |    FILTER ee._created <= @asAtTime
        |       AND ee.timestamp >= @timestampStart
        |       AND ee.timestamp <= @timestampEnd
        |
        |    FILTER @applicationId == null OR @applicationId == ee.extra.appId
        |    FILTER @dataSourceUri == null OR @dataSourceUri == ee.execPlanDetails.dataSourceUri
        |    FILTER @writeAppend == null   OR @writeAppend   == ee.execPlanDetails.append
        |
        |    FILTER @searchTerm == null
        |            OR @searchTerm == ee.timestamp
        |            OR CONTAINS(LOWER(ee.execPlanDetails.frameworkName), @searchTerm)
        |            OR CONTAINS(LOWER(ee.execPlanDetails.applicationName), @searchTerm)
        |            OR CONTAINS(LOWER(ee.extra.appId), @searchTerm)
        |            OR CONTAINS(LOWER(ee.execPlanDetails.dataSourceUri), @searchTerm)
        |            OR CONTAINS(LOWER(ee.execPlanDetails.dataSourceType), @searchTerm)
        |
        |    LET resItem = {
        |        "executionEventId" : ee._key,
        |        "executionPlanId"  : ee.execPlanDetails.executionPlanKey,
        |        "frameworkName"    : ee.execPlanDetails.frameworkName,
        |        "applicationName"  : ee.execPlanDetails.applicationName,
        |        "applicationId"    : ee.extra.appId,
        |        "timestamp"        : ee.timestamp,
        |        "dataSourceName"   : REGEX_MATCHES(ee.execPlanDetails.dataSourceUri, "([^/]+)/*$")[1],
        |        "dataSourceUri"    : ee.execPlanDetails.dataSourceUri,
        |        "dataSourceType"   : ee.execPlanDetails.dataSourceType,
        |        "append"           : ee.execPlanDetails.append
        |    }
        |
        |    SORT resItem.@sortField @sortOrder
        |    LIMIT @pageOffset*@pageSize, @pageSize
        |
        |    RETURN resItem
        |""".stripMargin,
      Map(
        "asAtTime" -> Long.box(asAtTime),
        "timestampStart" -> Long.box(timestampStart),
        "timestampEnd" -> Long.box(timestampEnd),
        "pageOffset" -> Int.box(pageRequest.page - 1),
        "pageSize" -> Int.box(pageRequest.size),
        "sortField" -> sortRequest.sortField,
        "sortOrder" -> sortRequest.sortOrder,
        "searchTerm" -> maybeSearchTerm.map(StringUtils.lowerCase).orNull,
        "writeAppend" -> maybeAppend.map(Boolean.box).orNull,
        "applicationId" -> maybeApplicationId.orNull,
        "dataSourceUri" -> maybeDataSourceUri.orNull
      ),
      new AqlQueryOptions().fullCount(true)
    ).map {
      arangoCursorAsync =>
        val items = arangoCursorAsync.streamRemaining().toScala
        val totalCount = arangoCursorAsync.getStats.getFullCount
        items -> totalCount
    }
  }
}
