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

package za.co.absa.spline.harvester.builder

import java.util.UUID

import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import za.co.absa.spline.harvester.ComponentCreatorFactory
import za.co.absa.spline.harvester.builder.OperationNodeBuilder.Schema
import za.co.absa.spline.producer.model.OperationLike

trait OperationNodeBuilder {

  protected type R <: OperationLike

  val id: Int = componentCreatorFactory.nextId

  private var childBuilders: Seq[OperationNodeBuilder] = Nil

  def operation: LogicalPlan
  def build(): R
  def +=(childBuilder: OperationNodeBuilder): Unit = childBuilders :+= childBuilder

  protected def componentCreatorFactory: ComponentCreatorFactory
  protected lazy val outputSchema: Schema = operation.output.map(componentCreatorFactory.attributeConverter.convert(_).id)

  protected def childIds: Seq[Int] = childBuilders.map(_.id)
  protected def childOutputSchemas: Seq[Schema] = childBuilders.map(_.outputSchema)
  protected def isTerminal: Boolean = childBuilders.isEmpty
}

object OperationNodeBuilder {
  type Schema = Seq[UUID]
}
