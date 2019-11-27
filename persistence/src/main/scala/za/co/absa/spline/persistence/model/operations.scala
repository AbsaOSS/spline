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

trait Operation extends Vertex {
  def name: String
  def properties: Map[String, Any]
  def outputSchema: Option[Any]
  def _type: String
}

case class Read(
  inputSources: Seq[String],
  override val name: String,
  override val properties: Map[String, Any],
  override val outputSchema: Option[Any],
  override val _key: String,
  override val _type: String = "Read"
) extends Operation {
  def this() = this(null, null, null, null, null)
}

case class Write(
  outputSource: String,
  append: Boolean,
  override val name: String,
  override val properties: Map[String, Any],
  override val outputSchema: Option[Any],
  override val _key: String,
  override val _type: String = "Write"
) extends Operation {
  def this() = this(null, false, null, null, null, null)
}

case class Transformation(
  override val name: String,
  override val properties: Map[String, Any],
  override val outputSchema: Option[Any],
  override val _key: String,
  override val _type: String = "Transformation"
) extends Operation {
  def this() = this(null, null, null, null)
}
