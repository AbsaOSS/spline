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

package za.co.absa.spline.persistence.mongo

import java.util.UUID

import _root_.salat._
import com.mongodb.casbah.Imports._
import za.co.absa.spline.model._
import za.co.absa.spline.persistence.api.DataLineageReader.{PageRequest, SearchRequest}
import za.co.absa.spline.persistence.api.{CloseableIterable, DataLineageReader}
import za.co.absa.spline.persistence.mongo.dao.{LineageDAO, MultiVersionDAO, MultiVersionLineageDAO}

import scala.concurrent.{ExecutionContext, Future}

class MongoDataLineageReader(lineageDAO: MultiVersionLineageDAO) extends DataLineageReader {

  import za.co.absa.spline.persistence.mongo.serialization.BSONSalatContext._

  /**
    * The method loads a particular data lineage from the persistence layer.
    *
    * @param dsId An unique identifier of a data lineage
    * @return A data lineage instance when there is a data lineage with a given id in the persistence layer, otherwise None
    */
  override def loadByDatasetId(dsId: UUID, overviewOnly: Boolean)(implicit ec: ExecutionContext): Future[Option[DataLineage]] = {
    lineageDAO.loadByDatasetId(dsId, overviewOnly).map(_.map(grater[DataLineage].asObject(_)))
  }

  /**
    * The method scans the persistence layer and tries to find a dataset ID for a given path and application ID.
    *
    * @param path          A path for which a dataset ID is looked for
    * @param applicationId An application for which a dataset ID is looked for
    * @return An identifier of a meta data set
    */
  override def searchDataset(path: String, applicationId: String)(implicit ec: ExecutionContext): Future[Option[UUID]] =
    lineageDAO.searchDataset(path, applicationId)

  /**
    * The method loads the latest data lineage from the persistence for a given path.
    *
    * @param path A path for which a lineage graph is looked for
    * @return The latest data lineage
    */
  override def findLatestDatasetIdsByPath(path: String)(implicit ec: ExecutionContext): Future[CloseableIterable[UUID]] =
    lineageDAO.findLatestDatasetIdsByPath(path)

  /**
    * The method loads composite operations for an input datasetId.
    *
    * @param datasetId A dataset ID for which the operation is looked for
    * @return Composite operations with dependencies satisfying the criteria
    */
  override def findByInputId(datasetId: UUID, overviewOnly: Boolean)(implicit ec: ExecutionContext): Future[CloseableIterable[DataLineage]] =
    lineageDAO.findByInputId(datasetId, overviewOnly: Boolean).map(_.map(grater[DataLineage].asObject(_)))

  /**
    * The method gets all data lineages stored in persistence layer.
    *
    * @return Descriptors of all data lineages
    */
  override def findDatasets(maybeText: Option[String], searchRequest: SearchRequest)
                           (implicit ec: ExecutionContext): Future[CloseableIterable[PersistedDatasetDescriptor]] =
    lineageDAO.findDatasetDescriptors(maybeText, searchRequest).map(_.map(o =>
      grater[PersistedDatasetDescriptor].asObject(o.o)))

  /**
    * The method returns a dataset descriptor by its ID.
    *
    * @param id An unique identifier of a dataset
    * @return Descriptors of all data lineages
    */
  override def getDatasetDescriptor(id: UUID)(implicit ec: ExecutionContext): Future[PersistedDatasetDescriptor] =
    lineageDAO.getDatasetDescriptor(id).map(_.o).map(grater[PersistedDatasetDescriptor].asObject(_))

  override def getLineagesByPathAndInterval(path: String, start: Long, end: Long)(implicit ex: ExecutionContext): Future[CloseableIterable[DataLineage]] =
    lineageDAO.getLineagesByPathAndInterval(path, start, end).map(o => o.map(grater[DataLineage].asObject(_)))
}
