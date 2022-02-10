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

package za.co.absa.spline.testdatagen

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers._
import org.scalatest.matchers.should.Matchers.convertToAnyShouldWrapper
import za.co.absa.spline.producer.model.v1_2.{DataOperation, ExecutionEvent}
import za.co.absa.spline.testdatagen.generators.{EventGenerator, PlanGenerator}

class PlanGeneratorSpec extends AnyFlatSpec {

  behavior of "PlanGenerator"

  behavior of "PlanGenerator with EventGenerator"

  it should "generate plan and event" in {
    val plan = PlanGenerator.generate(Config(operations = 4))
    plan.operations.other.size shouldEqual 4
    plan.systemInfo.name shouldEqual "spline-data-gen"
    plan.dataSources.size shouldEqual 2

    val event: ExecutionEvent = EventGenerator.generate(plan)
    event.planId shouldEqual plan.id
  }

}
