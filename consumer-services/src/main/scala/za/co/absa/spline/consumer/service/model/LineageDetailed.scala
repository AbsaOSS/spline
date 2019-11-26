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

package za.co.absa.spline.consumer.service.model

import io.swagger.annotations.{ApiModel, ApiModelProperty}


@ApiModel(description = "Execution And Lineage Graph")
case class LineageDetailed(
  @ApiModelProperty(value = "Information related to the execution")
  execution: ExecutionInfo,
  @ApiModelProperty(value = "Lineage of the execution")
  plan: LineageDetailedGraph
) {
  def this() = this(null, null)
}

object LineageDetailed {
  type OperationID = String
}