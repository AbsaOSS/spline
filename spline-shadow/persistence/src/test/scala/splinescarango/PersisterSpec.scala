package splinescarango

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

import java.util.UUID
import java.util.UUID.randomUUID

import co.za.absa.spline.persistence.{Database, Persister}
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FunSpec, Matchers}
import za.co.absa.spline.model.{DataLineage, MetaDataSource, MetaDataset}
import za.co.absa.spline.{model => splinemodel}
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.op.{BatchRead, BatchWrite, Generic, OperationProps}

import scala.concurrent.{Await, Future}
import scala.concurrent.duration.Duration

class PersisterSpec extends FunSpec with Matchers with MockitoSugar {

  describe("Persister") {
    it("Persister should be able to insert an example lineage to an empty database") {
      try {
        awaitForever(Database.delete(true))
      } catch { case _: Exception =>  }
      awaitForever(Database.init(force = true))
      awaitForever(Persister.save(datalineage()))
    }

  }

  def awaitForever(future: Future[_]): Unit = {
    Await.result(future, Duration.Inf)
  }

  private def datalineage(
                           appId: String = "appId1",
                           appName: String = "appName1",
                           timestamp: Long = 123L,
                           datasetId: UUID = randomUUID,
                           path: String = "hdfs://foo/bar/path",
                           append: Boolean = false)
    : DataLineage = {
      val dataTypes = Seq(Simple("StringType", nullable = true))

      val attributes = Seq(
        splinemodel.Attribute(randomUUID(), "_1", dataTypes.head.id),
        splinemodel.Attribute(randomUUID(), "_2", dataTypes.head.id),
        splinemodel.Attribute(randomUUID(), "_3", dataTypes.head.id)
      )
      val aSchema = splinemodel.Schema(attributes.map(_.id))
      val bSchema = splinemodel.Schema(attributes.map(_.id).tail)

      val md1 = MetaDataset(datasetId, aSchema)
      val md2 = MetaDataset(randomUUID, aSchema)
      val md3 = MetaDataset(randomUUID, bSchema)
      val md4 = MetaDataset(randomUUID, bSchema)
      val mdOutput = MetaDataset(randomUUID, bSchema)
      val mdInput = MetaDataset(randomUUID, bSchema)

      DataLineage(
        appId,
        appName,
        timestamp,
        "2.3.0",
        Seq(
          BatchWrite(OperationProps(randomUUID, "Write", Seq(md3.id), mdOutput.id), "parquet", path, append, Map.empty, Map.empty),
          Generic(OperationProps(randomUUID, "Filter", Seq(md4.id), md2.id), "rawString2"),
          BatchRead(OperationProps(randomUUID, "BatchRead", Seq(mdInput.id), md4.id), "csv", Seq(MetaDataSource("hdfs://catSizes/brownCats", Seq(randomUUID)))),
          Generic(OperationProps(randomUUID, "Filter", Seq(md4.id), md1.id), "rawString4"),
          Generic(OperationProps(randomUUID, "Union", Seq(md1.id, md2.id), md3.id), "rawString1")
        ),
        Seq(mdOutput, md1, md2, md3, md4),
        attributes,
        dataTypes
      )
    }

}
