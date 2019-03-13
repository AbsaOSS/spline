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

package za.co.absa.spline.fixture

import java.util.Properties
import java.{util => ju}

import com.mongodb.casbah.MongoDB
import com.mongodb.{DBCollection, DBObject}
import org.apache.commons.configuration.Configuration
import org.apache.spark.sql.{DataFrame, SaveMode}
import org.bson.BSON
import org.mockito.Mockito._
import org.mockito.invocation.InvocationOnMock
import org.mockito.stubbing.Answer
import org.mockito.{ArgumentCaptor, ArgumentMatchers}
import org.scalatest.Inspectors.forAll
import org.scalatest._
import org.scalatest.mockito.MockitoSugar
import org.slf4s.Logging
import za.co.absa.spline.common.ByteUnits._
import za.co.absa.spline.common.TempDirectory
import za.co.absa.spline.persistence.api.ProgressEventWriter
//import za.co.absa.spline.core.conf.DefaultSplineConfigurer.ConfProperty.PERSISTENCE_FACTORY
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.{DataLineageReader, DataLineageWriter, PersistenceFactory}
import za.co.absa.spline.persistence.mongo.MongoConnection
import za.co.absa.spline.persistence.mongo.dao.LineageDAOv4

import scala.collection.JavaConverters._
import scala.collection.mutable

trait AbstractSplineFixture
  extends BeforeAndAfterAll
    with AbstractSplineFixture.Implicits {

  this: Suite with AbstractSparkFixture =>

  AbstractSplineFixture.touch()

  abstract override protected def beforeAll(): Unit = {
    import za.co.absa.spline.harvester.SparkLineageInitializer._
    spark.enableLineageTracking()
    super.beforeAll()
  }

  protected def exec[T](body: => T): T = {
    AbstractSplineFixture.synchronized {
      try body
      finally AbstractSplineFixture.justCapturedLineage = null
    }
  }
}

trait SplineFixture extends AbstractSplineFixture with TestSuiteMixin {
  this: TestSuite with AbstractSparkFixture =>

  abstract override protected def withFixture(test: NoArgTest): Outcome = exec {
    super.withFixture(test)
  }
}

trait AsyncSplineFixture extends AbstractSplineFixture with AsyncTestSuiteMixin {
  this: AsyncTestSuite with AbstractSparkFixture =>

  abstract override def withFixture(test: NoArgAsyncTest): FutureOutcome = exec {
    super.withFixture(test)
  }
}

object AbstractSplineFixture {

  import scala.concurrent.{ExecutionContext, Future}

//  System.getProperties.setProperty(PERSISTENCE_FACTORY, classOf[TestPersistenceFactory].getName)

  private var justCapturedLineage: DataLineage = _

  def resetCapturedLineage = justCapturedLineage = null

  /** force the object to be loaded by the class loader */
  private def touch(): Unit = {}

  class TestPersistenceFactory(conf: Configuration) extends PersistenceFactory(conf) {
    override val createDataLineageReader: Option[DataLineageReader] = None
    override val createDataLineageWriter: DataLineageWriter = new DataLineageWriter {
      override def store(lineage: DataLineage)(implicit ec: ExecutionContext): Future[Unit] = {
        assume(justCapturedLineage == null, "Some lineage was already captured")
        justCapturedLineage = lineage
        Future.successful(())
      }
    }
    override val createProgressEventWriter: ProgressEventWriter = ???
  }

  trait Implicits {

    implicit class DataFrameLineageExtractor(df: DataFrame) {
      /** Writes dataframe to disk as parquet and returns captured lineage*/
      def writtenLineage(path: String = null, mode: SaveMode = SaveMode.ErrorIfExists): DataLineage = {
        val dir = if (path != null) path else TempDirectory("spline", ".parquet", pathOnly = true).deleteOnExit().path.toString
        df.write.mode(mode).save(dir)
        AbstractSplineFixture.justCapturedLineage
      }

      /** Writes dataframe to table and returns captured lineage*/
      def saveAsTableLineage(tableName: String = "tableName", mode: SaveMode = SaveMode.ErrorIfExists): DataLineage = {
        df.write.mode(mode).saveAsTable(tableName)
        AbstractSplineFixture.justCapturedLineage
      }

      /** Writes dataframe to table and returns captured lineage*/
      def jdbcLineage(connectionString:String,
                      tableName:String,
                      properties:Properties = new Properties(),
                      mode: SaveMode = SaveMode.ErrorIfExists): DataLineage = {
        df.write.mode(mode).jdbc(connectionString, tableName, properties)
        AbstractSplineFixture.justCapturedLineage
      }
    }

    implicit class LineageComponentSizeVerifier(lineage: DataLineage)(implicit ec: ExecutionContext)
      extends MockitoSugar with Matchers with Logging {
      def shouldHaveEveryComponentSizeInBSONLessThan(sizeLimit: Int): Future[Assertion] = {
        import za.co.absa.spline.persistence.mongo.serialization.BSONSalatContext._

        val mongoConnectionMock = mock[MongoConnection]
        val mongoDBMock = mock[MongoDB]
        val mongoDBCollectionMocks = mutable.Map.empty[String, DBCollection]

        when(mongoConnectionMock.db).thenReturn(mongoDBMock)
        when(mongoDBMock.getCollection(ArgumentMatchers.any())).thenAnswer(new Answer[DBCollection] {
          override def answer(invocation: InvocationOnMock): DBCollection =
            mongoDBCollectionMocks.getOrElseUpdate(invocation getArgument 0, mock[DBCollection])
        })

        for (_ <- new LineageDAOv4(mongoConnectionMock).save(salat.grater[DataLineage].asDBObject(lineage))) yield {
          forAll(mongoDBCollectionMocks) {
            case (colName, colMock) =>
              val argCaptor = ArgumentCaptor.forClass(classOf[ju.List[DBObject]]): ArgumentCaptor[ju.List[DBObject]]
              verify(colMock, atLeastOnce).insert(argCaptor.capture())
              val dbos = argCaptor.getAllValues.asScala.flatMap(_.asScala)
              forAll(dbos.zipWithIndex) {
                case (dbo, i) =>
                  val actualSize = BSON.encode(dbo).length
                  log.info(f"$colName[$i] BSON size: ${actualSize.toDouble / 1.kb}%.2f kb")
                  actualSize should be < sizeLimit
              }
          }
        }
      }
    }


  }

}