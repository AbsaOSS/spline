package za.co.absa.spline.persistence.mongo

import com.mongodb.DuplicateKeyException
import org.slf4s.Logging
import za.co.absa.spline.model.streaming.ProgressEvent
import za.co.absa.spline.persistence.api.ProgressEventWriter
import za.co.absa.spline.persistence.mongo.DBSchemaVersionHelper.serializeWithVersion
import za.co.absa.spline.persistence.mongo.MongoWriterFields._

import scala.concurrent.{ExecutionContext, Future, blocking}

/**
  * The class represents Mongo persistence writer for the [[za.co.absa.spline.model.streaming.ProgressEvent ProgressEvent]] entity.
  *
  * @param connection A connection to Mongo database
  */
class MongoProgressEventWriter(connection: MongoConnection) extends ProgressEventWriter with AutoCloseable with Logging {

  /**
    * The method stores a particular progress event to the persistence layer.
    *
    * @param event A progress event that will be stored
    */
  override def store(event: ProgressEvent)(implicit ec: ExecutionContext): Future[Unit] = Future {
    val dbo = serializeWithVersion[ProgressEvent](event)
    dbo.put(idField, event.id)
    try {
      blocking(connection.eventsCollection.insert(dbo))
    } catch {
      case e: DuplicateKeyException => log.warn("Duplicate key ignored to tolarate potential duplicate insert to MongoDB.", e)
      case e: Throwable => throw e
    }
  }

  /**
    * The method releases resources used by the writer
    */
  override def close(): Unit = connection.close()
}
