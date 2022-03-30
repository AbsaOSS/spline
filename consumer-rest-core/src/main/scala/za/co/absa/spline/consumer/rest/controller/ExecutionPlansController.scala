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
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation._
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.consumer.service.repo.ExecutionPlanRepository

import javax.servlet.http.HttpServletRequest
import scala.concurrent.Future


@Controller
@RequestMapping(Array("/execution-plans"))
@Api(tags = Array("execution-plans"))
class ExecutionPlansController @Autowired()
(
  val execPlanRepo: ExecutionPlanRepository
) {

  import scala.concurrent.ExecutionContext.Implicits._

  @GetMapping(Array("/{planId}/write-op"))
  @ApiOperation("Get the Write Operation details of the given execution plan")
  def writeOperation(
    @ApiParam(value = "Id of the execution plan")
    @PathVariable("planId")
    planId: ExecutionPlanInfo.Id,
    request: HttpServletRequest
  ): Future[String] = {
    for (opId <- execPlanRepo.getWriteOperationId(planId))
      yield s"redirect:${request.getServletPath}/operations/$opId"
  }
}


