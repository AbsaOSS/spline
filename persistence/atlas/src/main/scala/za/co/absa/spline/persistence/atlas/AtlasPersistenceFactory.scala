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

package za.co.absa.spline.persistence.atlas

import org.apache.commons.configuration.Configuration
import za.co.absa.spline.persistence.api.{DataLineagePersistor, ExecutionPersistor, PersistenceFactory}


/**
  * The object contains static information about settings needed for initialization of the AtlasPersistenceFactory class.
  */
object AtlasPersistenceFactory{
  val directoryContainingAtlasConfigurationAtlasKey = "atlas.conf"
  val directoryContainingAtlasConfigurationKey = "spline.atlas.confDir"
}

/**
  * The class represents a factory creating Atlas persistence layers for all main data lineage entities.
  *
  * @param configuration A source of settings
  */
class AtlasPersistenceFactory(configuration: Configuration) extends PersistenceFactory(configuration){

  import AtlasPersistenceFactory._

  val confDir = configuration getString directoryContainingAtlasConfigurationKey
  if(confDir != null) System.setProperty(directoryContainingAtlasConfigurationAtlasKey, confDir)

  /**
    * The method creates a persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
    *
    * @return A persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity
    */
  override def createDataLineagePersistor(): DataLineagePersistor = new AtlasDataLineagePersistor

  /**
    * The method creates a persistence layer for the [[za.co.absa.spline.model.Execution Execution]] entity.
    *
    * @return A persistence layer for the [[za.co.absa.spline.model.Execution Execution]] entity
    */
  override def createExecutionPersistor(): ExecutionPersistor = new NopAtlasExecutionPersistor
}
