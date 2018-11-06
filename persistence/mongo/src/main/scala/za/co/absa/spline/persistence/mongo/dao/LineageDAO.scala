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

package za.co.absa.spline.persistence.mongo.dao

import java.util.UUID

import com.mongodb.casbah.Imports.DBObject
import za.co.absa.spline.persistence.api.CloseableIterable
import za.co.absa.spline.persistence.api.DataLineageReader.{IntervalPageRequest, PageRequest, SearchRequest, Timestamp}

import scala.concurrent.{ExecutionContext, Future}

trait LineageDAO {

  def save(lineage: DBObject)(implicit e: ExecutionContext): Future[Unit]

  def loadByDatasetId(dsId: UUID, overviewOnly: Boolean)(implicit ec: ExecutionContext): Future[Option[DBObject]]

  def searchDataset(path: String, applicationId: String)(implicit ec: ExecutionContext): Future[Option[UUID]]

  def findLatestDatasetIdsByPath(path: String)(implicit ec: ExecutionContext): Future[CloseableIterable[UUID]]

  def findByInputId(datasetId: UUID, overviewOnly: Boolean)(implicit ec: ExecutionContext): Future[CloseableIterable[DBObject]]

  def findDatasetDescriptors(maybeText: Option[String], pageRequest: PageRequest)
                            (implicit ec: ExecutionContext): Future[CloseableIterable[DBObject]]

  def getDatasetDescriptor(id: UUID)(implicit ec: ExecutionContext): Future[DBObject]
}

trait VersionedLineageDAO extends VersionedDAO {


  def save(lineage: DBObject)(implicit e: ExecutionContext): Future[Unit]

  def loadByDatasetId(dsId: UUID, overviewOnly: Boolean)(implicit ec: ExecutionContext): Future[Option[DBObject]]

  def searchDataset(path: String, applicationId: String)(implicit ec: ExecutionContext): Future[Option[UUID]]

  def getLastOverwriteTimestampIfExists(path: String)(implicit ec: ExecutionContext): Future[Option[Timestamp]]

  def findDatasetIdsByPathSince(path: String, since: Timestamp)(implicit ec: ExecutionContext): Future[CloseableIterable[UUID]]

  def findByInputId(datasetId: UUID, overviewOnly: Boolean)(implicit ec: ExecutionContext): Future[CloseableIterable[DBObject]]

  def findDatasetDescriptors(maybeText: Option[String], searchRequest: SearchRequest)
                                     (implicit ec: ExecutionContext): Future[CloseableIterable[DBObject]]

  def findDatasetDescriptors(maybeText: Option[String], pageRequest: PageRequest)
                            (implicit ec: ExecutionContext): Future[CloseableIterable[DBObject]]

  def findDatasetDescriptors(maybeText: Option[String], intervalRequest: IntervalPageRequest)
                            (implicit ec: ExecutionContext): Future[CloseableIterable[DBObject]]

  def getDatasetDescriptor(id: UUID)(implicit ec: ExecutionContext): Future[Option[DBObject]]

  def countDatasetDescriptors(maybeText: Option[String], asAtTime: Timestamp)(implicit ec: ExecutionContext): Future[Int]
}