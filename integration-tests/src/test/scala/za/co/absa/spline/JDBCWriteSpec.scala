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

import java.util.Properties

import org.apache.spark.sql.SaveMode.Overwrite
import org.apache.spark.sql.types.{IntegerType, StringType, StructField, StructType}
import org.apache.spark.sql.{DataFrame, Row}
import org.scalatest._
import za.co.absa.spline.test.fixture.spline.SplineFixture
import za.co.absa.spline.test.fixture.{JDBCFixture, SparkFixture}


class JDBCWriteSpec extends FlatSpec
  with Matchers
  with SparkFixture
  with SplineFixture
  with JDBCFixture {

  val tableName = "testTable"

  it should "support JDBC as a source" in
    withNewSparkSession(spark => {
      withLineageTracking(spark)(lineageCaptor => {
        val tableName = s"someTable${System.currentTimeMillis()}"

        val testData: DataFrame = {
          val schema = StructType(StructField("ID", IntegerType, nullable = false) :: StructField("NAME", StringType, nullable = false) :: Nil)
          val rdd = spark.sparkContext.parallelize(Row(1014, "Warsaw") :: Row(1002, "Corte") :: Nil)
          spark.sqlContext.createDataFrame(rdd, schema)
        }

        val (plan1, _) = lineageCaptor.lineageOf(testData
          .write.jdbc(jdbcConnectionString, tableName, new Properties))

        val (plan2, _) = lineageCaptor.lineageOf(spark
          .read.jdbc(jdbcConnectionString, tableName, new Properties)
          .write.mode(Overwrite).saveAsTable("somewhere")
        )

        plan1.operations.write.append shouldBe false
        plan1.operations.write.params("destinationType") shouldBe Some("jdbc")
        plan1.operations.write.outputSource shouldBe s"$jdbcConnectionString:$tableName"

        plan2.operations.reads.head.inputSources.head shouldBe plan1.operations.write.outputSource
        plan2.operations.reads.head.params("sourceType") shouldBe Some("jdbc")
      })
    })
}


