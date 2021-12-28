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

package za.co.absa.spline.gateway.kafka.listener.handler

import org.springframework.kafka.annotation.KafkaHandler
import org.springframework.kafka.support.KafkaHeaders
import org.springframework.messaging.handler.annotation.Header
import za.co.absa.spline.gateway.kafka.listener.IngestionListener
import za.co.absa.spline.producer.model.v1_1
import za.co.absa.spline.producer.modelmapper.v1_1.ModelMapperV11

@KafkaHandler
trait HandlerV11 {
  this: IngestionListener =>

  private final val mapper = ModelMapperV11

  @KafkaHandler
  def planHandler(
    planDTO: v1_1.ExecutionPlan,
    @Header(KafkaHeaders.OFFSET) offset: Long,
  ): Unit = processPlan(planDTO.id, planDTO, offset, mapper)

  @KafkaHandler
  def eventHandler(
    eventDTO: v1_1.ExecutionEvent,
    @Header(KafkaHeaders.OFFSET) offset: Long,
  ): Unit = processEvent(eventDTO.planId, eventDTO, eventDTO.timestamp, offset, mapper)

}
