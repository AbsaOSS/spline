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
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.common.StringEscapeUtils.escapeAQLSearch
import za.co.absa.spline.consumer.service.model.DataSourceActionType.{Read, Write}
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.consumer.service.repo.AbstractExecutionEventRepository._
import za.co.absa.spline.persistence.ArangoImplicits._
import za.co.absa.spline.persistence.DefaultJsonSerDe._
import za.co.absa.spline.persistence.FoxxRouter
import za.co.absa.spline.persistence.model.{EdgeDef, NodeDef}

import scala.concurrent.{ExecutionContext, Future}
import scala.jdk.CollectionConverters._

@Repository
class DataSourceRepositoryImpl @Autowired()(
  db: ArangoDatabaseAsync,
  foxxRouter: FoxxRouter
) extends DataSourceRepository {

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
  )(implicit ec: ExecutionContext): Future[Frame[ExecutionEventInfo]] = {

    foxxRouter.get[Frame[ExecutionEventInfo]]("/spline/execution-events/_grouped-by-ds", Map(
      "asAtTime" -> asAtTime,
      "timestampStart" -> maybeWriteTimestampStart.orNull,
      "timestampEnd" -> maybeWriteTimestampEnd.orNull,
      "searchTerm" -> maybeSearchTerm.map(escapeAQLSearch).orNull,
      "applicationId" -> maybeWriteApplicationId.orNull,
      "dataSourceUri" -> maybeDataSourceUri.orNull,
      "writeAppends" -> (if (writeAppendOptions.isEmpty) null else writeAppendOptions.flatten.toSeq.asJava),
      "includeNoWrite" -> writeAppendOptions.contains(None),
      "labels" -> labels.toJson,
      "sortField" -> sortRequest.field,
      "sortOrder" -> sortRequest.order,
      "offset" -> pageRequest.offset,
      "limit" -> pageRequest.limit,
    ))
  }

  override def findByUsage(
    execPlanId: ExecutionPlanInfo.Id,
    access: Option[DataSourceActionType]
  )(implicit ec: ExecutionContext): Future[Array[String]] = {
    // TODO: call Foxx API instead of AQL query
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
