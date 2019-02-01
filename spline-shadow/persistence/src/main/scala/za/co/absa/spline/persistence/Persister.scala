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

import java.net.URI
import java.security.MessageDigest

import com.arangodb.ArangoDB
import com.arangodb.model.TransactionOptions
import io.circe.ObjectEncoder
import org.apache.commons.lang.builder.ToStringBuilder.reflectionToString
import za.co.absa.spline.model.op.BatchWrite
import za.co.absa.spline.model.{DataLineage, MetaDataset, op}
import za.co.absa.spline.model.arango._
import za.co.absa.spline.{model => splinemodel}
import io.circe.generic.semiauto.deriveEncoder
// import needed for decoder creation
import com.outr.arango.managed._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.collection.JavaConverters._
import java.lang.Iterable

class Persister(arangoUri: String) {

  val database = Database(new URI(arangoUri))

  case class TransactionParams(
    operation: Iterable[String],
    follows: Iterable[String],
    dataSource: Iterable[String],
    writesTo: Iterable[String],
    readsFrom: Iterable[String],
    app: Iterable[String],
    implements: Iterable[String],
    execution: Iterable[String],
    executes: Iterable[String],
    progress: Iterable[String],
    progressOf: Iterable[String]
  ) {

    def fields: Array[String] = classOf[TransactionParams]
      .getDeclaredFields
      .map(_.getName)
      .filter(_ != "$outer")

    def saveCollectionsJs: String = fields
      .map(field =>
         s"params.$field.forEach(o => {\n" +
          "  const doc = JSON.parse(o);\n" +
         s"  const dupe = db.$field.firstExample({ _id: '$field/' + doc._key });\n" +
         s"  if (dupe != null && '$field' != 'dataSource') {\n" +
         s"    console.log('Warning duplicate key in $field doc: ' + JSON.stringify(doc) + ' with existing doc ' + JSON.stringify(dupe));\n" +
          "  } else {\n" +
         s"    db.$field.save(doc);\n" +
          "  }\n" +
          "})\n")
      .mkString("\n")
  }

  def save(dataLineage: DataLineage): Future[Unit] = Future {
    val params = TransactionParams(
      createEncodedOperations(dataLineage).asJava,
      createFollows(dataLineage).asJava,
      createDataSources(dataLineage).asJava,
      createWritesTos(dataLineage).asJava,
      createReadsFrom(dataLineage).asJava,
      createApp(dataLineage).asJava,
      createImplements(dataLineage).asJava,
      createExecution(dataLineage).asJava,
      createExecutes(dataLineage).asJava,
      createProgressForBatchJob(dataLineage).asJava,
      createProgressOf(dataLineage).asJava
    )
    val db = new ArangoDB.Builder()
      .user("root")
      .password("root")
      .build()
      .db("_system")
    val options = new TransactionOptions()
      .params(params) // Serialized hash map with json string values.
      .writeCollections(params.fields: _*)
    val action: String =
        "function (params) {\n" +
        "  var db = require('internal').db;\n" +
           params.saveCollectionsJs +
         "}\n"
    db.transaction(action, classOf[Void], options)
  }

  private def createExecutes(dataLineage: DataLineage) =
    Seq(Executes("execution/" + dataLineage.id.toString, "app/" + dataLineage.id.toString, Some(dataLineage.id.toString)))
      .map(deriveEncoder[Executes].apply)
      .map(_.noSpaces)


  private def createImplements(dataLineage: DataLineage) =
    Seq(Implements("app/" + dataLineage.id.toString, "operation/" + dataLineage.rootOperation.mainProps.id.toString, Some(dataLineage.id.toString)))
      .map(deriveEncoder[Implements].apply)
      .map(_.noSpaces)


  private def createProgressOf(dataLineage: DataLineage) =
    Seq(deriveEncoder[ProgressOf]
      .apply(ProgressOf("progress/" + dataLineage.id.toString, "execution/" + dataLineage.id.toString, Some(dataLineage.id.toString)))
      .noSpaces)

  /**  progress for batch jobs need to be generated during migration for consistency with stream jobs **/
  private def createProgressForBatchJob(dataLineage: DataLineage) = {
    val batchWrites = dataLineage.operations
      .find(_.isInstanceOf[BatchWrite])
      .getOrElse(throw new IllegalArgumentException("All pumped lineages are expected to be batch."))
      .asInstanceOf[BatchWrite]
    val readCount = batchWrites.readMetrics.values.sum
    val encoder = deriveEncoder[Progress]
    val progress = Progress(dataLineage.timestamp, readCount, Some(dataLineage.id.toString))
    Seq(encoder(progress).noSpaces)
  }

