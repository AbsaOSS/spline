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

package za.co.absa.spline.linker.control

import org.apache.commons.configuration.Configuration
import org.apache.spark.sql._
import org.apache.spark.sql.streaming.StreamingQuery
import za.co.absa.spline.linker.boundary.AnalyticsPersistenceSink
import za.co.absa.spline.linker.control.ConfigMapConverter._
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api._

import scala.concurrent.ExecutionContext
import scala.language.postfixOps

class SparkLineageProcessor
(
  harvestReader: Dataset[DataLineage],
  configuration: Configuration,
  sparkSession: SparkSession
)(implicit executionContext: ExecutionContext) extends AutoCloseable with Logging {

  private var openedStream: StreamingQuery = _

  import za.co.absa.spline.linker.boundary.HarvestReader.LineageEncoder

  def start(): SparkLineageProcessor = {
    val configMap = toConfigMap(configuration)
    openedStream = harvestReader
      .map(LineageProjectionMerger.apply)
      .map(new LinkerTask(configMap).call)
      .writeStream
      .foreach(new AnalyticsPersistenceSink(configMap))
      .start()
    this
  }

  def awaitTermination(): Unit = openedStream.awaitTermination()

  override def close(): Unit = {
    if (openedStream.isActive) {
      stop()
    }
  }

  def stop(): Unit = {
    openedStream.stop()
  }
}

