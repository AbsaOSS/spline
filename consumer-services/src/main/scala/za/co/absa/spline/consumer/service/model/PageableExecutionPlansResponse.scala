/*
 * Copyright 2022 ABSA Group Limited
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

case class PageableExecutionPlansResponse(
  @ApiModelProperty(value = "Array of Execution plans")
  override val items: Array[ExecutionPlanInfo],
  @ApiModelProperty(value = "Total number of executionPlans in the result set")
  override val totalCount: Long,
  @ApiModelProperty(value = "Page number")
  override val pageNum: Int,
  @ApiModelProperty(value = "Page size")
  override val pageSize: Int
) extends Pageable[ExecutionPlanInfo]
