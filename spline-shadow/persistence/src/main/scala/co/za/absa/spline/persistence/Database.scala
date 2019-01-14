/*
 * Copyright 2017 ABSA Group Limited
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

package co.za.absa.spline.persistence

// Underscore import is needed
import com.outr.arango.{DocumentOption, Edge, _}
import com.outr.arango.managed._

case class Progress(timestamp: Long, readCount: Long, _key: Option[String] = None, _id: Option[String] = None,  _rev: Option[String] = None) extends DocumentOption
case class Execution(id: String, sparkVer: String, timestamp: Long,  _key: Option[String] = None, _id: Option[String] = None, _rev: Option[String] = None) extends DocumentOption
case class App(appId: String, appName: String, dataTypes: Seq[DataType], _key: Option[String] = None, _id: Option[String] = None, _rev: Option[String] = None) extends DocumentOption
case class DataType(id: String, name: String, nullable: Boolean, childrenIds: Seq[String])
case class Schema(attributes: Seq[Attribute])

trait Operation extends PolymorphicDocumentOption {
  def name: String
  def expression: String
  def outputSchema: Schema
}

case class Read(name: String, expression: String, format: String, outputSchema: Schema, _key: Option[String] = None,   _id: Option[String] = None,  _rev: Option[String] = None, _type: String = "read") extends Operation
case class Write(name: String, expression: String, format: String, outputSchema: Schema,  _key: Option[String] = None,   _id: Option[String] = None,  _rev: Option[String] = None, _type: String = "write") extends Operation
case class Transformation(name: String, expression: String, outputSchema: Schema, _key: Option[String] = None, _id: Option[String] = None, _rev: Option[String] = None, _type: String = "transformation") extends Operation

case class DataSource(uri: String, _key: Option[String] = None, _rev: Option[String] = None, _id: Option[String] = None) extends DocumentOption
case class Attribute(name: String, dataTypeId: String)

case class ProgressOf(_from: String, _to: String,_key: Option[String] = None,  _id: Option[String] = None, _rev: Option[String] = None) extends Edge with DocumentOption
case class Follows(_from: String, _to: String,_key: Option[String] = None,  _id: Option[String] = None, _rev: Option[String] = None) extends Edge with DocumentOption
case class ReadsFrom( _from: String, _to: String, _key: Option[String] = None,  _id: Option[String] = None, _rev: Option[String] = None) extends Edge with DocumentOption
case class WritesTo(_from: String, _to: String,  _key: Option[String] = None, _id: Option[String] = None,  _rev: Option[String] = None) extends Edge with DocumentOption
case class Implements(_from: String, _to: String, _key: Option[String] = None,  _id: Option[String] = None,  _rev: Option[String] = None) extends Edge with DocumentOption
case class Executes(_from: String, _to: String, _key: Option[String] = None,  _id: Option[String] = None,  _rev: Option[String] = None) extends Edge with DocumentOption

object Database extends Graph("lineages") {

  val progress: VertexCollection[Progress] = vertex[Progress]("progress")
  val progressOf: EdgeCollection[ProgressOf] = edge[ProgressOf]("progressOf", ("progress", "execution"))
  val execution: VertexCollection[Execution] = vertex[Execution]("execution")
  val executes: EdgeCollection[Executes] = edge[Executes]("executes", ("execution", "app"))
  val app: VertexCollection[App] = vertex[App]("app")
  val implements: EdgeCollection[Implements] = edge[Implements]("implements", ("app", "operation"))
  val operation: PolymorphicVertexCollection[Operation] = polymorphic3[Operation, Read, Write, Transformation]("operation")
  val follows: EdgeCollection[Follows] = edge[Follows]("follows", ("operation", "operation"))
  val readsFrom: EdgeCollection[ReadsFrom] = edge[ReadsFrom]("readsFrom", ("operation", "dataSource"))
  val writesTo: EdgeCollection[WritesTo] = edge[WritesTo]("writesTo", ("operation", "dataSource"))
  val dataSource: VertexCollection[DataSource] = vertex[DataSource]("dataSource")

  trait CopyMethod[T <: DocumentOption] extends DocumentOption {
    def copy(_key: Option[String], _id: Option[String], _rev: Option[String]): T
  }

}