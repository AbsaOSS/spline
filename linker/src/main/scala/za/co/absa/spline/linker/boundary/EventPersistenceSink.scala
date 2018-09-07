package za.co.absa.spline.linker.boundary

import org.apache.spark.sql.ForeachWriter
import za.co.absa.spline.model.streaming.ProgressEvent
import za.co.absa.spline.persistence.api.{Logging, PersistenceFactory, ProgressEventWriter}

import scala.concurrent.{Await, ExecutionContext}

class EventPersistenceSink(configMap: Map[String, Object]) extends ForeachWriter[ProgressEvent] with Logging {

  private implicit lazy val executionContext: ExecutionContext = ExecutionContext.global
  private var eventWriter: ProgressEventWriter = _

  override def process(event: ProgressEvent): Unit = {
    log debug s"Processing a progress event: '$event'"
    import scala.concurrent.duration.DurationInt
    Await.result(eventWriter.store(event), 10 minutes)
  }

  def close(errorOrNull: Throwable): Unit = eventWriter.close

  def open(partitionId: Long, version: Long): Boolean = {
    import za.co.absa.spline.linker.control.ConfigMapConverter._
    val configuration = toConfiguration(configMap)
    eventWriter = PersistenceFactory
      .create(configuration)
      .createProgressEventWriter
    true
  }
}