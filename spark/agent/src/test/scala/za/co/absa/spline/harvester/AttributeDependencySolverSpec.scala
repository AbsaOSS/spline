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

package za.co.absa.spline.harvester

import java.util.UUID

import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.harvester.AttributeDependencySolver.resolveDependencies
import za.co.absa.spline.harvester.ModelConstants.{OperationExtras, OperationParams}
import za.co.absa.spline.model.Attribute
import za.co.absa.spline.model.expr.{AttrRef, Binary, Expression, Generic, Literal}
import za.co.absa.spline.producer.model.{DataOperation, ReadOperation, WriteOperation}

class AttributeDependencySolverSpec extends FlatSpec with Matchers {

  private val A, B, C, D, E, F, G = UUID.randomUUID()
  private val attrNames = Map(A -> "A", B -> "B", C -> "C", D -> "D", E -> "E", F -> "F", G -> "G")

  private def assertEqualAttr(actual: Map[UUID, Set[UUID]], expected: Map[UUID, Set[UUID]]): Unit = {

    def toPrettyNames(deps: Map[UUID, Set[UUID]]) =
      deps.map { case (k, v) => attrNames(k) -> v.map(attrNames) }

    toPrettyNames(actual) shouldEqual toPrettyNames(expected)
  }

  private def assertEqualOp(actual: Map[UUID, Set[Int]], expected: Map[UUID, Set[Int]]): Unit = {

    def toPrettyNames(deps: Map[UUID, Set[Int]]) =
      deps.map { case (k, v) => attrNames(k) -> v }

    toPrettyNames(actual) shouldEqual toPrettyNames(expected)
  }

  private def toInput(id: Int, schema: Seq[UUID]) =
    ReadOperation(Seq(), id, Some(schema))

  private def toOutput(id: Int, childIds: Seq[Int]) =
    WriteOperation("", true, id, childIds)

  private def toSelect(id: Int, childIds: Seq[Int], expressions: Vector[Expression], schema: Seq[UUID]) =
    DataOperation(id, childIds, if (schema.isEmpty) None else Some(schema),
      Map(OperationParams.Transformations -> Some(expressions)),
      Map(OperationExtras.Name -> "Project"))

  private def toAggregate(id: Int, childIds: Seq[Int], expressions: Vector[Expression], schema: Seq[UUID]) =
    DataOperation(id, childIds, Some(schema),
      Map(OperationParams.Aggregations -> Some(expressions)),
      Map(OperationExtras.Name -> "Aggregate"))

  private def toGenerate(id: Int, childIds: Seq[Int], generator: Generic, outputId: UUID): DataOperation =
    DataOperation(id, childIds, Some(Seq(outputId)),
      Map("generator" -> Some(generator), "generatorOutput" -> Some(Seq(AttrRef(outputId)))),
      Map(OperationExtras.Name -> "Generate")
    )

  private def toFilter(id: Int, childIds: Seq[Int]) =
    DataOperation(id, childIds, None, Map.empty, Map(OperationExtras.Name -> "Filter"))

  private def toJoin(id: Int, childIds: Seq[Int], schema: Seq[UUID]) =
    DataOperation(id, childIds, Some(schema), Map.empty, Map(OperationExtras.Name -> "Join"))

  private def toSubqueryAlias(id: Int, childIds: Seq[Int], schema: Seq[UUID]) =
    DataOperation(id, childIds, Some(schema), Map.empty, Map(OperationExtras.Name -> "SubqueryAlias"))


  behavior of "AttributeDependencySolver"

  it should "resolve basic select with sum" in {

    val in = toInput(
      0,
      Seq(A, B))

    val op = toSelect(
      1,
      Seq(0),
      Vector(Binary("+", null, Seq(AttrRef(A), AttrRef(B)))),
      Seq(C))

    val out = toOutput(
      2,
      Seq(1)
    )

    val dependencies = resolveDependencies(Vector(op), Vector(in, out))

    assertEqualAttr(dependencies.attributes, Map(C -> Set(A, B)))

    assertEqualOp(dependencies.operations, Map(A -> Set(0, 1), B -> Set(0, 1), C -> Set(0, 1, 2)))
  }

