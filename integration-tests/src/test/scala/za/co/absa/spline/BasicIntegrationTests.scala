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

package za.co.absa.spline

import org.apache.hadoop.fs.Path
import org.apache.spark.sql.{Row, SaveMode}
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types.{IntegerType, StructField, StructType}
import org.scalatest._
import za.co.absa.spline.common.TempDirectory
import za.co.absa.spline.fixture.IsolatedSplineFixture
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.model.op.Write

/** Contains smoke tests for basic operations.*/
class BasicIntegrationTests extends FlatSpec with Matchers with IsolatedSplineFixture {

  "saveAsTable" should "process all operations" in withNewSparkSession (spark => {
    import spark.implicits._

    val df = Seq((1, 2), (3, 4)).toDF().agg(concat(sum('_1), min('_2)) as "forty_two")
    val saveAsTable = writeToTable(df, "someTable")

    spark.sql("drop table someTable")
    saveAsTable.operations.length shouldBe 3
  })

  "save_to_fs" should "process all operations" in withNewSparkSession (spark => {
    import spark.implicits._

    val df = Seq((1, 2), (3, 4)).toDF().agg(concat(sum('_1), min('_2)) as "forty_two")
    val saveToFS: DataLineage = writeDfToDisk(df)

    saveToFS.operations.length shouldBe 3
  })

  "saveAsTable" should "use URIS compatible with filesystem write" in withNewSparkSession (spark =>  {

    //When I write something to table and then read it again, Spline have to use matching URI.

    val tableName = "externalTable"
    val dir = TempDirectory ("sparkunit", "table", false).deleteOnExit()
    val path = dir.path.toString.replace("\\", "/")
    val sql = "create table " + tableName + " (num int) using parquet location '" + path + "' "
    spark.sql(sql)

    val schema: StructType = StructType(List(StructField("num", IntegerType, true)))
    val data = spark.sparkContext.parallelize(Seq(Row(1), Row(3)))
    val inputDf = spark.sqlContext.createDataFrame(data, schema)

    val wt: DataLineage = writeToTable(inputDf, tableName, SaveMode.Append)

    val write1: Write = wt.operations.filter(_.isInstanceOf[Write]).head.asInstanceOf[Write]
    val saveAsTablePath = write1.path

    resetCapturedLineage
    spark.sql("drop table " + tableName)

    val readFromTable: DataLineage = writeDfToDisk(inputDf,path, SaveMode.Overwrite)

    val writeOperation = readFromTable.operations.filter(_.isInstanceOf[Write]).head.asInstanceOf[Write]
    val write2 = writeOperation.path

    saveAsTablePath shouldBe write2
  })

  "saveAsTable" should "use table path as identifier when writing to external table" in withNewSparkSession (spark => {
    val dir = TempDirectory ("sparkunit", "table", true).deleteOnExit()
    val expectedPath = dir.path.toUri.toURL
    val path = dir.path.toString.replace("\\", "/")
    val sql = "create table e_table(num int) using parquet location '" + path + "' "
    spark.sql(sql)

    val schema: StructType = StructType(List(StructField("num", IntegerType, true)))
    val data = spark.sparkContext.parallelize(Seq(Row(1), Row(3)))
    val df = spark.sqlContext.createDataFrame(data, schema)

    val wt: DataLineage = writeToTable(df, "e_table", SaveMode.Append)

    val writeOperation: Write = wt.operations.filter(_.isInstanceOf[Write]).head.asInstanceOf[Write]

    new Path(writeOperation.path).toUri.toURL shouldBe expectedPath
  })


}
