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

import java.util
import java.util.UUID

import _root_.salat._
import com.mongodb.ConnectionString
import com.mongodb.casbah.Imports._
import com.mongodb.client.model.{Aggregates, Field, Filters, Projections}
import com.mongodb.client.{MongoClients, MongoDatabase}
import org.apache.commons.configuration.BaseConfiguration
import org.bson.Document
import org.bson.conversions.Bson
import org.slf4s.LoggerFactory
import za.co.absa.spline.migrator.MongoStreamMigrator._
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.Persister
import za.co.absa.spline.persistence.mongo.MongoPersistenceFactory

import scala.collection.JavaConverters._
import scala.concurrent.ExecutionContext

/**
  * Stream migrates listening on whole database (Mongo 4) instead of just on collection (Mongo 3.6).
  * Requires Mongo configured in replica set mode:
  * - https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/
  * - https://docs.mongodb.com/manual/reference/configuration-options/#replication-options
  */
class MongoStreamMigrator(mongoUri: String, arangoUri: String) {

  import za.co.absa.spline.persistence.mongo.serialization.BSONSalatContext._
  private val log = LoggerFactory.getLogger(getClass)
  implicit val ec: ExecutionContext = ExecutionContext.global
  private val persister = Persister.create(arangoUri)
  private val db: MongoDatabase = createMongoDatabase(mongoUri)
  private val mongoReader = createMongoReader(mongoUri)

  def start(): Unit = {
      db
        .watch(pipeline)
        .withDocumentClass(classOf[DBObject])
        .asScala
        .foreach(doc => {
          queryAndStoreLineage(grater[LineageInsert].asObject(doc))
        })
  }

  private def queryAndStoreLineage(lineageInsert: LineageInsert) = {
    val datasetId = UUID.fromString(lineageInsert.lineageId.replaceFirst("ln_", ""))
    mongoReader
      .loadByDatasetId(datasetId, overviewOnly = false)
      .map {
        case Some(x) => saveToArango(x)
        case None => throw new IllegalArgumentException(s"Stream inserted lineage ${lineageInsert.lineageId} not found in MongoDB.")
      }
  }

  private def saveToArango(lineage: DataLineage): Unit = {
    log.info(s"Save lineage ${lineage.id}")
    persister.save(lineage)
  }

}

object MongoStreamMigrator {

  private val pipeline: util.List[Bson] = {
    val filterLineageUpdates = Document.parse("{'ns.coll':  { $regex : /^lineages_/ }}")
    val filterInserts = Document.parse("{'operationType':  'insert'}")
    val matchFilters = Aggregates.`match`(Filters.and(filterLineageUpdates, filterInserts))
    val addEventIdAndLineageId = Aggregates.addFields(
      new Field[String]("lineageId", "$documentKey._id"))
    val projectToAdded = Aggregates.project(
      Projections.fields(Projections.include("eventId", "lineageId")))
    util.Arrays.asList(matchFilters, addEventIdAndLineageId, projectToAdded)
  }

  private def createMongoReader(connectionUri: String) = {
    new MongoPersistenceFactory(
      new BaseConfiguration {
        addProperty(MongoPersistenceFactory.mongoDbUrlKey, connectionUri)
      }).
      createDataLineageReader.
      get
  }

  private def createMongoDatabase(connectionUri: String) = {
    val connectionString = new ConnectionString(connectionUri)
    MongoClients.create(connectionString).getDatabase(connectionString.getDatabase)
  }

}

case class LineageInsert(id: BasicDBObject, lineageId: String)
