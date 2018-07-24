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
import org.apache.spark.sql.DataFrame
import org.scalatest._
import org.scalatest.matchers.{MatchResult, Matcher}
import org.slf4s.Logging
import za.co.absa.spline.common.ByteUnits._
import za.co.absa.spline.common.TempDirectory
import za.co.absa.spline.core.conf.DefaultSplineConfigurer.ConfProperty.PERSISTENCE_FACTORY
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.{DataLineageReader, DataLineageWriter, PersistenceFactory}
import za.co.absa.spline.scalatest.MatcherImplicits

trait SplineFixture
  extends TestSuiteMixin
    with BeforeAndAfterAll
    with SplineFixture.Implicits
    with SplineFixture.Matchers {

  this: TestSuite with SparkFixture =>

  SplineFixture.touch()

  abstract override protected def beforeAll(): Unit = {
    import za.co.absa.spline.core.SparkLineageInitializer._
    spark.enableLineageTracking()
    super.beforeAll()
  }

  abstract override protected def withFixture(test: NoArgTest): Outcome =
    SplineFixture.synchronized {
      try super.withFixture(test)
      finally SplineFixture.justCapturedLineage = null
    }
}

object SplineFixture {

  import scala.concurrent.{ExecutionContext, Future}

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
        SplineFixture.justCapturedLineage
      }
    }

  }

  trait Matchers {
    def haveEveryComponentSizeInBSONLessThan(bsonSizeLimit: Int): Matcher[DataLineage] =
      HaveEveryComponentSizeInBSONLessThan(bsonSizeLimit)

    object HaveEveryComponentSizeInBSONLessThan
      extends Logging
        with Implicits
        with MatcherImplicits {

      def apply(bsonSizeLimit: Int): Matcher[DataLineage] =
        (lineage: DataLineage) => {
          case class ComponentSize(name: String, size: Int)

          def componentBsonSizes[T <: AnyRef : Manifest](name: String, col: Seq[T]): Iterator[ComponentSize] =
            for (o <- col.iterator) yield {
              val bsonSize = o.asBSON.length
              log.info(f"$name BSON size: ${bsonSize.toDouble / 1.mb}%.2f mb")
              ComponentSize(name, bsonSize)
            }

          val allComponentsSizes = Iterator(
            componentBsonSizes("Operation", lineage.operations),
            componentBsonSizes("Attribute", lineage.attributes),
            componentBsonSizes("Dataset", lineage.datasets),
            componentBsonSizes("DataType", lineage.dataTypes)
          ).flatten

          allComponentsSizes.zipWithIndex.find(_._1.size >= bsonSizeLimit) match {
            case None => MatchResult(matches = true, "", "")
            case Some((ComponentSize(name, oversize), i)) => MatchResult(
              matches = false,
              f"$name[$i] size ${oversize.toDouble / 1.mb}%.2f mb should be less than ${bsonSizeLimit.toDouble / 1.mb} mb",
              "")
          }
        }
    }

  }

}