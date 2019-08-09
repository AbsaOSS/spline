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
import za.co.absa.spline.test.fixture.spline.LineageCaptor.CapturedLineage

class LineageCaptor extends LineageCaptor.Getter with LineageCaptor.Setter {
  private var capturedPlan: Option[ExecutionPlan] = None
  private var capturedEvents: Seq[ExecutionEvent] = Nil

  override def capture(plan: ExecutionPlan): Unit = {
    require(capturedPlan.isEmpty, "Another execution plan has already been captured")
    capturedPlan = Some(plan)
  }

  override def capture(event: ExecutionEvent): Unit = {
    capturedEvents :+= event
  }

  override def lineageOf(action: => Unit): CapturedLineage = {
    assume(capturedPlan.isEmpty && capturedEvents.isEmpty)
    try {
      action
      capturedPlan.getOrElse(sys.error("No lineage has been captured")) -> capturedEvents
    } finally {
      capturedPlan = None
      capturedEvents = Nil
    }
  }

  def getter: LineageCaptor.Getter = this

  def setter: LineageCaptor.Setter = this
}

object LineageCaptor {

  type CapturedLineage = (ExecutionPlan, Seq[ExecutionEvent])

  trait Setter {
    def capture(plan: ExecutionPlan): Unit

    def capture(event: ExecutionEvent): Unit
  }

  trait Getter {
    def lineageOf(action: => Unit): CapturedLineage
  }

}