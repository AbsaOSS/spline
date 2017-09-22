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

package za.co.absa.spline.persistence.mongo

import java.util.UUID

import _root_.salat._
import com.mongodb.casbah.Imports._
import com.mongodb.casbah.MongoClient
import za.co.absa.spline.model.{DataLineage, DataLineageDescriptor}
import za.co.absa.spline.persistence.api.DataLineagePersistor

import scala.collection.JavaConverters._
import scala.concurrent.Future
import za.co.absa.spline.common.FutureImplicits._

/**
  * The class represents Mongo persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
  */
class MongoDataLineagePersistor(dbUrl: String, dbName: String) extends DataLineagePersistor {
  val dataLineageCollectionName: String = "lineages"
  val LATEST_SERIAL_VERSION = 1

  private val client: MongoClient = MongoClient(MongoClientURI(dbUrl))
  private val database = client.getDB(dbName)
  private val dataLineageCollection = database.getCollection(dataLineageCollectionName)

  import za.co.absa.spline.persistence.api.serialization.BSONSalatContext._

  /**
    * The method stores a particular data lineage to the persistence layer.
    *
    * @param lineage A data lineage that will be stored
    */
  override def store(lineage: DataLineage): Future[Unit] = Future{
    val dbo = grater[DataLineage].asDBObject(lineage)
    dbo.put("_ver", LATEST_SERIAL_VERSION)
    dataLineageCollection.insert(dbo)
  }

  /**
    * The method loads a particular data lineage from the persistence layer.
    *
    * @param id An unique identifier of a data lineage
    * @return A data lineage instance when there is a data lineage with a given id in the persistence layer, otherwise None
    */
  override def load(id: UUID): Future[Option[DataLineage]] = Future {
    Option(dataLineageCollection findOne id) map withVersionCheck(grater[DataLineage].asObject(_))
  }

  /**
    * The method removes a particular data lineage from the persistence layer.
    *
    * @param id An unique identifier of a data lineage
    */
  override def remove(id: UUID): Future[Unit] = Future {
    dataLineageCollection remove DBObject("_id" -> id)
  }

  /**
    * The method gets all data lineages stored in persistence layer.
    *
    * @return Descriptors of all data lineages
    */
  override def list(): Future[Iterator[DataLineageDescriptor]] = Future {
    dataLineageCollection
      .find(MongoDBObject(), MongoDBObject("_id" -> 1, "_ver" -> 1, "appName" -> 1))
      .iterator.asScala
      .map(withVersionCheck(grater[DataLineageDescriptor].asObject(_)))
  }

  private def withVersionCheck[T](f: DBObject => T): DBObject => T =
    dbo => (dbo get "_ver").asInstanceOf[Int] match {
      case LATEST_SERIAL_VERSION => f(dbo)
      case unknownVersion => sys.error(s"Unsupported serialized lineage version: $unknownVersion")
    }

}
