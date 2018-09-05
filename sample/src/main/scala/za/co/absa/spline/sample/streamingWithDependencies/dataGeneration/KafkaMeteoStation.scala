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

package za.co.absa.spline.sample.streamingWithDependencies.dataGeneration

import java.time.LocalDateTime
import java.util.Properties

import org.apache.kafka.clients.producer.{KafkaProducer, ProducerRecord}
import org.apache.kafka.common.serialization.StringSerializer
import za.co.absa.spline.sample.KafkaProperties
import org.json4s.native.Json
import org.json4s.DefaultFormats

object KafkaMeteoStation extends App with MeteoDataGenerator with KafkaProperties with Timer {

  override def name = "name" -> "Prague-Karlov"

  override def coordinates = ("lon" -> 14.4276, "lat" -> 50.0691)

  override def temperatureDetails = MetricDetails("temp", 25, 5, 0.2)

  override def pressureDetails = MetricDetails("pres", 1010, 0, 5)

  override def humidityDetails = MetricDetails("hum", 70.5, 0, 1.5)

  override def timeMetricName = "t"

  override def doJob(){
    val data = getCurrentData()
    val json = Json(DefaultFormats).write(data)
    val kafkaRecord = new ProducerRecord[String, String](kafkaTopic, json)
    println("Writing a message with payload:")
    println(json)
    kafkaProducer.send(kafkaRecord)
  }

  override protected def cleanup: Unit = kafkaProducer.close()

  val props = new Properties()
  props.put("bootstrap.servers", kafkaServers)
  props.put("key.serializer", classOf[StringSerializer])
  props.put("value.serializer", classOf[StringSerializer])

  val kafkaProducer = new KafkaProducer[String, String](props)

  run
}
