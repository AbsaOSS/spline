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

import akka.actor.{Actor, ActorLogging}
import akka.pattern.pipe
import za.co.absa.spline.harvester.json.HarvesterJsonSerDe._
import za.co.absa.spline.migrator.Spline04Actor._
import za.co.absa.spline.migrator.rest.RestClient
import za.co.absa.spline.producer.model.{ExecutionEvent, ExecutionPlan}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.util.control.NonFatal

object Spline04Actor {

  trait RequestMessage

  case class Save(plan: ExecutionPlan, maybeEvent: Option[ExecutionEvent]) extends RequestMessage


  trait ResponseMessage

  case class SaveSuccess(dsId: UUID) extends ResponseMessage

  case class SaveFailure(dsId: UUID, e: Throwable) extends ResponseMessage

}

class Spline04Actor(restClient: RestClient) extends Actor with ActorLogging {

  private val executionPlansEndpoint = restClient.createEndpoint(RESTResource.ExecutionPlans)
  private val executionEventsEndpoint = restClient.createEndpoint(RESTResource.ExecutionEvents)

  override def receive: Receive = {
    case Save(plan, maybeEvent) =>

      val eventualSave: Future[Unit] =
        for {
          savedPlanId <- save(plan)
          maybeUpdatedEvent = maybeEvent.map(_.copy(planId = savedPlanId))
          saveComplete <- maybeUpdatedEvent.map(save).getOrElse(Future.successful({}))
        } yield saveComplete

      eventualSave
        .map(_ => SaveSuccess(plan.id))
        .recover({ case NonFatal(e) => SaveFailure(plan.id, e) })
        .pipeTo(sender)
  }

  private def save(plan: ExecutionPlan): Future[UUID] =
    executionPlansEndpoint
      .post(plan.toJson)
      .map(idAsJson => UUID.fromString(idAsJson.fromJson[String]))

  private def save(event: ExecutionEvent): Future[Unit] =
    executionEventsEndpoint
      .post(Seq(event).toJson)
      .map(_ => Unit)

}
