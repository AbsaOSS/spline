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
object MongoPersistenceFactory {
  val mongoDbUrlKey = "spline.mongodb.url"
  val mongoDbNameKey = "spline.mongodb.name"
}

/**
  * The class represents a factory creating Mongo persistence writers for all main data lineage entities.
  *
  * @param configuration A source of settings
  */
class MongoPersistenceFactory(configuration: Configuration) extends PersistenceFactory(configuration) {

  import MongoPersistenceFactory._
  import za.co.absa.spline.common.ConfigurationImplicits._

  private lazy val dbUrl = configuration getRequiredString mongoDbUrlKey
  private lazy val dbName = configuration getRequiredString mongoDbNameKey

  /**
    * The method creates a persistence writer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
    *
    * @return A persistence writer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity
    */
  override def createDataLineageWriter(): DataLineageWriter = new MongoDataLineageWriter(new MongoConnection(dbUrl, dbName))

  /**
    * The method creates a reader from the persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
    *
    * @return A reader from the persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity
    */
  def createDataLineageReader(): DataLineageReader = new MongoDataLineageReader(new MongoConnection(dbUrl, dbName))

  /**
    * The method creates a reader from the persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity if the factory can. Otherwise, returns default.
    *
    * @param default A default data lineage reader
    * @return A reader from the persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity
    */
  def createDataLineageReaderOrGetDefault(default: DataLineageReader): DataLineageReader = createDataLineageReader()
}
