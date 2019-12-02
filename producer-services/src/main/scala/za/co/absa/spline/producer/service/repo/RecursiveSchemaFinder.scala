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

package za.co.absa.spline.producer.service.repo

import za.co.absa.spline.producer.model.OperationLike

import scala.collection.mutable

class RecursiveSchemaFinder(operations: Seq[OperationLike]) {
  private val schemaByOperationIdCollector = mutable.Map.empty[Int, Option[Any]]
  private val operationById: Map[Int, OperationLike] = operations.map(op => op.id -> op).toMap

  def findSchemaOf(op: OperationLike): Option[Any] =
    schemaByOperationIdCollector.getOrElseUpdate(op.id, op.schema.orElse {
      // We assume that the graph is consistent in terms of schema definitions.
      // E.i. if the schema is unknown/undefined than it's unknown/undefined for every operation in the DAG.
      // Or if the schema is None because it's the same as the input's schema than EVERY input has the same schema by definition.
      // In either case it's enough to only traverse any of the inputs to resolve a schema if one is defined in the DAG.
      val maybeChildId = op.childIds.headOption
      maybeChildId.flatMap(childId => findSchemaOf(operationById(childId)))
    })
}
