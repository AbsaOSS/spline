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



import org.apache.commons.configuration.Configuration
import za.co.absa.spline.persistence.api._

/**
  * The object contains static information about settings needed for initialization of the MongoPersistenceFactory class.
  */
object MongoPersistenceFactory{
  val mongoDbUrlKey = "spline.mongodb.url"
  val mongoDbNameKey = "spline.mongodb.name"
}

/**
  * The class represents a factory creating Mongo persistence layers for all main data lineage entities.
  *
  * @param configuration A source of settings
  */
class MongoPersistenceFactory(configuration: Configuration) extends PersistenceFactory(configuration) {

  import za.co.absa.spline.common.ConfigurationImplicits._
  import MongoPersistenceFactory._

  protected lazy val dbUrl = configuration getRequiredString mongoDbUrlKey
  protected lazy val dbName = configuration getRequiredString mongoDbNameKey

  override def createDataLineagePersistor(): DataLineagePersistor = new MongoDataLineagePersistor(dbUrl, dbName)

  override def createExecutionPersistor(): ExecutionPersistor = new MongoExecutionPersistor(dbUrl, dbName)
}
