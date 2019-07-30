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

import java.util.UUID

import org.apache.hadoop.conf.Configuration
import org.apache.hadoop.fs.{FileSystem, Path}
import org.apache.spark
import org.apache.spark.SparkContext
import org.apache.spark.sql.catalyst.plans.logical._
import org.apache.spark.sql.execution.datasources.LogicalRelation
import org.apache.spark.sql.execution.{LeafExecNode, SparkPlan}
import scalaz.Scalaz._
import za.co.absa.spline.common.SplineBuildInfo
import za.co.absa.spline.harvester.LineageHarvester._
import za.co.absa.spline.harvester.ModelConstants.{AppMetaInfo, ExecutionEventExtra, ExecutionPlanExtra}
import za.co.absa.spline.producer.rest.model._
import za.co.absa.spline.spark.adapter.{AbstractWriteCommand, SaveAsTableCommand, WriteCommandParserFactory, WriteToPathCommand}

class LineageHarvester(logicalPlan: LogicalPlan, executedPlanOpt: Option[SparkPlan], sparkContext: SparkContext)
  (hadoopConfiguration: Configuration, writeCommandParserFactory: WriteCommandParserFactory) {

  implicit private val componentCreatorFactory: ComponentCreatorFactory = new ComponentCreatorFactory

  private val writeCommandParsers = Array(
    writeCommandParserFactory.jdbcParser(),
    writeCommandParserFactory.saveAsTableParser(sparkContext.getConf.getOption("spark.master")),
    writeCommandParserFactory.writeParser())

  def harvest(): HarvestResult = {
    val writeCommand: AbstractWriteCommand = writeCommandParsers
      .collectFirst { case p if p matches logicalPlan => p.asWriteCommand(logicalPlan) }
      .getOrElse(sys.error(s"Unsupported write command: ${logicalPlan.getClass}"))

    val writeOpBuilder = createOperationBuilder(writeCommand)
    val restOpBuilders = createOperationBuildersRecursively(writeCommand.query)

    restOpBuilders.headOption.foreach(writeOpBuilder.+=)

    val writeOp = writeOpBuilder.build()
    val restOps = restOpBuilders.map(_.build())

    val (opReads, opOthers) =
      ((Vector.empty[ReadOperation], Vector.empty[DataOperation]) /: restOps) {
        case ((accRead, accOther), opRead: ReadOperation) => (accRead :+ opRead, accOther)
        case ((accRead, accOther), opOther: DataOperation) => (accRead, accOther :+ opOther)
      }

    val lineage = ExecutionPlan(
      id = UUID.randomUUID,
      operations = Operations(opReads, writeOp, opOthers),
      systemInfo = SystemInfo(AppMetaInfo.Spark, spark.SPARK_VERSION),
      agentInfo = Some(AgentInfo(AppMetaInfo.Spline, SplineBuildInfo.version)),
      extraInfo = Map(
        ExecutionPlanExtra.AppName -> sparkContext.appName,
        ExecutionPlanExtra.DataTypes -> componentCreatorFactory.dataTypeConverter.values,
        ExecutionPlanExtra.Attributes -> componentCreatorFactory.attributeConverter.values
      )
    )

    (
      lineage,
      if (writeOpBuilder.wasIgnored) None
      else Some(ExecutionEvent(
        planId = lineage.id,
        timestamp = System.currentTimeMillis(),
        error = None,
        extra = Map(
          ExecutionEventExtra.AppId -> sparkContext.applicationId,
          ExecutionEventExtra.ReadMetrics -> writeOpBuilder.readMetrics,
          ExecutionEventExtra.WriteMetrics -> writeOpBuilder.writeMetrics
        )))
    )
  }

  private def createOperationBuildersRecursively(rootOp: LogicalPlan): Seq[OperationNodeBuilder] = {
    @scala.annotation.tailrec
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

            val newNodesToProcess = curOpNode.children

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

  private def createOperationBuilder(writeCommand: AbstractWriteCommand): OperationNodeBuilder with WriteNodeBuilder = {
    val (readMetrics: Metrics, writeMetrics: Metrics) = executedPlanOpt.
      map(getExecutedReadWriteMetrics).
      getOrElse((Map.empty, Map.empty))

    writeCommand match {
      case cmd: SaveAsTableCommand => new SaveAsTableNodeBuilder(cmd, writeMetrics, readMetrics)
      case cmd: WriteToPathCommand => new FSWriteNodeBuilder(cmd, writeMetrics, readMetrics) with HDFSAwareBuilder
    }
  }

  private def createOperationBuilder(op: LogicalPlan): OperationNodeBuilder = op match {
    case lr: LogicalRelation => new FSReadNodeBuilder(lr) with HDFSAwareBuilder
    case _ => new GenericNodeBuilder(op)
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

object LineageHarvester {
  private type Metrics = Map[String, Long]
  private type HarvestResult = (ExecutionPlan, Option[ExecutionEvent])

  private def getExecutedReadWriteMetrics(executedPlan: SparkPlan): (Metrics, Metrics) = {
    def getNodeMetrics(node: SparkPlan): Metrics = node.metrics.mapValues(_.value)

    val cumulatedReadMetrics: Metrics = {
      @scala.annotation.tailrec
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
