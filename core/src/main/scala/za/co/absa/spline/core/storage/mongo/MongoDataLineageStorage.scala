/*
 * Copyright 2017 Barclays Africa Group Limited
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

package za.co.absa.spline.core.storage.mongo

import java.util.UUID

import _root_.salat._
import za.co.absa.spline.core.DataLineageHashResolver
import za.co.absa.spline.core.model.{DataLineage, DataLineageDescriptor}
import za.co.absa.spline.core.salat.BSONSalatContext
import za.co.absa.spline.core.storage.DataLineageStorage
import com.mongodb.casbah.Imports._
import com.mongodb.casbah.MongoClient

import scala.collection.JavaConverters._

/**
  * The class represents Mongo persistence layer for the [[za.co.absa.spline.core.model.DataLineage DataLineage]] entity.
  */
class MongoDataLineageStorage(dbUrl: String, dbName: String) extends DataLineageStorage {
  val dataLineageCollectionName: String = "DataSets"

  private val client: MongoClient = MongoClient(MongoClientURI(dbUrl))
  private val database = client.getDB(dbName)
  private val dataLineageCollection = database.getCollection(dataLineageCollectionName)

  import BSONSalatContext._

  override def store(lineage: DataLineage): Unit = {
    val dbo = grater[DataLineage].asDBObject(lineage)
    val hash = DataLineageHashResolver.resolve(lineage)
    dbo.put("hash", hash)
    dataLineageCollection.insert(dbo)
  }

  override def load(id: UUID): Option[DataLineage] =
    Option(dataLineageCollection findOne id) map (grater[DataLineage].asObject(_))

  override def remove(id: UUID): Unit = dataLineageCollection remove DBObject("_id" -> id)

  override def exists(lineage: DataLineage): Option[UUID] = {
    val hash = DataLineageHashResolver.resolve(lineage)
    val key = DBObject("appName" -> lineage.appName, "hash" -> hash)
    Option(dataLineageCollection.findOne(key, DBObject("_id" -> 1))) map (_.get("_id").asInstanceOf[UUID])
  }

  override def list(): Iterator[DataLineageDescriptor] =
    dataLineageCollection
      .find(MongoDBObject(), MongoDBObject("_id" -> 1, "appName" -> 1))
      .iterator.asScala
      .map(grater[DataLineageDescriptor].asObject(_))

}
