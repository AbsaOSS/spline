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

package za.co.absa.spline.persistence.atlas

import java.util.UUID

import za.co.absa.spline.model.Execution
import za.co.absa.spline.persistence.api.ExecutionPersistor

/**
  * The class represents a nop Atlas persistence layer for the [[za.co.absa.spline.model.Execution Execution]] entity.
  */
class NopAtlasExecutionPersistor extends ExecutionPersistor{

  /**
    * The method stores an execution to the persistence layer.
    *
    * @param execution A stored execution.
    */
  override def store(execution: Execution): Unit =
  {
    // Does not store anything
  }

  /**
    * The method loads an execution from the persistence layer.
    *
    * @param id An identifier of the stored execution.
    * @return The stored execution if exists in persistence layer, otherwise None
    */
  override def load(id: UUID): Option[Execution] = throw new UnsupportedOperationException()

  /**
    * The method gets all executions related to a specific data lineage.
    *
    * @param dataLineageId An identifier of the given data lineage.
    * @return An iterator of all relevant executions
    */
  override def list(dataLineageId: UUID): Iterator[Execution] = throw new UnsupportedOperationException()
}
