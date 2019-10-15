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

import io.swagger.annotations.{ApiOperation, ApiParam}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation._
import za.co.absa.spline.consumer.service.model.LineageOverview
import za.co.absa.spline.consumer.service.repo.LineageRepository

import scala.concurrent.Future

@RestController
class LineageController @Autowired()(val repo: LineageRepository) {

  import scala.concurrent.ExecutionContext.Implicits._

  @GetMapping(Array("/lineage"))
  @ApiOperation(
    value = "GET /lineage",
    notes = "Returns a lineage overview of executionEvent Id"
  )
  def lineage
  (
    @ApiParam(value="Id of the application")
    @RequestParam("executionEventId") executionEventId: String
  ): Future[LineageOverview] = {
    repo.findExecutionEventId(executionEventId)
  }

}