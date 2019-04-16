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

package za.co.absa.spline.persistence

import java.lang.Iterable
import java.util.UUID
import java.util.UUID.randomUUID

import com.arangodb.velocypack.VPackSlice
import za.co.absa.spline.model.{DataLineage, MetaDataset}
import za.co.absa.spline.persistence.model._
import za.co.absa.spline.{model => old}

import scala.collection.JavaConverters._
import scala.language.implicitConversions

case class DataLineageTransactionParams
(
  operation: Iterable[VPackSlice],
  follows: Iterable[VPackSlice],
  dataSource: Iterable[VPackSlice],
  writesTo: Iterable[VPackSlice],
  readsFrom: Iterable[VPackSlice],
  execution: Iterable[VPackSlice],
  executes: Iterable[VPackSlice],
  progress: Iterable[VPackSlice],
  progressOf: Iterable[VPackSlice]) {

  def fields: Array[String] = getClass
    .getDeclaredFields
    .map(_.getName)
    .filter(_ != "$outer")

  def saveCollectionsJs: String = fields
    .map(field =>
      s"""
         |  params.$field.forEach(o => db.$field.insert(o));
        """.stripMargin)
    .mkString("\n")
}

object DataLineageTransactionParams {

  def create(dataLineage: DataLineage, uriToNewKey: Map[String, String], uriToKey: Map[String, String]): DataLineageTransactionParams = {

    implicit def ser(it: scala.collection.Iterable[AnyRef]): Iterable[VPackSlice] = it.map(Persister.vpack.serialize).asJava

    DataLineageTransactionParams(
      createEncodedOperations(dataLineage),
      createFollows(dataLineage),
      createDataSources(uriToNewKey),
      createWritesTos(dataLineage, uriToKey),
      createReadsFrom(dataLineage, uriToKey),
      createExecution(dataLineage),
      createExecutes(dataLineage),
      createProgressForBatchJob(dataLineage),
      createProgressOf(dataLineage)
    )
  }

  @inline private def getDSId(ln: DataLineage): String = ln.rootDataset.id.toString

  private def createExecutes(dataLineage: DataLineage) =
    Seq(Executes("execution/" + getDSId(dataLineage), "operation/" + dataLineage.rootOperation.mainProps.id, Some(getDSId(dataLineage))))

  private def createProgressOf(dataLineage: DataLineage) =
    Seq(ProgressOf("progress/" + getDSId(dataLineage), "execution/" + getDSId(dataLineage), Some(getDSId(dataLineage))))

  /** progress for batch jobs need to be generated during migration for consistency with stream jobs **/
  private def createProgressForBatchJob(dataLineage: DataLineage) = {
    val batchWrites = dataLineage.operations
      .find(_.isInstanceOf[old.op.BatchWrite])
      .getOrElse(throw new IllegalArgumentException("All pumped lineages are expected to be batch."))
      .asInstanceOf[old.op.BatchWrite]
    val readCount = batchWrites.readMetrics.values.sum
    Seq(Progress(dataLineage.timestamp, readCount, Some(getDSId(dataLineage))))
  }

  private def createExecution(dataLineage: DataLineage) = {
    val dataTypes = dataLineage.dataTypes.toArray
      .map(createDataType)
    val extras = Map(
      "sparkVer" -> dataLineage.sparkVer,
      "appId" -> dataLineage.appId,
      "appName" -> dataLineage.appName
    )
    Seq(Execution(dataLineage.appId, dataTypes, None, Some(dataLineage.timestamp), extras, Some(getDSId(dataLineage))))
  }

  private def createDataType(input: old.dt.DataType): DataType = {
    input match {
      case old.dt.Simple(id, name, nullable) =>
        SimpleDataType(id.toString, nullable, name)
      case old.dt.Struct(id, fields, nullable) =>
        val newFields = fields.map(f => StructDataTypeField(f.name, f.dataTypeId.toString))
        StructDataType(id.toString, nullable, newFields)
      case old.dt.Array(id, elementDataTypeId, nullable) =>
        ArrayDataType(id.toString, nullable, elementDataTypeId.toString)
    }
  }

