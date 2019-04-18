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
import za.co.absa.spline.fixture.{AsyncSparkFixture, AsyncSplineFixture, DerbyDatabaseFixture}
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.model.op.{BatchWrite, Write}


@Ignore class JDBCWriteSpec extends AsyncFlatSpec
  with Matchers
  with AsyncSparkFixture
  with AsyncSplineFixture
  with DerbyDatabaseFixture {

  val tableName = "testTable"

  val testData: DataFrame =
    withNewSession( session => {
      withSplineEnabled(session) {
      val schema = StructType(StructField("ID", IntegerType, false) :: StructField("NAME", StringType, false) :: Nil)
      val rdd = spark.sparkContext.parallelize(Row(1014, "Warsaw") :: Row(1002, "Corte") :: Nil)
      spark.sqlContext.createDataFrame(rdd, schema)
    }
    })


  "save_to_fs" should "process all operations" in
    withNewSession( session => {
      withSplineEnabled(session) {
      val tableName = "someTable" + System.currentTimeMillis()

      val lineage: DataLineage = testData.jdbcLineage(connectionString, tableName, mode = SaveMode.Overwrite)

      val producedWrites = lineage.operations.filter(_.isInstanceOf[Write]).map(_.asInstanceOf[BatchWrite])
      producedWrites.size shouldBe 1
      val write = producedWrites.head

      write.path shouldBe "jdbc://" + connectionString + ":" + tableName
      write.append shouldBe false
    }
    })
}


