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

import com.fasterxml.jackson.annotation.{JsonSubTypes, JsonTypeInfo}


@JsonTypeInfo(
  use = JsonTypeInfo.Id.NAME,
  include = JsonTypeInfo.As.PROPERTY,
  property = "_type")
@JsonSubTypes(value = Array(
  new JsonSubTypes.Type(value = classOf[DataSourceNode], name = "DataSourceNode"),
  new JsonSubTypes.Type(value = classOf[ExecutionNode], name = "ExecutionNode"),
))
sealed trait LineageOverviewNode extends Graph.Node {
  val name: String
  type Id = String
}

case class DataSourceNode
(
  override val _id: String,
  override val name: String
) extends LineageOverviewNode {
  override type Id = String
}

case class ExecutionNode
(
  override val _id: String,
  override val name: String,
  systemInfo: ExecutionNode.NameAndVersion,
  agentInfo: Option[ExecutionNode.NameAndVersion],
) extends LineageOverviewNode {
  override type Id = String
}

object ExecutionNode {

  case class NameAndVersion(name: String, version: String)

}
