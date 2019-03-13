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
import org.apache.spark.sql.execution.{LeafExecNode, SparkPlan}
import scalaz.Scalaz._
import za.co.absa.spline.harvester.DataLineageBuilder._
import za.co.absa.spline.sparkadapterapi._
import za.co.absa.spline.core.harvester.DataLineageBuilder._
import za.co.absa.spline.coresparkadapterapi._
import za.co.absa.spline.model._

class DataLineageBuilder(logicalPlan: LogicalPlan, executedPlanOpt: Option[SparkPlan], sparkContext: SparkContext)
                        (hadoopConfiguration: Configuration, writeCommandParserFactory: WriteCommandParserFactory) {

  private val componentCreatorFactory: ComponentCreatorFactory = new ComponentCreatorFactory

  private val writeCommandParser = writeCommandParserFactory.writeParser()
  private val clusterUrl: Option[String] = sparkContext.getConf.getOption("spark.master")
  private val tableCommandParser = writeCommandParserFactory.saveAsTableParser(clusterUrl)
  private val jdbcCommandParser = writeCommandParserFactory.jdbcParser()

  def buildLineage(): Option[DataLineage] = {
    val builders = getOperations(logicalPlan)
    val someRootBuilder = builders.lastOption

    val writeIgnored = someRootBuilder match {
      case Some(rootNode:RootNode) => rootNode.ignoreLineageWrite
      case _ => false
    }

    val operations = builders.map(_.build())

    writeIgnored match {
      case true => None
      case false =>
        Some(
          DataLineage(
            sparkContext.applicationId,
            sparkContext.appName,
            System.currentTimeMillis(),
            spark.SPARK_VERSION,
            operations.reverse,
            componentCreatorFactory.metaDatasetConverter.values.reverse,
            componentCreatorFactory.attributeConverter.values,
            componentCreatorFactory.dataTypeConverter.values
          )
        )
    }
  }

    private def getOperations(rootOp: LogicalPlan): Seq[OperationNodeBuilder] = {
    def traverseAndCollect(
                            accBuilders: Seq[OperationNodeBuilder],
                            processedEntries: Map[LogicalPlan, OperationNodeBuilder],
                            enqueuedEntries: Seq[(LogicalPlan, OperationNodeBuilder)]
                          ): Seq[OperationNodeBuilder] = {
      enqueuedEntries match {
        case Nil => accBuilders
        case (curOpNode, parentBuilder) +: restEnqueuedEntries =>
          val maybeExistingBuilder = processedEntries.get(curOpNode)
          val curBuilder = maybeExistingBuilder.getOrElse(createOperationBuilder(curOpNode))

          if (parentBuilder != null) parentBuilder += curBuilder

          if (maybeExistingBuilder.isEmpty) {

            val parsers = Array(jdbcCommandParser, writeCommandParser, tableCommandParser)

            val maybePlan: Option[LogicalPlan] = parsers.
              map(_.asWriteCommandIfPossible(curOpNode)).
              collectFirst {
                case Some(wc) => wc.query
              }

            val newNodesToProcess: Seq[LogicalPlan] =
              maybePlan match {
                case Some(q) => Seq(q)
                case None => curOpNode.children
              }

            traverseAndCollect(
              curBuilder +: accBuilders,
              processedEntries + (curOpNode -> curBuilder),
              newNodesToProcess.map(_ -> curBuilder) ++ restEnqueuedEntries)

          } else {
            traverseAndCollect(accBuilders, processedEntries, restEnqueuedEntries)
          }
      }
    }

      traverseAndCollect(Nil, Map.empty, Seq((rootOp, null)))
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
      case StreamingRelationVersionAgnostic(dataSourceInfo) => new StreamReadNodeBuilder(op)
      case wc if jdbcCommandParser.matches(op) =>
        val (readMetrics: Metrics, writeMetrics: Metrics) = getMetrics()
        val tableCmd = jdbcCommandParser.asWriteCommand(wc).asInstanceOf[SaveJDBCCommand]
        new SaveJDBCCommandNodeBuilder(tableCmd, writeMetrics, readMetrics)
      case wc if writeCommandParser.matches(op) =>
        val (readMetrics: Metrics, writeMetrics: Metrics) = getMetrics()
        val writeCmd = writeCommandParser.asWriteCommand(wc).asInstanceOf[WriteCommand]
        new BatchWriteNodeBuilder(writeCmd, writeMetrics, readMetrics) with HDFSAwareBuilder
      case wc if tableCommandParser.matches(op) =>
        val (readMetrics: Metrics, writeMetrics: Metrics) = getMetrics()
        val tableCmd = tableCommandParser.asWriteCommand(wc).asInstanceOf[SaveAsTableCommand]
        new SaveAsTableNodeBuilder(tableCmd, writeMetrics, readMetrics)
      case x => new GenericNodeBuilder(x)
    }
  }

  private def getMetrics(): (Metrics, Metrics) = {
    executedPlanOpt.
      map(getExecutedReadWriteMetrics).
      getOrElse((Map.empty, Map.empty))
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

object DataLineageBuilder {
  private type Metrics = Map[String, Long]

  private def getExecutedReadWriteMetrics(executedPlan: SparkPlan): (Metrics, Metrics) = {
    def getNodeMetrics(node: SparkPlan): Metrics = node.metrics.mapValues(_.value)

    val cumulatedReadMetrics: Metrics = {
      def traverseAndCollect(acc: Metrics, nodes: Seq[SparkPlan]): Metrics = {
        nodes match {
          case Nil => acc
          case (leaf: LeafExecNode) +: queue =>
            traverseAndCollect(acc |+| getNodeMetrics(leaf), queue)
          case (node: SparkPlan) +: queue =>
            traverseAndCollect(acc, node.children ++ queue)
        }
      }

      traverseAndCollect(Map.empty, Seq(executedPlan))
    }

    (cumulatedReadMetrics, getNodeMetrics(executedPlan))
  }
}
