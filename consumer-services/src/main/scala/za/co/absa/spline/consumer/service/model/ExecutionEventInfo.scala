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
import za.co.absa.spline.persistence.model.Progress

import java.{util => ju}

case class ExecutionEventInfo
(
  @ApiModelProperty(value = "Duration of execution in nanoseconds (for successful executions)")
  durationNs: Option[ExecutionEventInfo.DurationNs],
  @ApiModelProperty(value = "Error (for failed executions)")
  error: Option[Any],
  @ApiModelProperty(value = "Output data source name")
  dataSourceName: String,
  @ApiModelProperty(value = "Output data source URI")
  dataSourceUri: String,

  // these properties are only applicable for the WRITE execution events,
  // therefore they are nullable to avoid deserialization issues of the READ events.

  @ApiModelProperty(value = "Id of the execution event")
  executionEventId: ExecutionEventInfo.Id = null,
  @ApiModelProperty(value = "Id of the execution plan")
  executionPlanId: ExecutionPlanInfo.Id = null,
  @ApiModelProperty(value = "Name of the framework that triggered this execution event")
  frameworkName: String = null,
  @ApiModelProperty(value = "Name of the application/job")
  applicationName: String = null,
  @ApiModelProperty(value = "Id of the application/job")
  applicationId: String = null,
  @ApiModelProperty(value = "When the execution was triggered")
  timestamp: ExecutionEventInfo.Timestamp = null,
  @ApiModelProperty(value = "Output data source (or data) type")
  dataSourceType: String = null,
  @ApiModelProperty(value = "Write mode - (true=Append; false=Override)")
  append: ExecutionEventInfo.Append = null,
  @ApiModelProperty(value = "Other extra info")
  extra: Map[String, Any] = null,
  @ApiModelProperty(value = "Execution event labels")
  labels: Map[Label.Name, ju.List[Label.Value]] = null,
)

object ExecutionEventInfo {
  type Id = String
  type Timestamp = java.lang.Long
  type DurationNs = Progress.JobDurationInNanos
  type Append = java.lang.Boolean
}

