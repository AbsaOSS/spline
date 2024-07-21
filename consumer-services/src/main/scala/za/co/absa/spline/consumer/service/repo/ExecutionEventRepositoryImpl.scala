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

import com.fasterxml.jackson.core.`type`.TypeReference
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.common.StringEscapeUtils.escapeAQLSearch
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.consumer.service.repo.ExecutionEventRepositoryImpl._
import za.co.absa.spline.persistence.FoxxRouter

import scala.concurrent.{ExecutionContext, Future}

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
    val lblNames = labels.map(_.name)
    val lblValues = labels.map(_.values)

    foxxRouter.get[Frame[ExecutionEventInfo]]("/spline/execution-events", Map(
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
      "dataSourceUri" -> maybeDataSourceUri.orNull,
      "lblNames" -> lblNames.toSeq,
      "lblValues" -> lblValues.toSeq,
    ))
  }
}

object ExecutionEventRepositoryImpl {
  implicit val typeRefFrameOfExecEventInfo: TypeReference[Frame[ExecutionEventInfo]] = new TypeReference[Frame[ExecutionEventInfo]] {}
  implicit val typeRefTupleOfLongLong: TypeReference[(Long, Long)] = new TypeReference[(Long, Long)] {}
}
