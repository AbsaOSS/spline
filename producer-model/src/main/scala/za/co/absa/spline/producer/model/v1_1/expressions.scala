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

import za.co.absa.spline.producer.model.v1_1.ExpressionLike.Id

sealed trait ExpressionLike {
  def id: Id
  def dataType: Option[DataType]
  def childIds: Seq[ExpressionLike.Id]
  def extra: Map[String, Any]
}

object ExpressionLike {
  type Id = String
}

case class FunctionalExpression(
  override val id: Id,
  override val dataType: Option[DataType],
  override val childIds: Seq[ExpressionLike.Id],
  override val extra: Map[String, Any],
  name: String,
  params: Map[String, Any],
) extends ExpressionLike

case class Attribute(
  override val id: Attribute.Id,
  override val dataType: Option[DataType],
  override val childIds: Seq[ExpressionLike.Id],
  override val extra: Map[String, Any],
  name: String,
) extends ExpressionLike

object Attribute {
  type Id = ExpressionLike.Id
}

case class Literal(
  override val id: Id,
  override val dataType: Option[DataType],
  override val extra: Map[String, Any],
  value: Any,
) extends ExpressionLike {
  override def childIds: Seq[ExpressionLike.Id] = Nil
}
