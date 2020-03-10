/*
 * Copyright 2020 ABSA Group Limited
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

package za.co.absa.spline.consumer.service.model.search

import java.util.UUID

import io.swagger.annotations.{ApiModel, ApiModelProperty}

@ApiModel(description = "Found Attribute")
case class FoundAttribute
(
  @ApiModelProperty(value = "Attribute Id")
  id: UUID,

  @ApiModelProperty(value = "Attribute Name")
  name: String,

  @ApiModelProperty(value = "Attribute Type Map")
  attributeType: Map[String, Any],

  @ApiModelProperty(value = "Execution Event Id")
  executionEventId: String,

  @ApiModelProperty(value = "Execution Event Name")
  executionEventName: String
) {
  def this() = this(null, null, null, null, null)
}
