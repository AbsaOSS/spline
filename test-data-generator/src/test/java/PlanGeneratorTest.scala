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

import org.scalatest.funsuite.AnyFunSuite
import za.co.absa.spline.producer.model.v1_2.{DataOperation, ExecutionEvent}

class PlanGeneratorTest extends AnyFunSuite {


  test("generateWrite") {
    val id = "123"
    val writeOperation = PlanGenerator.generateWrite("123")
    assert(writeOperation.childIds.forall(_ == id))
    assert(writeOperation.name.contains("generatedWrite"))
  }

  test("generateRead") {
    val readOperation = PlanGenerator.generateRead()
    assert(readOperation.name.getOrElse("").contains("generated read"))
    assert(readOperation.output.isEmpty)
  }

  test("generateDataOperations") {
    val id = "23"
    val dataOperations: Seq[DataOperation] = PlanGenerator.generateDataOperations(4, Seq.empty, Seq(id))
    assert(dataOperations.size == 4)
    assert(dataOperations.forall(_.name.get.contains("generated data operation")))
    assert(dataOperations.head.childIds.contains("23"))
  }

  test("generate with EventGenerator") {
    val plan = PlanGenerator.generate(4)
    assert(plan.operations.other.size == 4)
    assert(plan.systemInfo.name == "splinegen")
    assert(plan.dataSources.size == 2)

    val event: ExecutionEvent = EventGenerator.generate(plan)
    assert(event.planId == plan.id)
  }


}
