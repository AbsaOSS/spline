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

package za.co.absa.spline.sample

import org.apache.commons.configuration.{CompositeConfiguration, PropertiesConfiguration, SystemConfiguration}
import org.apache.commons.lang.StringUtils.isNotBlank

import scala.collection.JavaConverters._

/**
  * The trait holds details important for making connection to Kafka
  */
trait KafkaProperties
{

  val propConf = new PropertiesConfiguration("spline.properties")
  private val configuration = new CompositeConfiguration(Seq(new SystemConfiguration, propConf).asJavaCollection)

  import scala.collection.JavaConverters._

  protected def getRequiredString(key: String): String = {
    // Comma delimited values are parsed as List and method getString returns only first value.
    val value = configuration.getList(key).asScala.mkString(",")
    require(isNotBlank(value), s"Missing configuration property $key in JVM parameters.")
    value
  }

  /**
    * The list of servers forming the kafka cluster
    */
  def kafkaServers = getRequiredString("harvester.kafka.servers")

  /**
    * The name of a topic
    */
  def kafkaTopic = getRequiredString("kafka.topic")
}
