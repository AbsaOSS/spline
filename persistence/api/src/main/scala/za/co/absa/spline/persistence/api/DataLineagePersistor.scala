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

import java.util.UUID

import za.co.absa.spline.model.{DataLineage, DataLineageDescriptor}

import scala.concurrent.Future

/**
  * The trait represents persistence layer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
  */
trait DataLineagePersistor {

  /**
    * The method stores a particular data lineage to the persistence layer.
    *
    * @param lineage A data lineage that will be stored
    */
  def store(lineage: DataLineage) : Future[Unit]

  /**
    * The method loads a particular data lineage from the persistence layer.
    *
    * @param id An unique identifier of a data lineage
    * @return A data lineage instance when there is a data lineage with a given id in the persistence layer, otherwise None
    */
  def load(id: UUID): Future[Option[DataLineage]]

  /**
    * The method removes a particular data lineage from the persistence layer.
    *
    * @param id An unique identifier of a data lineage
    */
  def remove(id: UUID): Future[Unit]

  /**
    * The method checks whether a particular data lineage graph already exists in the persistence layer.
    *
    * @param lineage A checked data lineage
    * @return An identifier of the checked data lineage if the data lineage exists, otherwise None
    */
  def exists(lineage: DataLineage): Future[Option[UUID]]

  /**
    * The method gets all data lineages stored in persistence layer.
    *
    * @return Descriptors of all data lineages
    */
  def list(): Future[Iterator[DataLineageDescriptor]]
}
