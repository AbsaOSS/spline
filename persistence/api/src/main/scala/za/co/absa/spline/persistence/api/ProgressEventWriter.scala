package za.co.absa.spline.persistence.api

import za.co.absa.spline.model.streaming.ProgressEvent

import scala.concurrent.{ExecutionContext, Future}

/**
  * The trait represents a writer to a persistence layer for the [[za.co.absa.spline.model.streaming.ProgressEvent ProgressEvent]] entity.
  */
trait ProgressEventWriter extends AutoCloseable {

  /**
    * The method stores a particular progress event to the persistence layer.
    *
    * @param event A progress event that will be stored
    */
  def store(event: ProgressEvent)(implicit ec: ExecutionContext) : Future[Unit]
}