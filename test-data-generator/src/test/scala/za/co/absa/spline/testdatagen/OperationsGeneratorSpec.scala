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
import org.scalatest.matchers.should.Matchers.convertToAnyShouldWrapper
import za.co.absa.spline.testdatagen.generators.OperationsGenerator

class OperationsGeneratorSpec extends AnyFlatSpec {

  behavior of "PlanGenerator with EventGenerator"

  it should "generate expressions and event" in {
    val expressions = OperationsGenerator.generateOperations(5,2)
    expressions.reads.size shouldEqual 2
    expressions.other.size shouldEqual 10
  }

}
