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

import org.apache.spark.sql.SaveMode
import org.apache.spark.sql.functions._
import org.scalatest.Inside._
import org.scalatest._
import za.co.absa.spline.test.fixture.spline.SplineFixture
import za.co.absa.spline.producer.rest.model.WriteOperation
import za.co.absa.spline.test.fixture.SparkFixture


/** Contains smoke tests for basic operations. */
class InsertIntoTest extends FlatSpec with Matchers with SparkFixture with SplineFixture {

  "InsertInto" should "not fail when inserting to partitioned table" in
    withNewSparkSession(spark =>
      withLineageTracking(spark)(lineageCaptor => {

        spark.sql("CREATE TABLE path_archive (x String, ymd int) USING parquet PARTITIONED BY (ymd)")
        spark.sql("INSERT INTO path_archive VALUES ('Tata', 20190401)")
        spark.sql("INSERT INTO path_archive VALUES ('Tere', 20190403)")

        spark.sql("CREATE TABLE path (x String) USING parquet")
        spark.sql("INSERT INTO path VALUES ('Monika')")
        spark.sql("INSERT INTO path VALUES ('Buba')")

        val df = spark
          .table("path")
          .withColumn("ymd", lit(20190401))

        val operation = lineageCaptor
          .capture(df.write.mode(SaveMode.Overwrite).insertInto("path_archive"))
          .plan
          .operations
          .write

        inside(operation) {
          case write: WriteOperation =>
            write.outputSource should include("path_archive")
            write.append should be(false)
        }
      })
    )
}
