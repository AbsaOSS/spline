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

import java.lang.System
import java.nio.file.Path

import org.apache.spark.sql.SparkSession
import org.scalatest.{BeforeAndAfterAll, Suite}
import org.slf4s.Logging
import za.co.absa.spline.common.TempDirectory


trait SparkFixture extends BeforeAndAfterAll with Logging {
  this : Suite =>

  private val tempWarehouseDirPath: Path =
    TempDirectory("SparkFixture", "UnitTest", pathOnly = true).path


  override protected def beforeAll(): Unit = {
    maybeSparkReset
  }

  override protected def afterAll(): Unit = {
    maybeSparkReset
  }

  private def maybeSparkReset = {
    if (stopSparkBeforeAndAfterAll) {
      log.info("Stopping Spark Session - instance used in unit test may need restart.")
      SparkSession.getDefaultSession.map(_.stop())
    }
  }

  System.setProperty("derby.system.home", tempWarehouseDirPath.toString)

  private val sessionBuilder: SparkSession.Builder =
    customizeBuilder(
      SparkSession.builder.
        master("local[4]").
        config("spark.ui.enabled", "false").
        config("spark.sql.warehouse.dir", tempWarehouseDirPath.toString)
        config("hive.metastore.warehouse.dir", tempWarehouseDirPath.toString)
    )

  protected val databaseName = "unitTestDatabase_" + this.getClass.getSimpleName


  /** When true, create and drops new database for tested method. ß*/
  protected val createTestDatabase = false

  protected val stopSparkBeforeAndAfterAll = false

  def withSparkSession[T](testBody: SparkSession => T): T = {
    val spark = sessionBuilder.getOrCreate.newSession

    createDatabase(spark)

    try {
      testBody(spark)
    } finally {
      dropDatabase(spark)
    }
  }

  private def dropDatabase(spark:SparkSession): Unit = {
    if (createTestDatabase) {
      spark.sqlContext.sql("DROP DATABASE IF EXISTS " + databaseName + " CASCADE")
    }
  }

  private def createDatabase(spark:SparkSession): Unit = {
    if (createTestDatabase) {
      spark.sqlContext.sql("DROP DATABASE IF EXISTS " + databaseName + " CASCADE")
      spark.sqlContext.sql("CREATE DATABASE " + databaseName)
      spark.sqlContext.sql("USE " + databaseName)
    }
  }

  protected def customizeBuilder(builder: SparkSession.Builder): SparkSession.Builder = builder
}
