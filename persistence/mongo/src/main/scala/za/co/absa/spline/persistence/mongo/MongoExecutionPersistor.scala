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

import za.co.absa.spline.model.Execution
import za.co.absa.spline.persistence.api.ExecutionPersistor
import com.mongodb.casbah.Imports._
import com.mongodb.casbah.MongoClient
import com.mongodb.casbah.commons.MongoDBObject
import salat._
import scala.collection.JavaConverters._

/**
  * The class represents Mongo persistence layer for the [[za.co.absa.spline.model.Execution Execution]] entity.
  */
class MongoExecutionPersistor(dbUrl: String, dbName: String) extends ExecutionPersistor {

  val executionCollectionName: String = "Executions"

  private val client: MongoClient = MongoClient(MongoClientURI(dbUrl))
  private val database = client.getDB(dbName)
  private val executionCollection = database.getCollection(executionCollectionName)

  implicit val executionCollectionContext = new Context {
    override val name: String = "executionCollectionContext"
    registerGlobalKeyOverride("id", "_id")
  }

  override def store(execution: Execution): Unit = {
    val dbo = grater[Execution].asDBObject(execution)
    executionCollection.insert(dbo)
  }

  override def load(id: UUID): Option[Execution] =
    Option(executionCollection findOne id) map (grater[Execution].asObject(_))

  override def list(dataLineageId: UUID): Iterator[Execution] = {
    executionCollection
      .find(MongoDBObject("dataLineageId" -> dataLineageId))
      .iterator().asScala
      .map(grater[Execution].asObject(_))
  }
}
