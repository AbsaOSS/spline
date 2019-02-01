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

package za.co.absa.spline.persistence.mongo

import com.mongodb.casbah.Imports.MongoClientURI
import com.mongodb.casbah.{MongoClient, MongoDB}
import org.slf4s.Logging

trait MongoConnection {
  def db: MongoDB
}

class MongoConnectionImpl
(
  dbUrl: String,

  // TODO: REMOVE in Spline 0.4. Deprecated since 0.3.6
  dbName: => String = throw new IllegalArgumentException("The connection string must contain a database name")
) extends MongoConnection
  with Logging {

  private val clientUri = MongoClientURI(dbUrl)
  private val client: MongoClient = MongoClient(clientUri)


  val db: MongoDB = {
    val databaseName = clientUri.database getOrElse dbName
    log debug s"Preparing connection: $dbUrl, database = $databaseName"
    val database = client.getDB(databaseName)
    require(database.stats.ok, "database is not OK")
    log debug s"Connected: $dbUrl, database = $databaseName"
    database
  }
}
