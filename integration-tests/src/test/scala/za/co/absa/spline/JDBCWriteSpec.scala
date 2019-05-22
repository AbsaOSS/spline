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

import org.apache.spark.sql.types.{IntegerType, StringType, StructField, StructType}
import org.apache.spark.sql.{DataFrame, Row, SaveMode}
import org.scalatest._
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.model.op.{BatchWrite, Write}
import za.co.absa.spline.test.DataFrameImplicits._
import za.co.absa.spline.test.fixture.spline.SplineFixture
import za.co.absa.spline.test.fixture.{DerbyDatabaseFixture, SparkFixture}


class JDBCWriteSpec extends AsyncFlatSpec
  with Matchers
  with SparkFixture
  with SplineFixture
  with DerbyDatabaseFixture {


  val tableName = "testTable"

  "save_to_fs" should "process all operations" in
    withNewSparkSession(spark => {
      withLineageTracking(spark)(lineageCaptor => {
        val tableName = "someTable" + System.currentTimeMillis()

        val testData: DataFrame = {
          val schema = StructType(StructField("ID", IntegerType, false) :: StructField("NAME", StringType, false) :: Nil)
          val rdd = spark.sparkContext.parallelize(Row(1014, "Warsaw") :: Row(1002, "Corte") :: Nil)
          spark.sqlContext.createDataFrame(rdd, schema)
        }

        val lineage: DataLineage = lineageCaptor.lineageOf(
          testData.writeToJDBC(connectionString, tableName, mode = SaveMode.Overwrite))

        val producedWrites = lineage.operations.filter(_.isInstanceOf[Write]).map(_.asInstanceOf[BatchWrite])
        producedWrites.size shouldBe 1
        val write = producedWrites.head

        write.path shouldBe "jdbc://" + connectionString + ":" + tableName
        write.append shouldBe false
      })
    })
}


