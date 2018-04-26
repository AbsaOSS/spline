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

package za.co.absa.spline.harvester

import org.apache.hadoop.conf.Configuration
import org.apache.spark.SparkContext
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import za.co.absa.spline.sparkadapterapi.WriteCommandParser
import za.co.absa.spline.harvester.conversion.{AttributeFactory, MetaDatasetFactory, OperationNodeBuilder, OperationNodeBuilderFactory}
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.model.op.Operation

import scala.collection.mutable
import scala.language.postfixOps

/** The class is responsible for gathering lineage information from Spark logical plan
  *
  * @param hadoopConfiguration A hadoop configuration
  */
class LogicalPlanLineageHarvester(hadoopConfiguration: Configuration) {

  private val writeCommandParser = WriteCommandParser.instance

  /** A main method of the object that performs transformation of Spark internal structures to library lineage representation.
    *
    * @param sparkContext a spark context
    * @param logicalPlan  a logical plan with resolved references (analyzed plan)
    * @return A lineage representation
    */
  def harvestLineage(sparkContext: SparkContext, logicalPlan: LogicalPlan): DataLineage = {
    val attributeFactory = new AttributeFactory()
    val metaDatasetFactory = new MetaDatasetFactory(attributeFactory)
    val operationNodeBuilderFactory = new OperationNodeBuilderFactory()(hadoopConfiguration, metaDatasetFactory)
    val nodes = harvestOperationNodes(logicalPlan, operationNodeBuilderFactory)

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
      val currentPosition = visitedNodes get currentOperation
      val currentNode: OperationNodeBuilder[_] = currentPosition match {
        case Some(pos) => result(pos)
        case None =>
          val newNode = operationNodeBuilderFactory.create(currentOperation)
          val pos = result.size
          visitedNodes += (currentOperation -> pos)
          result += newNode
          currentOperation match {
            case x if writeCommandParser.matches(x) => stack.push((writeCommandParser.asWriteCommand(x).query, pos))
            case x => x.children.reverse.map(op => stack.push((op, pos)))
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
