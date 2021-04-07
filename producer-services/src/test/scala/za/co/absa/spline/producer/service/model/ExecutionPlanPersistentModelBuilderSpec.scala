/*
 * Copyright 2021 ABSA Group Limited
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

package za.co.absa.spline.producer.service.model

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import za.co.absa.spline.producer.model.v1_1.DataOperation
import za.co.absa.spline.producer.service.InconsistentEntityException
import za.co.absa.spline.producer.service.model.ExecutionPlanPersistentModelBuilder.SchemaInfo

class ExecutionPlanPersistentModelBuilderSpec extends AnyFlatSpec with Matchers {

  behavior of "ExecutionPlanPersistentModelBuilder"
  behavior of "getSchemaInfos"

  it should "infer missing schemas" in {
    // 1[b, c] -> 2 -> 3 -> 4[a, b]
    val ops = Seq(
      DataOperation(id = "1", childIds = Seq("2"), output = Seq("b", "c")),
      DataOperation(id = "2", childIds = Seq("3")),
      DataOperation(id = "3", childIds = Seq("4")),
      DataOperation(id = "4", childIds = Seq.empty, output = Seq("a", "b")),
    )

    ExecutionPlanPersistentModelBuilder.getSchemaInfos(ops) shouldEqual Map(
      "1" -> SchemaInfo("1", Seq("b", "c"), Set("c")),
      "2" -> SchemaInfo("4", Seq("a", "b"), Set("a", "b")), // inferred schema (=== op #4)
      "3" -> SchemaInfo("4", Seq("a", "b"), Set("a", "b")), // inferred schema (=== op #4)
      "4" -> SchemaInfo("4", Seq("a", "b"), Set("a", "b")),
    )
  }

  it should "infer schema for union-like operations" in {
    //     /-> 2 -\
    // 1 -|        |-> 4[a, b]
    //     \-> 3 -/
    val ops = Seq(
      DataOperation(id = "1", childIds = Seq("2", "3")),
      DataOperation(id = "2", childIds = Seq("4")),
      DataOperation(id = "3", childIds = Seq("4")),
      DataOperation(id = "4", childIds = Seq.empty, output = Seq("a", "b")),
    )

    ExecutionPlanPersistentModelBuilder.getSchemaInfos(ops) shouldEqual Map(
      "1" -> SchemaInfo("4", Seq("a", "b"), Set("a", "b")), // inferred schema (=== op #4)
      "2" -> SchemaInfo("4", Seq("a", "b"), Set("a", "b")), // inferred schema (=== op #4)
      "3" -> SchemaInfo("4", Seq("a", "b"), Set("a", "b")), // inferred schema (=== op #4)
      "4" -> SchemaInfo("4", Seq("a", "b"), Set("a", "b")),
    )
  }

  it should "fail with ambiguity error on join-like operations" in {
    //     /-> 2[a]
    // 1 -|
    //     \-> 3[b]
    val ops = Seq(
      DataOperation(id = "1", childIds = Seq("2", "3"), output = Nil),
      DataOperation(id = "2", childIds = Seq.empty, output = Seq("a")),
      DataOperation(id = "3", childIds = Seq.empty, output = Seq("b")),
    )

    (the[InconsistentEntityException]
      thrownBy ExecutionPlanPersistentModelBuilder.getSchemaInfos(ops)
      should have message "Inconsistent entity: Cannot infer schema for operation #1: the input schema is ambiguous")
  }

  it should "support schema/attribute agnostic operations" in {
    //     /-> 2 -\        /-> 5
    // 1 -|        |-> 4 -|
    //     \-> 3 -/        \-> 6
    val ops = Seq(
      DataOperation(id = "1", childIds = Seq("2", "3")),
      DataOperation(id = "2", childIds = Seq("4")),
      DataOperation(id = "3", childIds = Seq("4")),
      DataOperation(id = "4", childIds = Seq("5", "6")),
      DataOperation(id = "5", childIds = Seq.empty),
      DataOperation(id = "6", childIds = Seq.empty),
    )

    ExecutionPlanPersistentModelBuilder.getSchemaInfos(ops) shouldBe empty
  }

  it should "complain about incorrect graphs" in {
    //     /-> 2 -> ?4?
    // 1 -|
    //     \-> 3 -> ?4?
    val ops = Seq(
      DataOperation(id = "1", childIds = Seq("2", "3")),
      DataOperation(id = "2", childIds = Seq("4")),
      DataOperation(id = "3", childIds = Seq("4")),
    )

    (the[InconsistentEntityException]
      thrownBy ExecutionPlanPersistentModelBuilder.getSchemaInfos(ops)
      should have message "Inconsistent entity: Operation DAG must have terminal nodes")
  }

  it should "complain about cycles" in {
    // 1 <-> 2
    val ops = Seq(
      DataOperation(id = "1", childIds = Seq("2")),
      DataOperation(id = "2", childIds = Seq("1")),
    )

    (the[InconsistentEntityException]
      thrownBy ExecutionPlanPersistentModelBuilder.getSchemaInfos(ops)
      should have message "Inconsistent entity: Operation DAG must have terminal nodes")
  }
}
