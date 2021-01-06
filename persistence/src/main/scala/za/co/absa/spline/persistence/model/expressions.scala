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

package za.co.absa.spline.persistence.model

// todo: do we really need this hierarchy here as well as for operations?

sealed trait Expression extends Vertex {
  def _type: String // todo: rename: remove underscore to avoid collision with arangodb property name domain
  def dataType: Option[Any]
  def extra: Map[String, Any]
}

case class Attribute(
  override val _key: String,
  override val dataType: Option[Any],
  override val extra: Map[String, Any],
  name: String,
) extends Expression {
  def this() = this(null, null, null, null)

  def _type: String = "Attr"
}

case class FunctionalExpression(
  override val _key: String,
  override val dataType: Option[Any],
  override val extra: Map[String, Any],
  name: String,
  params: Map[String, Any],
) extends Expression {
  def this() = this(null, null, null, null, null)

  def _type: String = "Func"
}

case class LiteralExpression(
  override val _key: String,
  override val dataType: Option[Any],
  override val extra: Map[String, Any],
  value: Any,
) extends Expression {
  def this() = this(null, null, null, null)

  def _type: String = "Lit"
}
