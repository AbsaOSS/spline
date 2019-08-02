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
    _creationTimestamp: Long,
    timestamp: Long,
    error: Option[Any],
    extra: Map[String, Any],
    override val _key: Option[String] = None,
    override val _id: Option[String] = None,
    override val _rev: Option[String] = None
  ) extends ArangoDocument

case class Execution(
    extra: Map[String, Any],
    override val _key: Option[String] = None,
    override val _id: Option[String] = None,
    override val _rev: Option[String] = None
  ) extends ArangoDocument

trait DataType {
  def id: String
  def nullable: Boolean
}

case class SimpleDataType(
     override val id: String,
     override val nullable: Boolean,
     name: String
 ) extends DataType {

  def this() = this("", true, "")

}

case class StructDataType(
     override val id: String,
     override val nullable: Boolean,
     fields: Array[Attribute]
  ) extends DataType {

  def this() = this("", true, null)

}

case class ArrayDataType(
     override val id: String,
     override val nullable: Boolean,
     elementDataTypeId: String
  ) extends DataType {

  def this() = this("", true, "")

}

case class Schema(
  attributes: Array[Attribute])

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
  def properties: Map[String, Any]
  def outputSchema: Option[Any]
  def _type: String
}

case class Read(
    override val name: String,
    override val properties: Map[String, Any],
    override val outputSchema: Option[Any],
    override val _key: Option[String] = None,
    override val _id: Option[String] = None,
    override val _rev: Option[String] = None,
    override val _type: String = "Read"
  ) extends Operation {

  def this() = this("", null, None, null)
}

case class Write(
    override val name: String,
    override val properties: Map[String, Any],
    override val outputSchema: Option[Any],
    override val _key: Option[String] = None,
    override val _id: Option[String] = None,
    override val _rev: Option[String] = None,
    override val _type: String = "Write"
  ) extends Operation {

  def this() = this("", null, None, null)
}

case class Transformation(
    override val name: String,
    override val properties: Map[String, Any],
    override val outputSchema: Option[Any],
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
    dataTypeId: String
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
