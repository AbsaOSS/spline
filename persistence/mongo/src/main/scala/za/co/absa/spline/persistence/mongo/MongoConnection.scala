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

import com.mongodb.casbah.Imports.MongoClientURI
import com.mongodb.casbah.MongoClient

/**
  * The class represents a connection to a specific Mongo database
  * @param dbUrl An url to Mongo server
  * @param dbName A database name
  */
class MongoConnection(dbUrl: String, dbName: String) {
  val dataLineageCollectionName: String = "lineages"
  val LATEST_SERIAL_VERSION = 1

  private lazy val client: MongoClient = MongoClient(MongoClientURI(dbUrl))
  private lazy val database = client.getDB(dbName)

  lazy val dataLineageCollection = database.getCollection(dataLineageCollectionName)
}
