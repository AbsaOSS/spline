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

class PlanGeneratorTest extends AnyFlatSpec {

  behavior of "PlanGenerator"

  it should "generate Write operation " in {
    val id = "123"
    val writeOperation = PlanGenerator.generateWrite("123")

    writeOperation.childIds shouldEqual Seq(id)
    writeOperation.name shouldEqual Some("generatedWrite")
  }

  it should "generate read" in {
    val readOperation = PlanGenerator.generateRead()
    readOperation.name.getOrElse("") should startWith("generated read")
    readOperation.output shouldEqual None
  }

  it should "generate 4 data operations when 4 opCount is provided" in {
    val id = "23"
    val dataOperations: Seq[DataOperation] = PlanGenerator.generateDataOperations(4, Seq.empty, Seq(id))
    dataOperations.size shouldEqual 4
    all (dataOperations.map(_.name.get)) should startWith("generated data operation")
    dataOperations.head.childIds shouldEqual List("23")
  }

  behavior of "PlanGenerator with EventGenerator"

  it should "generate plan and event" in {
    val plan = PlanGenerator.generate(4)
    plan.operations.other.size shouldEqual 4
    plan.systemInfo.name shouldEqual "splinegen"
    plan.dataSources.size shouldEqual 2

    val event: ExecutionEvent = EventGenerator.generate(plan)
    event.planId shouldEqual plan.id
  }

}
