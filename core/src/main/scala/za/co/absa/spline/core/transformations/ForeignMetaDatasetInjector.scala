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
import za.co.absa.spline.model.op.Source
import za.co.absa.spline.persistence.api.DataLineageReader

import scala.concurrent.Await
import scala.concurrent.duration._

/**
  * The class injects into a lineage graph root meta data sets from related lineage graphs.
  *
  * @param reader A reader reading lineage graphs from persistence layer
  */
class ForeignMetaDatasetInjector(reader : DataLineageReader) extends Transformation[DataLineage] {

  /**
    * The method transforms an input instance by a custom logic.
    *
    * @param lineage An input lineage graph
    * @return A transformed result
    */
  override def apply(lineage: DataLineage): DataLineage = {
    val sOps = lineage.operations.withFilter(_.isInstanceOf[Source]).map(_.asInstanceOf[Source])
    val sOpsWithLineages = sOps.map(i => (i, i.paths.flatMap(j => Await.result(reader.loadLatest(j), 1 second))))
    val newOps = sOpsWithLineages.map{case (op, lineages) => op.updated(_.copy(inputs = lineages.map(_.rootDataset.id)))}
    val newOpsMap = newOps.map(i => i.mainProps.id -> i).toMap
    val newDatasetsWithAllAttributes = sOpsWithLineages.flatMap{case (_, lineages) => lineages.map(i => (i.rootDataset, i.attributes))}
    val newDatasets = newDatasetsWithAllAttributes.map{case (ds, _) => ds}
    val newAttributes = newDatasetsWithAllAttributes.flatMap{case (ds, attrs) => attrs.filter(i => ds.schema.attrs.contains(i.id))}

    lineage.copy(
      operations = lineage.operations.map(i => newOpsMap.getOrElse(i.mainProps.id, i)),
      datasets = lineage.datasets ++ newDatasets,
      attributes = lineage.attributes ++ newAttributes
    )
  }
}
