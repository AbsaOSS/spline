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
