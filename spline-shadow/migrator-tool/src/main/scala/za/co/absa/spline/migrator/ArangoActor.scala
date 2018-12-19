package za.co.absa.spline.migrator

import java.util.UUID

import akka.actor.Actor
import akka.pattern.pipe
import za.co.absa.spline.migrator.ArangoActor._
import za.co.absa.spline.model.DataLineage

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.util.{Failure, Success, Try}

object ArangoActor {

  trait RequestMessage

  case class LineagePersistRequest(lineage: DataLineage) extends RequestMessage


  trait ResponseMessage

  abstract class LineagePersistResponse(val result: Try[Unit]) extends ResponseMessage

  case object LineagePersistSuccess extends LineagePersistResponse(Success({}))

  case class LineagePersistFailure(dsId: UUID, e: RuntimeException)
    extends LineagePersistResponse(Failure(new LineagePersistException(dsId, e)))

  class LineagePersistException(val dsId: UUID, e: RuntimeException)
    extends Exception(s"Failed to save lineage: $dsId", e)

}

class ArangoActor(connectionUrl: String) extends Actor {
  override def receive: Receive = {
    case LineagePersistRequest(lineage) =>
      save(lineage).
        map(_ => LineagePersistSuccess).
        recover({
          case e: RuntimeException => LineagePersistFailure(lineage.rootDataset.id, e)
        }).
        pipeTo(sender)
  }

  private def save(lineage: DataLineage): Future[Unit] = Future {
    println("Save lineage: " + lineage.id)
    // TODO: save it
  }
}
