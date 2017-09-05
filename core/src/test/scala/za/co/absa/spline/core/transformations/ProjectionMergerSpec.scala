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

import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.model._

class ProjectionMergerSpec extends FlatSpec with Matchers{

  private def createAttributes(numbers : Int*) : Attributes =
  {
    Attributes(
      numbers.map(i => Attribute(i,i.toString, SimpleType("type", true)))
    )
  }

  private def createGenericExpressions(names : String*) : Seq[Expression] =
  {
    names.map(n => GenericExpression("exprType",n, SimpleType("type", true), Seq.empty))
  }

  private def createCompositeExpressions(attributeNames : (String, String)*) : Seq[Expression] =
  {
    val simpleType = SimpleType("type", true)
    attributeNames.map(ns => AliasExpression(ns._2,ns._2, simpleType,Seq(AttributeReference(1,ns._1, simpleType))))
  }

  "A graph with two compatible projections" should "be joined into one node" in {
    val input = Seq(
      ProjectionNode(NodeProps("node2", "node2", Seq(createAttributes(3,4,5)), Some(createAttributes(4,5)), Seq.empty, Seq(1)), createGenericExpressions("c", "d")),
      ProjectionNode(NodeProps("node1", "node1", Seq(createAttributes(1,2,3)), Some(createAttributes(3,4,5)), Seq(0), Seq.empty), createGenericExpressions("a", "b"))
    )
    val expectedResult = Seq(
      ProjectionNode(NodeProps("node1", "node1, node2", Seq(createAttributes(1,2,3)), Some(createAttributes(4,5)), Seq.empty, Seq.empty), createGenericExpressions("a", "b", "c", "d"))
    )

    val result = ProjectionMerger.apply(input)

    result shouldEqual expectedResult
  }

  "A graph with two incompatible projections" should "remain the same" in {
    val input = Seq(
      ProjectionNode(NodeProps("node2", "node2", Seq(createAttributes(3,4,5)), Some(createAttributes(4,5)), Seq.empty, Seq(1)), createCompositeExpressions(("b", "c"))),
      ProjectionNode(NodeProps("node1", "node1", Seq(createAttributes(1,2,3)), Some(createAttributes(3,4,5)), Seq(0), Seq.empty), createCompositeExpressions(("a", "b")))
    )

    val result = ProjectionMerger.apply(input)

    result shouldEqual input
  }


  "A graph with three compatible projections" should "be joined into one node" in {
    val input = Seq(
      ProjectionNode(NodeProps("node3", "node3", Seq(createAttributes(3,4,5)), Some(createAttributes(4,5)), Seq.empty, Seq(1)), createGenericExpressions("e", "f")),
      ProjectionNode(NodeProps("node2", "node2", Seq(createAttributes(3,4,5,6)), Some(createAttributes(3,4,5)), Seq(0), Seq(2)), createGenericExpressions("c", "d")),
      ProjectionNode(NodeProps("node1", "node1", Seq(createAttributes(1,2,3)), Some(createAttributes(3,4,5,6)), Seq(1), Seq.empty), createGenericExpressions("a", "b"))
    )
    val expectedResult = Seq(
      ProjectionNode(NodeProps("node1", "node1, node2, node3", Seq(createAttributes(1,2,3)), Some(createAttributes(4,5)), Seq.empty, Seq.empty), createGenericExpressions("a", "b", "c", "d", "e", "f"))
    )

    val result = ProjectionMerger.apply(input)

    result shouldEqual expectedResult
  }

