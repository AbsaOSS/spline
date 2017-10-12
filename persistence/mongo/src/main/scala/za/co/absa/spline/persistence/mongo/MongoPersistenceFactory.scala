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
  * The object contains static information about settings needed for initialization of the MongoPersistenceWriterFactory class.
  */
object MongoPersistenceWriterFactory{
  val mongoDbUrlKey = "spline.mongodb.url"
  val mongoDbNameKey = "spline.mongodb.name"
}

/**
  * The class represents a factory creating Mongo persistence writers for all main data lineage entities.
  *
  * @param configuration A source of settings
  */
class MongoPersistenceWriterFactory(configuration: Configuration) extends PersistenceWriterFactory(configuration) {

  import za.co.absa.spline.common.ConfigurationImplicits._
  import MongoPersistenceWriterFactory._

  private lazy val dbUrl = configuration getRequiredString mongoDbUrlKey
  private lazy val dbName = configuration getRequiredString mongoDbNameKey

  /**
    * The method creates a persistence writer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
    *
    * @return A persistence writer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity
    */
  override def createDataLineageWriter(): DataLineageWriter = new MongoDataLineageWriter(new MongoConnection(dbUrl, dbName))

}
