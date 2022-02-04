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

import java.util.UUID

import za.co.absa.spline.producer.model.v1_2._

import scala.annotation.tailrec

object PlanGenerator {

  def generate(opCount: Int): ExecutionPlan = {
    val planId = UUID.randomUUID()
    ExecutionPlan(
      id = planId,
      name = Some(s"generated plan $planId"),
      operations = generateOperations(opCount.toLong),
      attributes = Seq.empty,
      expressions = None,
      systemInfo = NameAndVersion("splinegen", "0.1-SNAPSHOT"),
      agentInfo = None,
      extraInfo = Map.empty
    )
  }

  def generateOperations(opCount: Long): Operations = {

    val read = generateRead()
    val dataOps = generateDataOperations(opCount, Seq.empty, Seq(read.id))

    Operations(
      write = generateWrite(dataOps.last.id),
      reads = Seq(read),
      other = dataOps
    )
  }

  def generateRead(): ReadOperation = {
    val id = UUID.randomUUID().toString
    ReadOperation(
      inputSources = Seq(s"file://splinegen/read_$id.csv"),
      id = id,
      name = Some(s"generated read $id"),
      output = None,
      params = Map.empty,
      extra = Map.empty
    )
  }

  @tailrec
  def generateDataOperations(opCount: Long, allOps: Seq[DataOperation], childIds: Seq[String]): Seq[DataOperation] =
    if (opCount == 0) {
      allOps
    } else {
      val op = generateDataOperation(childIds)
      generateDataOperations(opCount - 1, allOps :+ op, Seq(op.id))
    }

  private def generateDataOperation(childIds: Seq[String]): DataOperation = {
    val id = UUID.randomUUID().toString
    DataOperation(
      id = id,
      name = Some(s"generated data operation $id"),
      childIds = childIds,
      output = None,
      params = Map.empty,
      extra = Map.empty
    )
  }

  def generateWrite(childId: String): WriteOperation = {
    WriteOperation(
      outputSource = "file://splinegen/write.csv",
      append = false,
      id = UUID.randomUUID().toString,
      name = Some("generatedWrite"),
      childIds = Seq(childId),
      params = Map.empty,
      extra = Map.empty
    )
  }

}