  it should "resolve three dependent operation" in {

    val in = toInput(
      0,
      Seq(A))

    val op1 = toSelect(
      1,
      Seq(0),
      Vector(AttrRef(A)),
      Seq(B))

    val op2 = toSelect(
      2,
      Seq(1),
      Vector(AttrRef(B)),
      Seq(C))

    val op3 = toSelect(
      3,
      Seq(2),
      Vector(AttrRef(C)),
      Seq(D))

    val out = toOutput(
      4,
      Seq(3)
    )

    val dependencies = resolveDependencies(Vector(op1, op2, op3), Vector(in, out))


    assertEqualAttr(dependencies.attributes, Map(B -> Set(A), C -> Set(A, B), D -> Set(A, B, C)))

    assertEqualOp(dependencies.operations, Map(A -> Set(0, 1), B -> Set(0, 1, 2), C -> Set(0, 1, 2, 3), D -> Set(0, 1, 2, 3, 4)))
  }

  it should "not depend on operation order" in {

    val in = toInput(
      0,
      Seq(A))

    val op1 = toSelect(
      1,
      Seq(0),
      Vector(AttrRef(A)),
      Seq(B))

    val op2 = toSelect(
      2,
      Seq(3),
      Vector(AttrRef(C)),
      Seq(D))

    val op3 = toSelect(
      3,
      Seq(1),
      Vector(AttrRef(B)),
      Seq(C))

    val out = toOutput(
      4,
      Seq(2)
    )

    val dependencies = resolveDependencies(Vector(op1, op2, op3), Vector(in, out))


    assertEqualAttr(dependencies.attributes, Map(B -> Set(A), C -> Set(A, B), D -> Set(A, B, C)))

    assertEqualOp(dependencies.operations, Map(A -> Set(0, 1), B -> Set(0, 1, 3), C -> Set(0, 1, 2, 3), D -> Set(0, 1, 2, 3, 4)))
  }

  it should "resolve chain of several operations including an expression" in {

    val op1 = toSelect(
      1,
      Seq.empty,
      Vector(AttrRef(A), AttrRef(B)),
      Seq(C, D))

    val op2 = toSelect(
      2,
      Seq(1),
      Vector(Binary("*", null, Seq(AttrRef(C), AttrRef(D)))),
      Seq(E))

    val op3 = toSelect(
      3,
      Seq(2),
      Vector(AttrRef(E)),
      Seq(F))

    val dependencies = resolveDependencies(Vector(op1, op2, op3), Vector())


    assertEqualAttr(dependencies.attributes, Map(C -> Set(A), D -> Set(B), E -> Set(A, B, C, D), F -> Set(A, B, C, D, E)))

    assertEqualOp(dependencies.operations, Map(C -> Set(1, 2), D -> Set(1, 2), E -> Set(1, 2, 3), F -> Set(1,2,3)))
  }

  it should "resolve aggregation" in {

    val in = toInput(
      0,
      Seq(A, B))

    val op = toAggregate(
      1,
      Seq(0),
      Vector(AttrRef(A), AttrRef(B)),
      Seq(C, D))

    val out = toOutput(
      2,
      Seq(1)
    )


    val dependencies = resolveDependencies(Vector(op), Vector(in, out))

    assertEqualAttr(dependencies.attributes, Map(C -> Set(A), D -> Set(B)))

    assertEqualOp(dependencies.operations, Map(A -> Set(0, 1), B -> Set(0, 1), C -> Set(0, 1, 2), D -> Set(0, 1, 2)))
  }

  it should "resolve generation" in {

    val in = toInput(
      0,
      Seq(A, B))

    val op = toGenerate(
      1,
      Seq(0),
      Generic("explode", null, Seq(AttrRef(A)), null,  None),
      B)

    val out = toOutput(
      2,
      Seq(1)
    )

    val dependencies = resolveDependencies(Vector(op), Vector(in, out))

    assertEqualAttr(dependencies.attributes, Map(B -> Set(A)))

    assertEqualOp(dependencies.operations, Map(A -> Set(0, 1), B -> Set(0, 1, 2)))
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
      Seq(1)
    )

