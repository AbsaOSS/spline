/*
 * Copyright 2017 Barclays Africa Group Limited
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

package za.co.absa.spline.core.transformations

import java.util.UUID.randomUUID

import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.model._
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.expr.{Alias, AttrRef, Expression, Generic}
import za.co.absa.spline.model.op.{Join, NodeProps, Projection}

class ProjectionMergerSpec extends FlatSpec with Matchers {

  private def createAttributes(numbers: Int*): Schema = {
    ???
    /*Schema(
      numbers.map(i => Attribute(i, i.toString, Simple("type", nullable = true)))
    )*/
  }

  private def createGenericExpressions(names: String*): Seq[Expression] = {
    names.map(n => Generic("exprType", n, Simple("type", nullable = true), Seq.empty))
  }

  private def createCompositeExpressions(attributeNames: (String, String)*): Seq[Expression] = {
    val simpleType = Simple("type", nullable = true)
    attributeNames.map(ns => Alias(ns._2, ns._2, simpleType, Seq(AttrRef(???, ns._1, simpleType))))
  }

/*
  "A graph with two compatible projections" should "be joined into one node" in {
    val mergedNodes = ProjectionMerger(Seq(
      Projection(
        NodeProps(
          randomUUID,
          "node2",
          "node2",
          Seq(createAttributes(3, 4, 5)),
          Some(createAttributes(4, 5)),
          Seq.empty,
          Seq(1)),
        createGenericExpressions("c", "d")),
      Projection(
        NodeProps(
          randomUUID,
          "node1",
          "node1",
          Seq(createAttributes(1, 2, 3)),
          Some(createAttributes(3, 4, 5)),
          Seq(0),
          Seq.empty),
        createGenericExpressions("a", "b"))
    ))

    val expectedNode = Projection(
      NodeProps(
        id = null,
        "node1",
        "node1, node2",
        Seq(createAttributes(1, 2, 3)),
        Some(createAttributes(4, 5)),
        Seq.empty,
        Seq.empty),
      createGenericExpressions("a", "b", "c", "d"))

    mergedNodes.size shouldEqual 1
    mergedNodes.head.updated(_.copy(id = null)) shouldEqual expectedNode
  }
*/

/*
  "A graph with two incompatible projections" should "remain the same" in {
    val input = Seq(
      Projection(
        NodeProps(
          randomUUID,
          "node2",
          "node2",
          Seq(createAttributes(3, 4, 5)),
          Some(createAttributes(4, 5)),
          Seq.empty,
          Seq(1)),
        createCompositeExpressions(("b", "c"))),
      Projection(
        NodeProps(
          randomUUID,
          "node1",
          "node1",
          Seq(createAttributes(1, 2, 3)),
          Some(createAttributes(3, 4, 5)),
          Seq(0),
          Seq.empty),
        createCompositeExpressions(("a", "b")))
    )

    val result = ProjectionMerger(input)

    result shouldEqual input
  }
*/


/*
  "A graph with three compatible projections" should "be joined into one node" in {
    val mergedNodes = ProjectionMerger(Seq(
      Projection(
        NodeProps(
          randomUUID,
          "node3",
          "node3",
          Seq(createAttributes(3, 4, 5)),
          Some(createAttributes(4, 5)),
          Seq.empty,
          Seq(1)),
        createGenericExpressions("e", "f")),
      Projection(
        NodeProps(
          randomUUID,
          "node2",
          "node2",
          Seq(createAttributes(3, 4, 5, 6)),
          Some(createAttributes(3, 4, 5)),
          Seq(0),
          Seq(2)),
        createGenericExpressions("c", "d")),
      Projection(
        NodeProps(
          randomUUID,
          "node1",
          "node1",
          Seq(createAttributes(1, 2, 3)),
          Some(createAttributes(3, 4, 5, 6)),
          Seq(1),
          Seq.empty),
        createGenericExpressions("a", "b"))
    ))

    val expectedNode = Projection(
      NodeProps(
        id = null,
        "node1",
        "node1, node2, node3",
        Seq(createAttributes(1, 2, 3)),
        Some(createAttributes(4, 5)),
        Seq.empty, Seq.empty),
      createGenericExpressions("a", "b", "c", "d", "e", "f"))

    mergedNodes.size shouldEqual 1
    mergedNodes.head.updated(_.copy(id = null)) shouldEqual expectedNode
  }
*/

