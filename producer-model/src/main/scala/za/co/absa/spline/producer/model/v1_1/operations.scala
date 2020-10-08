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

package za.co.absa.spline.producer.model.v1_1

import za.co.absa.spline.producer.model.v1_1.OperationLike.Id

sealed trait OperationLike {
  val id: Id
  val childIds: Seq[Id]
  val output: Seq[ExpressionLike.Id]
  val params: Map[String, Any]
  val expressions: Map[String, Array[ExpressionLike.Id]]
  val extra: Map[String, Any]
}

object OperationLike {
  type Id = String
}


case class DataOperation(
  override val id: Id,
  override val childIds: Seq[Id] = Seq.empty,
  override val output: Seq[Attribute.Id],
  override val params: Map[String, Any] = Map.empty,
  override val expressions: Map[String, Array[ExpressionLike.Id]] = Map.empty,
  override val extra: Map[String, Any] = Map.empty
) extends OperationLike

case class ReadOperation(
  inputSources: Seq[String],
  override val id: Id,
  override val output: Seq[Attribute.Id],
  override val params: Map[String, Any] = Map.empty,
  override val expressions: Map[String, Array[ExpressionLike.Id]] = Map.empty,
  override val extra: Map[String, Any] = Map.empty
) extends OperationLike {
  override val childIds: Seq[Id] = Seq.empty
}

case class WriteOperation(
  outputSource: String,
  append: Boolean,
  override val id: Id,
  override val childIds: Seq[Id],
  override val params: Map[String, Any] = Map.empty,
  override val expressions: Map[String, Array[ExpressionLike.Id]] = Map.empty,
  override val extra: Map[String, Any] = Map.empty
) extends OperationLike {
  override val output: Seq[Attribute.Id] = Nil

}
