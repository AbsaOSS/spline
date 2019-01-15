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

import java.util.UUID

import akka.actor.Actor
import akka.pattern.pipe
import za.co.absa.spline.migrator.ArangoActor._
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.Persister

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

  val persister = new Persister(connectionUrl)

  override def receive: Receive = {
    case LineagePersistRequest(lineage) =>
      save(lineage).
        map(_ => LineagePersistSuccess).
        recover({
          case e: RuntimeException => LineagePersistFailure(lineage.rootDataset.id, e)
        }).
        pipeTo(sender)
  }

  private def save(lineage: DataLineage): Future[Unit] = {
    println("Save lineage: " + lineage.id)
    persister.save(lineage)
  }
}