  private def createApp(dataLineage: DataLineage) = {
    val dataTypes = dataLineage.dataTypes
      .map(d => DataType(d.id.toString, d.getClass.getSimpleName, d.nullable, d.childDataTypeIds.map(_.toString)))
    val encoder = deriveEncoder[App]
    val app = App(dataLineage.appId, dataLineage.appName, dataTypes, Some(dataLineage.id.toString))
    Seq(encoder(app).noSpaces)
  }

  private def createExecution(dataLineage: DataLineage) = {
    val encoder = deriveEncoder[Execution]
    val execution = Execution(dataLineage.appId, dataLineage.sparkVer, dataLineage.timestamp, Some(dataLineage.id.toString))
    Seq(encoder(execution).noSpaces)
  }

  private def createReadsFrom(dataLineage: DataLineage) =
    dataLineage.operations
      .filter(_.isInstanceOf[op.Read])
      .map(_.asInstanceOf[op.Read])
      .flatMap(op => op.sources.map(s => {
        val opId = op.mainProps.id.toString
        val dsId = sha256(s.path)
        ReadsFrom("operation/" + opId, "dataSource/" + dsId, Some(opId + "--" + dsId))
      }))
      .distinct
      .map(deriveEncoder[ReadsFrom].apply)
      .map(_.noSpaces)


  private def createWritesTos(dataLineage: DataLineage) =
    dataLineage.operations
      .iterator.toIterable
      .filter(_.isInstanceOf[op.Write]).map(_.asInstanceOf[op.Write])
      .map(o => WritesTo("operation/" + o.mainProps.id.toString, "dataSource/" + sha256(o.path), Some(o.mainProps.id.toString)))
      .map(deriveEncoder[WritesTo].apply)
      .map(_.noSpaces)


  private def createDataSources(dataLineage: DataLineage) =
    dataLineage.operations
      .flatMap(op => op match {
        case r: splinemodel.op.Read => r.sources.map(s => s.path)
        case w: splinemodel.op.Write => Some(w.path)
        case _ => None
      })
      .distinct
      .map(path => DataSource(path, Some(sha256(path))))
      .map(deriveEncoder[DataSource].apply)
      .map(_.noSpaces)


  private def createOperations(dataLineage: DataLineage) =
    dataLineage.operations.iterator.toIterable.map(op => {
      val outputSchema = findOutputSchema(dataLineage, op)
      val _key = Some(op.mainProps.id.toString)
      val expression = reflectionToString(op)
      val name = op.mainProps.name
      op match {
        case r: splinemodel.op.Read => Read(name, expression, r.sourceType, outputSchema, _key)
        case w: splinemodel.op.Write => Write(name, expression, w.destinationType, outputSchema, _key)
        case _ => Transformation(name, expression, outputSchema, _key)
      }})

  private def createEncodedOperations(dataLineage: DataLineage) = {
    val encoderWrite: ObjectEncoder[Write] = deriveEncoder[Write]
    val encoderRead: ObjectEncoder[Read] = deriveEncoder[Read]
    val encoderTransformation: ObjectEncoder[Transformation] = deriveEncoder[Transformation]
    createOperations(dataLineage)
      .map {
        case read: Read => encoderRead(read)
        case transformation: Transformation => encoderTransformation(transformation)
        case write: Write => encoderWrite(write)
      }
      .map(_.noSpaces)
  }

  private def createFollows(dataLineage: DataLineage) = {
    // Operation inputs and outputs ids may be shared across already linked lineages. To avoid saving linked lineages or
    // duplicate indexes we need to not use these.
    val outputToOperationId = dataLineage
      .operations
      .map(o => (o.mainProps.output, o.mainProps.id))
      .toMap
    dataLineage.operations.iterator.toIterable
      .flatMap(op =>
        op.mainProps.inputs
          .flatMap(outputToOperationId.get)
          .map(opId => Follows(
            "operation/" + op.mainProps.id.toString,
            "operation/" + opId.toString,
            Some(op.mainProps.id.toString + '-' + opId.toString)))
        )
      .map(deriveEncoder[Follows].apply)
      .map(_.noSpaces)
  }

  private def findOutputSchema(dataLineage: DataLineage, operation: splinemodel.op.Operation): Schema = {
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

  // TODO replace with upsert com.outr.arango.absaextension.ScarangoMixins.ArangoDocumentWrapper#upsertByQuery
  private def sha256(s: String) = {
    MessageDigest.getInstance("SHA-256")
      .digest(s.getBytes("UTF-8"))
      .map("%02x".format(_)).mkString
  }

}
