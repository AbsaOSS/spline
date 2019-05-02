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

import org.apache.log4j.{Level, Logger}
import org.apache.commons.configuration.{CompositeConfiguration, Configuration, PropertiesConfiguration, SystemConfiguration}
import org.apache.spark.sql.{DataFrame, SaveMode, SparkSession}
import org.scalatest.{TestSuite, TestSuiteMixin}
import za.co.absa.spline.common.TempDirectory
import za.co.absa.spline.core.conf.{DefaultSplineConfigurer, HadoopConfiguration, SparkConfiguration, SplineConfigurer}
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.{DataLineageReader, DataLineageWriter, PersistenceFactory}

import scala.concurrent.{ExecutionContext, Future}
import scala.util.Try
import scala.collection.JavaConverters._

import za.co.absa.spline.core.SparkLineageInitializer._

/**
  * Spline fixture that just works and abstract complexity away.
  * */
trait IsolatedSplineFixture extends TestSuiteMixin {
  this: TestSuite =>

  Logger.getLogger("org").setLevel(Level.WARN)
  Logger.getLogger("akka").setLevel(Level.WARN)

  var justCapturedLineage: DataLineage = _

  def resetCapturedLineage: Unit = { justCapturedLineage = null }

  def withNewSparkSession[T >: AnyRef](testBody: SparkSession => T): T = {
    val spark = SparkSession.builder.master("local[4]")
      .config("spark.ui.enabled", "false")
      .getOrCreate.newSession

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


    val unitTestConfigurer: SplineConfigurer = new DefaultSplineConfigurer(defaultSplineConfiguration, spark,
      new IsolatedTestPersistenceFactory(defaultSplineConfiguration)
    )
    spark.enableLineageTracking(unitTestConfigurer)

    val result = testBody(spark)
    justCapturedLineage = null
    result
  }

  def capturedLineage: DataLineage = {
    if (justCapturedLineage == null) {
      throw new RuntimeException( "Lineage was not captured or was already captured")
    } else {
      justCapturedLineage
    }
  }

  def writeDfToDisk(df:DataFrame, path:String = null, mode: SaveMode = SaveMode.ErrorIfExists): DataLineage  = {
    val dir = if (path != null) path else TempDirectory("spline_" + System.currentTimeMillis(), ".parquet", pathOnly = true).deleteOnExit().path.toString
    df.write.mode(mode).save(dir)
    capturedLineage
  }

  def writeToTable(df:DataFrame, tableName: String = "tableName", mode: SaveMode = SaveMode.ErrorIfExists): DataLineage = {
    df.write.mode(mode).saveAsTable(tableName)
    capturedLineage
  }

  def jdbcLineage(df:DataFrame,
                  connectionString:String,
                  tableName:String,
                  properties:Properties = new Properties(),
                  mode: SaveMode = SaveMode.ErrorIfExists): DataLineage = {
    df.write.mode(mode).jdbc(connectionString, tableName, properties)
    capturedLineage
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

}
