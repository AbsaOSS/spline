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

case class Progress(
    timestamp: Long,
    readCount: Long,
    override val _key: Option[String] = None,
    override val _id: Option[String] = None,
    override val _rev: Option[String] = None
  ) extends ArangoDocument

case class Execution(
    id: String,
    dataTypes: Array[DataType],
    startTime: Option[Long],
    endTime: Option[Long],
    extra: Map[String, Any],
    override val _key: Option[String] = None,
    override val _id: Option[String] = None,
    override val _rev: Option[String] = None
  ) extends ArangoDocument

trait DataType {
  def _key: String
  def nullable: Boolean
}

case class SimpleDataType(
     override val _key: String,
     override val nullable: Boolean,
     name: String
 ) extends DataType {

  def this() = this("", true, "")

}

case class StructDataTypeField(
    name: String,
    dataTypeKey: String
  ) {

  def this() = this("", "")
}

case class StructDataType(
     override val _key: String,
     override val nullable: Boolean,
     fields: Seq[StructDataTypeField]
  ) extends DataType {

  def this() = this("", true, null)

}

case class ArrayDataType(
     override val _key: String,
     override val nullable: Boolean,
     elementDataTypeKey: String
  ) extends DataType {

  def this() = this("", true, "")

}

case class Schema(
  attributes: Seq[Attribute])

trait ArangoDocument {
  def _id: Option[String]
  def _rev: Option[String]
  def _key: Option[String]
}

trait ArangoEdge extends ArangoDocument {
  def _from: String
  def _to: String
}

trait Operation extends ArangoDocument {
  def name: String
  def properties: Map[String, AnyRef]
  def outputSchema: Schema
  def _type: String
}

case class Read(
    override val name: String,
    override val properties: Map[String, AnyRef],
    format: String,
    override val outputSchema: Schema,
    override val _key: Option[String] = None,
    override val _id: Option[String] = None,
    override val _rev: Option[String] = None,
    override val _type: String = "Read"
  ) extends Operation {

  def this() = this("", null, "", null)
}

case class Write(
    override val name: String,
    override val properties: Map[String, AnyRef],
    format: String,
    override val outputSchema: Schema,
    override val _key: Option[String] = None,
    override val _id: Option[String] = None,
    override val _rev: Option[String] = None,
    override val _type: String = "Write"
  ) extends Operation {

  def this() = this("", null, "", null)
}

case class Transformation(
    override val name: String,
    override val properties: Map[String, AnyRef],
    override val outputSchema: Schema,
    override val _key: Option[String] = None,
    override val _id: Option[String] = None,
    override val _rev: Option[String] = None,
    override val _type: String = "Transformation"
  ) extends Operation {

  def this() = this("", null, null)
}

case class DataSource(
    uri: String,
    override val _key: Option[String] = None,
    override val _rev: Option[String] = None,
    override val _id: Option[String] = None
  ) extends ArangoDocument {

  def this() = this("")
}

case class Attribute(
    name: String,
    dataTypeKey: String
  ) {

  def this() = this("", "")
}

case class ProgressOf(
    override val _from: String,
    override val _to: String,
    override val _key: Option[String] = None,
    override val _id: Option[String] = None,
    override val _rev: Option[String] = None
  ) extends ArangoEdge {

  def this() = this("", "")
}

case class Follows(
    override val _from: String,
    override val _to: String,
    override val _key: Option[String] = None,
    override val _id: Option[String] = None,
    override val _rev: Option[String] = None
  ) extends ArangoEdge {

  def this() = this("", "")
}

case class ReadsFrom(
    override val _from: String,
    override val _to: String,
    override val _key: Option[String] = None,
    override val _id: Option[String] = None,
    override val _rev: Option[String] = None
  ) extends ArangoEdge {

  def this() = this("", "")
}


case class WritesTo(
    override val _from: String,
    override val _to: String,
    override val _key: Option[String] = None,
    override val _id: Option[String] = None,
    override val _rev: Option[String] = None
  ) extends ArangoEdge {

  def this() = this("", "")
}


case class Executes(
    override val _from: String,
    override val _to: String,
    override val _key: Option[String] = None,
    override val _id: Option[String] = None,
    override val _rev: Option[String] = None
  ) extends ArangoEdge {

  def this() = this("", "")
}
