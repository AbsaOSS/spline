package za.co.absa.spline.harvester.conf

import java.util.concurrent.TimeUnit

import org.apache.commons.configuration.Configuration
import org.apache.kafka.clients.producer.{KafkaProducer, ProducerRecord}
import org.apache.kafka.common.record.CompressionType
import org.apache.kafka.common.serialization.StringSerializer
import org.apache.spark.sql.SparkSession
import za.co.absa.spline.harvester.conversion.KafkaJavaSerializer
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.model.streaming.ProgressEvent

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

object LineageDispatcher {

  val kafkaServersProperty = "harvester.kafka.servers"
  val sendTimeoutProperty = "harvester.kafka.sendTimeout"
  val lineagesTopicProperty = "harvester.topic.lineages"
  val eventsTopicProperty = "harvester.topic.events"
  val defaultLineagesTopic = "lineages"
  val defaultEventsTopic = "events"
  val defaultSendTimeout = 60
}

class LineageDispatcher(sparkSession: SparkSession, configuration: Configuration) {
  import LineageDispatcher._
  import org.apache.kafka.clients.producer.ProducerConfig._
  import za.co.absa.spline.common.ConfigurationImplicits._

  import collection.JavaConverters._
  import za.co.absa.spline.common.WithResources._

  private val lineagesTopic = configuration.getString(lineagesTopicProperty, defaultLineagesTopic)
  private val eventsTopic = configuration.getString(eventsTopicProperty, defaultEventsTopic)
  private val config = Map[String, Object](
    BOOTSTRAP_SERVERS_CONFIG -> configuration.getRequiredString(kafkaServersProperty),
    COMPRESSION_TYPE_CONFIG -> CompressionType.GZIP.name)
    .asJava
  private val appName = sparkSession.conf.get("spark.app.name")
  private val sendTimeout = configuration.getInt(sendTimeoutProperty, defaultSendTimeout)

  private def createProducerForLineages(): KafkaProducer[String, DataLineage] = {
    new KafkaProducer[String, DataLineage](config, new StringSerializer(), new KafkaJavaSerializer[DataLineage]())
  }

  private def createProducerForEvents(): KafkaProducer[String, ProgressEvent] = {
    new KafkaProducer[String, ProgressEvent](config, new StringSerializer(), new KafkaJavaSerializer[ProgressEvent]())
  }

  def send(dataLineage: DataLineage): Unit = {
    val record = new ProducerRecord[String, DataLineage](lineagesTopic, appName, dataLineage)
    withResources(createProducerForLineages())(producer => {
      producer.send(record)
      // Awaits message sent and then closes.
      producer.close(sendTimeout, TimeUnit.SECONDS)
    })
  }

  def send(event: ProgressEvent): Unit = {
    val record = new ProducerRecord[String, ProgressEvent](eventsTopic, appName, event)
    withResources(createProducerForEvents())(producer => {
      producer.send(record)
      // Awaits message sent and then closes.
      producer.close(sendTimeout, TimeUnit.SECONDS)
    })
  }
}
