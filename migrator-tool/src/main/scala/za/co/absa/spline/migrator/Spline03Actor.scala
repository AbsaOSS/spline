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

package za.co.absa.spline.migrator

import akka.actor.{Actor, ActorLogging, ActorRef}
import akka.pattern.pipe
import com.mongodb
import com.mongodb.ConnectionString
import com.mongodb.casbah.AggregationOptions
import com.mongodb.casbah.Imports.DBObject
import com.mongodb.client.model.Aggregates.{`match`, addFields, project}
import com.mongodb.client.model.Field
import com.mongodb.client.model.Filters.and
import com.mongodb.client.model.Projections.{fields, include}
import org.bson.Document.parse
import za.co.absa.spline.common.ARM.managed
import za.co.absa.spline.migrator.Spline03Actor._
import za.co.absa.spline.model.DataLineageId.toDatasetId
import za.co.absa.spline.model.{DataLineage, PersistedDatasetDescriptor}
import za.co.absa.spline.persistence.api.CloseableIterable
import za.co.absa.spline.persistence.api.DataLineageReader.PageRequest
import za.co.absa.spline.persistence.mongo.dao.{LineageDAOv3, LineageDAOv4, MultiVersionLineageDAO}
import za.co.absa.spline.persistence.mongo.{MongoConnection, MongoConnectionImpl, MongoDataLineageReader}

import java.util
import java.util.UUID
import scala.collection.JavaConverters._
import scala.concurrent.ExecutionContext
import scala.util.control.NonFatal


object Spline03Actor {

  trait RequestMessage

  case class GetLineagesWithIDs(dsIds: Seq[UUID]) extends RequestMessage

  case class GetExistingLineages(page: PageRequest) extends RequestMessage

  case object GetFutureLineages extends RequestMessage


  trait ResponseMessage

  case class PageSize(count: Int) extends ResponseMessage

  case class DataLineageLoaded(lineage: DataLineage) extends ResponseMessage

  case class DataLineageLoadFailure(lineageId: UUID, e: Throwable) extends ResponseMessage

  private val mongoConnectionFactory: String => MongoConnection = {
    val fixedAggOpts =
      mongodb.AggregationOptions
        .builder()
        .allowDiskUse(true)
        .build()

    val fld = AggregationOptions.getClass.getDeclaredField("default")
    fld.setAccessible(true)
    fld.set(AggregationOptions, fixedAggOpts)

    new MongoConnectionImpl(_)
  }
}

class Spline03Actor(connectionUrl: String) extends Actor with ActorLogging {
  implicit val ec: ExecutionContext = context.dispatcher

  private val mongoConnection = mongoConnectionFactory(connectionUrl)

  private val mongoDatabase = {
    val dbName = new ConnectionString(connectionUrl).getDatabase
    mongoConnection
      .db
      .underlying
      .getMongoClient
      .getDatabase(dbName)
  }

  private val mongoReader =
    new MongoDataLineageReader(
      new MultiVersionLineageDAO(
        new LineageDAOv3(mongoConnection),
        new LineageDAOv4(mongoConnection)))


  override def receive: Receive = {
    case GetLineagesWithIDs(ids: Seq[UUID]) =>
      ids.foreach(loadLineage(_) pipeTo sender)
      sender ! PageSize(ids.size)

    case GetExistingLineages(page) =>
      val theSender = sender
      mongoReader
        .findDatasets(None, page)
        .foreach(managed(pipePageTo(theSender)))

    case GetFutureLineages =>
      pipeOpLogTo(sender)
  }

  private def pipePageTo(recipient: ActorRef)(cursor: CloseableIterable[PersistedDatasetDescriptor]): Unit = {
    val count =
      (0 /: cursor.iterator) {
        case (i, descriptor) =>
          loadLineage(descriptor.datasetId) pipeTo recipient
          i + 1
      }
    recipient ! PageSize(count)
  }

  private def pipeOpLogTo(recipient: ActorRef): Unit = {
    val pipeline = util.Arrays.asList(
      `match`(and(
        parse("{'ns.coll':  { $regex : /^lineages/ }}"),
        parse("{'operationType':  'insert'}"))
      ),
      addFields(new Field("lineageId", "$documentKey._id")),
      project(fields(include("lineageId"))))

    for (event <-
           mongoDatabase
             .watch(pipeline)
             .withDocumentClass(classOf[DBObject])
             .asScala) {
      val dsId = toDatasetId(event.get("lineageId").toString)
      loadLineage(dsId) pipeTo recipient
    }
  }

  private def loadLineage(dsId: UUID) = {
    mongoReader
      .loadByDatasetId(dsId, overviewOnly = false)
      .collect({ case Some(lineage) => DataLineageLoaded(lineage) })
      .recover({ case NonFatal(e) => DataLineageLoadFailure(dsId, e) })
  }
}
