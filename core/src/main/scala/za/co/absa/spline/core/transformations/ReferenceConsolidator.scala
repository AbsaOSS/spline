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
  * The object is responsible for filtering out all unused MetaDatasets and Attributes
  */
object ReferenceConsolidator extends Transformation[DataLineage]
{
  /**
    * The method transforms an input instance by a custom logic.
    *
    * @param input An input instance
    * @return A transformed result
    */
  override def apply(input: DataLineage): DataLineage = {
    val operations = input.operations
    val datasetIds = (operations.flatMap(_.mainProps.inputs) ++ operations.map(_.mainProps.output)).distinct
    val datasets = input.datasets.filter(i => datasetIds.contains(i.id))
    val attributeIds = datasets.flatMap(_.schema.attrs).distinct
    val attributes = input.attributes.filter(i => attributeIds.contains(i.id))
    input.copy(operations = operations, datasets = datasets, attributes = attributes)
  }
}
