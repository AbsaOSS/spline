/*
 * Copyright 2019 ABSA Group Limited
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

import com.mongodb.{BasicDBList, BasicDBObject, DBObject}
import org.scalatest.{AsyncFlatSpec, Entry, Matchers}
import za.co.absa.spline.persistence.api.DataLineageReader.Timestamp
import za.co.absa.spline.persistence.api.{CloseableIterable, DataLineageReader}
import za.co.absa.spline.persistence.mongo.dao.MutableLineageUpgraderV4Spec.VersionedLineageDAODummy._
import za.co.absa.spline.persistence.mongo.dao.MutableLineageUpgraderV4Spec._

import scala.collection.JavaConverters._
import scala.concurrent.{ExecutionContext, Future}

class MutableLineageUpgraderV4Spec extends AsyncFlatSpec with Matchers {

  behavior of "MutableLineageUpgraderV4"

  it should "add empty metrics to Write operation when ones are missing" in {
    val testUpgrader = (new VersionedLineageDAODummy with MutableLineageUpgraderV4).upgrader.get

    val fakeLineageDBOv3 =
      new BasicDBObject(Map(
        "_id" -> "ln_123",
        "attributes" -> new BasicDBList,
        "operations" -> new BasicDBList {
          add(new BasicDBObject(Map("_typeHint" -> "za.co.absa.spline.model.op.Write").asJava))
          add(new BasicDBObject(Map("_typeHint" -> "za.co.absa.spline.model.op.Other").asJava))
        }
      ).asJava)

    for (resultedLineageDBOv4 <- testUpgrader(fakeLineageDBOv3)) yield {
      val operationsDBOs = resultedLineageDBOv4.get("operations").asInstanceOf[BasicDBList]
      operationsDBOs should have size 2

      val writeOperationDBO = operationsDBOs.get(0).asInstanceOf[java.util.Map[String, Any]]
      val otherOperationDBO = operationsDBOs.get(1).asInstanceOf[java.util.Map[String, Any]]

      writeOperationDBO should contain allOf(
        Entry("readMetrics", new BasicDBObject),
        Entry("writeMetrics", new BasicDBObject)
      )

      otherOperationDBO.keySet should contain noneOf(
        "readMetrics",
        "writeMetrics"
      )
    }
  }
}

object MutableLineageUpgraderV4Spec {

  object VersionedLineageDAODummy {
    private def noImpl = throw new NotImplementedError("a dummy method is not supposed to be called")
  }

  trait VersionedLineageDAODummy extends VersionedLineageDAO {
    override def save(lineage: DBObject)(implicit e: ExecutionContext): Future[Unit] = noImpl

    override def loadByDatasetId(dsId: UUID, overviewOnly: Boolean)(implicit ec: ExecutionContext): Future[Option[DBObject]] = noImpl

    override def searchDataset(path: String, applicationId: String)(implicit ec: ExecutionContext): Future[Option[UUID]] = noImpl

    override def getLastOverwriteTimestampIfExists(path: String)(implicit ec: ExecutionContext): Future[Option[Timestamp]] = noImpl

    override def findDatasetIdsByPathSince(path: String, since: Timestamp)(implicit ec: ExecutionContext): Future[CloseableIterable[UUID]] = noImpl

    override def findByInputId(datasetId: UUID, overviewOnly: Boolean)(implicit ec: ExecutionContext): Future[CloseableIterable[DBObject]] = noImpl

    override def findDatasetDescriptors(maybeText: Option[String], pageRequest: DataLineageReader.PageRequest)
                                       (implicit ec: ExecutionContext): Future[CloseableIterable[DBObject]] = noImpl

    override def getDatasetDescriptor(id: UUID)(implicit ec: ExecutionContext): Future[Option[DBObject]] = noImpl

    override def countDatasetDescriptors(maybeText: Option[String], asAtTime: Timestamp)(implicit ec: ExecutionContext): Future[Int] = noImpl

    override def version: Int = noImpl
  }

}
