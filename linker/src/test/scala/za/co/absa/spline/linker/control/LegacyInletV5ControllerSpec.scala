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

package za.co.absa.spline.linker.control

import com.mongodb.DuplicateKeyException
import org.bson.{BsonDocument, BsonString, BsonValue}
import org.mockito.ArgumentMatchers.any
import org.mockito.Mockito.when
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{AsyncFunSpec, BeforeAndAfterEach, FunSpec, Matchers}
import salat.grater
import za.co.absa.spline.fixture.LineageFixture
import za.co.absa.spline.linker.boundary.LegacyInletV5Controller
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api._
import za.co.absa.spline.persistence.mongo.serialization.BSONSalatContext._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.collection.mutable.ArrayBuffer
import scala.concurrent.{ExecutionContext, Future}

class LegacyInletV5ControllerSpec
    extends AsyncFunSpec
    with Matchers
    with MockitoSugar
    with BeforeAndAfterEach
    with LineageFixture {

  val stored: ArrayBuffer[DataLineage] = ArrayBuffer[DataLineage]()

  describe("LegacyInletV5ControllerSpec") {
    it("linker should process harvested lineages") {
      val expectedLineage = fiveOpsLineage()
      val bson = grater[DataLineage].toBSON(expectedLineage)
      val controller = new LegacyInletV5Controller(
        createDataLineageWriter, createDataLineageReader, createProgressWriter)
      controller.lineage(bson)
        .map(_ => {
          val actualLineage = stored(0)
          actualLineage.id shouldBe expectedLineage.id
          actualLineage.operations shouldBe expectedLineage.operations
      })
    }
  }

  override protected def beforeEach(): Unit = {
    super.beforeEach()
    stored.clear()
  }

  override protected def afterEach(): Unit = {
    stored.clear()
    super.afterEach()
  }

  def createDataLineageWriter: DataLineageWriter = {
    new DataLineageWriter {
      override def store(lineage: DataLineage)(implicit ec: ExecutionContext): Future[Unit] = Future {
        // Prevents duplicate storage.
        if (stored.exists(l => l.id == lineage.id)) {
          val response = new BsonDocument()
          response.put("err", new BsonString(""))
          throw new DuplicateKeyException(response, null, null)
        } else {
          stored += lineage
        }
      }
    }
  }

  private def createDataLineageReader: DataLineageReader = {
    val reader = mock[DataLineageReader]
    when(reader.loadByDatasetId(any(), any())(any()))
      .thenReturn(Future.successful(None))
    reader
  }

  private def createProgressWriter: ProgressEventWriter = {
    val writer = mock[ProgressEventWriter]
    when(writer.store(any())(any())).thenReturn(Future.successful[Unit](Unit))
    writer
  }

}
