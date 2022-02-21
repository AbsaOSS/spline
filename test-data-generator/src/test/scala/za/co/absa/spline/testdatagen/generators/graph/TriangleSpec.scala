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
import org.scalatest.matchers.should.Matchers.{all, convertToAnyShouldWrapper}

class TriangleSpec extends AnyFlatSpec {

  val triangle1 = new Triangle(2, 5, 7, 4)
  val triangle2 = new Triangle(5, 2, 7, 4)

  behavior of "triangle generation"

  it should "generate the right triangle structure for 2 reads and 5 ops" in {
    val plan = triangle1.generate()
    val operations = plan.operations
    operations.reads.size shouldEqual 2
    operations.other.size shouldEqual 5

    operations.other.head.childIds shouldBe Seq(operations.reads.head.id)
    operations.other(1).childIds shouldBe Seq(operations.reads(1).id)
    operations.other(2).childIds shouldBe Seq(operations.reads.head.id)
    operations.other(3).childIds shouldBe Seq(operations.reads.head.id)
    operations.other(4).childIds shouldBe Seq(operations.reads.head.id)

    operations.write.childIds shouldEqual operations.other.map(_.id)
  }


  it should "generate the right triangle structure for 5 reads and 2 ops" in {
    val plan = triangle2.generate()
    val operations = plan.operations
    operations.reads.size shouldEqual 5
    operations.other.size shouldEqual 2

    operations.other.head.childIds shouldEqual Seq(operations.reads.head.id)
    operations.other(1).childIds shouldEqual Seq(operations.reads(1).id)
    operations.write.childIds shouldEqual operations.other.map(_.id)
  }


}
