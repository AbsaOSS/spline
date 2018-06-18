/*
 * Copyright 2017 Barclays Africa Group Limited
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

package za.co.absa.spline.sample.streaming

import za.co.absa.spline.sample.SparkApp

object FileStreamingJob extends SparkApp("File Streaming Job"){

  // Initializing library to hook up to Apache Spark
  import za.co.absa.spline.harvester.SparkLineageInitializer._
  spark.enableLineageTracking()

  // A business logic of a spark job ...
  import spark.implicits._

  val schemaImp = spark.read
    .format("csv")
    .option("header", true)
    .option("inferSchema", true)
    .load("data/input/streaming")
    .schema

  val sourceDS = spark.readStream
    .option("header", "true")
    .schema(schemaImp)
    .csv("data/input/streaming")
    .as("source")
    .filter($"total_response_size" > 1000)
    .filter($"count_views" > 10)
    .select($"page_title" as "value")

  val sink = sourceDS
    .writeStream
    .format("parquet")
    .option("checkpointLocation", "data/fileCheckpoint")
    .option("path", "data/results/streaming/wikidataResult")

  sourceDS
    .writeStream
    .format("console")
    .start()

  val q = sink.start()

  q.awaitTermination()
}
