/*
 * Copyright 2024 ABSA Group Limited
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
  property = "_typeHint")
@JsonSubTypes(value = Array(
  new JsonSubTypes.Type(value = classOf[SimpleDataType], name = "dt.Simple"),
  new JsonSubTypes.Type(value = classOf[ArrayDataType], name = "dt.Array"),
  new JsonSubTypes.Type(value = classOf[StructDataType], name = "dt.Struct"),
))
sealed trait DataType {
  def id: String

  def nullable: Boolean
}

case class SimpleDataType(
  override val id: String,
  override val nullable: Boolean,
  name: String
) extends DataType

case class ArrayDataType(
  override val id: String,
  override val nullable: Boolean,
  elementDataTypeId: String
) extends DataType

case class StructDataType(
  override val id: String,
  override val nullable: Boolean,
  fields: Array[StructField]
) extends DataType

case class StructField(
  name: String,
  dataTypeId: String
)
