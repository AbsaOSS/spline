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

import io.swagger.annotations.{Api, ApiOperation, ApiParam}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation._
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.consumer.service.repo.{DataSourceRepository, ExecutionEventRepository}

import java.lang.System.currentTimeMillis
import scala.concurrent.Future

@RestController
@Api(tags = Array("data-sources"))
class DataSourcesController @Autowired()(
  val dataSourceRepo: DataSourceRepository,
  val execEventsRepo: ExecutionEventRepository
) {

  import scala.concurrent.ExecutionContext.Implicits._

  @GetMapping(Array("/data-sources"))
  @ApiOperation(
    value = "Get data sources",
    notes = "Returns a pageable list of data sources filtered by the query parameters",
    response = classOf[PageableDataSourcesResponse]
  )
  def dataSources(
    @ApiParam(value = "Beginning of the last write time range (inclusive)", example = "0")
    @RequestParam(value = "timestampStart", defaultValue = "0") writeTimestampStart: Long,

    @ApiParam(value = "End of the last write time range (inclusive)", example = "0")
    @RequestParam(value = "timestampEnd", defaultValue = "9223372036854775807") writeTimestampEnd: Long,

    @ApiParam(value = "Timestamp of the request, if asAtTime equals 0, the current timestamp will be applied", example = "0")
    @RequestParam(value = "asAtTime", defaultValue = "0") asAtTime0: Long,

    @ApiParam(value = "Page number", example = "1")
    @RequestParam(value = "pageNum", defaultValue = "1") pageNum: Int,

    @ApiParam(value = "Page size", example = "0")
    @RequestParam(value = "pageSize", defaultValue = "10") pageSize: Int,

    @ApiParam(value = "Sort field")
    @RequestParam(value = "sortField", defaultValue = "dataSourceUri") sortField: String,

    @ApiParam(value = "Sort order", example = "asc")
    @RequestParam(value = "sortOrder", defaultValue = "asc") sortOrder: String,

    @ApiParam(value = "Text to filter the results")
    @RequestParam(value = "searchTerm", required = false) searchTerm: String,

    @ApiParam(value = "Id of the application")
    @RequestParam(value = "applicationId", required = false) writeApplicationId: String,

    @ApiParam(value = "Destination path")
    @RequestParam(value = "dataSourceUri", required = false) dataSourceUri: String

  ): Future[PageableDataSourcesResponse] = {

    val asAtTime = if (asAtTime0 < 1) currentTimeMillis else asAtTime0
    val pageRequest = PageRequest(pageNum, pageSize)
    val sortRequest = SortRequest(sortField, sortOrder)

    val eventualDateRange =
      execEventsRepo.getTimestampRange(
        asAtTime,
        searchTerm,
        writeApplicationId,
        dataSourceUri)

    val eventualEventsWithCount =
      dataSourceRepo.find(
        asAtTime,
        writeTimestampStart,
        writeTimestampEnd,
        pageRequest,
        sortRequest,
        searchTerm,
        writeApplicationId,
        dataSourceUri)

    for {
      (totalDateFrom, totalDateTo) <- eventualDateRange
      (events, totalCount) <- eventualEventsWithCount
    } yield {
      PageableDataSourcesResponse(
        events.toArray,
        totalCount,
        pageRequest.page,
        pageRequest.size,
        Array(totalDateFrom, totalDateTo))
    }
  }
}
