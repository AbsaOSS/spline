/*
 * Copyright 2019 ABSA Group Limited
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

package za.co.absa.spline.test.fixture.spline

import za.co.absa.spline.producer.rest.model.{ExecutionEvent, ExecutionPlan}
import za.co.absa.spline.test.fixture.spline.LineageCaptor.Getter

class LineageCaptor extends LineageCaptor.Getter with LineageCaptor.Setter {
  private var capturedExecutionPlan: Option[ExecutionPlan] = None
  private var capturedEvents: Option[Seq[ExecutionEvent]] = None

  override def savePlan(lineage: ExecutionPlan): Unit = {
    require(capturedExecutionPlan.isEmpty, "Another lineage has already been captured")
    capturedExecutionPlan = Some(lineage)
  }

  override def saveEvents(events: Seq[ExecutionEvent]): Unit = {
    require(capturedEvents.isEmpty, "Another events have already been captured")
    capturedEvents = Some(events)
  }


  override def capture(action: => Unit): Getter = {
    assume(capturedExecutionPlan.isEmpty)
    assume(capturedEvents.isEmpty)
    try {
      action
      this
     // capturedExecutionPlan.getOrElse(sys.error("No lineage has been captured"))
    } finally {
      capturedExecutionPlan = None
    }
  }

  def getter: LineageCaptor.Getter = this

  def setter: LineageCaptor.Setter = this

  override def plan: ExecutionPlan = capturedExecutionPlan.getOrElse(sys.error("No execution plan has been captured"))

  override def events: Seq[ExecutionEvent] = capturedEvents.getOrElse(sys.error("No events were been captured"))
}

object LineageCaptor {

  trait Setter {
    def savePlan(lineage: ExecutionPlan): Unit
    def saveEvents(events: Seq[ExecutionEvent]): Unit
  }

  trait Getter {
    def capture(action: => Unit): Getter
    def plan : ExecutionPlan
    def events: Seq[ExecutionEvent]
  }

}