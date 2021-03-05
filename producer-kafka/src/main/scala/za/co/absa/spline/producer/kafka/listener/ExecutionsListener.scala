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

package za.co.absa.spline.producer.kafka.listener

import org.slf4s.Logging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.kafka.annotation.{KafkaHandler, KafkaListener}
import org.springframework.kafka.support.{Acknowledgment, KafkaHeaders}
import org.springframework.messaging.handler.annotation.Header
import org.springframework.stereotype.Component
import za.co.absa.spline.producer.kafka.ProducerKafkaConfig
import za.co.absa.spline.producer.model.v1_1.{ExecutionEvent, ExecutionPlan}
import za.co.absa.spline.producer.service.repo.ExecutionProducerRepository

import scala.concurrent.{Await, ExecutionContext}
import scala.util.control.NonFatal

@Component
@KafkaListener(topics = Array("${spline.kafka.topic}"))
class ExecutionsListener @Autowired()(val repo: ExecutionProducerRepository) extends Logging {

  import ExecutionContext.Implicits.global

  @KafkaHandler
  def listenExecutionPlan(
    plan: ExecutionPlan,
    ack: Acknowledgment,
    @Header(KafkaHeaders.OFFSET) offset: Long,
    @Header(KafkaHeaders.RECEIVED_TOPIC) topic: String,
  ): Unit = {
    try {
      Await.result(repo.insertExecutionPlan(plan), ProducerKafkaConfig.planTimeout)
      ack.acknowledge()
    } catch {
      case NonFatal(e) => log.error(
        s"Error while inserting execution plan id:${plan.id} from topic:$topic on offset:$offset", e)
    }
  }

  @KafkaHandler
  def listenExecutionEvent(
    event: ExecutionEvent,
    ack: Acknowledgment,
    @Header(KafkaHeaders.OFFSET) offset: Long,
    @Header(KafkaHeaders.RECEIVED_TOPIC) topic: String,
  ): Unit = {
    try {
      Await.result(repo.insertExecutionEvents(Array(event)), ProducerKafkaConfig.eventTimeout)
      ack.acknowledge()
    } catch {
      case NonFatal(e) => log.error(
        s"Error while inserting execution event for planId:${event.planId} and timestamp: ${event.timestamp} " +
          s"from topic:$topic on offset:$offset", e)
    }
  }
}
