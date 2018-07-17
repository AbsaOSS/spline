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

package za.co.absa.spline.fixture

import org.apache.commons.configuration.Configuration
import org.apache.spark.sql.{DataFrame, SparkSession}
import org.scalatest.matchers.{MatchResult, Matcher}
import org.scalatest._
import org.slf4s.Logging
import za.co.absa.spline.common.TempDirectory
import za.co.absa.spline.core.conf.DefaultSplineConfigurer.ConfProperty.PERSISTENCE_FACTORY
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.{DataLineageReader, DataLineageWriter, PersistenceFactory}

trait SparkAndSplineFixture extends TestSuiteMixin
  with BeforeAndAfterAll
  with SparkAndSplineFixture.Implicits {
  this: TestSuite with Logging with Matchers =>

  SparkAndSplineFixture.touch()

  val spark: SparkSession = SparkSession.builder.getOrCreate

  abstract override protected def beforeAll(): Unit = {
    import za.co.absa.spline.core.SparkLineageInitializer._
    spark.enableLineageTracking()
    super.beforeAll()
  }

  abstract override protected def afterAll(): Unit =
    try super.afterAll()
    finally SparkSession.builder.getOrCreate.stop()


  abstract override protected def withFixture(test: NoArgTest): Outcome =
    SparkAndSplineFixture.synchronized {
      try super.withFixture(test)
      finally SparkAndSplineFixture.justCapturedLineage = null
    }

  class MatcherAdapter[T](matchingFn: T => MatchResult) extends Matcher[T] {
    override def apply(left: T): MatchResult = matchingFn(left)
  }

  object HaveEveryComponentSizeInBSONLessThan {

    import za.co.absa.spline.common.ByteUnits._

    def apply(bsonSizeLimit: Int) = new MatcherAdapter[DataLineage](
      lineage => {
        def checkSize[T <: AnyRef : Manifest](o: T): Assertion = {
          val bsonSize = o.asBSON.length
          log.info(f"${bsonSize.toDouble / 1.mb}%.2f mb")
          bsonSize should be < bsonSizeLimit
        }

        log.info("Operations BSON size:")
        lineage.operations.foreach(checkSize(_))

        log.info("Attributes BSON size:")
        lineage.attributes.foreach(checkSize(_))

        log.info("Datasets BSON size:")
        lineage.datasets.foreach(checkSize(_))

        log.info("DataTypes BSON size:")
        lineage.dataTypes.foreach(checkSize(_))

        MatchResult(matches = true, "", "")
      })
  }

}

object SparkAndSplineFixture {

  import scala.concurrent.{ExecutionContext, Future}

  System.getProperties.setProperty("spark.master", "local[*]")
  System.getProperties.setProperty(PERSISTENCE_FACTORY, classOf[TestPersistenceFactory].getName)

  private var justCapturedLineage: DataLineage = _

  /** force the object to be loaded by the class loader */
  private def touch(): Unit = {}

  class TestPersistenceFactory(conf: Configuration) extends PersistenceFactory(conf) {
    override val createDataLineageReader: Option[DataLineageReader] = None
    override val createDataLineageWriter: DataLineageWriter = new DataLineageWriter {
      override def store(lineage: DataLineage)(implicit ec: ExecutionContext): Future[Unit] = {
        assume(justCapturedLineage == null)
        justCapturedLineage = lineage
        Future.successful(())
      }
    }
  }

  trait Implicits {

    implicit class LinageSerializer[T <: AnyRef : Manifest](o: T) {

      import za.co.absa.spline.persistence.mongo.serialization.BSONSalatContext._

      def asBSON: Array[Byte] = salat.grater[T] toBSON o
    }

    implicit class DataFrameLineageExtractor(df: DataFrame) {
      def lineage: DataLineage = {
        df.write.save(TempDirectory("spline", ".parquet", pathOnly = true).deleteOnExit().path.toString)
        SparkAndSplineFixture.justCapturedLineage
      }
    }

  }

}