  private def createReadsFrom(dataLineage: DataLineage, dsUriToKey: Map[String, String]) =
    dataLineage.operations
      .filter(_.isInstanceOf[old.op.Read])
      .map(_.asInstanceOf[old.op.Read])
      .flatMap(op => op.sources.map(s => {
        val opId = op.mainProps.id
        val dsId = dsUriToKey(s.path)
        ReadsFrom(s"operation/$opId", s"dataSource/$dsId", Some(randomUUID.toString))
      }))
      .distinct

  private def createWritesTos(dataLineage: DataLineage, dsUriToKey: Map[String, String]) = {
    dataLineage.operations
      .iterator.toIterable
      .filter(_.isInstanceOf[old.op.Write]).map(_.asInstanceOf[old.op.Write])
      .map(o => WritesTo("operation/" + o.mainProps.id, "dataSource/" + dsUriToKey(o.path), Some(o.mainProps.id.toString)))
  }

  private def createDataSources(dsUriToNewKey: Map[String, String]) = {
    dsUriToNewKey.map { case (uri, key) => DataSource(uri, Some(key)) }
  }


  private def createOperations(dataLineage: DataLineage) = {
    dataLineage.operations.iterator.toIterable.map(op => {
      val outputSchema = findOutputSchema(dataLineage, op)
      val _key = Some(op.mainProps.id.toString)
      val name = op.mainProps.name
      def transformation(properties: (String, AnyRef)*) = Transformation(name, properties.toMap, outputSchema, _key)
      op match {
        case r: old.op.Read => Read(name, Map(), r.sourceType, outputSchema, _key)
        case w: old.op.Write => Write(name, Map(), w.destinationType, outputSchema, _key)
        case old.op.Aggregate(_, groupings, aggregations) => transformation(
          "groupings" -> groupings, "aggregations" -> aggregations)
        case old.op.Alias(_, alias) => transformation("alias" -> alias)
        case old.op.Filter(_, condition) => transformation("condition" -> condition)
        case old.op.Generic(_, rawString) => transformation("rawString" -> rawString)
        case old.op.Join(_, condition, joinType) => transformation(
          "condition" -> condition, "joinType" -> joinType)
        case old.op.Projection(_, transformations) => transformation("transformations" -> transformations)
        case old.op.Sort(_, orders) => transformation("orders" -> orders)
        case _ => transformation()
      }
    })
  }

  private def createEncodedOperations(dataLineage: DataLineage) = {
    createOperations(dataLineage)
  }

  private def createFollows(dataLineage: DataLineage) = {
    // Operation inputs and outputs ids may be shared across already linked lineages. To avoid saving linked lineages or
    // duplicate indexes we need to not use these.
    val outputToOperationId = dataLineage
      .operations
      .map(o => (o.mainProps.output, o.mainProps.id))
      .toMap
    dataLineage.operations.iterator.toIterable
      .flatMap(op => createOperationFollows(outputToOperationId)(op))
  }

  private def createOperationFollows(outputIdToOperationId: Map[UUID, UUID])
                                    (op: old.op.Operation): Seq[Follows] = {
    op.mainProps.inputs
      .flatMap(outputIdToOperationId.get)
      .map(opId => Follows(
        s"operation/${op.mainProps.id}",
        s"operation/$opId",
        Some(randomUUID.toString)))
  }

  private def findOutputSchema(dataLineage: DataLineage, operation: old.op.Operation): Schema = {
    val metaDataset: MetaDataset = dataLineage.datasets.find((dts: MetaDataset) => dts.id == operation.mainProps.output)
      .getOrElse(throw new IllegalArgumentException(
        s"Operation output id ${operation.mainProps.output} not found in datasets of dataLineage ${dataLineage.id}"))
    val attributes = metaDataset.schema.attrs.map(attrId => {
      val attribute = dataLineage.attributes.find(_.id == attrId)
        .getOrElse(throw new IllegalArgumentException(
          s"MetaDataset ${metaDataset.id} contains Attribute $attrId " +
            s"that is not available in Datalineage#attributes of ${dataLineage.id}."))
      Attribute(attribute.name, attribute.dataTypeId.toString)
    })
    Schema(attributes)
  }

}

