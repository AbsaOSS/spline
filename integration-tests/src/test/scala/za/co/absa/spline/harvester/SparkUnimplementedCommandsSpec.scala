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

package za.co.absa.spline.harvester

import java.util.Properties

import org.apache.commons.io.FileUtils
import org.apache.spark.sql.types.{IntegerType, StringType, StructField, StructType}
import org.apache.spark.sql.{DataFrame, Row}
import org.scalatest.Ignore
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import za.co.absa.spline.common.TempDirectory
import za.co.absa.spline.common.Version.VersionOrdering.{max => _, min => _}
import za.co.absa.spline.test.fixture.spline.SplineFixture
import za.co.absa.spline.test.fixture.{JDBCFixture, SparkDatabaseFixture, SparkFixture}

import scala.collection.JavaConverters._

/**
 * Tests in this class serve as a way to produce unimplemented spark commands.
 * They can be used as a template once the implementation begins.
 *
 * None of the tests is supposed to pass yet and therefore they are ignored.
 *
 */
@Ignore
class SparkUnimplementedCommandsSpec extends AnyFlatSpec
  with Matchers
  with SparkFixture
  with SplineFixture
  with SparkDatabaseFixture
  with JDBCFixture {

  val databaseName = "testDb"
  val tableName = "testTable"

  "Lineage for create database" should "be caught" in
    withNewSparkSession { spark =>
      withDatabase(spark)(databaseName) {
        spark.sql(s"DROP DATABASE IF EXISTS $databaseName CASCADE")

        withLineageTracking(spark) { lineageCaptor =>
          val (plan, _) = lineageCaptor.lineageOf {
            spark.sql(s"CREATE DATABASE $databaseName") // CreateDatabaseCommand
          }
        }
      }
    }

  "Lineage for drop database" should "be caught" in
    withNewSparkSession { spark =>
      withDatabase(spark)(databaseName) {

        withLineageTracking(spark) { lineageCaptor =>
          val (plan, _) = lineageCaptor.lineageOf {
            spark.sql(s"DROP DATABASE $databaseName CASCADE") // DropDatabaseCommand
          }
        }
      }
    }

  /**
   * I wasn't able to generate CreateDataSourceTableCommand instead spark created CreateTableCommand,
   * even though I was using an sql according to class comment.
   *
   * This is proper syntax for CreateDataSourceTableCommand according to class comment:
   * {{{
   *   CREATE TABLE [IF NOT EXISTS] [db_name.]table_name
   *   [(col1 data_type [COMMENT col_comment], ...)]
   *   USING format OPTIONS ([option1_name "option1_value", option2_name "option2_value", ...])
   * }}}
   */
  "Lineage for create data source table" should "be caught" in
    withCustomSparkSession(_
      .enableHiveSupport()
      .config("hive.exec.dynamic.partition.mode", "nonstrict")) { spark =>

      withHiveDatabase(spark)(databaseName) {
        withLineageTracking(spark) { lineageCaptor =>
          val (plan, _) = lineageCaptor.lineageOf {
            // CreateDataSourceTableCommand (but actually CreateTableCommand)
            spark.sql(s"""
              CREATE TABLE $tableName (x String, ymd int) USING hive OPTIONS (
                INPUTFORMAT 'org.apache.hadoop.mapred.SequenceFileInputFormat',
                OUTPUTFORMAT 'org.apache.hadoop.hive.ql.io.HiveSequenceFileOutputFormat'
              )
              """
            )
          }
        }
      }
    }

  "Lineage for create table like" should "be caught" in
    withCustomSparkSession(_
      .enableHiveSupport()
      .config("hive.exec.dynamic.partition.mode", "nonstrict")) { spark =>
      withHiveDatabase(spark)(databaseName,
        (tableName, "(x String, ymd int)", Seq(("Tata", 20190401), ("Tere", 20190403)))) {

        withLineageTracking(spark) { lineageCaptor =>
          val (plan, _) = lineageCaptor.lineageOf {
            spark.sql(s"CREATE TABLE fooTable LIKE $tableName") // CreateTableLikeCommand
          }
        }
      }
    }

  "Lineage for truncate table" should "be caught" in
    withCustomSparkSession(_
      .enableHiveSupport()
      .config("hive.exec.dynamic.partition.mode", "nonstrict")) { spark =>

      withHiveDatabase(spark)(databaseName,
        (tableName, "(x String, ymd int)", Seq(("Tata", 20190401), ("Tere", 20190403)))) {

        withLineageTracking(spark) { lineageCaptor =>
          val (plan, _) = lineageCaptor.lineageOf {
            spark.sql(s"TRUNCATE TABLE $tableName") // TruncateTableCommand
          }
        }
      }
    }

  "Lineage for alter table add columns" should "be caught" in
    withCustomSparkSession(_
      .enableHiveSupport()
      .config("hive.exec.dynamic.partition.mode", "nonstrict")) { spark =>

      withHiveDatabase(spark)(databaseName,
        (tableName, "(x String, ymd int)", Seq(("Tata", 20190401), ("Tere", 20190403)))) {

        withLineageTracking(spark) { lineageCaptor =>
          val (plan, _) = lineageCaptor.lineageOf {
            spark.sql(s"ALTER TABLE $tableName ADD COLUMNS (foo int)") // AlterTableAddColumnsCommand
          }
        }
      }
    }

  /**
   * column name/type change not supported in spark 2.3 only comment change is supported
   */
  "Lineage for alter table change column" should "be caught" in
    withCustomSparkSession(_
      .enableHiveSupport()
      .config("hive.exec.dynamic.partition.mode", "nonstrict")) { spark =>

      withHiveDatabase(spark)(databaseName,
        (tableName, "(x String, ymd int)", Seq(("Tata", 20190401), ("Tere", 20190403)))) {

        withLineageTracking(spark) { lineageCaptor =>
          val (plan, _) = lineageCaptor.lineageOf {
            // AlterTableChangeColumnCommand
            spark.sql(s"ALTER TABLE $tableName CHANGE COLUMN x x String COMMENT 'This is a comment'")
          }
        }
      }
    }

  "Lineage for alter table rename" should "be caught" in
    withCustomSparkSession(_
      .enableHiveSupport()
      .config("hive.exec.dynamic.partition.mode", "nonstrict")) { spark =>

      withHiveDatabase(spark)(databaseName,
        (tableName, "(x String, ymd int)", Seq(("Tata", 20190401), ("Tere", 20190403)))) {

        withLineageTracking(spark) { lineageCaptor =>
          val (plan, _) = lineageCaptor.lineageOf {
            spark.sql(s"ALTER TABLE $tableName RENAME TO new_name") // AlterTableRenameCommand
          }
        }
      }
    }

  private val tempDirPath = TempDirectory(prefix = "test").deleteOnExit().path

  "Lineage for load data" should "be caught" in
    withCustomSparkSession(_
      .enableHiveSupport()
      .config("hive.exec.dynamic.partition.mode", "nonstrict")) { spark =>

      withHiveDatabase(spark)(databaseName,
        (tableName, "(x String, ymd int)", Seq(("Tata", 20190401), ("Tere", 20190403)))) {

        val filePath = tempDirPath.resolve("loadData.txt")

        val separator = "\u0001"

        FileUtils.writeLines(filePath.toFile, Seq(
          s"FooBar${separator}42",
          s"BleBla${separator}66").asJava)

        withLineageTracking(spark) { lineageCaptor =>
          val (plan, _) = lineageCaptor.lineageOf {
            spark.sql(s"LOAD DATA LOCAL INPATH '${filePath.toUri}' INTO TABLE $tableName") // LoadDataCommand
          }
        }
      }
    }

  "Lineage for alter table set location" should "be caught" in
    withCustomSparkSession(_
      .enableHiveSupport()
      .config("hive.exec.dynamic.partition.mode", "nonstrict")) { spark =>

      withHiveDatabase(spark)(databaseName,
        (tableName, "(x String, ymd int)", Seq(("Tata", 20190401), ("Tere", 20190403)))) {

        val newPath = tempDirPath.resolve("footable")

        withLineageTracking(spark) { lineageCaptor =>
          val (plan, _) = lineageCaptor.lineageOf {
            spark.sql(s"ALTER TABLE $tableName SET LOCATION '${newPath.toUri}'") // AlterTableSetLocationCommand
          }
        }
      }
    }

  /**
   * This actually produce both InsertIntoDataSourceCommand and SaveIntoDataSourceCommand.
   * Since SaveIntoDataSourceCommand is already implemented, there is no need to implement InsertIntoDataSourceCommand.
   */
  "Lineage for insert into (jdbc) table" should "be caught" in
    withNewSparkSession(spark => {

      val testData: DataFrame = {
        val schema = StructType(
          StructField("ID", IntegerType, nullable = false) :: StructField("NAME", StringType, nullable = false) :: Nil)

        val rdd = spark.sparkContext.parallelize(Row(1014, "Warsaw") :: Row(1002, "Corte") :: Nil)
        spark.sqlContext.createDataFrame(rdd, schema)
      }

      testData.write.jdbc(jdbcConnectionString, "atable", new Properties)

      spark.sql(s"""
          CREATE TABLE jdbcTable USING org.apache.spark.sql.jdbc OPTIONS (
            url '$jdbcConnectionString',
            dbtable 'atable',
            user '',
            password ''
          )
        """
      )

      withLineageTracking(spark)(lineageCaptor => {
        val (plan, _) = lineageCaptor.lineageOf {
          // SaveIntoDataSourceCommand
          // InsertIntoDataSourceCommand
          spark.sql("INSERT INTO TABLE jdbcTable VALUES (6666, 'Wroclaw')")
        }
      })
    })
}


