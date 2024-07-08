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
import org.apache.commons.lang.StringEscapeUtils.escapeJavaScript
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.common.StringEscapeUtils.escapeAQLSearch
import za.co.absa.spline.consumer.service.model.DataSourceActionType.{Read, Write}
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.consumer.service.repo.DataSourceRepositoryImpl.SearchFields
import za.co.absa.spline.persistence.ArangoImplicits._
import za.co.absa.spline.persistence.model.{EdgeDef, NodeDef, SearchViewDef}

import scala.concurrent.{ExecutionContext, Future}
import scala.jdk.StreamConverters._

@Repository
class DataSourceRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends DataSourceRepository {

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
         |WITH ${SearchViewDef.DataSourceSearchView.name}
         |FOR ds IN ${SearchViewDef.DataSourceSearchView.name}
         |    SEARCH ds._created <= @asAtTime
         |        AND (@dataSourceUri == null OR @dataSourceUri == ds.uri)
         |        AND (@applicationId == null OR @applicationId == ds.lastWriteDetails.extra.appId)
         |        AND (@writeAppends   == null
         |           OR ds.lastWriteDetails.execPlanDetails.append IN @writeAppends
         |           OR (@includeNoWrite AND !EXISTS(ds.lastWriteDetails))
         |        )
      ${
        lblNames.zipWithIndex.map({
          case (lblName, i) =>
            s"""
               | AND (
               |      @lblValues[$i] ANY == ds.lastWriteDetails.labels['${escapeJavaScript(lblName)}']
               |   OR @lblValues[$i] ANY == ds.lastWriteDetails.execPlanDetails.labels['${escapeJavaScript(lblName)}']
               | )
             """.stripMargin
        }).mkString("\n")
      }
         |        AND (@searchTerm == null
      ${
        SearchFields.map({
          fld =>
            s"""      OR ANALYZER(LIKE(ds.$fld, CONCAT("%", TOKENS(@searchTerm, "norm_en")[0], "%")), "norm_en")"""
        }).mkString("\n")
      }
         |        )
         |
         |    COLLECT AGGREGATE
         |        minTimestamp = MIN(ds.lastWriteDetails.timestamp),
         |        maxTimestamp = MAX(ds.lastWriteDetails.timestamp)
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
        "includeNoWrite" -> Boolean.box(writeAppendOptions.contains(None)),
        "applicationId" -> maybeApplicationId.orNull,
        "dataSourceUri" -> maybeDataSourceUri.orNull
      ).when(lblValues.nonEmpty) {
        _.updated("lblValues", lblValues)
      }
    ).map { case Array(from, to) => from -> to }
  }

  override def find(
    asAtTime: Long,
    maybeWriteTimestampStart: Option[Long],
    maybeWriteTimestampEnd: Option[Long],
    pageRequest: PageRequest,
    sortRequest: SortRequest,
    labels: Array[Label],
    maybeSearchTerm: Option[String],
    writeAppendOptions: Array[Option[Boolean]],
    maybeWriteApplicationId: Option[String],
    maybeDataSourceUri: Option[String]
  )(implicit ec: ExecutionContext): Future[(Seq[ExecutionEventInfo], Long)] = {
    val lblNames = labels.map(_.name)
    val lblValues = labels.map(_.values)

    db.queryAs[ExecutionEventInfo](
      s"""
         |WITH ${SearchViewDef.DataSourceSearchView.name}
         |FOR ds IN ${SearchViewDef.DataSourceSearchView.name}
         |    SEARCH ds._created <= @asAtTime
         |        AND (@timestampStart == null OR IN_RANGE(ds.lastWriteDetails.timestamp, @timestampStart, @timestampEnd, true, true))
         |        AND (@dataSourceUri  == null OR @dataSourceUri == ds.uri)
         |        AND (@applicationId  == null OR @applicationId == ds.lastWriteDetails.extra.appId)
         |        AND (@writeAppends   == null
         |           OR ds.lastWriteDetails.execPlanDetails.append IN @writeAppends
         |           OR (@includeNoWrite AND !EXISTS(ds.lastWriteDetails))
         |        )
      ${
        lblNames.zipWithIndex.map({
          case (lblName, i) =>
            s"""
               | AND (
               |      @lblValues[$i] ANY == ds.lastWriteDetails.labels['${escapeJavaScript(lblName)}']
               |   OR @lblValues[$i] ANY == ds.lastWriteDetails.execPlanDetails.labels['${escapeJavaScript(lblName)}']
               | )
             """.stripMargin
        }).mkString("\n")
      }
         |        AND (@searchTerm == null
      ${
        SearchFields.map({
          fld =>
            s"""      OR ANALYZER(LIKE(ds.$fld, CONCAT("%", TOKENS(@searchTerm, "norm_en")[0], "%")), "norm_en")"""
        }).mkString("\n")
      }
         |        )
         |
         |    LET resItem = {
         |        "executionEventId" : ds.lastWriteDetails._key,
         |        "executionPlanId"  : ds.lastWriteDetails.execPlanDetails.executionPlanKey,
         |        "frameworkName"    : ds.lastWriteDetails.execPlanDetails.frameworkName,
         |        "applicationName"  : ds.lastWriteDetails.execPlanDetails.applicationName,
         |        "applicationId"    : ds.lastWriteDetails.extra.appId,
         |        "timestamp"        : ds.lastWriteDetails.timestamp,
         |        "dataSourceName"   : ds.name,
         |        "dataSourceUri"    : ds.uri,
         |        "dataSourceType"   : ds.lastWriteDetails.execPlanDetails.dataSourceType,
         |        "append"           : ds.lastWriteDetails.execPlanDetails.append,
         |        "durationNs"       : ds.lastWriteDetails.durationNs,
         |        "error"            : ds.lastWriteDetails.error,
         |        "extra"            : ds.lastWriteDetails.extra,
         |        "labels"           : ds.lastWriteDetails.labels
         |    }
         |
         |    SORT resItem.@sortField @sortOrder
         |    LIMIT @pageOffset*@pageSize, @pageSize
         |
         |    RETURN resItem
         |""".stripMargin,
      Map[String, AnyRef](
        "asAtTime" -> Long.box(asAtTime),
        "timestampStart" -> maybeWriteTimestampStart.map(Long.box).orNull,
        "timestampEnd" -> maybeWriteTimestampEnd.map(Long.box).orNull,
        "pageOffset" -> Int.box(pageRequest.page - 1),
        "pageSize" -> Int.box(pageRequest.size),
        "sortField" -> sortRequest.sortField,
        "sortOrder" -> sortRequest.sortOrder,
        "searchTerm" -> maybeSearchTerm.map(escapeAQLSearch).orNull,
        "writeAppends" -> (if (writeAppendOptions.isEmpty) null else writeAppendOptions.flatten.map(Boolean.box)),
        "includeNoWrite" -> Boolean.box(writeAppendOptions.contains(None)),
        "applicationId" -> maybeWriteApplicationId.orNull,
        "dataSourceUri" -> maybeDataSourceUri.orNull
      ).when(lblValues.nonEmpty) {
        _.updated("lblValues", lblValues)
      },
      new AqlQueryOptions().fullCount(true)
    ).map {
      arangoCursorAsync =>
        val items = arangoCursorAsync.streamRemaining().toScala(LazyList)
        val totalCount = arangoCursorAsync.getStats.getFullCount
        (items, totalCount)
    }
  }

  override def findByUsage(
    execPlanId: ExecutionPlanInfo.Id,
    access: Option[DataSourceActionType]
  )(implicit ec: ExecutionContext): Future[Array[String]] = {
    access
      .map({
        case Read => db.queryStream[String](
          s"""
             |WITH ${NodeDef.DataSource.name}, ${EdgeDef.Depends.name}
             |FOR ds IN 1..1
             |    OUTBOUND DOCUMENT('executionPlan', @planId) depends
             |    RETURN ds.uri
             |""".stripMargin,
          Map("planId" -> execPlanId)
        ).map(_.toArray)

        case Write => db.queryStream[String](
          s"""
             |WITH ${NodeDef.DataSource.name}, ${EdgeDef.Affects.name}
             |FOR ds IN 1..1
             |    OUTBOUND DOCUMENT('executionPlan', @planId) affects
             |    RETURN ds.uri
             |""".stripMargin,
          Map("planId" -> execPlanId)
        ).map(_.toArray)
      })
      .getOrElse({
        db.queryStream[String](
          s"""
             |WITH ${NodeDef.DataSource.name}, ${EdgeDef.Depends.name}, ${EdgeDef.Affects.name}
             |FOR ds IN 1..1
             |    OUTBOUND DOCUMENT('executionPlan', @planId) affects, depends
             |    RETURN ds.uri
             |""".stripMargin,
          Map("planId" -> execPlanId)
        ).map(_.toArray)
      })
  }
}

object DataSourceRepositoryImpl {
  private val SearchFields = Seq(
    "uri",
    "name",
    "lastWriteDetails.execPlanDetails.frameworkName",
    "lastWriteDetails.execPlanDetails.applicationName",
    "lastWriteDetails.extra.appId",
    "lastWriteDetails.execPlanDetails.dataSourceType",
  )
}
