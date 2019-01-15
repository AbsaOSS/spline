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

import org.apache.commons.lang.builder.ToStringBuilder.reflectionToString
import za.co.absa.spline.model.op.BatchWrite
import za.co.absa.spline.model.{DataLineage, MetaDataset, op}
import za.co.absa.spline.model.arango._
import za.co.absa.spline.{model => splinemodel}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.concurrent.Future.sequence

class Persister(arangoUri: String) {

  val database = Database(new URI(arangoUri))

  // TODO rewrite with bulk insert ArangoSession see https://github.com/outr/scarango/blob/master/driver/src/test/scala/spec/CollectionSpec.scala
  def save(dataLineage: DataLineage): Future[Unit] = {
    createOperations(dataLineage).flatMap(_ => sequence(Seq(
      createFollows(dataLineage),
      createDatasources(dataLineage).flatMap(_ => sequence(Seq(
        createWritesTos(dataLineage),
        createReadsFrom(dataLineage)
      ))),
      createApp(dataLineage).flatMap(app => sequence(Seq(
        createImplements(dataLineage, app),
        createExecution(dataLineage).flatMap(execution => sequence(Seq(
          createExecutes(app, execution),
          createProgressForBatchJob(dataLineage).flatMap(progress =>
            createProgressOf(progress, execution)
          )))
        )
      )))
    )))
      .map(_ => Unit)
  }

  private def createExecutes(app: App, execution: Execution) = {
    val executes = Executes(execution._id.get, app._id.get, app._key, execution._id)
    database.executes.upsert(executes)
  }

  private def createImplements(dataLineage: DataLineage, app: App) = {
    val implements = Implements(app._id.get, "operation/" + dataLineage.rootOperation.mainProps.id.toString, app._key)
    database.implements.upsert(implements)
  }

  private def createProgressOf(progress: Progress, execution: Execution) = {
    val progressOf = ProgressOf(progress._id.get, execution._id.get, progress._key)
    database.progressOf.upsert(progressOf)
  }

  /**  progress for batch jobs need to be generated during migration for consistency with stream jobs **/
  private def createProgressForBatchJob(dataLineage: DataLineage) = {
    val batchWrites = dataLineage.operations
      .find(_.isInstanceOf[BatchWrite])
      .getOrElse(throw new IllegalArgumentException("All pumped lineages are expected to be batch."))
      .asInstanceOf[BatchWrite]
    val readCount = batchWrites.readMetrics.values.sum
    val progress = Progress(dataLineage.timestamp, readCount, Some(dataLineage.id.toString))
    database.progress.upsert(progress)
  }

  private def createApp(dataLineage: DataLineage) = {
    val dataTypes = dataLineage.dataTypes.map(d => DataType(d.id.toString, d.getClass.getSimpleName, d.nullable, d.childDataTypeIds.map(_.toString)))
    //  Spline 0.3 DataLineage AppId is rather an app execution id. But for migration it will be used for App#id as well.
    val app = App(dataLineage.appId, dataLineage.appName, dataTypes, Some(sha256(dataLineage.appId.toString)))
    database.app.upsert(app)
  }

  private def createExecution(dataLineage: DataLineage) = {
    // Spline 0.3 AppId represents rather an app execution id.
    val execution = Execution(dataLineage.appId, dataLineage.sparkVer, dataLineage.timestamp, Some(dataLineage.id.toString))
    database.execution.upsert(execution)
  }

  private def createReadsFrom(dataLineage: DataLineage) : Future[Seq[ReadsFrom]] = Future.sequence(
    dataLineage.operations
      .filter(_.isInstanceOf[op.Read])
      .map(_.asInstanceOf[op.Read])
      .flatMap(op => op.sources.map(s => ReadsFrom("operation/" + op.mainProps.id.toString, "dataSource/" + sha256(s.path), Some(op.mainProps.id.toString))))
      .map(o => database.readsFrom.upsert(o))
  )

  private def createWritesTos(dataLineage: DataLineage) = Future.sequence({
    dataLineage.operations.filter(_.isInstanceOf[op.Write]).map(_.asInstanceOf[op.Write])
      .map(o => WritesTo("operation/" + o.mainProps.id.toString, "dataSource/" + sha256(o.path), Some(o.mainProps.id.toString)))
      .map(o => database.writesTo.upsert(o))
  })

  private def createDatasources(dataLineage: DataLineage): Future[Seq[DataSource]] = Future.sequence({
    dataLineage.operations.flatMap(op => op match {
      case r: splinemodel.op.Read => r.sources.map(s => s.path)
      case w: splinemodel.op.Write => Some(w.path)
      case _ => None
    })
      .distinct
      .map(path => DataSource(path, Some(sha256(path))))
      .map(d => database.dataSource.upsert(d))
  })

  private def createOperations(dataLineage: DataLineage): Future[Seq[Operation]] = Future.sequence({
    dataLineage.operations.map(op => {
      val outputSchema = findOutputSchema(dataLineage, op)
      val _key = Some(op.mainProps.id.toString)
      val expression = reflectionToString(op)
      val name = op.mainProps.name
      op match {
        case r: splinemodel.op.Read => Read(name, expression, r.sourceType, outputSchema, _key)
        case w: splinemodel.op.Write => Write(name, expression, w.destinationType, outputSchema, _key)
        case _ => Transformation(name, expression, outputSchema, _key)
      }})
      .map(o => database.operation.upsert(o))
  })

  private def createFollows(dataLineage: DataLineage) = Future.sequence({
    /*
      Operation inputs and outputs ids may be shared across already linked lineages. To avoid saving linked lineages or
      duplicate indexes we need to not use these.
     */
    val outputToOperationId = dataLineage
      .operations
      .map(o => (o.mainProps.output, o.mainProps.id))
      .toMap
    dataLineage.operations.flatMap(op => {
      op.mainProps.inputs
        .flatMap(outputToOperationId.get)
        .map(opId => Follows(
          "operation/" + op.mainProps.id.toString,
          "operation/" + opId.toString,
          Some(op.mainProps.id.toString + '-' + opId.toString)))
        })
      .map(o => database.follows.upsert(o))
  })

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
