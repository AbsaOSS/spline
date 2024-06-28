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
import za.co.absa.spline.consumer.service.model.LineageOverview
import za.co.absa.spline.consumer.service.repo.ImpactRepository

import scala.concurrent.Future

@RestController
@Api(tags = Array("impact"))
class ImpactOverviewController @Autowired()(val repo: ImpactRepository) {

  import scala.concurrent.ExecutionContext.Implicits._

  @GetMapping(Array("/impact-overview"))
  @ApiOperation(
    value = "Get execution event forward-lineage overview",
    notes =
      """
        Returns a forward-lineage overview for a given execution event.
        The graph consists of nodes of two types: data sources and executed jobs.
        The forward-lineage describes the subsequent data flow, that how the current data flow that has impacted others.
      """
  )
  def lineageOverview(
    @ApiParam(value = "Execution event ID", required = true)
    @RequestParam("eventId")
    eventId: String,

    @ApiParam(
      value = "Max depth of the graph. ([Source] -> [App] -> [Target]) is considered one level",
      example = "5")
    @RequestParam(name = "maxDepth", defaultValue = "5")
    maxDepth: Int
  ): Future[LineageOverview] =
    repo.impactOverviewForExecutionEvent(eventId, maxDepth)
}
