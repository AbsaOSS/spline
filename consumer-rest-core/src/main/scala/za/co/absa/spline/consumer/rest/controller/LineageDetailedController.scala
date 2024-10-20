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

import io.swagger.annotations._
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation._
import za.co.absa.spline.consumer.rest.controller.LineageDetailedController.AttributeLineageAndImpact
import za.co.absa.spline.consumer.service.model.{AttributeGraph, ExecutionPlanInfo, LineageDetailed}
import za.co.absa.spline.consumer.service.repo.ExecutionPlanRepository

import scala.concurrent.{ExecutionContext, Future}

@RestController
@Api(tags = Array("lineage"))
class LineageDetailedController @Autowired()(val epRepo: ExecutionPlanRepository) {

  import ExecutionContext.Implicits.global

  /**
   * Alias for `execution-plans/{planId}` implemented by [[ExecutionPlansController#execPlan(java.util.UUID, java.lang.String)]]
   *
   * @param execId executionPlan ID (UUID)
   * @return LineageDetails instance
   */
  @GetMapping(Array("/lineage-detailed"))
  @ApiOperation(
    value = "Get detailed execution plan (DAG)",
    notes = "Returns a logical plan DAG by execution plan ID")
  def lineageDetailed(
    @ApiParam(value = "Execution plan ID", required = true)
    @RequestParam("execId") execId: ExecutionPlanInfo.Id
  ): Future[LineageDetailed] = {
    epRepo.findById(execId)
  }

  @GetMapping(Array("/attribute-lineage-and-impact"))
  @ApiOperation(
    value = "Get graph of attributes that depends on attribute with provided id")
  def attributeLineageAndImpact(
     @ApiParam(value = "Attribute ID", required = true)
     @RequestParam("attributeId") attributeId: String
  ): Future[AttributeLineageAndImpact] =
    Future.sequence(Seq(
      epRepo.execPlanAttributeLineage(attributeId),
      epRepo.execPlanAttributeImpact(attributeId),
    )).map({
      case Seq(lin, imp) => AttributeLineageAndImpact(Some(lin), imp)
    })
}

object LineageDetailedController {

  @ApiModel(description = "Attribute Lineage And Impact")
  case class AttributeLineageAndImpact(
    @ApiModelProperty("Attribute Lineage")
    lineage: Option[AttributeGraph],
    @ApiModelProperty("Attribute Impact")
    impact: AttributeGraph
  )

}
