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

import org.apache.commons.configuration.{CompositeConfiguration, Configuration, PropertiesConfiguration, SystemConfiguration}
import org.apache.spark.sql.{DataFrame, SaveMode, SparkSession}
import org.scalatest._
import za.co.absa.spline.common.TempDirectory
import za.co.absa.spline.core.conf.{DefaultSplineConfigurer, HadoopConfiguration, SparkConfiguration, SplineConfigurer}
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.{DataLineageReader, DataLineageWriter, PersistenceFactory}

import scala.util.Try
import scala.collection.JavaConverters._
import scala.concurrent.{ExecutionContext, Future}
import za.co.absa.spline.core.SparkLineageInitializer._


trait AbstractSplineFixture
  extends BeforeAndAfterAll {

  this: Suite with AbstractSparkFixture =>

  private var justCapturedLineage: DataLineage = _

  def withLineageCapturingOn[T](session: SparkSession)(testBody: LineageCaptor => T): T = {
    val captor = new LineageCaptor


    val defaultSplineConfiguration: CompositeConfiguration = AbstractSplineFixture.makeConfig(session)

    val unitTestConfigurer: SplineConfigurer = new DefaultSplineConfigurer(defaultSplineConfiguration, session,
      new IsolatedTestPersistenceFactory(defaultSplineConfiguration)
    )
    session.enableLineageTracking(unitTestConfigurer)

    val result = testBody(captor)
    resetCapturedLineage
    result
  }

  class LineageCaptor {

    def lineage: DataLineage = AbstractSplineFixture.this.capturedLineage

    def resetCapturedLineage: Unit = AbstractSplineFixture.this.resetCapturedLineage
  }

  class IsolatedTestPersistenceFactory(conf: Configuration) extends PersistenceFactory(conf) {
    override val createDataLineageReader: Option[DataLineageReader] = None
    override val createDataLineageWriter: DataLineageWriter = new DataLineageWriter {
      override def store(lineage: DataLineage)(implicit ec: ExecutionContext): Future[Unit] = {
        if (justCapturedLineage != null) {
          justCapturedLineage = null
          throw new RuntimeException("Some lineage was already captured.")
        } else {
          justCapturedLineage = lineage
          Future.successful(())
        }
      }
    }
  }

  def resetCapturedLineage: Unit = {
    justCapturedLineage = null
  }

  def capturedLineage: DataLineage = {
    if (justCapturedLineage == null) {
      throw new RuntimeException("Lineage was not captured or was already captured ")
    } else {
      justCapturedLineage
    }
  }
}


trait SplineFixture extends AbstractSplineFixture with TestSuiteMixin {
  this: TestSuite with AbstractSparkFixture =>

}

trait AsyncSplineFixture extends AbstractSplineFixture with AsyncTestSuiteMixin {
  this: AsyncTestSuite with AbstractSparkFixture =>

}

object Implicits {

  implicit class DFWrapper(df: DataFrame) {
    def writeToDisk(path: String = null, mode: SaveMode = SaveMode.ErrorIfExists): Unit = {
      val dir = if (path != null) path else TempDirectory("spline_" + System.currentTimeMillis(), ".parquet", pathOnly = true).deleteOnExit().path.toString
      df.write.mode(mode).save(dir)
    }

    def writeToTable(tableName: String = "tableName", mode: SaveMode = SaveMode.ErrorIfExists): Unit = {
      df.write.mode(mode).saveAsTable(tableName)
    }

    def writeToJDBC(connectionString: String,
                    tableName: String,
                    properties: Properties = new Properties(),
                    mode: SaveMode = SaveMode.ErrorIfExists): Unit = {
      df.write.mode(mode).jdbc(connectionString, tableName, properties)
    }
  }

}

object AbstractSplineFixture {

  def makeConfig[T >: AnyRef](spark: SparkSession) = {
    val defaultSplineConfiguration = {
      val splinePropertiesFileName = "spline.properties"

      val systemConfOpt = Some(new SystemConfiguration)
      val propFileConfOpt = Try(new PropertiesConfiguration(splinePropertiesFileName)).toOption
      val hadoopConfOpt = Some(new HadoopConfiguration(spark.sparkContext.hadoopConfiguration))
      val sparkConfOpt = Some(new SparkConfiguration(spark.sparkContext.getConf))

      new CompositeConfiguration(Seq(
        hadoopConfOpt,
        sparkConfOpt,
        systemConfOpt,
        propFileConfOpt
      ).flatten.asJava)
    }
    defaultSplineConfiguration
  }
}
