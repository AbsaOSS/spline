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

import java.util.UUID

import io.swagger.annotations.{Api, ApiOperation, ApiParam}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation._
import za.co.absa.spline.consumer.service.model.{AttributeDependencies, ExecutionPlanInfo, LineageDetailed}
import za.co.absa.spline.consumer.service.repo.ExecutionPlanRepository

import scala.concurrent.Future

@RestController
@Api(tags = Array("lineage"))
class LineageDetailedController @Autowired()(
  val repo: ExecutionPlanRepository) {

  import scala.concurrent.ExecutionContext.Implicits._

  @GetMapping(Array("lineage-detailed"))
  @ApiOperation(
    value = "Get detailed execution plan (DAG)",
    notes = "Returns a logical plan DAG by execution plan ID")
  def lineageDetailed(
    @ApiParam(value = "Execution plan ID")
    @RequestParam("execId") execId: ExecutionPlanInfo.Id
  ): Future[LineageDetailed] = {
    repo.findById(execId)
  }

  @GetMapping(Array("attribute-dependencies"))
  @ApiOperation(
  value = "Get ids of operations and attributes that depends on attribute with provided id")
  def attributeDependencies(
    @ApiParam(value = "Execution plan ID")
    @RequestParam("execId") execId: ExecutionPlanInfo.Id,
    @ApiParam(value = "Attribute ID")
    @RequestParam("attributeId") attributeId: UUID
  ): Future[AttributeDependencies] = {
      repo.findAttributeDependencies(execId,attributeId)
  }
}
