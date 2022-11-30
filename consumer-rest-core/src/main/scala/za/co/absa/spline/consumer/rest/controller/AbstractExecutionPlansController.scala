/*
 * Copyright 2022 ABSA Group Limited
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
package za.co.absa.spline.consumer.rest.controller

import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.consumer.service.repo.ExecutionPlanRepository

import java.lang.System.currentTimeMillis
import scala.concurrent.Future

class AbstractExecutionPlansController(
  epRepo: ExecutionPlanRepository
) {

  import scala.concurrent.ExecutionContext.Implicits._

  protected def find(
    asAtTime0: Long,
    pageNum: Int,
    pageSize: Int,
    sortField: String,
    sortOrder: String
  ): Future[PageableExecutionPlansResponse] = {

    val asAtTime = if (asAtTime0 < 1) currentTimeMillis else asAtTime0
    val pageRequest = PageRequest(pageNum, pageSize)
    val sortRequest = SortRequest(sortField, sortOrder)

    val plansWithCount =
      epRepo.find(
        asAtTime,
        pageRequest,
        sortRequest)

    for {
      (events, totalCount) <- plansWithCount
    } yield {
      PageableExecutionPlansResponse(
        events.toArray,
        totalCount,
        pageRequest.page,
        pageRequest.size)
    }
  }
}
