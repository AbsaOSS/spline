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

import org.apache.commons.configuration.SystemConfiguration
import org.apache.commons.lang.StringUtils.isNotBlank

/**
  * The trait holds details important for making connection to Kafka
  */
trait KafkaProperties
{
  private val configuration = new SystemConfiguration

  private def getRequiredString(key: String): String = {
    val value = configuration.getString(key)
    require(isNotBlank(value), s"Missing configuration property $key in JVM parameters.")
    value
  }

  /**
    * The list of servers forming the kafka cluster
    */
  val kafkaServers = getRequiredString("kafka.servers")

  /**
    * The name of a topic
    */
  val kafkaTopic = getRequiredString("kafka.topic")
}
