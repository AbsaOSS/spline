/*
 * Copyright 2021 ABSA Group Limited
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

package za.co.absa.spline.gateway.kafka.listener

import org.slf4s.Logging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Component
import za.co.absa.commons.annotation.Unstable
import za.co.absa.spline.gateway.kafka.KafkaGatewayConfig
import za.co.absa.spline.gateway.kafka.listener.handler.{HandlerV11, HandlerV12}
import za.co.absa.spline.producer.modelmapper.ModelMapper
import za.co.absa.spline.producer.service.repo.ExecutionProducerRepository

import scala.beans.BeanProperty
import scala.concurrent.{Await, ExecutionContext}

@Unstable
@Component
@KafkaListener(topics = Array("#{__listener.topic}"))
class IngestionListener @Autowired()(val repo: ExecutionProducerRepository)
  extends Logging
    with HandlerV11
    with HandlerV12 {

  protected implicit val executionContext: ExecutionContext = ExecutionContext.global

  @BeanProperty
  val topic: String = KafkaGatewayConfig.Kafka.Topic

  protected def processPlan[A](planId: Any, planDTO: A, offset: Long, mapper: ModelMapper[A, _]): Unit = {
    log.trace(s"Processing execution plan id:$planId from topic:$topic on offset:$offset")
    val plan = mapper.fromDTO(planDTO)
    Await.result(repo.insertExecutionPlan(plan), KafkaGatewayConfig.Kafka.PlanTimeout)
  }

  protected def processEvent[A](planId: Any, eventDTO: A, timestamp: Long, offset: Long, mapper: ModelMapper[_, A]): Unit = {
    log.trace(s"Processing execution event for planId:$planId and timestamp:$timestamp from topic:$topic on offset:$offset")
    val event = mapper.fromDTO(eventDTO)
    Await.result(repo.insertExecutionEvent(event), KafkaGatewayConfig.Kafka.EventTimeout)
  }
}
