
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

case class Progress(timestamp: Long, readCount: Long, _key: Option[String] = None, _id: Option[String] = None, _rev: Option[String] = None) extends DocumentOption

case class Execution(id: String, dataTypes: Seq[DataType], startTime: Option[Long], endTime: Option[Long], extra: Map[String, Any], _key: Option[String] = None, _id: Option[String] = None, _rev: Option[String] = None) extends DocumentOption

case class DataType(id: String, name: String, nullable: Boolean, childrenIds: Seq[String])

case class Schema(attributes: Seq[Attribute])

trait PolymorphicDocumentOption

trait DocumentOption

trait Edge

trait Operation extends PolymorphicDocumentOption {
  def name: String

  def expression: String

  def outputSchema: Schema
}

case class Read(name: String, expression: String, format: String, outputSchema: Schema, _key: Option[String] = None, _id: Option[String] = None, _rev: Option[String] = None, _type: String = "read") extends Operation {
  def this() = this("", "", "", null)
}

case class Write(name: String, expression: String, format: String, outputSchema: Schema, _key: Option[String] = None, _id: Option[String] = None, _rev: Option[String] = None, _type: String = "write") extends Operation {
  def this() = this("", "", "", null)
}

case class Transformation(name: String, expression: String, outputSchema: Schema, _key: Option[String] = None, _id: Option[String] = None, _rev: Option[String] = None, _type: String = "transformation") extends Operation {
  def this() = this("", "", null)
}

case class DataSource(uri: String, _key: Option[String] = None, _rev: Option[String] = None, _id: Option[String] = None) extends DocumentOption {
  def this() = this("")
}

case class Attribute(name: String, dataTypeId: String) {
  def this() = this("", "")
}

case class ProgressOf(_from: String, _to: String, _key: Option[String] = None, _id: Option[String] = None, _rev: Option[String] = None) extends Edge with DocumentOption {
  def this() = this("", "")
}

case class Follows(_from: String, _to: String, _key: Option[String] = None, _id: Option[String] = None, _rev: Option[String] = None) extends Edge with DocumentOption {
  def this() = this("", "")
}

case class ReadsFrom(_from: String, _to: String, _key: Option[String] = None, _id: Option[String] = None, _rev: Option[String] = None) extends Edge with DocumentOption {
  def this() = this("", "")
}


case class WritesTo(_from: String, _to: String, _key: Option[String] = None, _id: Option[String] = None, _rev: Option[String] = None) extends Edge with DocumentOption {
  def this() = this("", "")
}


case class Executes(_from: String, _to: String, _key: Option[String] = None, _id: Option[String] = None, _rev: Option[String] = None) extends Edge with DocumentOption {
  def this() = this("", "")
}
