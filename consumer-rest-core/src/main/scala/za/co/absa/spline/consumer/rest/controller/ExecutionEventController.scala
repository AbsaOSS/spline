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

import java.lang.System.currentTimeMillis

import io.swagger.annotations.{ApiOperation, ApiParam}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation._
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.consumer.service.repo.ExecutionEventRepository

import scala.concurrent.Future

@RestController("execution-event")
class ExecutionEventController @Autowired()(val repo: ExecutionEventRepository) {

  import scala.concurrent.ExecutionContext.Implicits._

  @GetMapping(Array("/executionEvent"))
  @ApiOperation(
    value = "GET /executionEvent",
    notes = "Returns a Pageable list of execution events within the time range given in parameters",
    response = classOf[PageableExecutionEvent]
  )
  def executionEvent
  (
    @ApiParam(value = "Beginning of the timestamp range used for querying. If timestampStart equals 0, the service will return the first 100 execution events in database", example = "0")
    @RequestParam(value = "timestampStart", required = false, defaultValue = "0") timestampStart: Long,
    @ApiParam(value = "End of the timestamp range used for querying", example = "0")
    @RequestParam(value = "timestampEnd", required = false, defaultValue = "0") timestampEnd: Long,
    @ApiParam(value = "Timestamp of the request, if asAtTime equals 0, the current timestamp will be applied", example = "0")
    @RequestParam(value = "asAtTime", required = false, defaultValue = "0") asAtTime: Long,
    @ApiParam(value = "Number of the page", example = "0")
    @RequestParam(value = "offset", required = false, defaultValue = "0") offset: Int,
    @ApiParam(value = "Size of the page", example = "0")
    @RequestParam(value = "size", required = false, defaultValue = "10") size: Int,
    @ApiParam(value = "Name of the attribute to sort on")
    @RequestParam(value = "sortName", required = false, defaultValue = "timestamp") sortName: String,
    @ApiParam(value = "Sort Direction", example = "asc")
    @RequestParam(value = "sortDirection", required = false, defaultValue = "desc") sortDirection: String,
    @ApiParam(value = "Text to filter the results")
    @RequestParam(value = "searchTerm", required = false) searchTerm: String
  ): Future[Pageable[ExecutionEventInfo]] = {

    val pageRequest = asAtTime match {
      case 0 => PageRequest(currentTimeMillis, 0, 10)
      case _ => PageRequest(asAtTime, offset, size)
    }

    val sortRequest = SortRequest(sortName, sortDirection)

    repo.findByTimestampRange(
      timestampStart,
      timestampEnd,
      pageRequest,
      sortRequest,
      searchTerm
    )
  }


  @GetMapping(Array("/executionEvent/search"))
  @ApiOperation(
    value = "GET /executionEvent/search",
    notes = "Returns a list of execution event Ids that concerns the path or the applicationId given in parameters",
    response = classOf[ExecutionEvent]
  )
  def search
  (
    @ApiParam(value = "Id of the application")
    @RequestParam(value = "applicationId", required = false) applicationId: String,
    @ApiParam(value = "path of the destination")
    @RequestParam(value = "destinationPath", required = false) destinationPath: String
  ): Future[ExecutionEvent] = {
    repo.search(applicationId, destinationPath)
  }


}
