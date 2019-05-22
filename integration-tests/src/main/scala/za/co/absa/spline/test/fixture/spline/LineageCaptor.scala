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

import za.co.absa.spline.model.DataLineage

class LineageCaptor extends LineageCaptor.Getter with LineageCaptor.Setter {
  private var capturedLineage: Option[DataLineage] = None

  override def capture(lineage: DataLineage): Unit = {
    require(capturedLineage.isEmpty, "Another lineage has already been captured")
    capturedLineage = Some(lineage)
  }

  override def lineageOf(action: => Unit): DataLineage = {
    assume(capturedLineage.isEmpty)
    try {
      action
      capturedLineage.getOrElse(sys.error("No lineage has been captured"))
    } finally {
      capturedLineage = None
    }
  }

  def getter: LineageCaptor.Getter = this

  def setter: LineageCaptor.Setter = this
}

object LineageCaptor {

  trait Setter {
    def capture(lineage: DataLineage): Unit
  }

  trait Getter {
    def lineageOf(action: => Unit): DataLineage
  }

}