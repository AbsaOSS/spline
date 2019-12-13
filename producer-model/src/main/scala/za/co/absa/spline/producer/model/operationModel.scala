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

package za.co.absa.spline.producer.model

sealed trait OperationLike {
  val id: Int
  val childIds: Seq[Int]
  val schema: Option[Any]
  val params: Map[String, Any]
  val extra: Map[String, Any]
}


case class DataOperation(
  override val id: Int,
  override val childIds: Seq[Int] = Seq.empty,
  override val schema: Option[Any] = None, // None means that that the schema is either the same as in the child operation, or unknown.
  override val params: Map[String, Any] = Map.empty,
  override val extra: Map[String, Any] = Map.empty
) extends OperationLike

case class ReadOperation(
  inputSources: Seq[String],
  override val id: Int,
  override val schema: Option[Any] = None,
  override val params: Map[String, Any] = Map.empty,
  override val extra: Map[String, Any] = Map.empty
) extends OperationLike {
  override val childIds: Seq[Int] = Seq.empty // Read operation is always a terminal node in a DAG
}

case class WriteOperation(
  outputSource: String,
  append: Boolean,
  override val id: Int,
  override val childIds: Seq[Int],
  override val params: Map[String, Any] = Map.empty,
  override val extra: Map[String, Any] = Map.empty
) extends OperationLike {
  override val schema: Option[Any] = None // Being a side-effect only, Write operation never changes the schema
}

