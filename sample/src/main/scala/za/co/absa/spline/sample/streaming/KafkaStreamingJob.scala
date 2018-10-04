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

package za.co.absa.spline.sample.streaming

import za.co.absa.spline.sample.{KafkaProperties, SparkApp}

object KafkaStreamingJob extends SparkApp("Kafka Streaming Job") with KafkaProperties {

  // Initializing library to hook up to Apache Spark
  import za.co.absa.spline.core.SparkLineageInitializer._
  spark.enableLineageTracking()

  // reading file
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
    .select($"page_title" as "value")

  // writting data to kafka topic
  sourceDS
    .writeStream
    .format("kafka")
    .option("kafka.bootstrap.servers", kafkaServers)
    .option("topic", kafkaTopic)
    .option("checkpointLocation", "data/kafkaCheckpoint")
    .start()
    .processAllAvailable()

  // reading data from kafka topic
  val df = spark
    .readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", kafkaServers)
    .option("subscribe", kafkaTopic)
    .option("startingOffsets", "earliest")
    .load()


  val sink = df
    .writeStream
    .format("console")
    .start()
    .processAllAvailable()

}
