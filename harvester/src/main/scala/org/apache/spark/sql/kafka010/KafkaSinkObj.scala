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

package org.apache.spark.sql.kafka010

import org.apache.spark.sql.execution.streaming.{BaseStreamingSource, Sink}
import za.co.absa.spline.common.InstanceInspector

/**
  * The object represents a value extractor for [[org.apache.spark.sql.kafka010.KafkaSink KafkaSink]].
  */
object KafkaSinkObj {

  /**
    * The method extracts internal properties from [[org.apache.spark.sql.kafka010.KafkaSink KafkaSink]].
    * @param sink The subject of property extraction
    * @return An option of a tuple comprising from a list of servers and optional topic name.
    */
  def unapply(sink: Sink): Option[(Seq[String], Option[String])] = sink match {
    case x: KafkaSink =>
      Some(
        (
          InstanceInspector.getFieldValue[java.util.Map[String, Object]](x, "executorKafkaParams")
            .getOrDefault("bootstrap.servers",",")
            .asInstanceOf[String]
            .split(','),
          InstanceInspector.getFieldValue[Option[String]](x, "topic")
        )
      )
    case _ => None
  }
}


object KafkaSourceObj {

  def unapply(baseStreamingSource: BaseStreamingSource): Option[(Seq[String], String)] = baseStreamingSource match {
    case x: KafkaSource =>
      Some(
        (
          InstanceInspector.getFieldValue[java.util.Map[String, Object]](x, "executorKafkaParams")
            .getOrDefault("bootstrap.servers",",")
            .asInstanceOf[String]
            .split(','),
          InstanceInspector.getFieldValue[Option[String]](x, "topic").get
        )
      )
    case _ => None
  }
}
