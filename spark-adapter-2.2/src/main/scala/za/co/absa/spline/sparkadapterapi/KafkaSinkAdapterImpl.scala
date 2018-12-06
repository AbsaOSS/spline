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

package za.co.absa.spline.sparkadapterapi
import za.co.absa.spline.common.ReflectionUtils
import java.{util => ju}

import org.apache.spark.sql.execution.streaming.StreamExecution

import scala.collection.JavaConverters._

class KafkaSinkAdapterImpl extends KafkaSinkAdapter {
  override def extractKafkaInfo(streamExecution: StreamExecution): Option[KafkaSinkInfo] = {
    streamExecution.sink match {
      case x if x.getClass.getCanonicalName == "org.apache.spark.sql.kafka010.KafkaSink" =>
        val params = ReflectionUtils.getFieldValue[ju.Map[String, String]](x, "executorKafkaParams").asScala
        val topics = ReflectionUtils.getFieldValue[Option[String]](x, "topic").get.split(",").toList
        val bootstrapServers = params("bootstrap.servers").split("[\t ]*,[\t ]*")
        Some(KafkaSinkInfo(topics, bootstrapServers))
      case _ => None
    }
  }
}