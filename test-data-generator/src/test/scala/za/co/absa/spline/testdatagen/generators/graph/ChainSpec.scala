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

package za.co.absa.spline.testdatagen.generators.graph

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers.convertToAnyShouldWrapper

class ChainSpec extends AnyFlatSpec {

  val chain1 = new Chain(3, 2, 7, 4)

  behavior of "chain generation"

  it should "generate the right chain structure" in {
    val plan = chain1.generate()
    val operations = plan.operations
    operations.reads.size shouldEqual 1
    operations.reads.head.inputSources.size shouldEqual 3
    operations.other(1).childIds shouldBe Seq(operations.other.head.id)
    operations.other(2).childIds shouldBe Seq(operations.other(1).id)
    operations.write.childIds shouldEqual Seq(operations.other.last.id)
  }

}
