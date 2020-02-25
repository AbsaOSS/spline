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
import org.apache.spark
import org.apache.spark.sql.catalyst.plans.logical._
import org.apache.spark.sql.execution.{LeafExecNode, SparkPlan}
import org.apache.spark.sql.{SaveMode, SparkSession}
import org.slf4s.LoggerFactory
import scalaz.Scalaz._
import za.co.absa.spline.common.extractors.SafeTypeMatchingExtractor
import za.co.absa.spline.common.{ReflectionUtils, SplineBuildInfo}
import za.co.absa.spline.harvester.LineageHarvester._
import za.co.absa.spline.harvester.ModelConstants.{AppMetaInfo, ExecutionEventExtra, ExecutionPlanExtra}
import za.co.absa.spline.harvester.builder.read.{ReadCommandExtractor, ReadNodeBuilder}
import za.co.absa.spline.harvester.builder.write.{WriteCommandExtractor, WriteNodeBuilder}
import za.co.absa.spline.harvester.builder.{GenericNodeBuilder, _}
import za.co.absa.spline.harvester.conf.SplineConfigurer.SplineMode
import za.co.absa.spline.harvester.conf.SplineConfigurer.SplineMode.SplineMode
import za.co.absa.spline.harvester.qualifier.HDFSPathQualifier
import za.co.absa.spline.producer.model._

import scala.util.{Failure, Success, Try}

class LineageHarvester(logicalPlan: LogicalPlan, executedPlanOpt: Option[SparkPlan], session: SparkSession)
  (hadoopConfiguration: Configuration, splineMode: SplineMode) {

  private val logger = LoggerFactory.getLogger(getClass.getSimpleName)

  implicit private val componentCreatorFactory: ComponentCreatorFactory = new ComponentCreatorFactory

  private val pathQualifier = new HDFSPathQualifier(hadoopConfiguration)
  private val writeCommandExtractor = new WriteCommandExtractor(pathQualifier, session)
  private val readCommandExtractor = new ReadCommandExtractor(pathQualifier, session)

  def harvest(): HarvestResult = {
    val (readMetrics: Metrics, writeMetrics: Metrics) = executedPlanOpt.
      map(getExecutedReadWriteMetrics).
      getOrElse((Map.empty, Map.empty))

    val maybeCommand = Try(writeCommandExtractor.asWriteCommand(logicalPlan)) match {
      case Success(result) => result
      case Failure(e) => splineMode match {
        case SplineMode.REQUIRED =>
          throw e
        case SplineMode.BEST_EFFORT =>
          logger.warn(e.getMessage)
          None
      }
    }

    maybeCommand.flatMap(writeCommand => {
      val writeOpBuilder = new WriteNodeBuilder(writeCommand)
      val restOpBuilders = createOperationBuildersRecursively(writeCommand.query)

      restOpBuilders.lastOption.foreach(writeOpBuilder.+=)

      val writeOp = writeOpBuilder.build()
      val restOps = restOpBuilders.map(_.build())

      val (opReads, opOthers) =
        ((Vector.empty[ReadOperation], Vector.empty[DataOperation]) /: restOps) {
          case ((accRead, accOther), opRead: ReadOperation) => (accRead :+ opRead, accOther)
          case ((accRead, accOther), opOther: DataOperation) => (accRead, accOther :+ opOther)
        }

      val plan = ExecutionPlan(
        id = UUID.randomUUID,
        operations = Operations(writeOp, opReads, opOthers),
        systemInfo = SystemInfo(AppMetaInfo.Spark, spark.SPARK_VERSION),
        agentInfo = Some(AgentInfo(AppMetaInfo.Spline, SplineBuildInfo.Version)),
        extraInfo = Map(
          ExecutionPlanExtra.AppName -> session.sparkContext.appName,
          ExecutionPlanExtra.DataTypes -> componentCreatorFactory.dataTypeConverter.values,
          ExecutionPlanExtra.Attributes -> componentCreatorFactory.attributeConverter.values
        )
      )

      if (writeCommand.mode == SaveMode.Ignore) None
      else Some(plan -> ExecutionEvent(
        planId = plan.id,
        timestamp = System.currentTimeMillis(),
        error = None,
        extra = Map(
          ExecutionEventExtra.AppId -> session.sparkContext.applicationId,
          ExecutionEventExtra.ReadMetrics -> readMetrics,
          ExecutionEventExtra.WriteMetrics -> writeMetrics
        )))
    })
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

            val newNodesToProcess = extractChildren(curOpNode)

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

  private def createOperationBuilder(op: LogicalPlan): OperationNodeBuilder =
    readCommandExtractor.asReadCommand(op)
      .map(new ReadNodeBuilder(_))
      .getOrElse(new GenericNodeBuilder(op))

  private def extractChildren(plan: LogicalPlan) = plan match {
    case AnalysisBarrierExtractor(_) => {
      // special handling - spark 2.3 sometimes includes AnalysisBarrier in the plan
      val child = ReflectionUtils.extractFieldValue[LogicalPlan](plan, "child")
      Seq(child)
    }
    case _ => plan.children
  }
}

object LineageHarvester {
  private type Metrics = Map[String, Long]
  private type HarvestResult = Option[(ExecutionPlan, ExecutionEvent)]

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

  object AnalysisBarrierExtractor extends SafeTypeMatchingExtractor[LogicalPlan](
    "org.apache.spark.sql.catalyst.plans.logical.AnalysisBarrier")

}
