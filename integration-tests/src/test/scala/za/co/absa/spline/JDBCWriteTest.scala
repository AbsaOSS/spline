/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package za.co.absa.spline

import org.apache.spark.sql.types.{IntegerType, StringType, StructField, StructType}
import org.apache.spark.sql.{DataFrame, Row, SaveMode, SparkSession}
import org.scalatest._
import za.co.absa.spline.fixture._
import za.co.absa.spline.model.op.Write
import za.co.absa.spline.fixture.Implicits._


class JDBCWriteTest extends FlatSpec with Matchers
  with SparkFixture
  with SplineFixture
  with DerbyDatabaseFixture {

  def testData (spark: SparkSession): DataFrame = {
    val schema = StructType(StructField("ID", IntegerType, false) :: StructField("NAME", StringType, false) :: Nil)
    val rdd = spark.sparkContext.parallelize(Row(1014, "Warsaw") :: Row(1002, "Corte") :: Nil)
    spark.sqlContext.createDataFrame(rdd, schema)
  }


  "save_to_fs" should "I want to do it like this." in {

  }


  "save_to_fs" should "process all operations" in withSession((spark) =>
    withLineageCapturingOn(spark) {
      lineageCaptor => {

      val tableName = "someTable" + System.currentTimeMillis()

      testData(spark).writeToJDBC(connectionString, tableName, mode = SaveMode.Overwrite)

      val producedWrites = lineageCaptor.lineage.operations.filter(_.isInstanceOf[Write]).map(_.asInstanceOf[Write])
      producedWrites.size shouldBe 1
      val write = producedWrites.head

      write.path shouldBe "jdbc://" + connectionString + ":" + tableName
      write.append shouldBe false
    }}
  )
}


