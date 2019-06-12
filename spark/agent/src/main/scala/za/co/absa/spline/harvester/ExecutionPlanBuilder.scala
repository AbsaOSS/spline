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
import org.apache.spark.sql.catalyst.plans.logical.{LogicalPlan, _}
import org.apache.spark.sql.execution.SparkPlan
import org.apache.spark.sql.execution.datasources.LogicalRelation
import za.co.absa.spline.sparkadapterapi.{StreamingRelationVersionAgnostic, WriteCommandParserFactory, WriteCommandParserNew, _}

import scala.collection.mutable
import za.co.absa.spline.producer.rest.model._
import java.util.UUID

class ExecutionPlanBuilder(logicalPlan: LogicalPlan, executedPlanOpt: Option[SparkPlan], sparkContext: SparkContext)
                          (hadoopConfiguration: Configuration, writeCommandParserFactory: WriteCommandParserFactory) {



  def buildExecutionPlan(): Option[ExecutionPlan] = {
    val traversal = new DagTraversal(sparkContext)
    traversal.operations(logicalPlan)

    val writeIgnored = traversal.write match {
      case rootNode: RootNode => rootNode.ignoreLineageWrite
      case _ => false
    }


    val extraInfo = Map.empty[String, Any]
    val newId = UUID.randomUUID
    val agentInfo = Some(new AgentInfo("spline", "4.0"))

    writeIgnored match {
      case true => None
      case false =>

        Some(
          ExecutionPlan(
            newId,
            Operations(traversal.reads, traversal.write, traversal.others),
            new SystemInfo("Spark", spark.SPARK_VERSION),
            agentInfo,
            extraInfo
          )
        )
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


  class DagTraversal(sparkContext : SparkContext) {

    private implicit val componentCreatorFactory: ComponentCreatorFactory = new ComponentCreatorFactory

    val reads = mutable.ListBuffer[ReadOperation]()
    var write: WriteOperation = null
    val others = mutable.ListBuffer[DataOperation]()

    val alreadyBrowsed = mutable.Map[LogicalPlan, OperationNodeBuilder]()

    var stack = mutable.Stack[LogicalPlan]()

    def operations(rootOp: LogicalPlan) = {
      stack.push(rootOp)
      while (!stack.isEmpty) traverse(stack.pop)

      for (x <- alreadyBrowsed.values) {
        x.build() match {
          case readOp: ReadOperation => reads += readOp
          case writeOp: WriteOperation => write = writeOp
          case dataOp: DataOperation => others += dataOp
        }
      }
    }

    val parsers: Seq[WriteCommandParserNew[LogicalPlan]] = WriteCommandParserFactory.instance.createParsers(sparkContext)

    object runPipeline {

      def unapply(op: LogicalPlan): Option[OperationNodeBuilder] = {
        parsers
          .map(parser => parser.execute(op))
          .collectFirst { case Some(parserResult) => parserResult }
      }
    }

    def createOperationBuilder(op: LogicalPlan): OperationNodeBuilder = {
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
        case runPipeline(pipelineResult) => pipelineResult
        case x : Any => new GenericNodeBuilder(x)
      }
    }

    def traverse(plan: LogicalPlan): Unit = {

      val maybeExisting = alreadyBrowsed.get(plan)
      maybeExisting match {
        case None => {
          val builder = createOperationBuilder(plan)
          alreadyBrowsed.put(plan, builder)
          for (child <- builder.getChildPlans()) stack = stack.push(child)
        }
        case _: Some[_] => //do nothing
      }


    }
  }


}