    val dependencies = resolveDependencies(Vector(op), Vector(in, out))

    assertEqualAttr(dependencies.attributes, Map(C -> Set(A), D -> Set(B)))

    assertEqualOp(dependencies.operations, Map(A -> Set(0, 1), B -> Set(0, 1), C -> Set(0, 1, 2), D -> Set(0, 1, 2)))
  }

  it should "resolve io operation correctly" in {

    val in = toInput(
      1,
      Seq(A, B, C))

    val op = toSelect(
      2,
      Seq(1),
      Vector(Binary("*", null, Seq(AttrRef(A), AttrRef(C)))),
      Seq(D))

    val out = toOutput(
      3,
      Seq(2))


    val dependencies = resolveDependencies(Vector(op), Vector(in, out))

    assertEqualAttr(dependencies.attributes, Map(D -> Set(A, C)))

    assertEqualOp(dependencies.operations, Map(A -> Set(1, 2), B -> Set(1, 2), C -> Set(1, 2), D -> Set(1, 2, 3)))
  }

  it should "resolve filter operation correctly" in {

    val in = toInput(
      0,
      Seq(A))

    val op1 = toFilter(
      1,
      Seq(0)
    )

    val op2 = toSelect(
      2,
      Seq(1),
      Vector(AttrRef(A)),
      Seq(B))

    val op3 = toFilter(
      3,
      Seq(2)
    )

    val op4 = toFilter(
      4,
      Seq(3)
    )

    val out = toOutput(
      5,
      Seq(4))


    val dependencies = resolveDependencies(Vector(op1, op2, op3, op4), Vector(in, out))

    assertEqualAttr(dependencies.attributes, Map(B -> Set(A)))

    assertEqualOp(dependencies.operations, Map(A -> Set(0, 1, 2), B -> Set(0, 1, 2, 3, 4, 5)))
  }


  it should "resolve select without schema correctly" in {

    val in = toInput(
      0,
      Seq(A, B))

    val op1 = toSelect(
      1,
      Seq(0),
      Vector(AttrRef(A), AttrRef(B)),
      Seq())

    val out = toOutput(
      2,
      Seq(1))


    val dependencies = resolveDependencies(Vector(op1), Vector(in, out))

    assertEqualAttr(dependencies.attributes, Map.empty)

    assertEqualOp(dependencies.operations, Map(A -> Set(0, 1, 2), B -> Set(0, 1, 2)))
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
      Vector(AttrRef(A)),
      Seq(D))

    val opE = toSelect(
      4,
      Seq(1),
      Vector(AttrRef(B)),
      Seq(E))

    val joinDE = toJoin(
      5,
      Seq(opD.id, opE.id),
      Vector(D, E))

    val opF = toSelect(
      6,
      Seq(joinDE.id),
      Vector(Binary(
        "*", null, Seq(AttrRef(D), Binary(
          "+", null, Seq(Literal(1, null), Binary(
            "-", null, Seq(Literal(3, null), AttrRef(E)))))))),
      Seq(F))

    val opG = toSelect(
      7,
      Seq(inC.id),
      Vector(AttrRef(C)),
      Seq(G))


    val joinFG = toJoin(
      8,
      Seq(opF.id, opG.id),
      Vector(F, G))

    val out = toOutput(
      9,
      Seq(joinFG.id))


    val dependencies = resolveDependencies(Vector(opD, opE, joinDE, opF, opG, joinFG), Vector(inA, inB, inC, out))

    assertEqualAttr(dependencies.attributes, Map(D -> Set(A), E -> Set(B), F -> Set(A, B, E, D), G -> Set(C)))

    assertEqualOp(dependencies.operations, Map(
      A -> Set(inA, opD).map(_.id),
      B -> Set(inB, opE).map(_.id),
      C -> Set(inC, opG).map(_.id),
      D -> Set(inA, opD, joinDE, opF).map(_.id),
      E -> Set(inB, opE, joinDE, opF).map(_.id),
      F -> Set(inA, opD, inB, opE, joinDE, opF, joinFG, out).map(_.id),
      G -> Set(inC, opG, joinFG, out).map(_.id)))
  }
}
