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
import org.springframework.http.{HttpHeaders, HttpStatus, ResponseEntity}
import org.springframework.web.bind.annotation._
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.consumer.service.repo.{DataSourceRepository, ExecutionPlanRepository}

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

  import scala.concurrent.ExecutionContext.Implicits._

  @GetMapping(Array("/{planId}"))
  @ResponseStatus(HttpStatus.OK)
  @ApiOperation(
    value = "Get detailed execution plan (DAG)",
    notes = "Returns a logical plan DAG by execution plan ID")
  def execPlan(
    @ApiParam(value = "Id of the execution plan")
    @PathVariable("planId") planId: ExecutionPlanInfo.Id
  ): Future[LineageDetailed] = {
    epRepo.findById(planId)
  }

  @GetMapping(Array("/{planId}/write-op"))
  @ApiOperation("Get the Write Operation details of the given execution plan")
  def writeOperation(
    @ApiParam(value = "Id of the execution plan")
    @PathVariable("planId") planId: ExecutionPlanInfo.Id,
    request: HttpServletRequest
  ): Future[ResponseEntity[String]] = {

    epRepo.getWriteOperationId(planId).map { opId =>
      val newUri = ServletUriComponentsBuilder.fromRequest(request)
        .path(s"/../../../operations/{opId}") // stripping execution-plans/{planId}/write-op
        .buildAndExpand(opId)
        .normalize // will normalize `/one/two/../three` into `/one/tree`
        .toUri

      val headers: HttpHeaders = new HttpHeaders();
      headers.setLocation(newUri);
      new ResponseEntity(headers, HttpStatus.FOUND);
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
}


