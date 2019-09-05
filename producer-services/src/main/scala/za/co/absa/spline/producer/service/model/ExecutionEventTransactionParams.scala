/*
 * Copyright 2019 ABSA Group Limited
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
package za.co.absa.spline.producer.service.model

import java.lang.Iterable
import java.util.Date
import java.util.UUID.randomUUID

import com.arangodb.velocypack.VPackSlice
import za.co.absa.spline.persistence.model._
import za.co.absa.spline.producer.rest.model._
import za.co.absa.spline.producer.service.model.ArangoParams._

import scala.language.implicitConversions


case class ExecutionEventTransactionParams(
  progress: Iterable[VPackSlice],
  progressOf: Iterable[VPackSlice]
) extends ArangoParams

object ExecutionEventTransactionParams {

  def apply(executionEvents: Array[ExecutionEvent]): ExecutionEventTransactionParams = {
    val progress = createProgressForBatchJob(executionEvents)
    ExecutionEventTransactionParams(
      ser(progress),
      ser(createProgressOf(executionEvents, progress))
    )
  }

  private def createProgressForBatchJob(executionEvents: Array[ExecutionEvent]): Seq[Progress] = {
    executionEvents.map(e => Progress(new Date().getTime, e.timestamp, e.error, e.extra, Some(randomUUID.toString)))
  }

  private def createProgressOf(executionEvents: Array[ExecutionEvent], progress: Seq[Progress]): Seq[ProgressOf] = {
    for {
      e <- executionEvents
      p <- progress
    } yield ProgressOf(s"progress/${p._key.get}", s"execution/${e.planId}")
  }


}