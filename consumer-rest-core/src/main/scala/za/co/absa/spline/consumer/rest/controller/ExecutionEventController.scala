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
package za.co.absa.spline.consumer.rest.controller

import java.util.Date

import io.swagger.annotations.ApiOperation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation._
import za.co.absa.spline.consumer.service.model.{ExecutionEvent, PageRequest, Pageable, SortRequest}
import za.co.absa.spline.consumer.service.repo.ExecutionEventRepository

import scala.concurrent.Future

@RestController
class ExecutionEventController @Autowired()(val repo: ExecutionEventRepository) {

  import scala.concurrent.ExecutionContext.Implicits._

  @GetMapping(Array("/executionEvent"))
  @ApiOperation("Returns a list of execution event info containing the time of the execution, the application Id/Name and the appendMode")
  def executionEvent
  (
    @RequestParam("timestampStart") timestampStart: Long,
    @RequestParam("timestampEnd") timestampEnd: Long,
    @RequestParam(value = "asAtTime", required = false, defaultValue = "0") asAtTime: Long,
    @RequestParam(value = "offset", required = false, defaultValue = "0") offset: Int,
    @RequestParam(value = "size", required = false, defaultValue = "10") size: Int,
    @RequestParam(value = "sortName", required = false, defaultValue = "timestamp") sortName: String,
    @RequestParam(value = "sortDirection", required = false, defaultValue = "ASC") sortDirection: String,
    @RequestParam(value = "searchTerm", required = false) searchTerm: String
  ): Future[Pageable[ExecutionEvent]] = {

    val pageRequest = asAtTime match {
      case 0 => new PageRequest(new Date().getTime, 0, 10)
      case _ => PageRequest(asAtTime, offset, size)
    }

    val sortRequest = new SortRequest(sortName, sortDirection)

    repo.findByTimestampRange(
      timestampStart,
      timestampEnd,
      pageRequest,
      sortRequest,
      searchTerm
    )
  }


}
