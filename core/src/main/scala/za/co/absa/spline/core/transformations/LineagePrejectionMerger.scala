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

package za.co.absa.spline.core.transformations

import za.co.absa.spline.common.transformations.Transformation
import za.co.absa.spline.model.DataLineage

/**
  * The object is responsible for the logic that merges compatible projections into one node within lineage graph.
  */
object LineageProjectionMerger extends Transformation[DataLineage]
{
  /**
    * The method transforms an input instance by a custom logic.
    *
    * @param input An input instance
    * @return A transformed result
    */
  override def apply(input: DataLineage): DataLineage = {
    val updated = input.copy(operations = ProjectionMerger(input.operations))
    ReferenceConsolidator(updated)
  }
}
