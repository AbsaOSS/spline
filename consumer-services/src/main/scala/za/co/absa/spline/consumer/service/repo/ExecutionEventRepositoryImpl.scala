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
import org.apache.commons.lang.StringEscapeUtils.escapeJavaScript
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.common.StringEscapeUtils.escapeAQLSearch
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.consumer.service.repo.ExecutionEventRepositoryImpl.SearchFields
import za.co.absa.spline.persistence.ArangoImplicits._
import za.co.absa.spline.persistence.model.SearchViewDef

import scala.compat.java8.StreamConverters._
import scala.concurrent.{ExecutionContext, Future}

@Repository
class ExecutionEventRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends ExecutionEventRepository {

  import za.co.absa.commons.lang.extensions.AnyExtension._

  override def getTimestampRange(
    asAtTime: Long,
    labels: Array[Label],
    maybeSearchTerm: Option[String],
    writeAppendOptions: Array[Option[Boolean]],
    maybeApplicationId: Option[String],
    maybeDataSourceUri: Option[String]
  )(implicit ec: ExecutionContext): Future[(Long, Long)] = {

    val lblNames = labels.map(_.name)
    val lblValues = labels.map(_.values)

    db.queryOne[Array[Long]](
      s"""
         |WITH ${SearchViewDef.ProgressSearchView.name}
         |FOR ee IN ${SearchViewDef.ProgressSearchView.name}
         |    SEARCH ee._created <= @asAtTime
         |        AND (@applicationId == null OR @applicationId == ee.extra.appId)
         |        AND (@dataSourceUri == null OR @dataSourceUri == ee.execPlanDetails.dataSourceUri)
         |        AND (@writeAppends  == null OR ee.execPlanDetails.append IN @writeAppends)
      ${
        lblNames.zipWithIndex.map({
          case (lblName, i) =>
            s"    AND @lblValues[$i] ANY == ee.labels['${escapeJavaScript(lblName)}']"
        }).mkString("\n")
      }
         |        AND (@searchTerm == null
      ${
        SearchFields.map({
          fld =>
            s"""      OR ANALYZER(LIKE(ee.$fld, CONCAT("%", TOKENS(@searchTerm, "norm_en")[0], "%")), "norm_en")"""
        }).mkString("\n")
      }
         |        )
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
      Map[String, AnyRef](
        "asAtTime" -> Long.box(asAtTime),
        "searchTerm" -> maybeSearchTerm.map(escapeAQLSearch).orNull,
        "writeAppends" -> (if (writeAppendOptions.isEmpty) null else writeAppendOptions.flatten.map(Boolean.box)),
        "applicationId" -> maybeApplicationId.orNull,
        "dataSourceUri" -> maybeDataSourceUri.orNull
      ).when(lblValues.nonEmpty) {
        _.updated("lblValues", lblValues)
      },
    ).map { case Array(from, to) => from -> to }
  }

  override def find(
    asAtTime: Long,
    maybeTimestampStart: Option[Long],
    maybeTimestampEnd: Option[Long],
    pageRequest: PageRequest,
    sortRequest: SortRequest,
    labels: Array[Label],
    maybeSearchTerm: Option[String],
    writeAppendOptions: Array[Option[Boolean]],
    maybeApplicationId: Option[String],
    maybeDataSourceUri: Option[String]
  )(implicit ec: ExecutionContext): Future[(Seq[WriteEventInfo], Long)] = {

    val lblNames = labels.map(_.name)
    val lblValues = labels.map(_.values)

    db.queryAs[WriteEventInfo](
      s"""
         |WITH ${SearchViewDef.ProgressSearchView.name}
         |FOR ee IN ${SearchViewDef.ProgressSearchView.name}
         |    SEARCH ee._created <= @asAtTime
         |        AND (@timestampStart == null OR IN_RANGE(ee.timestamp, @timestampStart, @timestampEnd, true, true))
         |        AND (@applicationId == null OR @applicationId == ee.extra.appId)
         |        AND (@dataSourceUri == null OR @dataSourceUri == ee.execPlanDetails.dataSourceUri)
         |        AND (@writeAppends  == null OR ee.execPlanDetails.append IN @writeAppends)
      ${
        lblNames.zipWithIndex.map({
          case (lblName, i) =>
            s"""
               | AND (
               |      @lblValues[$i] ANY == ee.labels['${escapeJavaScript(lblName)}']
               |   OR @lblValues[$i] ANY == ee.execPlanDetails.labels['${escapeJavaScript(lblName)}']
               | )
             """.stripMargin
        }).mkString("\n")
      }
         |        AND (@searchTerm == null
      ${
        SearchFields.map({
          fld =>
            s"""      OR ANALYZER(LIKE(ee.$fld, CONCAT("%", TOKENS(@searchTerm, "norm_en")[0], "%")), "norm_en")"""
        }).mkString("\n")
      }
         |        )
         |
         |    LET resItem = {
         |        "executionEventId" : ee._key,
         |        "executionPlanId"  : ee.execPlanDetails.executionPlanKey,
         |        "frameworkName"    : ee.execPlanDetails.frameworkName,
         |        "applicationName"  : ee.execPlanDetails.applicationName,
         |        "applicationId"    : ee.extra.appId,
         |        "timestamp"        : ee.timestamp,
         |        "dataSourceName"   : ee.execPlanDetails.dataSourceName,
         |        "dataSourceUri"    : ee.execPlanDetails.dataSourceUri,
         |        "dataSourceType"   : ee.execPlanDetails.dataSourceType,
         |        "append"           : ee.execPlanDetails.append,
         |        "durationNs"       : ee.durationNs,
         |        "error"            : ee.error
         |    }
         |
         |    SORT resItem.@sortField @sortOrder
         |    LIMIT @pageOffset*@pageSize, @pageSize
         |
         |    RETURN resItem
         |""".stripMargin,
      Map[String, AnyRef](
        "asAtTime" -> Long.box(asAtTime),
        "timestampStart" -> maybeTimestampStart.map(Long.box).orNull,
        "timestampEnd" -> maybeTimestampEnd.map(Long.box).orNull,
        "pageOffset" -> Int.box(pageRequest.page - 1),
        "pageSize" -> Int.box(pageRequest.size),
        "sortField" -> sortRequest.sortField,
        "sortOrder" -> sortRequest.sortOrder,
        "searchTerm" -> maybeSearchTerm.map(escapeAQLSearch).orNull,
        "writeAppends" -> (if (writeAppendOptions.isEmpty) null else writeAppendOptions.flatten.map(Boolean.box)),
        "applicationId" -> maybeApplicationId.orNull,
        "dataSourceUri" -> maybeDataSourceUri.orNull
      ).when(lblValues.nonEmpty) {
        _.updated("lblValues", lblValues)
      },
      new AqlQueryOptions().fullCount(true)
    ).map {
      arangoCursorAsync =>
        val items = arangoCursorAsync.streamRemaining().toScala
        val totalCount = arangoCursorAsync.getStats.getFullCount
        items -> totalCount
    }
  }
}

object ExecutionEventRepositoryImpl {
  private val SearchFields = Seq(
    "execPlanDetails.frameworkName",
    "execPlanDetails.applicationName",
    "extra.appId",
    "execPlanDetails.dataSourceUri",
    "execPlanDetails.dataSourceType",
  )
}
