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

sealed trait ExpressionLike {
  def id: ExpressionLike.Id
  def dataType: Option[Any]

  // todo: rename it to "childRefs" ??
  def childIds: Seq[ExpressionLike.ChildRef]
  def extra: Map[String, Any]
}

object ExpressionLike {
  type Id = String
  type ChildRef = AttrOrExprRef
}

/**
 * Represents a functional expression that computes a value based on the given input.
 *
 * @param id       expression ID
 * @param name     expression name
 * @param dataType output data type
 * @param childIds input expression (or attribute) IDs
 * @param params   optional static expression parameters (don't confuse with input parameters)
 * @param extra    optional metadata
 */
case class FunctionalExpression(
  override val id: ExpressionLike.Id,
  override val dataType: Option[Any],
  override val childIds: Seq[ExpressionLike.ChildRef] = Nil,
  override val extra: Map[String, Any] = Map.empty,
  name: String,
  params: Map[String, Any] = Map.empty,
) extends ExpressionLike

/**
 * Literal expression
 *
 * @param id       expression ID
 * @param value    literal value
 * @param dataType value data type
 * @param extra    optional metadata
 */
case class Literal(
  override val id: ExpressionLike.Id,
  override val dataType: Option[Any],
  override val extra: Map[String, Any] = Map.empty,
  value: Any,
) extends ExpressionLike {
  override def childIds: Seq[ExpressionLike.ChildRef] = Nil
}
