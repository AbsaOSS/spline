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

import io.swagger.annotations.{ApiModel, ApiModelProperty}

@ApiModel(description = "Attribute Dependencies")
case class AttributeDependencies
(
  @ApiModelProperty(value = "List of attribute ids on which the requested attribute depends")
  attributes: Seq[UUID],

  @ApiModelProperty(value = "List of operation ids referencing provided attribute or dependent attributes")
  operations: Seq[Int]
) {
  def this() = this(null, null)
}








