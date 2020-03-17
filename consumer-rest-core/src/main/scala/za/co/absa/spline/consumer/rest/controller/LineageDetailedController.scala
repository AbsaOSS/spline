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

import io.swagger.annotations._
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation._
import za.co.absa.spline.consumer.rest.controller.LineageDetailedController.AttributeLineageAndImpact
import za.co.absa.spline.consumer.service.attrresolver.AttributeDependencyResolver
import za.co.absa.spline.consumer.service.internal.AttributeDependencySolver
import za.co.absa.spline.consumer.service.model.{AttributeGraph, ExecutionPlanInfo, LineageDetailed}
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
    value = "Get graph of attributes that depends on attribute with provided id")
  def attributeDependencies(
    @ApiParam(value = "Execution plan ID")
    @RequestParam("execId") execId: ExecutionPlanInfo.Id,
    @ApiParam(value = "Attribute ID")
    @RequestParam("attributeId") attributeId: UUID
  ): Future[AttributeGraph] = repo
    .loadExecutionPlanAsDAG(execId)
    .map(execPlan => {
      val dependencyResolver = AttributeDependencyResolver.forSystem(execPlan.sysInfo)
      AttributeDependencySolver(execPlan, dependencyResolver).lineage(attributeId.toString)
    })
    .map(_.getOrElse(throw new NoSuchElementException()))

  @GetMapping(Array("attribute-lineage-and-impact"))
  @ApiOperation(
    value = "Get graph of attributes that depends on attribute with provided id")
  def attributeLineageAndImpact(
    @ApiParam(value = "Execution plan ID")
    @RequestParam("execId") execId: ExecutionPlanInfo.Id,
    @ApiParam(value = "Attribute ID")
    @RequestParam("attributeId") attributeId: UUID
  ): Future[AttributeLineageAndImpact] = repo
    .loadExecutionPlanAsDAG(execId)
    .map(execPlan => {
      val dependencyResolver = AttributeDependencyResolver.forSystem(execPlan.sysInfo)
      val solver = AttributeDependencySolver(execPlan, dependencyResolver)
      val maybeAttrLineage = solver.lineage(attributeId.toString)
      val maybeAttrImpact = solver.impact(attributeId.toString)
      val Seq((lineage: AttributeGraph, impact: AttributeGraph)) = maybeAttrLineage.zip(maybeAttrImpact)
      AttributeLineageAndImpact(lineage, impact)
    })
}

object LineageDetailedController {

  @ApiModel(description = "Attribute Lineage And Impact")
  case class AttributeLineageAndImpact(
    @ApiModelProperty("Attribute Lineage")
    lineage: AttributeGraph,
    @ApiModelProperty("Attribute Impact")
    impact: AttributeGraph
  )

}
