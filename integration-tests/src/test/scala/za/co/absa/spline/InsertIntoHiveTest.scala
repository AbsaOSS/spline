/*
 * Copyright 2019 ABSA Group Limited
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
package za.co.absa.spline

import org.apache.spark.sql.SaveMode
import org.apache.spark.sql.functions._
import org.scalatest._
import za.co.absa.spline.common.TempDirectory
import za.co.absa.spline.test.fixture.spline.SplineFixture
import za.co.absa.spline.test.fixture.{SparkDatabaseFixture, SparkFixture}

class InsertIntoHiveTest
  extends FlatSpec
    with OneInstancePerTest
    with Matchers
    with SparkFixture
    with SparkDatabaseFixture
    with SplineFixture {

  private val tempWarehouseDirPath: String = TempDirectory("SparkFixture", "UnitTest", pathOnly = true).deleteOnExit().path.toString

  "InsertInto" should "not fail when inserting to partitioned table created as Hive table" in
    withRestartingSparkContext {
      withCustomSparkSession(_
        .enableHiveSupport()
        .config("hive.exec.dynamic.partition.mode", "nonstrict")
        .config("hive.metastore.warehouse.dir", tempWarehouseDirPath)
        .config("spark.sql.warehouse.dir", tempWarehouseDirPath)) { spark =>

        withHiveDatabase(spark)(
          databaseName = s"unitTestDatabase_${this.getClass.getSimpleName}",
          ("path_archive", "(x String, ymd int) USING hive PARTITIONED BY (ymd)", Seq(("Tata", 20190401), ("Tere", 20190403))),
          ("path", "(x String) USING hive", Seq("Monika", "Buba"))) {

          withLineageTracking(spark) { lineageCaptor => {
            val df = spark
              .table("path")
              .withColumn("ymd", lit(20190401))

            val (plan, _) = lineageCaptor.lineageOf {
              df.write.mode(SaveMode.Overwrite).insertInto("path_archive")
            }

            plan.operations.write.outputSource should include("path_archive")
            plan.operations.write.append should be(false)
          }
          }
        }
      }
    }
}
