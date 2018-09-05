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
import org.apache.spark.sql.types._
import za.co.absa.spline.sample.{KafkaProperties, SparkApp}

object KafkaMeteoDataReader extends SparkApp("KafkaMeteoDataReader") with KafkaProperties {

  override def kafkaTopic: String = throw new NotImplementedError("Kafka topic is not supported in this context.")

  val inputTopic: String = getRequiredString("kafka.topic.input")

  val outputTopic: String = getRequiredString("kafka.topic.output")

  val sourceDF = spark
    .readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", kafkaServers)
    .option("subscribe", inputTopic)
    .option("startingOffsets", "latest")
    .load()

  val schema = StructType(Seq(
    StructField("name", StringType, false),
    StructField("t", StringType, false),
    StructField("lon", DoubleType, false),
    StructField("lat", DoubleType, false),
    StructField("temp", DoubleType, false),
    StructField("pres", DoubleType, false),
    StructField("hum", DoubleType, false)))

  val resultDF = sourceDF
    .select(from_json('value.cast(StringType), schema) as "data")
    .select($"data.*")
    .select(struct(
      't as "time",
      struct('lon as "longitude", 'lat as "latitude") as "coordinates",
      'temp as "temperature",
      'pres as "pressure",
      'hum as "humidity") as "data")
    .select(to_json('data) as "value")

  resultDF
    .writeStream
    .format("kafka")
    .option("kafka.bootstrap.servers", kafkaServers)
    .option("checkpointLocation", "data/checkpoints/streamingWithDependencies/kafka")
    .option("topic", outputTopic)
    .start()
    .awaitTermination()
}
