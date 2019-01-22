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
