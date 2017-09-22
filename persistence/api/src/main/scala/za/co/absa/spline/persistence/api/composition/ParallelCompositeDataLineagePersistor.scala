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

package za.co.absa.spline.persistence.api.composition

import java.util.UUID

import za.co.absa.spline.model.{DataLineage, DataLineageDescriptor}
import za.co.absa.spline.persistence.api.DataLineagePersistor

import scala.concurrent.Future

/**
  * The class represents a parallel composition of persistence layers for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
  */
class ParallelCompositeDataLineagePersistor(override protected val persistors: Set[DataLineagePersistor])
  extends DataLineagePersistor
  with PersistorCombiner[DataLineagePersistor]{

  /**
    * The method stores a particular data lineage to the underlying persistence layers.
    *
    * @param lineage A data lineage that will be stored
    */
  override def store(lineage: DataLineage): Future[Unit] = combine[Unit](_.store(lineage),_ => Unit)

  /**
    * The method loads a particular data lineage from the underlying persistence layers.
    *
    * @param id An unique identifier of a data lineage
    * @return A data lineage instance when there is a data lineage with a given id in the persistence layer, otherwise None
    */
  override def load(id: UUID): Future[Option[DataLineage]] = combine[Option[DataLineage]](_.load(id), _.flatten.headOption)

  /**
    * The method removes a particular data lineage from the underlying persistence layers.
    *
    * @param id An unique identifier of a data lineage
    */
  override def remove(id: UUID): Future[Unit] = combine[Unit](_.remove(id), _ => Unit)

  /**
    * The method checks whether a particular data lineage graph already exists in the underlying persistence layers.
    *
    * @param lineage A checked data lineage
    * @return An identifier of the checked data lineage if the data lineage exists, otherwise None
    */
  override def exists(lineage: DataLineage): Future[Option[UUID]] = combine[Option[UUID]](_.exists(lineage), _.flatten.headOption)

  /**
    * The method gets all data lineages stored in the underlying persistence layers.
    *
    * @return Descriptors of all data lineages
    */
  override def list(): Future[Iterator[DataLineageDescriptor]] = combine[Iterator[DataLineageDescriptor]](_.list, _.flatten.toSeq.distinct.toIterator)

}
