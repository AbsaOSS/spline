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

package za.co.absa.spline.persistence.api

import org.apache.commons.configuration.Configuration

/**
  * The abstract class represents a factory of persistence readers and writers for all main data lineage entities.
  *
  * @param configuration A source of settings
  */
abstract class PersistenceFactory(protected val configuration: Configuration) extends Logging {
  /**
    * The method creates a writer to the persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
    *
    * @return A writer to the persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity
    */
  def createDataLineageWriter: DataLineageWriter

  /**
    * The method creates a writer to the persistence layer for the [[za.co.absa.spline.model.streaming.ProgressEvent ProgressEvent]] entity.
    *
    * @return A writer to the persistence layer for the [[za.co.absa.spline.model.streaming.ProgressEvent ProgressEvent]] entity
    */
  def createProgressEventWriter: ProgressEventWriter

  /**
    * The method creates a reader from the persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
    *
    * @return An optional reader from the persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity
    */
  def createDataLineageReader: Option[DataLineageReader]

  def destroy(): Unit = ()
}

object PersistenceFactory extends Logging {

  val PersistenceFactoryPropName = "spline.persistence.factory"

  import za.co.absa.spline.common.ConfigurationImplicits._

  def create(configuration: Configuration): PersistenceFactory = {
    val persistenceFactoryClassName = configuration.getRequiredString(PersistenceFactoryPropName)
    log debug s"Instantiating persistence factory: $persistenceFactoryClassName"
    Class.forName(persistenceFactoryClassName)
      .getConstructor(classOf[Configuration])
      .newInstance(configuration)
      .asInstanceOf[PersistenceFactory]
  }
}