/*
  "A branch of compatible projections within a diamond graph" should "be joined into one node" in {
    val mergedNodes = ProjectionMerger(Seq(
      Join(
        NodeProps(
          randomUUID,
          "join",
          "join",
          Seq(createAttributes(4, 5), createAttributes(8, 9)),
          Some(createAttributes(4, 5, 8, 9)),
          Seq.empty,
          Seq(1, 4)),
        None,
        "inner"),
      Projection(
        NodeProps(
          randomUUID,
          "branch3",
          "branch3",
          Seq(createAttributes(3, 4, 5)),
          Some(createAttributes(4, 5)),
          Seq(0),
          Seq(2)),
        createGenericExpressions("e", "f")),
      Projection(
        NodeProps(
          randomUUID,
          "branch2",
          "branch2",
          Seq(createAttributes(3, 4, 5, 6)),
          Some(createAttributes(3, 4, 5)),
          Seq(1),
          Seq(3)),
        createGenericExpressions("c", "d")),
      Projection(
        NodeProps(
          randomUUID,
          "branch1",
          "branch1",
          Seq(createAttributes(1, 2, 3)),
          Some(createAttributes(3, 4, 5, 6)),
          Seq(2),
          Seq(5)),
        createGenericExpressions("a", "b")),
      Projection(
        NodeProps(
          randomUUID,
          "anotherBranch",
          "anotherBranch",
          Seq(createAttributes(1, 2, 3)),
          Some(createAttributes(8, 9)),
          Seq(0),
          Seq(5)),
        createGenericExpressions("n")),
      Projection(
        NodeProps(
          randomUUID,
          "root",
          "root",
          Seq(createAttributes(0, 1, 2, 3)),
          Some(createAttributes(1, 2, 3)),
          Seq(3, 4),
          Seq.empty),
        createGenericExpressions("r"))
    ))

    val expectedResult = Seq(
      Join(
        NodeProps(
          id = null,
          "join",
          "join",
          Seq(createAttributes(4, 5), createAttributes(8, 9)),
          Some(createAttributes(4, 5, 8, 9)),
          Seq.empty,
          Seq(1, 2)),
        None,
        "inner"),
      Projection(
        NodeProps(
          id = null,
          "branch1",
          "branch1, branch2, branch3",
          Seq(createAttributes(1, 2, 3)),
          Some(createAttributes(4, 5)),
          Seq(0),
          Seq(3)),
        createGenericExpressions("a", "b", "c", "d", "e", "f")),
      Projection(
        NodeProps(
          id = null,
          "anotherBranch",
          "anotherBranch",
          Seq(createAttributes(1, 2, 3)),
          Some(createAttributes(8, 9)),
          Seq(0),
          Seq(3)),
        createGenericExpressions("n")),
      Projection(
        NodeProps(
          id = null,
          "root",
          "root",
          Seq(createAttributes(0, 1, 2, 3)),
          Some(createAttributes(1, 2, 3)),
          Seq(1, 2),
          Seq.empty),
        createGenericExpressions("r"))
    )

    mergedNodes.map(_.updated(_.copy(id = null))) shouldEqual expectedResult
  }
*/

/*
  "A graph with two branches of projections. Only the branch of compatible nodes" should "be merged into one node" in {
    val mergedNodes = ProjectionMerger(Seq(
      Join(
        NodeProps(
          randomUUID,
          "join",
          "join",
          Seq(createAttributes(1, 4), createAttributes(1, 5)),
          Some(createAttributes(4, 5)),
          Seq.empty,
          Seq(1, 3)),
        None,
        "inner"),
      Projection(
        NodeProps(
          randomUUID,
          "incompatible2",
          "incompatible2",
          Seq(createAttributes(1, 3)),
          Some(createAttributes(1, 5)),
          Seq(0),
          Seq(2)),
        createCompositeExpressions(("b", "c"))),
      Projection(
        NodeProps(
          randomUUID,
          "incompatible1",
          "incompatible1",
          Seq(createAttributes(1, 2, 3)),
          Some(createAttributes(1, 3)),
          Seq(1),
          Seq(5)),
        createCompositeExpressions(("a", "b"))),
      Projection(
        NodeProps(
          randomUUID,
          "compatible2",
          "compatible2",
          Seq(createAttributes(1, 2)),
          Some(createAttributes(1, 4)),
          Seq(0),
          Seq(4)),
        createCompositeExpressions(("a", "b"))),
      Projection(
        NodeProps(
          randomUUID,
          "compatible1",
          "compatible1",
          Seq(createAttributes(1, 2, 3)),
          Some(createAttributes(1, 2)),
          Seq(3),
          Seq(5)),
        createCompositeExpressions(("b", "c"))),
      Projection(
        NodeProps(
          randomUUID,
          "root",
          "root",
          Seq(createAttributes(0, 1, 2, 3)),
          Some(createAttributes(1, 2, 3)),
          Seq(2, 4),
          Seq.empty),
        createGenericExpressions("r"))
    ))

    val expectedResult = Seq(
      Join(
        NodeProps(
          id = null,
          "join",
          "join",
          Seq(createAttributes(1, 4), createAttributes(1, 5)),
          Some(createAttributes(4, 5)),
          Seq.empty, Seq(1, 3)),
        None,
        "inner"),
      Projection(
        NodeProps(
          id = null,
          "incompatible2",
          "incompatible2",
          Seq(createAttributes(1, 3)),
          Some(createAttributes(1, 5)),
          Seq(0),
          Seq(2)),
        createCompositeExpressions(("b", "c"))),
      Projection(
        NodeProps(
          id = null,
          "incompatible1",
          "incompatible1",
          Seq(createAttributes(1, 2, 3)),
          Some(createAttributes(1, 3)),
          Seq(1),
          Seq(4)),
        createCompositeExpressions(("a", "b"))),
      Projection(
        NodeProps(
          id = null,
          "compatible1",
          "compatible1, compatible2",
          Seq(createAttributes(1, 2, 3)),
          Some(createAttributes(1, 4)),
          Seq(0),
          Seq(4)),
        createCompositeExpressions(("b", "c"), ("a", "b"))),
      Projection(
        NodeProps(
          id = null,
          "root",
          "root",
          Seq(createAttributes(0, 1, 2, 3)),
          Some(createAttributes(1, 2, 3)),
          Seq(2, 3),
          Seq.empty),
        createGenericExpressions("r"))
    )

    mergedNodes.map(_.updated(_.copy(id = null))) shouldEqual expectedResult
  }
*/

}
