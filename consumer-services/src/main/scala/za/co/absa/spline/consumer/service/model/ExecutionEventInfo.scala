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

import io.swagger.annotations.ApiModelProperty

case class ExecutionEventInfo
(
  @ApiModelProperty(value = "Id of the executionEvent")
  executionEventId: String,
  @ApiModelProperty(value = "Name of the framework that triggered this execution event")
  frameworkName: String,
  @ApiModelProperty(value = "Name of the application/job")
  applicationName: String,
  @ApiModelProperty(value = "Id of the application/job")
  applicationId: String,
  @ApiModelProperty(value = "When the execution was triggered")
  timestamp: Long,
  @ApiModelProperty(value = "Output file uri")
  datasource: String,
  @ApiModelProperty(value = "Type of the output file")
  datasourceType: String,
  @ApiModelProperty(value = "Write mode - (true=Append; false=Override)")
  append: Boolean
) {
  def this() = this(null, null, null, null, 0, null, null, false)
}

case class PageableExecutionEventsResponse(
  @ApiModelProperty(value = "Array of Execution events")
  override val elements: Array[ExecutionEventInfo],
  @ApiModelProperty(value = "Total number of executionEvents in the result set")
  override val totalCount: Long,
  @ApiModelProperty(value = "Page index")
  override val offset: Int,
  @ApiModelProperty(value = "Page size")
  override val size: Int,
  @ApiModelProperty(value = "Total date range (min and max timestamp) of the result set")
  val totalDateRange: Array[Long]
) extends Pageable[ExecutionEventInfo]