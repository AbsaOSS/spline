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

import java.util.UUID

import ExecutionInfo.Id
import io.swagger.annotations.{ApiModel, ApiModelProperty}

@ApiModel(description="Information of the retrieved execution")
case class ExecutionInfo
(
  @ApiModelProperty(value = "Execution Id")
  _id: Id,
  @ApiModelProperty(value = "Information Map related to the execution containing for instance the list of attributes, the data types and extra info of the agent and the framework used")
  extra: Map[String, Any]
) {
  def this() = this(null, null)
}

object ExecutionInfo {
  type Id = UUID
}
