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

package za.co.absa.spline.persistence.api.composition

import java.util.UUID

import za.co.absa.spline.model.Execution
import za.co.absa.spline.persistence.api.ExecutionPersistor

import scala.collection.parallel.ParSeq

/**
  * The class represents a parallel composition of persistence layers for the [[za.co.absa.spline.model.Execution Execution]] entity.
  */
class ParallelCompositeExecutionPersistor(persistors : ParSeq[ExecutionPersistor]) extends ExecutionPersistor {
  /**
    * The method stores an execution to the underlying persistence layers.
    *
    * @param execution A stored execution.
    */
  override def store(execution: Execution): Unit = persistors.foreach(_.store(execution))

  /**
    * The method loads an execution from the underlying persistence layers.
    *
    * @param id An identifier of the stored execution.
    * @return The stored execution if exists in persistence layer, otherwise None
    */
  override def load(id: UUID): Option[Execution] = persistors.flatMap(_.load(id)).headOption

  /**
    * The method gets all executions related to a specific data lineage.
    *
    * @param dataLineageId An identifier of the given data lineage.
    * @return An iterator of all relevant executions
    */
  override def list(dataLineageId: UUID): Iterator[Execution] = persistors.flatMap(_.list(dataLineageId)).distinct.toIterator
}
