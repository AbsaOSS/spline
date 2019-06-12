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

package za.co.absa.spline.sample.batch

import org.apache.spark.sql.{Row, SaveMode}
import org.apache.spark.sql.types.{IntegerType, StringType, StructField, StructType}
import za.co.absa.spline.harvester.SparkLineageInitializer._
import za.co.absa.spline.sample.SparkApp

/** Sample job with in memory input. Should be easy to run. */
object SampleJob4 extends SparkApp("Sample Job 4") {

  // Initializing library to hook up to Apache Spark
  spark.enableLineageTracking()

  val schema = StructType(StructField("ID", IntegerType, nullable = false) :: StructField("NAME", StringType, nullable = false) :: Nil)
  val rdd = spark.sparkContext.parallelize(Row(1014, "Warsaw") :: Row(1002, "Corte") :: Nil)
  val sourceDS =spark.sqlContext.createDataFrame(rdd, schema)

  sourceDS.write.mode(SaveMode.Overwrite).parquet("sample/data/results/batch/job1_results")
}
