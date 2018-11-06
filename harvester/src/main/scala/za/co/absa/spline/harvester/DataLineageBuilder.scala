/*
 * Copyright 2017 ABSA Group Limited
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
import org.apache.hadoop.fs.{FileSystem, Path}
import org.apache.spark
import org.apache.spark.SparkContext
import org.apache.spark.sql.catalyst.plans.logical._
import org.apache.spark.sql.execution.datasources.LogicalRelation
import org.apache.spark.sql.execution.streaming.{StreamingRelation, StreamingRelationV2}
import za.co.absa.spline.model._
import za.co.absa.spline.model.op.Operation
import za.co.absa.spline.sparkadapterapi.WriteCommandParser

class DataLineageBuilder
(
  sparkContext: SparkContext,
  hadoopConfiguration: Configuration,
  writeCommandParser: WriteCommandParser[LogicalPlan]) {

  private val componentCreatorFactory: ComponentCreatorFactory = new ComponentCreatorFactory

  def buildLineage(logicalPlan: LogicalPlan): DataLineage = {
    DataLineage(
      sparkContext.applicationId,
      sparkContext.appName,
      System.currentTimeMillis(),
      spark.SPARK_VERSION,
      getOperations(logicalPlan).reverse,
      componentCreatorFactory.metaDatasetConverter.values.reverse,
      componentCreatorFactory.attributeConverter.values,
      componentCreatorFactory.dataTypeConverter.values
    )
  }

  private def getOperations(rootOp: LogicalPlan): Seq[Operation] = {
    def traverseAndCollect(
                            accBuilders: Seq[OperationNodeBuilder],
                            processedEntries: Map[LogicalPlan, OperationNodeBuilder],
                            enqueuedEntries: Seq[(LogicalPlan, OperationNodeBuilder)]
                          ): Seq[OperationNodeBuilder] = {
      enqueuedEntries match {
        case Nil => accBuilders
        case (curOpNode, parentBuilder) :: restEnqueuedEntries =>
          val maybeExistingBuilder = processedEntries.get(curOpNode)
          val curBuilder = maybeExistingBuilder.getOrElse(createOperationBuilder(curOpNode))

          if (parentBuilder != null) parentBuilder += curBuilder

          if (maybeExistingBuilder.isEmpty) {
            val newNodesToProcess =
              writeCommandParser.
                asWriteCommandIfPossible(curOpNode).
                map(wc => Seq(wc.query)).
                getOrElse(curOpNode.children)

            traverseAndCollect(
              curBuilder +: accBuilders,
              processedEntries + (curOpNode -> curBuilder),
              newNodesToProcess.map(_ -> curBuilder) ++ restEnqueuedEntries)

          } else {
            traverseAndCollect(accBuilders, processedEntries, restEnqueuedEntries)
          }
      }
    }

    traverseAndCollect(Nil, Map.empty, Seq((rootOp, null))).map(_.build())
  }

  private def createOperationBuilder(op: LogicalPlan): OperationNodeBuilder = {
    implicit val ccf: ComponentCreatorFactory = componentCreatorFactory
    op match {
      case j: Join => new JoinNodeBuilder(j)
      case u: Union => new UnionNodeBuilder(u)
      case p: Project => new ProjectionNodeBuilder(p)
      case f: Filter => new FilterNodeBuilder(f)
      case s: Sort => new SortNodeBuilder(s)
      case s: Aggregate => new AggregateNodeBuilder(s)
      case a: SubqueryAlias => new AliasNodeBuilder(a)
      case lr: LogicalRelation => new ReadNodeBuilder(lr) with HDFSAwareBuilder
      case sr: StreamingRelation => new StreamReadNodeBuilder(sr)
      case sr: StreamingRelationV2 => new StreamReadV2NodeBuilder(sr)
      case wc if writeCommandParser.matches(op) =>
        new WriteNodeBuilder(writeCommandParser.asWriteCommand(wc)) with HDFSAwareBuilder
      case x => new GenericNodeBuilder(x)
    }
  }

  trait HDFSAwareBuilder extends FSAwareBuilder {
    override protected def getQualifiedPath(path: String): String = {
      val fsPath = new Path(path)
      val fs = FileSystem.get(hadoopConfiguration)
      val absolutePath = fsPath.makeQualified(fs.getUri, fs.getWorkingDirectory)
      absolutePath.toString
    }
  }

}
