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

import org.apache.spark.SPARK_VERSION
import org.apache.spark.sql.SaveMode.Overwrite
import org.scalatest._
import za.co.absa.spline.common.ConditionalTestTags.ignoreIf
import za.co.absa.spline.common.TempDirectory
import za.co.absa.spline.common.Version.VersionOrdering._
import za.co.absa.spline.common.Version._
import za.co.absa.spline.test.fixture.SparkFixture
import za.co.absa.spline.test.fixture.spline.SplineFixture

class SQLCommandsSpec extends FlatSpec
  with Matchers
  with SparkFixture
  with SplineFixture {

  behavior of "spark.sql()"

  it should "capture lineage of 'CREATE TABLE AS` - Hive" taggedAs ignoreIf(ver"$SPARK_VERSION" < ver"2.3") in
    withRestartingSparkContext {
      withCustomSparkSession(_.enableHiveSupport) { spark =>
        withLineageTracking(spark)(lineageCaptor => {
          import spark.implicits._
          spark.sql("CREATE TABLE sourceTable (id int, name string)")

          val sourceDF = Seq(
            (1, "AA"),
            (2, "BB"),
            (3, "CC"),
            (4, "DD")
          ).toDF("id", "name")

          val (plan1, _) = lineageCaptor.lineageOf(sourceDF
            .write.mode(Overwrite).insertInto("sourceTable"))

          val (plan2, _) = lineageCaptor.lineageOf(spark
            .sql(
              """CREATE TABLE targetTable AS
                | SELECT id, name
                | FROM sourceTable
                | WHERE id > 1""".stripMargin))

          plan1.operations.write.outputSource should be(s"file:$warehouseDir/sourcetable")
          plan2.operations.reads.head.inputSources.head should be(plan1.operations.write.outputSource)
          plan2.operations.write.outputSource should be(s"file:$warehouseDir/targettable")
        })
      }
    }

  it should "capture lineage of 'INSERT OVERWRITE AS` - Hive" taggedAs ignoreIf(ver"$SPARK_VERSION" < ver"2.3") in
    withRestartingSparkContext {
      withCustomSparkSession(_.enableHiveSupport) { spark =>
        withLineageTracking(spark)(lineageCaptor => {
          import spark.implicits._
          spark.sql("CREATE TABLE sourceTable (id int, name string)")

          val dir = TempDirectory("spline", ".table", pathOnly = true).deleteOnExit().path

          Seq(
            (1, "AA"),
            (2, "BB"),
            (3, "CC"),
            (4, "DD")
          ).toDF("id", "name").write.insertInto("sourceTable")

          val (plan, _) = lineageCaptor.lineageOf(spark
            .sql(
              s"""INSERT OVERWRITE DIRECTORY '${dir.toUri}'
                 | SELECT id, name
                 | FROM sourceTable
                 | WHERE id > 1""".stripMargin))

          plan.operations.reads.head.inputSources.head should be(s"file:$warehouseDir/sourcetable")
          plan.operations.write.outputSource should be(dir.toUri.toString.init)
        })
      }
    }

  it should "capture lineage of 'INSERT OVERWRITE AS` - non-Hive" taggedAs ignoreIf(ver"$SPARK_VERSION" < ver"2.3") in
    withRestartingSparkContext {
      withNewSparkSession { spark =>
        withLineageTracking(spark)(lineageCaptor => {
          import spark.implicits._
          spark.sql("CREATE TABLE sourceTable (id int, name string)")

          val csvFile = TempDirectory("spline", ".csv").deleteOnExit().path

          Seq(
            (1, "AA"),
            (2, "BB"),
            (3, "CC"),
            (4, "DD")
          ).toDF("id", "name").write.insertInto("sourceTable")

          val (plan, _) = lineageCaptor.lineageOf(spark
            .sql(
              s"""INSERT OVERWRITE DIRECTORY '${csvFile.toUri}'
                 | USING CSV
                 | SELECT id, name
                 | FROM sourceTable
                 | WHERE id > 1""".stripMargin))

          plan.operations.reads.head.inputSources.head should be(s"file:$warehouseDir/sourcetable")
          plan.operations.write.outputSource should be(csvFile.toUri.toString.init)
        })
      }
    }
}


