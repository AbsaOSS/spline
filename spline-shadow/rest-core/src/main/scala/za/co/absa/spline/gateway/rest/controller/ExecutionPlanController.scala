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

package za.co.absa.spline.gateway.rest.controller

import java.util.{Date, UUID}

import io.swagger.annotations.ApiOperation
import org.springframework.web.bind.annotation._
import za.co.absa.spline.gateway.rest.model.ExecutedLogicalPlan.LogicalPlan
import za.co.absa.spline.gateway.rest.model.{AppInfo, ExecutedLogicalPlan, ExecutionInfo}

@RestController
@RequestMapping(Array("/execution"))
class ExecutionPlanController {

  @GetMapping(Array("/{execId}/lineage"))
  @ApiOperation("Returns a logical plan (aka partial lineage) of a given execution")
  def lineage(@PathVariable("execId") execId: ExecutionInfo.Id): ExecutedLogicalPlan =
    ExecutedLogicalPlan(
      app = AppInfo("my app", props = Map("sparkVer" -> "1.2.3")),
      execution = ExecutionInfo(UUID.randomUUID(), None, Some(new Date()), None),
      dag = LogicalPlan(Nil, Nil))
}
