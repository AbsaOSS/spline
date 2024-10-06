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

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.common.StringEscapeUtils.escapeAQLSearch
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.consumer.service.repo.AbstractExecutionEventRepository._
import za.co.absa.spline.persistence.DefaultJsonSerDe._
import za.co.absa.spline.persistence.FoxxRouter

import scala.concurrent.{ExecutionContext, Future}
import scala.jdk.CollectionConverters._

@Repository
class ExecutionEventRepositoryImpl @Autowired()(
  foxxRouter: FoxxRouter
) extends ExecutionEventRepository {

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
  )(implicit ec: ExecutionContext): Future[Frame[ExecutionEventInfo]] = {
    foxxRouter.get[Frame[ExecutionEventInfo]]("/spline/consumer/execution-events", Map(
      "asAtTime" -> asAtTime,
      "timestampStart" -> maybeTimestampStart.orNull,
      "timestampEnd" -> maybeTimestampEnd.orNull,
      "searchTerm" -> maybeSearchTerm.map(escapeAQLSearch).orNull,
      "applicationId" -> maybeApplicationId.orNull,
      "dataSourceUri" -> maybeDataSourceUri.orNull,
      "writeAppends" -> (if (writeAppendOptions.isEmpty) null else writeAppendOptions.flatten.toSeq.asJava),
      "labels" -> labels.toJson,
      "sortField" -> sortRequest.field,
      "sortOrder" -> sortRequest.order,
      "offset" -> pageRequest.offset,
      "limit" -> pageRequest.limit,
    ))
  }
}
