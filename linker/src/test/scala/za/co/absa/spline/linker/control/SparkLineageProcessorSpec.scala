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

import java.util.UUID
import java.util.UUID.randomUUID

import org.apache.commons.configuration.Configuration
import org.scalatest.{BeforeAndAfterEach, FunSpec, Matchers}
import za.co.absa.spline.fixture.SparkFixture
import za.co.absa.spline.linker.boundary.DefaultSplineConfig
import za.co.absa.spline.model._
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.op.{BatchWrite, Generic, OperationProps}
import za.co.absa.spline.persistence.api.{DataLineageReader, DataLineageWriter, PersistenceFactory, ProgressEventWriter}

import scala.collection.immutable
import scala.collection.mutable.ArrayBuffer
import scala.concurrent.{ExecutionContext, Future}

class SparkLineageProcessorSpec extends FunSpec with Matchers with BeforeAndAfterEach with SparkFixture {

  import scala.concurrent.ExecutionContext.Implicits._

  val localMongoUrl = "mongodb://localhost"
  val analyticsDbName = "spline-test"
  val localKafka = "localhost:9092"

  describe("SparkLineageProcessor") {

    it("linker should process harvested lineages") {
      System.setProperty(PersistenceFactory.PersistenceFactoryPropName, classOf[MockPersistenceFactory].getName)

      val configuration = DefaultSplineConfig(spark)
      val uuid = UUID.randomUUID()
      import za.co.absa.spline.linker.boundary.LineageHarvestReader._
      val stream = spark
        .readStream
        .format("rate")
        .load()
        .map(_ => SparkLineageProcessorSpec.createDataLineage(datasetId = uuid))
        .as[DataLineage]
      val processor = new SparkLineageProcessor(stream, configuration, spark)
      processor.start()
      val found: immutable.Seq[Boolean] = for (_ <- 1 to 10) yield {
        Thread.sleep(1000)
        MockPersistenceFactory.Stored.size == 1
      }
      found.exists(b => b) shouldBe true
      processor.stop()
    }
  }

  override protected def beforeEach(): Unit = {
    System.setProperty("spark.master", "local[1]")
  }

  override protected def afterEach(): Unit = {
    MockPersistenceFactory.Stored.clear()
  }

}

/**
  * Write-only persistence
  */
class MockPersistenceFactory(configuration: Configuration) extends PersistenceFactory(configuration) {

  override def createDataLineageWriter: DataLineageWriter = {
    new DataLineageWriter {
      override def store(lineage: DataLineage)(implicit ec: ExecutionContext): Future[Unit] = Future {
        // Prevents duplicate storage.
        if (!MockPersistenceFactory.Stored.exists(l => l.id == lineage.id)) {
          MockPersistenceFactory.Stored += lineage
        }
      }
    }
  }

  override def createDataLineageReader: Option[DataLineageReader] = None

  override def createProgressEventWriter: ProgressEventWriter = throw new UnsupportedOperationException()
}

object MockPersistenceFactory {
  val Stored: ArrayBuffer[DataLineage] = ArrayBuffer[DataLineage]()
}

object SparkLineageProcessorSpec {

  def createDataLineage(
                         appId: String = "appId1",
                         appName: String = "appName1",
                         timestamp: Long = 123L,
                         datasetId: UUID = randomUUID,
                         path: String = "hdfs://foo/bar/path",
                         append: Boolean = false)
  : DataLineage = {
    val dataTypes = Seq(Simple("StringType", nullable = true))

    val attributes = Seq(
      Attribute(randomUUID(), "_1", dataTypes.head.id),
      Attribute(randomUUID(), "_2", dataTypes.head.id),
      Attribute(randomUUID(), "_3", dataTypes.head.id)
    )
    val aSchema = Schema(attributes.map(_.id))
    val bSchema = Schema(attributes.map(_.id).tail)

    val md1 = MetaDataset(datasetId, aSchema)
    val md2 = MetaDataset(randomUUID, aSchema)
    val md3 = MetaDataset(randomUUID, bSchema)
    val md4 = MetaDataset(randomUUID, bSchema)

    DataLineage(
      appId,
      appName,
      timestamp,
      "2.3.0",
      Seq(
        BatchWrite(OperationProps(randomUUID, "Write", Seq(md1.id), md1.id), "parquet", path, append, Map.empty, Map.empty),
        Generic(OperationProps(randomUUID, "Union", Seq(md1.id, md2.id), md3.id), "rawString1"),
        Generic(OperationProps(randomUUID, "Filter", Seq(md4.id), md2.id), "rawString2"),
        Generic(OperationProps(randomUUID, "LogicalRDD", Seq.empty, md4.id), "rawString3"),
        Generic(OperationProps(randomUUID, "Filter", Seq(md4.id), md1.id), "rawString4")
      ),
      Seq(md1, md2, md3, md4),
      attributes,
      dataTypes
    )
  }
}


