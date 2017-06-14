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

package za.co.absa.spline.persistence.api

/**
  * The trait represents a factory creating persistence layers for all main data lineage entities.
  */
trait PersistenceFactory {

  /**
    * The method creates a persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
    *
    * @return A persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity
    */
  def createDataLineagePersistor(): DataLineagePersistor

  /**
    * The method creates a persistence layer for the [[za.co.absa.spline.model.Execution Execution]] entity.
    *
    * @return A persistence layer for the [[za.co.absa.spline.model.Execution Execution]] entity
    */
  def createExecutionPersistor(): ExecutionPersistor
}
