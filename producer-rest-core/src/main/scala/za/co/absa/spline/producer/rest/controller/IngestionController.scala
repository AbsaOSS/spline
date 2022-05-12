/*
 * Copyright 2020 ABSA Group Limited
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

package za.co.absa.spline.producer.rest.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import za.co.absa.spline.producer.modelmapper.ModelMapper
import za.co.absa.spline.producer.rest.controller.handler.{HandlerV10, HandlerV11, HandlerV12}
import za.co.absa.spline.producer.service.InconsistentEntityException
import za.co.absa.spline.producer.service.repo.ExecutionProducerRepository

import java.util.UUID
import scala.concurrent.{ExecutionContext, Future}
import scala.util.control.NonFatal

@Controller
class IngestionController @Autowired()(val repo: ExecutionProducerRepository)
  extends HandlerV10
    with HandlerV11
    with HandlerV12 {

  protected implicit val executionContext: ExecutionContext = ExecutionContext.global

  protected def processPlan[A](planDTO: A, mapper: ModelMapper[A, _]): Future[UUID] = {
    val plan = withErrorHandling {
      mapper.fromDTO(planDTO)
    }
    repo
      .insertExecutionPlan(plan)
      .map(_ => plan.id)
  }

  protected def processEvents[A](eventDTOs: Array[A], mapper: ModelMapper[_, A]): Future[Unit] = {
    val events = withErrorHandling {
      eventDTOs.map(mapper.fromDTO)
    }
    Future.traverse(events.toSeq)(repo.insertExecutionEvent).map(_ => ())
  }

  private def withErrorHandling[A](body: => A): A = {
    try {
      body
    } catch {
      case NonFatal(e) => throw new InconsistentEntityException(e.getMessage)
    }
  }
}
