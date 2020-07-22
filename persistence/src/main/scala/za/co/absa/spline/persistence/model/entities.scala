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
package za.co.absa.spline.persistence.model

trait ArangoDocument {
  val _created: Long = System.currentTimeMillis
}

trait Vertex extends ArangoDocument {
  def _key: String
}

case class Edge(
  _from: String,
  _to: String
) extends ArangoDocument {
  def this() = this(null, null)
}

/**
  * Represents a named location WHERE data can be read from or written to.
  * It can be anything that can serve as a data input or output for a data pipeline.
  * E.g. file or directory on a filesystem, table in the database, topic in Kafka etc.
  */
case class DataSource(
  uri: String,
  override val _key: String
) extends Vertex {
  def this() = this(null, null)
}

/**
  * Represents an execution plan.
  * Contains all static information about HOW data is transformed along the way
  * from the inputs to the output.
  */
case class ExecutionPlan(
  systemInfo: Map[String, Any],
  agentInfo: Map[String, Any],
  extra: Map[String, Any],
  override val _key: String
) extends Vertex

/**
  * Represents a moment in time WHEN a particular execution plan is executed.
  * It can also hold the result of the execution and related stats, and any other
  * custom data logically connected to the event.
  */
case class Progress(
  timestamp: Long,
  error: Option[Any],
  extra: Map[String, Any],
  override val _key: String,
  execPlanDetails: ExecPlanDetails
) extends Vertex

/**
  * These values are copied from other entities for performance optimization.
  */
case class ExecPlanDetails(
  executionPlanId: String,
  frameworkName: String,
  applicationName: String,
  dataSourceUri: String,
  dataSourceType: String,
  append: Boolean
)
