/*
 * Copyright 2024 ABSA Group Limited
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

package za.co.absa.spline.consumer.service.model

import com.fasterxml.jackson.core.`type`.TypeReference
import io.swagger.annotations.{ApiModel, ApiModelProperty}


@ApiModel(description = "Execution Plan with Operation Graph")
case class ExecutionPlanDetailed(
  @ApiModelProperty(value = "Information related to the execution plan")
  executionPlan: ExecutionPlanInfo,
  @ApiModelProperty(value = "Execution plan level lineage")
  graph: OperationGraph
)

object ExecutionPlanDetailed {
  implicit val typeRef: TypeReference[ExecutionPlanDetailed] = new TypeReference[ExecutionPlanDetailed] {}
}
