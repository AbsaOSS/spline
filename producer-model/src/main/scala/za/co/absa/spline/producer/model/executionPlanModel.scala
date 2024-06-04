/*
 * Copyright 2024 ABSA Group Limited
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

package za.co.absa.spline.producer.model

case class Operations(
  write: WriteOperation,
  reads: Seq[ReadOperation] = Nil,
  other: Seq[DataOperation] = Nil) {

  def all: Seq[OperationLike] = reads ++ other :+ write
}

/**
 * Information about a data framework in use (e.g. Spark, StreamSets etc)
 */
case class SystemInfo(name: String, version: String)

/**
 * Spline agent information
 */
case class AgentInfo(name: String, version: String)
