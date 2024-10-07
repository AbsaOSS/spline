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
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation._
import org.springframework.web.servlet.view.RedirectView
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.consumer.service.repo.{DataSourceRepository, ExecutionPlanRepository}

import java.lang.System.currentTimeMillis
import javax.servlet.http.HttpServletRequest
import scala.concurrent.Future


@RestController
@RequestMapping(Array("/execution-plans"))
@Api(tags = Array("execution-plans"))
class ExecutionPlansController @Autowired()
(
  val epRepo: ExecutionPlanRepository,
  val dsRepo: DataSourceRepository,
) {

  @GetMapping(Array(""))
  @ApiOperation(
    value = "Get execution plans",
    notes = "Returns a pageable list of execution plans filtered by the query parameters",
    response = classOf[PageableExecutionPlansResponse]
  )
  def execPlans(
    @ApiParam(value = "Timestamp of the request, if asAtTime equals 0, the current timestamp will be applied", example = "0")
    @RequestParam(value = "asAtTime", defaultValue = "0") asAtTime0: Long,

    @ApiParam(value = "Page number", example = "1")
    @RequestParam(value = "pageNum", defaultValue = "1") pageNum: Int,

    @ApiParam(value = "Page size", example = "0")
    @RequestParam(value = "pageSize", defaultValue = "10") pageSize: Int
  ): Future[PageableExecutionPlansResponse] = find(
    asAtTime0,
    pageNum,
    pageSize,
    sortField = "_created",
    sortOrder = "desc"
  )

  import scala.concurrent.ExecutionContext.Implicits._

  @GetMapping(Array("/{planId}"))
  @ResponseStatus(HttpStatus.OK)
  @ApiOperation(
    value = "Get detailed execution plan (DAG)",
    notes = "Returns a logical plan DAG by execution plan ID")
  def execPlan(
    @ApiParam(value = "Id of the execution plan")
    @PathVariable("planId") planId: ExecutionPlanInfo.Id
  ): Future[ExecutionPlanDetailed] = {
    epRepo.findById(planId)
  }

  @GetMapping(Array("/{planId}/write-op"))
  @ApiOperation("Get the Write Operation details of the given execution plan")
  def writeOperation(
    @ApiParam(value = "Id of the execution plan")
    @PathVariable("planId") planId: ExecutionPlanInfo.Id,
    request: HttpServletRequest
  ): Future[_] = {
    epRepo.getWriteOperationId(planId).map { opId =>
      new RedirectView(s"${request.getServletPath}/operations/$opId")
    }
  }

  @GetMapping(value = Array("/{planId}/data-sources"))
  @ResponseStatus(HttpStatus.OK)
  def execPlanDataSources(
    @ApiParam(value = "Id of the execution plan")
    @PathVariable("planId") planId: ExecutionPlanInfo.Id,
    @ApiParam(value = "access")
    @RequestParam(name = "access", required = false) access: String
  ): Future[Array[String]] = {
    val dataSourceActionTypeOption = DataSourceActionType.findValueOf(access)
    dsRepo.findByUsage(planId, dataSourceActionTypeOption)
  }

  private def find(
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
      (plans, totalCount) <- plansWithCount
    } yield {
      PageableExecutionPlansResponse(
        plans.toArray,
        totalCount,
        pageRequest.page,
        pageRequest.size)
    }
  }
}
