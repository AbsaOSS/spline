/*
 * Copyright 2020 ABSA Group Limited
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

package za.co.absa.spline.consumer.service.internal

import java.util.UUID

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

import collection.JavaConverters._
import za.co.absa.spline.consumer.service.internal.AttributeDependencySolver.resolveDependencies
import za.co.absa.spline.consumer.service.internal.model.OperationWithSchema

class AttributeDependencySolverSpec extends AnyFlatSpec with Matchers{

  private val A, B, C, D, E, F, G = UUID.randomUUID()
  private val attrNames = Map(A -> "A", B -> "B", C -> "C", D -> "D", E -> "E", F -> "F", G -> "G")

  private def assertEqualAttr(actual: Seq[UUID], expected: Set[UUID]): Unit = {

    def toPrettyNames(deps: Set[UUID]) = deps.map(attrNames)

    toPrettyNames(actual.toSet) shouldEqual toPrettyNames(expected)
  }

  private def assertEqualOp(actual: Seq[String], expected: Set[Int]): Unit = {

    actual.map(_.toInt).toSet shouldEqual expected
  }

  private def assertResolvedEquals(
    operations: Seq[OperationWithSchema],
    forAttribute: UUID,
    attributeDependencies: Set[UUID],
    operationDependencies: Set[Int]
  ): Unit = {

    val dependencies = resolveDependencies(operations, forAttribute)

    assertEqualAttr(dependencies.attributes, attributeDependencies)
    assertEqualOp(dependencies.operations, operationDependencies)
  }

  private def exprAsJava(expressions: Any): Any = expressions match {
    case e: Seq[Any] => e.map(exprAsJava).asJava
    case e: Map[String, Any] => mapToJava(e)
    case e: Any => e
  }

  private def mapToJava(m: Map[String, Any]): java.util.Map[String, Any] = m
    .map{ case (k, v) => k -> exprAsJava(v)}
    .asJava

  private def toInput(id: Int, schema: Seq[UUID]) =
    OperationWithSchema(id.toString, schema.toArray, Map("name" -> "Read"), Map.empty,Seq.empty)

  private def toOutput(id: Int, childIds: Seq[Int], schema: Seq[UUID]) =
    OperationWithSchema(id.toString, schema.toArray, Map("name" -> "Write"), Map.empty, childIds.map(_.toString))

  private def toSelect(id: Int, childIds: Seq[Int], expressions: Seq[Map[String, Any]], schema: Seq[UUID]) =
    OperationWithSchema(id.toString, schema.toArray,
      Map("name" -> "Project"),
      Map("projectList" -> exprAsJava(expressions)),
      childIds.map(_.toString))

  private def toAggregate(id: Int, childIds: Seq[Int], expressions: Seq[Map[String, Any]], schema: Seq[UUID]) =
    OperationWithSchema(id.toString, schema.toArray,
      Map("name" -> "Aggregate"),
      Map("aggregateExpressions" -> exprAsJava(expressions)),
      childIds.map(_.toString))

  private def toGenerate(id: Int, childIds: Seq[Int], generator: Map[String, Any], outputId: UUID) =
    OperationWithSchema(id.toString, Array(outputId),
      Map("name"-> "Generate"),
      Map("generator" -> exprAsJava(generator), "generatorOutput" -> exprAsJava(Seq(attrRef(outputId)))),
      childIds.map(_.toString))

  private def toFilter(id: Int, childIds: Seq[Int], schema: Seq[UUID]) =
    OperationWithSchema(id.toString, schema.toArray, Map("name" -> "Filter"), Map.empty, childIds.map(_.toString))

  private def toJoin(id: Int, childIds: Seq[Int], schema: Seq[UUID]) =
    OperationWithSchema(id.toString, schema.toArray, Map("name" -> "Join"), Map.empty, childIds.map(_.toString))

  private def toSubqueryAlias(id: Int, childIds: Seq[Int], schema: Seq[UUID]) =
    OperationWithSchema(id.toString, schema.toArray, Map("name" -> "SubqueryAlias"), Map.empty, childIds.map(_.toString))

  private def attrRef(attr: UUID) =
    Map("_typeHint" -> "expr.AttrRef", "refId" -> attr.toString)

  private def attrOperation(children: Seq[Any]) =
    Map("_typeHint" -> "dummt", "children" -> children)


  behavior of "AttributeDependencySolver"

  it should "resolve basic select with sum" in {

    val in = toInput(
      0,
      Seq(A, B))

    val op = toSelect(
      1,
      Seq(0),
      Seq(attrOperation(Seq(attrRef(A), attrRef(B)))),
      Seq(C))

    val out = toOutput(
      2,
      Seq(1),
      Seq(C)
    )

    val operations = Seq(op, in, out)
    assertResolvedEquals(operations, A, Set.empty, Set(0))
    assertResolvedEquals(operations, B, Set.empty, Set(0))
    assertResolvedEquals(operations, C, Set(A, B), Set(0, 1, 2))
  }

  it should "resolve three dependent operation" in {

    val in = toInput(
      0,
      Seq(A))

    val op1 = toSelect(
      1,
      Seq(0),
      Seq(attrRef(A)),
      Seq(B))

    val op2 = toSelect(
      2,
      Seq(1),
      Seq(attrRef(B)),
      Seq(C))

    val op3 = toSelect(
      3,
      Seq(2),
      Seq(attrRef(C)),
      Seq(D))

    val out = toOutput(
      4,
      Seq(3),
      Seq(D)
    )

    val operations = Seq(op1, op2, op3, in, out)
    assertResolvedEquals(operations, A, Set.empty, Set(0))
    assertResolvedEquals(operations, B, Set(A), Set(0, 1))
    assertResolvedEquals(operations, C, Set(A, B), Set(0, 1, 2))
    assertResolvedEquals(operations, D, Set(A, B, C), Set(0, 1, 2, 3, 4))
  }

  it should "not depend on operation order" in {

    val in = toInput(
      0,
      Seq(A))

    val op1 = toSelect(
      1,
      Seq(0),
      Seq(attrRef(A)),
      Seq(B))

    val op2 = toSelect(
      2,
      Seq(3),
      Seq(attrRef(C)),
      Seq(D))

    val op3 = toSelect(
      3,
      Seq(1),
      Seq(attrRef(B)),
      Seq(C))

    val out = toOutput(
      4,
      Seq(2),
      Seq(D)
    )

    val operations = Seq(op1, op2, op3, in, out)

    assertResolvedEquals(operations, D, Set(A, B, C), Set(0, 1, 2, 3, 4))
  }

  it should "resolve chain of several operations including an expression" in {

    val in = toInput(
      0,
      Seq(A, B))

    val op1 = toSelect(
      1,
      Seq(0),
      Seq(attrRef(A), attrRef(B)),
      Seq(C, D))

    val op2 = toSelect(
      2,
      Seq(1),
      Seq(attrOperation(Seq(attrRef(C), attrRef(D)))),
      Seq(E))

    val op3 = toSelect(
      3,
      Seq(2),
      Seq(attrRef(E)),
      Seq(F))

    val out = toOutput(
      4,
      Seq(3),
      Seq(F)
    )

    val operations = Seq(in, op1, op2, op3, out)

    assertResolvedEquals(operations, C, Set(A), Set(0, 1))
    assertResolvedEquals(operations, D, Set(B), Set(0, 1))
    assertResolvedEquals(operations, E, Set(A, B, C, D), Set(0, 1, 2))
    assertResolvedEquals(operations, F, Set(A, B, C, D, E), Set(0, 1, 2, 3, 4))
  }

  it should "resolve aggregation" in {

    val in = toInput(
      0,
      Seq(A, B))

    val op = toAggregate(
      1,
      Seq(0),
      Seq(attrRef(A), attrRef(B)),
      Seq(C, D))

    val out = toOutput(
      2,
      Seq(1),
      Seq(C, D)
    )

    val operations = Seq(op, in, out)

    assertResolvedEquals(operations, C, Set(A), Set(0, 1, 2))
    assertResolvedEquals(operations, D, Set(B), Set(0, 1, 2))
  }


  it should "resolve generation" in {

    val in = toInput(
      0,
      Seq(A))

    val op = toGenerate(
      1,
      Seq(0),
      attrRef(A),
      B)

    val out = toOutput(
      2,
      Seq(1),
      Seq(B)
    )

    val operations = Seq(op, in, out)

    assertResolvedEquals(operations, B, Set(A), Set(0, 1, 2))
  }

  it should "resolve subquery alias" in {

    val in = toInput(
      0,
      Seq(A, B))

    val op = toSubqueryAlias(
      1,
      Seq(0),
      Seq(C, D))

    val out = toOutput(
      2,
      Seq(1),
      Seq(C, D)
    )

    val operations = Seq(op, in, out)

    assertResolvedEquals(operations, A, Set.empty, Set(0))
    assertResolvedEquals(operations, B, Set.empty, Set(0))
    assertResolvedEquals(operations, C, Set(A), Set(0, 1, 2))
    assertResolvedEquals(operations, D, Set(B), Set(0, 1, 2))

  }

  it should "resolve io operation correctly" in {

    val in = toInput(
      1,
      Seq(A, B, C))

    val op = toSelect(
      2,
      Seq(1),
      Seq(attrOperation(Seq(attrRef(A), attrRef(C)))),
      Seq(D))

    val out = toOutput(
      3,
      Seq(2),
      Seq(D))


    val operations = Seq(op, in, out)

    assertResolvedEquals(operations, A, Set.empty, Set(1))
    assertResolvedEquals(operations, B, Set.empty, Set(1))
    assertResolvedEquals(operations, C, Set.empty, Set(1))
    assertResolvedEquals(operations, D, Set(A, C), Set(1, 2, 3))
  }

  it should "resolve filter operation correctly" in {

    val in = toInput(
      0,
      Seq(A))

    val op1 = toFilter(
      1,
      Seq(0),
      Seq(A)
    )

    val op2 = toSelect(
      2,
      Seq(1),
      Seq(attrRef(A)),
      Seq(B))

    val op3 = toFilter(
      3,
      Seq(2),
      Seq(B)
    )

    val op4 = toFilter(
      4,
      Seq(3),
      Seq(B)
    )

    val out = toOutput(
      5,
      Seq(4),
      Seq(B))


    val operations = Seq(op1, op2, op3, op4, in, out)

    assertResolvedEquals(operations, A, Set.empty, Set(0, 1))
    assertResolvedEquals(operations, B, Set(A), Set(0, 1, 2, 3, 4, 5))
  }

  /**
   *
   *  (A)      (B)   (C)
   *   \       /     /
   *   (D)   (E)    /
   *    \    /     /
   *    (D, E)    /
   *      |      /
   *     (F)   (G)
   *       \   /
   *      (F, G)
   *
   */
  it should "resolve operation with several sources correctly" in {

    val inA = toInput(
      0,
      Seq(A))

    val inB = toInput(
      1,
      Seq(B))

    val inC = toInput(
      2,
      Seq(C))

    val opD = toSelect(
      3,
      Seq(0),
      Seq(attrRef(A)),
      Seq(D))

    val opE = toSelect(
      4,
      Seq(1),
      Seq(attrRef(B)),
      Seq(E))

    val joinDE = toJoin(
      5,
      Seq(opD._id.toInt, opE._id.toInt),
      Seq(D, E))

    val opF = toSelect(
      6,
      Seq(joinDE._id.toInt),
      Seq(attrOperation(Seq(attrRef(D), attrRef(E)))),
      Seq(F))

    val opG = toSelect(
      7,
      Seq(inC._id.toInt),
      Seq(attrRef(C)),
      Seq(G))


    val joinFG = toJoin(
      8,
      Seq(opF._id.toInt, opG._id.toInt),
      Seq(F, G))

    val out = toOutput(
      9,
      Seq(joinFG._id.toInt),
      Seq(F, G))


    val operations = Seq(opD, opE, joinDE, opF, opG, joinFG, inA, inB, inC, out)

    assertResolvedEquals(operations, A, Set.empty, asIdSet(inA))
    assertResolvedEquals(operations, B, Set.empty, asIdSet(inB))
    assertResolvedEquals(operations, C, Set.empty, asIdSet(inC))
    assertResolvedEquals(operations, D, Set(A), asIdSet(inA, opD, joinDE))
    assertResolvedEquals(operations, E, Set(B), asIdSet(inB, opE, joinDE))
    assertResolvedEquals(operations, F, Set(A, B, E, D), asIdSet(inA, opD, inB, opE, joinDE, opF, joinFG, out))
    assertResolvedEquals(operations, G, Set(C), asIdSet(inC, opG, joinFG, out))

    def asIdSet(operations: OperationWithSchema*) = operations.map(_._id.toInt).toSet
  }

  /**
   *     (A)
   *    /  \
   *  (A)  (B)
   *    \  /
   *   (A,B)
   *     |
   *   (A,B)
   */
  it should "resolve diamond correctly" in {

    val in = toInput(
      0,
      Seq(A))

    val op1 = toFilter(
      1,
      Seq(0),
      Seq(A)
    )

    val op2 = toSelect(
      2,
      Seq(0),
      Seq(attrRef(A)),
      Seq(B))

    val join = toJoin(
      3,
      Seq(1, 2),
      Seq(A, B))

    val out = toOutput(
      4,
      Seq(3),
      Seq(A, B))


    val operations = Seq(op1, op2, join, in, out)

    assertResolvedEquals(operations, A, Set.empty, Set(0, 1, 3, 4))
    assertResolvedEquals(operations, B, Set(A), Set(0, 2, 3, 4))
  }

}
