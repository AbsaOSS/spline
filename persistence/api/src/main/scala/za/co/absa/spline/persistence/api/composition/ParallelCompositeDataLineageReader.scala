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

import za.co.absa.spline.model.op.CompositeWithDependencies
import za.co.absa.spline.model.{DataLineage, PersistedDatasetDescriptor}
import za.co.absa.spline.persistence.api.DataLineageReader

import scala.concurrent.{ExecutionContext, Future}

/**
  * The class represents a parallel composite reader from various persistence layers for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
  *
  * @param readers a set of internal readers specific to particular persistence layers
  */
class ParallelCompositeDataLineageReader(readers: Set[DataLineageReader]) extends DataLineageReader {
  /**
    * The method loads a particular data lineage from the persistence layer.
    *
    * @param dsId An unique identifier of a data lineage
    * @return A data lineage instance when there is a data lineage with a given id in the persistence layer, otherwise None
    */
  override def loadByDatasetId(dsId: UUID)(implicit ec: ExecutionContext): Future[Option[DataLineage]] = Future.sequence(readers.map(_.loadByDatasetId(dsId))).map(_.flatten.headOption)

  /**
    * The method scans the persistence layer and tries to find a dataset ID for a given path and application ID.
    *
    * @param path          A path for which a dataset ID is looked for
    * @param applicationId An application for which a dataset ID is looked for
    * @return An identifier of a meta data set
    */
  override def searchDataset(path: String, applicationId: String)(implicit ec: ExecutionContext): Future[Option[UUID]] = Future.sequence(readers.map(_.searchDataset(path, applicationId))).map(_.flatten.headOption)

  /**
    * The method loads the latest data lineage from the persistence for a given path.
    *
    * @param path A path for which a lineage graph is looked for
    * @return The latest data lineage
    */
  override def loadLatest(path: String)(implicit ec: ExecutionContext): Future[Option[DataLineage]] = Future.sequence(readers.map(_.loadLatest(path))).map(_.flatten.headOption)

  /**
    * The method loads a composite operation for an output datasetId.
    *
    * @param datasetId A dataset ID for which the operation is looked for
    * @return A composite operation with dependencies satisfying the criteria
    */
  override def loadCompositeByOutput(datasetId: UUID)(implicit ec: ExecutionContext): Future[Option[CompositeWithDependencies]] = Future.sequence(readers.map(_.loadCompositeByOutput(datasetId))).map(_.flatten.headOption)

  /**
    * The method loads composite operations for an input datasetId.
    *
    * @param datasetId A dataset ID for which the operation is looked for
    * @return Composite operations with dependencies satisfying the criteria
    */
  override def loadCompositesByInput(datasetId: UUID)(implicit ec: ExecutionContext): Future[Iterator[CompositeWithDependencies]] = Future.sequence(readers.map(_.loadCompositesByInput(datasetId))).map(_.flatten.toIterator)

  /**
    * The method gets all data lineages stored in persistence layer.
    *
    * @return Descriptors of all data lineages
    */
  override def list()(implicit ec: ExecutionContext): Future[Iterator[PersistedDatasetDescriptor]] = Future.sequence(readers.map(_.list())).map(_.flatten.toIterator)

  /**
    * The method returns a dataset descriptor by its ID.
    *
    * @param id An unique identifier of a dataset
    * @return Descriptors of all data lineages
    */
  override def getDatasetDescriptor(id: UUID)(implicit ec: ExecutionContext): Future[PersistedDatasetDescriptor] = Future.firstCompletedOf(readers.map(_.getDatasetDescriptor(id)))
}
