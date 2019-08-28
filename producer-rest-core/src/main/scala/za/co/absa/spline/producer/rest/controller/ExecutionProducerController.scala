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

package za.co.absa.spline.producer.rest.controller

import java.util.UUID

import io.swagger.annotations.ApiOperation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.{PostMapping, RequestBody, RequestMapping, RestController}
import za.co.absa.spline.producer.rest.model.{ExecutionEvent, ExecutionPlan}
import za.co.absa.spline.producer.service.repo.ExecutionProducerRepository

import scala.concurrent.{ExecutionContext, Future}

@RestController
@RequestMapping(
  value = Array("/execution"),
  consumes = Array("application/json"),
  produces = Array("application/json")
)
class ExecutionProducerController @Autowired()(
  val repo: ExecutionProducerRepository) {

  import ExecutionContext.Implicits.global

  @PostMapping(Array("/plan"))
  @ApiOperation("Record execution plan")
  def executionPlan(@RequestBody execPlan: ExecutionPlan): Future[UUID] = {
    repo.insertExecutionPlan(execPlan)
  }

  @PostMapping(Array("/event"))
  @ApiOperation("Record execution events")
  def executionEvent(@RequestBody execEvents: Array[ExecutionEvent]): Future[Array[String]] = {
    repo.insertExecutionEvents(execEvents)
  }

}
