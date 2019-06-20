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

import io.swagger.annotations.ApiOperation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation._
import za.co.absa.spline.consumer.service.model.{ExecutedLogicalPlan, ExecutionInfo}
import za.co.absa.spline.consumer.service.repo.ExecutionPlanRepository

import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.Future

@RestController
@RequestMapping(Array("/execution"))
class ExecutionPlanController @Autowired()(
  val repo: ExecutionPlanRepository) {

  @GetMapping(Array("/{execId}/lineage"))
  @ApiOperation("Returns a logical plan (aka partial lineage) of a given execution")
  def lineage(@PathVariable("execId") execId: ExecutionInfo.Id): Future[ExecutedLogicalPlan] = {
    repo.findById(execId)
  }
}
