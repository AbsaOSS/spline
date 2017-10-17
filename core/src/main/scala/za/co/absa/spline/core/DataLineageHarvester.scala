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

package za.co.absa.spline.core

import org.apache.hadoop.conf.Configuration
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.QueryExecution
import org.apache.spark.sql.execution.datasources.SaveIntoDataSourceCommand
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.model.op.Operation

import scala.collection.mutable
import scala.language.postfixOps

/** The class is responsible for gathering lineage information from Spark internal structures (logical plan, physical plan, etc.)
  *
  * @param hadoopConfiguration A hadoop configuration
  */
class DataLineageHarvester(hadoopConfiguration: Configuration) {


  /** A main method of the object that performs transformation of Spark internal structures to library lineage representation.
    *
    * @param queryExecution An instance holding Spark internal structures (logical plan, physical plan, etc.)
    * @return A lineage representation
    */
  def harvestLineage(queryExecution: QueryExecution): DataLineage = {
    val attributeFactory = new AttributeFactory()
    val metaDatasetFactory = new MetaDatasetFactory(attributeFactory)
    val operationNodeBuilderFactory = new OperationNodeBuilderFactory(hadoopConfiguration, metaDatasetFactory)
    val nodes = harvestOperationNodes(queryExecution.analyzed, operationNodeBuilderFactory)

    val sparkContext = queryExecution.sparkSession.sparkContext

    DataLineage(
      sparkContext.applicationId,
      sparkContext.appName,
      System.currentTimeMillis(),
      nodes,
      metaDatasetFactory.getAll(),
      attributeFactory.getAll()
    )
  }

  private def harvestOperationNodes(logicalPlan: LogicalPlan, operationNodeBuilderFactory: OperationNodeBuilderFactory): Seq[Operation] = {
    val result = mutable.ArrayBuffer[OperationNodeBuilder[_]]()
    val stack = mutable.Stack[(LogicalPlan, Int)]((logicalPlan, -1))
    val visitedNodes = mutable.Map[LogicalPlan, Int]()

    while (stack.nonEmpty) {
      val (currentOperation, parentPosition) = stack.pop()
      var currentPosition = visitedNodes get currentOperation
      val currentNode: OperationNodeBuilder[_] = currentPosition match {
        case Some(pos) => result(pos)
        case None =>
          val newNode = operationNodeBuilderFactory.create(currentOperation)
          visitedNodes += (currentOperation -> result.size)
          currentPosition = Some(result.size)
          result += newNode
          currentOperation match {
            case x: SaveIntoDataSourceCommand => stack.push((x.query, currentPosition.get))
            case x => x.children.reverse.map(op => stack.push((op, currentPosition.get)))
          }
          newNode
      }

      if (parentPosition >= 0) {
        val parent = result(parentPosition)
        parent.inputMetaDatasets += currentNode.outputMetaDataset
      }
    }
    result.map(i => i.build())
  }
}
