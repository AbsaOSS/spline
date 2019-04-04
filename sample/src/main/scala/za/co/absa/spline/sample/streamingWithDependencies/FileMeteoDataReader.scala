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

package za.co.absa.spline.sample.streamingWithDependencies

import org.apache.spark.sql.functions._
import org.apache.spark.sql.types.{DoubleType, StringType, StructField, StructType}
import za.co.absa.spline.sample.streamingWithDependencies.dataGeneration.FileMeteoStationConstants
import za.co.absa.spline.sample.{KafkaProperties, SparkApp}

object FileMeteoDataReader extends SparkApp("FileMeteoDataReader") with KafkaProperties{

  import za.co.absa.spline.harvester.SparkLineageInitializer._
  spark.enableLineageTracking()

  val schema = StructType(Seq(
    StructField("ID", StringType, false),
    StructField("TIME", StringType, false),
    StructField("LONG", DoubleType, false),
    StructField("LAT", DoubleType, false),
    StructField("TEMPERATURE", DoubleType, false),
    StructField("PRESSURE", DoubleType, false),
    StructField("HUMIDITY", DoubleType, false)))

  val sourceDF = spark
    .readStream
    .option("header", "true")
    .schema(schema)
    .csv(FileMeteoStationConstants.outputPath)

  val resultDF = sourceDF
    .select(struct(
      'ID as "id",
      'TIME as "time",
      struct('LONG as "longitude", 'LAT as "latitude") as "coordinates",
      'TEMPERATURE as "temperature",
      'PRESSURE as "pressure",
      'HUMIDITY as "humidity") as "data")
    .select(to_json('data) as "value")

  resultDF
    .writeStream
    .format("kafka")
    .option("kafka.bootstrap.servers", kafkaServers)
    .option("checkpointLocation", "sample/data/checkpoints/streamingWithDependencies/file")
    .option("topic", FileMeteoDataReaderConstants.outputTopic)
    .start()
    .awaitTermination()
}

object FileMeteoDataReaderConstants {
  val outputTopic = "temperature.prague.kbely"
}
