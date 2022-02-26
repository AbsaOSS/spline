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

import org.scalatest.Assertion
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.must.Matchers.contain
import org.scalatest.matchers.should.Matchers.{convertToAnyShouldWrapper, exactly}
import za.co.absa.spline.producer.model.v1_2.Attribute.Id

class TriangleSpec extends AnyFlatSpec with AttributeExpressionReferenceSpec {

  val triangle1 = new Triangle(2, 5, 4)
  val triangle2 = new Triangle(5, 2, 4)

  behavior of "triangle generation"

  it should "generate the right triangle structure for 2 readCount and 5 ops" in {
    val plan = triangle1.generate()
    val operations = plan.operations
    val attributes = plan.attributes
    operations.reads.size shouldEqual 2
    operations.other.size shouldEqual 5

    exactly(4, operations.other.map(_.childIds)) shouldEqual List(operations.reads.head.id)
    exactly(1, operations.other.map(_.childIds)) shouldEqual List(operations.reads(1).id)

    operations.write.childIds shouldEqual operations.other.map(_.id)

    attributes.size shouldEqual 28
    attributes.map(_.id) should contain allElementsOf operations.reads.head.output.get
    attributes.map(_.id) should contain allElementsOf operations.other.flatMap(_.output).flatten

    val expressions = plan.expressions.get
    expressions.constants.size shouldEqual 20
    expressions.functions.size shouldEqual 20
  }


  it should "generate the right triangle structure for 5 readCount and 2 ops" in {
    val plan = triangle2.generate()
    val operations = plan.operations
    val attributes = plan.attributes
    operations.reads.size shouldEqual 5
    operations.other.size shouldEqual 2

    operations.other.head.childIds shouldEqual Seq(operations.reads.head.id)
    operations.other(1).childIds shouldEqual Seq(operations.reads(1).id)
    operations.write.childIds shouldEqual operations.other.map(_.id)

    attributes.size shouldEqual 28
    attributes.map(_.id) should contain allElementsOf operations.reads.head.output.get
    attributes.map(_.id) should contain allElementsOf operations.other.flatMap(_.output).flatten

    val expressions = plan.expressions.get
    expressions.constants.size shouldEqual 8
    expressions.functions.size shouldEqual 8

    //functional expressions referencing expressions should be the defined constants
    expressions.functions.flatMap(_.childRefs.flatMap(_.__exprId)) shouldEqual expressions.constants.map(_.id)

    val firstReadAttributes: Seq[Id] = operations.reads.head.output.get
    val secondReadAttributes: Seq[Id] = operations.reads(1).output.get
    val firstDataOpAttributeIds: Seq[Id] = operations.other.head.output.get
    val secondDataOpAttributeIds: Seq[Id] = operations.other(1).output.get

    val checkingWiringFor: (Seq[Id], Seq[Id]) => Assertion = checkExpressionAttributeReferencingFor(expressions, attributes)
    checkingWiringFor(firstReadAttributes, firstDataOpAttributeIds)
    checkingWiringFor(secondReadAttributes, secondDataOpAttributeIds)
  }


}
