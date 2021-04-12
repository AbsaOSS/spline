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

package za.co.absa.spline.producer.model.v1_1

import java.util.UUID

case class ExecutionPlan(
  id: UUID = UUID.randomUUID(),
  name: Option[ExecutionPlan.Name],

  operations: Operations,
  attributes: Seq[Attribute] = Nil,
  expressions: Option[Expressions] = None,

  // Information about a data framework in use (e.g. Spark, StreamSets etc)
  systemInfo: NameAndVersion,
  // Spline agent information
  agentInfo: Option[NameAndVersion] = None,
  // User payload
  extraInfo: Map[String, Any] = Map.empty
) {
  def dataSources: Set[ExecutionPlan.DataSourceUri] = {
    val readSources = operations.reads.flatMap(_.inputSources).toSet
    val writeSource = operations.write.outputSource
    readSources + writeSource
  }
}

object ExecutionPlan {
  type Name = String
  type DataSourceUri = String
}

case class Operations(
  write: WriteOperation,
  reads: Seq[ReadOperation] = Nil,
  other: Seq[DataOperation] = Nil
) {
  def all: Seq[OperationLike] = reads ++ other :+ write
}

case class Expressions(
  functions: Seq[FunctionalExpression] = Nil,
  constants: Seq[Literal] = Nil
) {
  def all: Seq[ExpressionLike] = functions ++ constants
}

case class NameAndVersion(name: String, version: String)
