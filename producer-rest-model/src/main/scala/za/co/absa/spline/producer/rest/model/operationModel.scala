
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

package za.co.absa.spline.producer.rest.model

sealed trait OperationLike {
  val id: OperationId
  val childIds: Array[OperationId]
  val schema: Option[Schema]
}

case class DataOperation(
  params: Map[String, Any],
  override val id: OperationId,
  override val childIds: Array[OperationId],
  override val schema: Option[Schema]
) extends OperationLike

case class ReadOperation(
  inputSources: Array[SourceUrl],
  override val id: OperationId,
  override val schema: Option[Schema] = None
) extends OperationLike {
  override val childIds: Array[OperationId] = Array.empty
}

case class WriteOperation(
  outputSource: SourceUrl,
  append: Boolean,
  override val id: OperationId,
  override val childIds: Array[OperationId],
  override val schema: Option[Schema] = None
) extends OperationLike

