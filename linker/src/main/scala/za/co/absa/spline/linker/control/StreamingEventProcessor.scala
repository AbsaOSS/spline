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

package za.co.absa.spline.linker.control

import org.apache.commons.configuration.Configuration
import org.apache.spark.sql.{Dataset, SparkSession}
import org.apache.spark.sql.streaming.StreamingQuery
import za.co.absa.spline.linker.boundary.EventPersistenceSink
import za.co.absa.spline.linker.control.ConfigMapConverter.toConfigMap

import za.co.absa.spline.model.streaming.ProgressEvent
import za.co.absa.spline.persistence.api.Logging

import scala.concurrent.ExecutionContext

class StreamingEventProcessor
(
  reader: Dataset[ProgressEvent],
  configuration: Configuration,
  sparkSession: SparkSession
)(implicit executionContext: ExecutionContext) extends AutoCloseable with Logging {

  private var openedStream: StreamingQuery = _

  def start(): StreamingEventProcessor = {
    val configMap = toConfigMap(configuration)
    openedStream = reader
      .writeStream
      .foreach(new EventPersistenceSink(configMap))
      .start()
    this
  }

  override def close(): Unit = {
    if (openedStream.isActive) {
      stop()
    }
  }

  def stop(): Unit = {
    openedStream.stop()
  }
}
