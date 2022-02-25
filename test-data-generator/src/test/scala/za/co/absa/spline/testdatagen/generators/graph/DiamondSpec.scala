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
import za.co.absa.spline.producer.model.v1_2.Expressions

class DiamondSpec extends AnyFlatSpec {

  val diamond1 = new Diamond(3, 2, 4)

  behavior of "diamond generation"

  it should "generate the right diamond structure" in {
    val plan = diamond1.generate()
    val operations = plan.operations
    operations.reads.size shouldEqual 1
    operations.reads.head.inputSources.size shouldEqual 3
    all(operations.other.map(_.childIds)) shouldBe Seq(operations.reads.head.id)
    operations.write.childIds shouldEqual operations.other.map(_.id)

    val attributes = plan.attributes
    attributes.size shouldEqual 12

    val expressions: Expressions = plan.expressions.get
    expressions.constants.size shouldEqual 8
    expressions.functions.size shouldEqual 8

    //functional expressions referencing expressions should be the defined constants
    expressions.functions.flatMap(_.childRefs.flatMap(_.__exprId)) shouldEqual expressions.constants.map(_.id)

    //functional expressions referencing attributes should be the read attributes
    expressions.functions.flatMap(_.childRefs.flatMap(_.__attrId)).toSet shouldEqual operations.reads.head.output.get.toSet
  }

}
