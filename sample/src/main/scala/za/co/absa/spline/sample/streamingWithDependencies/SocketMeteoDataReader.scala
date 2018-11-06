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

import java.util.UUID

import org.apache.spark.sql.functions.{from_json, struct, to_json}
import org.apache.spark.sql.types.{DoubleType, StringType, StructField, StructType}
import za.co.absa.spline.sample.streamingWithDependencies.dataGeneration.SocketMeteoStationConstants
import za.co.absa.spline.sample.{KafkaProperties, SparkApp}

object SocketMeteoDataReader  extends SparkApp("SocketMeteoDataReader") with KafkaProperties{

  import za.co.absa.spline.harvester.SparkLineageInitializer._
  spark.enableLineageTracking()

  val schema = StructType(Seq(
    StructField("Name", StringType, false),
    StructField("Time", StringType, false),
    StructField("Longitude", DoubleType, false),
    StructField("Latitude", DoubleType, false),
    StructField("Temperature", DoubleType, false),
    StructField("Pressure", DoubleType, false),
    StructField("Humidity", DoubleType, false)))

  val sourceDF = spark.readStream
    .format("socket")
    .option("host", "localhost")
    .option("port", SocketMeteoStationConstants.outputPort)
    .load()

  val resultDF = sourceDF
    .select(from_json('value, schema) as "data")
    .select($"data.*")
    .select(struct(
      'Name as "id",
      'Time as "time",
      struct('Longitude as "longitude", 'Longitude as "latitude") as "coordinates",
      'Temperature as "temperature",
      'Pressure as "pressure",
      'Humidity as "humidity") as "data")
    .select(to_json('data) as "value")

  resultDF
    .writeStream
    .format("kafka")
    .option("kafka.bootstrap.servers", kafkaServers)
    .option("checkpointLocation", s"data/checkpoints/streamingWithDependencies/socket/${UUID.randomUUID}")
    .option("topic", SocketMeteoDataReaderConstants.outputTopic)
    .start()
    .awaitTermination()
}

object SocketMeteoDataReaderConstants {
  val outputTopic = "temperature.prague.libus"
}