  "A branch of compatible projections within a diamond graph" should "be joined into one node" in {
    val input = Seq(
      JoinNode(NodeProps("join", "join", Seq(createAttributes(4,5), createAttributes(8,9)), Some(createAttributes(4,5,8,9)), Seq.empty, Seq(1,4)), None, "inner"),
      ProjectionNode(NodeProps("branch3", "branch3", Seq(createAttributes(3,4,5)), Some(createAttributes(4,5)), Seq(0), Seq(2)), createGenericExpressions("e", "f")),
      ProjectionNode(NodeProps("branch2", "branch2", Seq(createAttributes(3,4,5,6)), Some(createAttributes(3,4,5)), Seq(1), Seq(3)), createGenericExpressions("c", "d")),
      ProjectionNode(NodeProps("branch1", "branch1", Seq(createAttributes(1,2,3)), Some(createAttributes(3,4,5,6)), Seq(2), Seq(5)), createGenericExpressions("a", "b")),
      ProjectionNode(NodeProps("anotherBranch", "anotherBranch", Seq(createAttributes(1,2,3)), Some(createAttributes(8,9)), Seq(0), Seq(5)), createGenericExpressions("n")),
      ProjectionNode(NodeProps("root", "root", Seq(createAttributes(0,1,2,3)), Some(createAttributes(1,2,3)), Seq(3,4), Seq.empty), createGenericExpressions("r"))
    )
    val expectedResult = Seq(
      JoinNode(NodeProps("join", "join", Seq(createAttributes(4,5), createAttributes(8,9)), Some(createAttributes(4,5,8,9)), Seq.empty, Seq(1,2)), None, "inner"),
      ProjectionNode(NodeProps("branch1", "branch1, branch2, branch3", Seq(createAttributes(1,2,3)), Some(createAttributes(4,5)), Seq(0), Seq(3)), createGenericExpressions("a", "b", "c", "d", "e", "f")),
      ProjectionNode(NodeProps("anotherBranch", "anotherBranch", Seq(createAttributes(1,2,3)), Some(createAttributes(8,9)), Seq(0), Seq(3)), createGenericExpressions("n")),
      ProjectionNode(NodeProps("root", "root", Seq(createAttributes(0,1,2,3)), Some(createAttributes(1,2,3)), Seq(1,2), Seq.empty), createGenericExpressions("r"))
    )

    val result = ProjectionMerger.apply(input)

    result shouldEqual expectedResult
  }

  "A graph with two branches of projections. Only the branch of compatible nodes" should "be merged into one node" in {
    val input = Seq(
      JoinNode(NodeProps("join", "join", Seq(createAttributes(1,4), createAttributes(1,5)), Some(createAttributes(4,5)), Seq.empty, Seq(1,3)), None, "inner"),
      ProjectionNode(NodeProps("incompatible2", "incompatible2", Seq(createAttributes(1,3)), Some(createAttributes(1,5)), Seq(0), Seq(2)), createCompositeExpressions(("b", "c"))),
      ProjectionNode(NodeProps("incompatible1", "incompatible1", Seq(createAttributes(1,2,3)), Some(createAttributes(1,3)), Seq(1), Seq(5)), createCompositeExpressions(("a", "b"))),
      ProjectionNode(NodeProps("compatible2", "compatible2", Seq(createAttributes(1,2)), Some(createAttributes(1,4)), Seq(0), Seq(4)), createCompositeExpressions(("a", "b"))),
      ProjectionNode(NodeProps("compatible1", "compatible1", Seq(createAttributes(1,2,3)), Some(createAttributes(1,2)), Seq(3), Seq(5)), createCompositeExpressions(("b", "c"))),
      ProjectionNode(NodeProps("root", "root", Seq(createAttributes(0,1,2,3)), Some(createAttributes(1,2,3)), Seq(2,4), Seq.empty), createGenericExpressions("r"))
    )
    val expectedResult = Seq(
      JoinNode(NodeProps("join", "join", Seq(createAttributes(1,4), createAttributes(1,5)), Some(createAttributes(4,5)), Seq.empty, Seq(1,3)), None, "inner"),
      ProjectionNode(NodeProps("incompatible2", "incompatible2", Seq(createAttributes(1,3)), Some(createAttributes(1,5)), Seq(0), Seq(2)), createCompositeExpressions(("b", "c"))),
      ProjectionNode(NodeProps("incompatible1", "incompatible1", Seq(createAttributes(1,2,3)), Some(createAttributes(1,3)), Seq(1), Seq(4)), createCompositeExpressions(("a", "b"))),
      ProjectionNode(NodeProps("compatible1", "compatible1, compatible2", Seq(createAttributes(1,2,3)), Some(createAttributes(1,4)), Seq(0), Seq(4)), createCompositeExpressions(("b", "c"),("a", "b"))),
      ProjectionNode(NodeProps("root", "root", Seq(createAttributes(0,1,2,3)), Some(createAttributes(1,2,3)), Seq(2,3), Seq.empty), createGenericExpressions("r"))
    )

    val result = ProjectionMerger.apply(input)

    result shouldEqual expectedResult
  }

}
