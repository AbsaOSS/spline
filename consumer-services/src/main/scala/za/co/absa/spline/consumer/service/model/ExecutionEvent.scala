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

case class ExecutionEvent(
                           @ApiModelProperty(value = "Id of the executionEvent")
                           id: String,
                           @ApiModelProperty(value = "When the execution was triggered")
                           timestamp: Long,
                           @ApiModelProperty(value = "Any other extra information related to the execution Event Like the application Id for instance")
                           extra: Map[String, Any],
                           @ApiModelProperty(value = "Creation timestamp of the execution event")
                           creationTimestamp: Long
                         ) {
  def this() = this(null, 0, null, 0)
}

