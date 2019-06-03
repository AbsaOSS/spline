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

import io.swagger.annotations.ApiOperation
import org.springframework.web.bind.annotation.{PostMapping, RequestBody, RequestMapping, RestController}
import za.co.absa.spline.producer.rest.model.{ExecutionPlan, ExecutionPlanId}

import scala.concurrent.Future

@RestController
@RequestMapping(Array("/execution"))
class ProducerController {

  @PostMapping(Array("/plan"))
  @ApiOperation("Record execution plan")
  def executionPlan(@RequestBody executionPlan: ExecutionPlan): Future[ExecutionPlanId] = {
    ??? // to be implemented in https://github.com/AbsaOSS/spline/issues/248
  }
}
