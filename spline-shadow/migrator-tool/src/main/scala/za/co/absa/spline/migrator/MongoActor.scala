package za.co.absa.spline.migrator

import akka.actor.{Actor, ActorLogging, ActorRef, Status}
import akka.pattern.pipe
import org.apache.commons.configuration.BaseConfiguration
import za.co.absa.spline.common.ARM.managed
import za.co.absa.spline.model.PersistedDatasetDescriptor
import za.co.absa.spline.persistence.api.CloseableIterable
import za.co.absa.spline.persistence.api.DataLineageReader.PageRequest
import za.co.absa.spline.persistence.mongo.MongoPersistenceFactory
import za.co.absa.spline.migrator.MongoActor._

import scala.concurrent.ExecutionContext

object MongoActor {

  trait RequestMessage

  case class GetLineages(page: PageRequest) extends RequestMessage


  trait ResponseMessage

  case class PageSize(count: Int) extends ResponseMessage


  private trait InternalMessage

  private case class PostTo(message: Any, receiver: ActorRef) extends InternalMessage

}

class MongoActor(connectionUrl: String) extends Actor with ActorLogging {
  implicit val ec: ExecutionContext = context.dispatcher

  private val mongoReader =
    new MongoPersistenceFactory(
      new BaseConfiguration {
        addProperty(MongoPersistenceFactory.mongoDbUrlKey, connectionUrl)
      }).
      createDataLineageReader.
      get

  override def receive: Receive = {
    case GetLineages(page) =>
      val pageProcessor = pipePageTo(sender) _
      mongoReader.
        findDatasets(None, page).
        map(managed(pageProcessor)).
        pipeTo(self)

    case PostTo(message, receiver) =>
      receiver ! message

    case Status.Failure(e) => throw e
  }

  private def pipePageTo(recipient: ActorRef)(cursor: CloseableIterable[PersistedDatasetDescriptor]): PostTo = {
    val count =
      (0 /: cursor.iterator) {
        case (i, descriptor) =>
          mongoReader.
            loadByDatasetId(descriptor.datasetId, overviewOnly = false).
            map(shouldBeLineage => PostTo(shouldBeLineage.get, recipient)).
            pipeTo(self)
          i + 1
      }
    PostTo(PageSize(count), recipient)
  }
}
