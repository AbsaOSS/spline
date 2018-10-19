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

import com.mongodb.DBObject
import za.co.absa.spline.persistence.api.DataLineageReader.PageRequest
import za.co.absa.spline.persistence.api.{CloseableIterable, DataLineageReader}

import scala.concurrent.{ExecutionContext, Future}

trait VersionedDAO {
  def version: Int

  def upgrader: Option[VersionUpgrader]
}

trait VersionUpgrader {
  def versionFrom: Int

  def apply[T](data: T)(implicit ec: ExecutionContext): Future[T]
}

object MultiVersionDAOCalling {
  private def requireSortedAsc(xs: Seq[Int]): Unit =
    (Int.MinValue /: xs) {
      case (prev, next) =>
        require(prev < next)
        next
    }
}

trait MultiVersionDAOCalling {
  this: MultiVersionDAOUpgrading =>

  import MultiVersionDAOCalling._

  type DAOType <: VersionedDAO

  protected val daoChain: Seq[DAOType]

  requireSortedAsc(daoChain.map(_.version))

  protected val latestDAO: DAOType = daoChain.last

  protected def callAndCombine[T, U](call: DAOType => Future[T])
                                    (combineResults: Seq[T] => U)
                                    (implicit ec: ExecutionContext): Future[U] = {
    Future.traverse(daoChain)(dao =>
      call(dao).flatMap(upgradeFrom(dao.version))).
      map(combineResults)
  }
}

trait MultiVersionDAOUpgrading {
  this: MultiVersionDAOCalling =>

  private type Version = Int
  private type UpgraderChain = Seq[VersionUpgrader]

  private val upgraderChainByVerFrom: Map[Version, UpgraderChain] = {
    val upgraders = daoChain.flatMap(_.upgrader).reverse
    (Seq.empty[(Version, UpgraderChain)] /: upgraders) {
      case (Nil, firstUpgrader) =>
        Seq(firstUpgrader.versionFrom -> Seq(firstUpgrader))
      case (chains@(_, prevChain: UpgraderChain) :: _, nextUpgrader) =>
        (nextUpgrader.versionFrom -> (nextUpgrader +: prevChain)) +: chains
    }.toMap
  }

  protected def upgradeFrom[T](ver: Int)(data: T)(implicit e: ExecutionContext): Future[T] = {
    val upgraderChain = upgraderChainByVerFrom.getOrElse(ver, Seq.empty[VersionUpgrader])
    (Future.successful(data) /: upgraderChain) {
      case (futureData, upgrader) => futureData.flatMap(upgrader(_))
    }
  }
}

trait MultiVersionDAO extends MultiVersionDAOCalling with MultiVersionDAOUpgrading

class MultiVersionLineageDAO(protected val daoChain: VersionedLineageDAO*) extends MultiVersionDAO with LineageDAO {

  override type DAOType = VersionedLineageDAO

  override def save(lineage: DBObject)(implicit e: ExecutionContext): Future[Unit] =
    latestDAO.save(lineage)

  override def loadByDatasetId(dsId: UUID, overviewOnly: Boolean)(implicit ec: ExecutionContext): Future[Option[DBObject]] =
    callAndCombine(_.loadByDatasetId(dsId, overviewOnly))(_.flatten.headOption)

  override def searchDataset(path: String, applicationId: String)(implicit ec: ExecutionContext): Future[Option[UUID]] =
    callAndCombine(_.searchDataset(path, applicationId))(_.flatten.headOption)

  override def findLatestDatasetIdsByPath(path: String)(implicit ec: ExecutionContext): Future[CloseableIterable[UUID]] =
    for {
      maybeLastOverwriteTimestamp <- callAndCombine(_.getLastOverwriteTimestampIfExists(path))(_.flatten.headOption)
      lastOverwriteTimestamp = maybeLastOverwriteTimestamp getOrElse 0L
      result <- callAndCombine(_.findDatasetIdsByPathSince(path, lastOverwriteTimestamp))(CloseableIterable.chain)
    } yield result

  override def findByInputId(datasetId: UUID, overviewOnly: Boolean)(implicit ec: ExecutionContext): Future[CloseableIterable[DBObject]] =
    callAndCombine(_.findByInputId(datasetId, overviewOnly))(CloseableIterable.chain)

  override def findDatasetDescriptors(maybeText: Option[String], pageRequest: DataLineageReader.PageRequest)
                                     (implicit ec: ExecutionContext): Future[CloseableIterable[DBObject]] = {
    for {
      counts <- callAndCombine(_.countDatasetDescriptors(maybeText, pageRequest.asAtTime))(identity)
      (pages, _) = ((Seq.empty[PageRequest], pageRequest) /: counts) {
        case ((prevPages, PageRequest(_, remainingOffset, remainingSize)), count) =>
          val available = math.max(0, count - remainingOffset)
          val page = pageRequest.copy(
            offset = remainingOffset,
            size = math.min(available, remainingSize))
          val newRemainingPage = pageRequest.copy(
            offset = math.max(0, remainingOffset - count),
            size = remainingSize - page.size)
          (page +: prevPages, newRemainingPage)
      }
      pagesPerDao = daoChain.zip(pages.reverse).toMap
      results <- callAndCombine(dao => {
        val page = pagesPerDao(dao)
        if (page.size > 0) dao.findDatasetDescriptors(maybeText, page)
        else Future.successful(CloseableIterable.empty[DBObject])
      })(CloseableIterable.chain)
    } yield results
  }

  override def getDatasetDescriptor(id: UUID)(implicit ec: ExecutionContext): Future[DBObject] =
    callAndCombine(_.getDatasetDescriptor(id))(_.flatten.headOption).map(_.get)
}