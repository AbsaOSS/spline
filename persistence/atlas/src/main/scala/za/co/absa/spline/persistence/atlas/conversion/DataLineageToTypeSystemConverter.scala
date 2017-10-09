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

package za.co.absa.spline.persistence.atlas.conversion

import org.apache.atlas.typesystem.Referenceable
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.atlas.model._

/**
  * The object is responsible for conversion of [[za.co.absa.spline.model.DataLineage Spline lineage model]] to Atlas entities.
  */
object DataLineageToTypeSystemConverter {

  /**
    * The method converts [[za.co.absa.spline.model.DataLineage Spline lineage model]] to Atlas entities.
    * @param lineage An input Spline lineage model
    * @return Atlas entities
    */
  def convert(lineage: DataLineage): Seq[Referenceable] = {
    val attributes = lineage.attributes.map(i => AttributeConverter.convert(i))
    val attributeIdMap = attributes.map(i => i.qualifiedName -> i.getId).toMap
    val datasets = DatasetConverter.convert(lineage.operations, lineage.datasets, attributeIdMap)
    val datasetIdMap = datasets.map(i => i.qualifiedName -> i.getId).toMap
    val operations = OperationConverter.convert(lineage.operations, datasetIdMap, attributeIdMap)
    val process = createProcess(lineage, operations, datasets, attributes)
    attributes ++ datasets ++ operations :+ process
  }

  private def createProcess(lineage: DataLineage, operations : Seq[Operation] , datasets : Seq[Dataset], attributes: Seq[Attribute]) : Referenceable = {
    val (inputDatasets, outputDatasets) = datasets
      .filter(_.isInstanceOf[EndpointDataset])
      .map(_.asInstanceOf[EndpointDataset])
      .partition(_.direction == EndpointDirection.input)

    new Job(
      lineage.id.toString,
      lineage.appName,
      lineage.id.toString,
      operations.map(_.getId),
      datasets.map(_.getId),
      inputDatasets.map(_.getId),
      outputDatasets.map(_.getId),
      inputDatasets.map(_.endpoint.getId),
      outputDatasets.map(_.endpoint.getId)
    )
  }
  }
