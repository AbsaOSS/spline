/*
 * Copyright 2021 ABSA Group Limited
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
class DataSourceRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends DataSourceRepository {
  override def find(
    asAtTime: Long,
    writeTimestampStart: Long,
    writeTimestampEnd: Long,
    pageRequest: PageRequest,
    sortRequest: SortRequest,
    searchTerm: String,
    writeApplicationId: String,
    dataSourceUri: String
  )(implicit ec: ExecutionContext): Future[(Seq[WriteEventInfo], Long)] = {

    db.queryAs[WriteEventInfo](
      """
        |WITH progress, progressOf, executionPlan, affects, dataSource
        |FOR ds IN dataSource
        |    FILTER ds._created <= @asAtTime
        |    FILTER NOT @dataSourceUri
        |            OR @dataSourceUri == ds.uri
        |
        |    // last write event or null
        |    LET lwe = FIRST(
        |        FOR we IN 2
        |            INBOUND ds affects, progressOf
        |            FILTER we.timestamp >= @timestampStart
        |               AND we.timestamp <= @timestampEnd
        |
        |            FILTER NOT @applicationId
        |                    OR @applicationId == we.extra.appId
        |
        |            FILTER NOT @searchTerm
        |                    OR @searchTerm == we.timestamp
        |                    OR CONTAINS(LOWER(ds.uri), @searchTerm)
        |                    OR CONTAINS(LOWER(we.execPlanDetails.frameworkName), @searchTerm)
        |                    OR CONTAINS(LOWER(we.execPlanDetails.applicationName), @searchTerm)
        |                    OR CONTAINS(LOWER(we.extra.appId), @searchTerm)
        |                    OR CONTAINS(LOWER(we.execPlanDetails.dataSourceType), @searchTerm)
        |
        |            SORT we.timestamp DESC
        |            RETURN we
        |    )
        |
        |    FILTER NOT IS_NULL(lwe)
        |        OR NOT @searchTerm
        |        OR CONTAINS(LOWER(ds.uri), @searchTerm)
        |
        |    LET resItem = {
        |        "executionEventId" : lwe._key,
        |        "executionPlanId"  : lwe.execPlanDetails.executionPlanId,
        |        "frameworkName"    : lwe.execPlanDetails.frameworkName,
        |        "applicationName"  : lwe.execPlanDetails.applicationName,
        |        "applicationId"    : lwe.extra.appId,
        |        "timestamp"        : lwe.timestamp || 0,
        |        "dataSourceName"   : REGEX_MATCHES(ds.uri, "([^/]+)/*$")[1],
        |        "dataSourceUri"    : ds.uri,
        |        "dataSourceType"   : lwe.execPlanDetails.dataSourceType,
        |        "append"           : lwe.execPlanDetails.append || false
        |    }
        |
        |    SORT resItem.@sortField @sortOrder
        |    LIMIT @pageOffset*@pageSize, @pageSize
        |
        |    RETURN resItem
        |""".stripMargin,
      Map(
        "asAtTime" -> (asAtTime: java.lang.Long),
        "timestampStart" -> (writeTimestampStart: java.lang.Long),
        "timestampEnd" -> (writeTimestampEnd: java.lang.Long),
        "pageOffset" -> (pageRequest.page - 1: Integer),
        "pageSize" -> (pageRequest.size: Integer),
        "sortField" -> sortRequest.sortField,
        "sortOrder" -> sortRequest.sortOrder,
        "searchTerm" -> StringUtils.lowerCase(searchTerm),
        "applicationId" -> writeApplicationId,
        "dataSourceUri" -> dataSourceUri
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
