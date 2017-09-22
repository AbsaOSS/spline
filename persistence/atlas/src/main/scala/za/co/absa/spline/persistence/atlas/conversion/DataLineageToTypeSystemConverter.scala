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
import za.co.absa.spline.model._
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
    val hashSuffix = "_" + ???
    val nodesWithIndexes = lineage.operations.zipWithIndex
    val datasets = createDatasets(nodesWithIndexes, hashSuffix)
    val operations = createOperations(nodesWithIndexes, hashSuffix, datasets)
    val process = createProcess(lineage, hashSuffix, operations, datasets)
    datasets ++ operations ++ Seq(process)
  }

  private def createProcess(lineage: DataLineage, hashSuffix: String, operations : Seq[Operation] , datasets : Seq[Dataset]) : Referenceable = {
    val (inputDatasets, outputDatasets) = datasets
      .filter(_.isInstanceOf[EndpointDataset])
      .map(_.asInstanceOf[EndpointDataset])
      .partition(_.direction == EndpointDirection.input)

    new Job(
      lineage.id.toString,
      lineage.appName,
      lineage.appName + hashSuffix,
      operations.map(_.getId),
      datasets.map(_.getId),
      inputDatasets.map(_.getId),
      outputDatasets.map(_.getId),
      inputDatasets.map(_.endpoint.getId),
      outputDatasets.map(_.endpoint.getId)
    )
  }
  private def createDatasets(nodesWithIndexes: Seq[Tuple2[op.Operation,Int]], hashSuffix: String) : Seq[Dataset] =
    nodesWithIndexes.map(i =>
    {
      val datasetSuffix = "_Dataset"
      val name = i._1.mainProps.name + datasetSuffix
      val operationIdSuffix = "_op" + i._2.toString
      val qualifiedName = name + operationIdSuffix + hashSuffix
      val dataset = i._1 match {
        case op.Source(m, st, paths) =>
          val path = paths.mkString(", ")
          new EndpointDataset(name, qualifiedName, new FileEndpoint(path, path), EndpointType.file, EndpointDirection.input, st)
        case op.Destination(m, dt, path) => new EndpointDataset(name, qualifiedName, new FileEndpoint(path, path), EndpointType.file, EndpointDirection.output, dt)
        case _ => new Dataset(name, qualifiedName)
      }
      ??? //dataset.addAttributes(AttributeConverter.convert(i._1.mainProps.output, dataset))
      dataset
    })

  private def createOperations(nodesWithIndexes: Seq[Tuple2[op.Operation,Int]], hashSuffix: String, datasets : Seq[Dataset]) : Seq[Operation] = {
    val operations = nodesWithIndexes.map(i =>
        {
          val operationIdSuffix = "_op" + i._2
          val commonProperties = OperationCommonProperties(
            i._2,
            i._1.mainProps.name,
            i._1.mainProps.name + operationIdSuffix + hashSuffix,
            i._1.mainProps.rawString,
            ??? //i._1.mainProps.childRefs
          )
          i._1 match {
            case op.Join(_, c, t) =>  new JoinOperation(commonProperties, t, c.map(j => ExpressionConverter.convert(commonProperties.qualifiedName, j)).get)
            case op.Filter(_, c) => new FilterOperation(commonProperties, ExpressionConverter.convert(commonProperties.qualifiedName, c))
            case op.Projection(_, t) => new ProjectOperation(commonProperties, t.zipWithIndex.map(j => ExpressionConverter.convert(commonProperties.qualifiedName + "@" + j._2, j._1)))
            case op.Alias(_, a) => new AliasOperation(commonProperties, a)
            case _ => new Operation(commonProperties)
          }
        }
      )

    val datasetIds = datasets.map(_.getId)

    for(o <- operations){
      o.resolveInputDatasets(datasetIds)
      o.resolveOutputDatasets(datasetIds)
    }

    operations
  }
}
