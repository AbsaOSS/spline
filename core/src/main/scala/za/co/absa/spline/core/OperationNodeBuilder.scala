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

import za.co.absa.spline.model._
import org.apache.spark.sql.catalyst.plans.logical._
import org.apache.spark.sql.execution.datasources.{HadoopFsRelation, LogicalRelation, SaveIntoDataSourceCommand}
import org.apache.spark.sql.internal.SQLConf
import org.apache.spark.sql.sources.BaseRelation

import scala.collection.mutable

/**
  * The object represents a factory creating a specific node builders for a particular operations from Spark logical plan.
  */
private object OperationNodeBuilderFactory {

  /**
    * Creates a specific node builders for a particular operations from Spark logical plan.
    *
    * @param logicalPlan An input operation from Spark logical plan
    * @return A specific node builder
    */
  def create(logicalPlan: LogicalPlan): OperationNodeBuilder[_] = logicalPlan match {
    case j: Join => new JoinNodeBuilder(j)
    case p: Project => new ProjectionNodeBuilder(p)
    case f: Filter => new FilterNodeBuilder(f)
    case a: SubqueryAlias => new AliasNodeBuilder(a)
    case sc: SaveIntoDataSourceCommand => new DestinationNodeBuilder(sc)
    case lr: LogicalRelation => new SourceNodeBuilder(lr)
    case x => new GenericNodeBuilder(x)
  }
}

/**
  * The trait represents a builder that collections information for a creation of an operation node.
  *
  * @tparam OpType A type of a node from the Spark logical plan.
  */
sealed private trait OperationNodeBuilder[OpType <: LogicalPlan] extends DataTypeMapper {

  /**
    * A type of a node from the Spark logical plan.
    */
  val operation: OpType

  /**
    * A collection of attributes outgoing from the produced operation node
    */
  val output: Option[Attributes] = createOutputAttributes(operation)

  /**
    * A collection of incoming attributes
    */
  val input: mutable.ListBuffer[Attributes] = mutable.ListBuffer[Attributes]()

  /**
    * Indexes of parent operation nodes
    */
  val parentRefs: mutable.ListBuffer[Int] = mutable.ListBuffer[Int]()

  /**
    * Indexes of child operation nodes
    */
  val childRefs: mutable.ListBuffer[Int] = mutable.ListBuffer[Int]()

  /**
    * The method produces an operation node based on gathered information
    *
    * @return An operation node
    */
  def build(): OperationNode

  /**
    * Gets statistics for one operation from Spark logical plan.
    *
    * @param operation An operation from Spark logical plan
    * @return Statistics for Spark operation
    */
  def getStats(operation: LogicalPlan): String =
    operation.stats(new SQLConf {
      setConfString(SQLConf.CASE_SENSITIVE.key, true.toString)
    }).simpleString

  /**
    * Harvests output attributes from a specific Spark operation
    *
    * @param operation - An input logical plan
    * @return A list of output attributes
    */
  def createOutputAttributes(operation: LogicalPlan) = Some(
    Attributes(operation.output.map(i => Attribute(i.exprId.id, i.name, fromSparkDataType(i.dataType, i.nullable)))))

  protected def buildNodeProps() = NodeProps(
    operation.nodeName,
    operation.verboseString,
    input.result,
    output,
    parentRefs.result,
    childRefs.result)

}

/**
  * The class represents a builder of generic nodes that are equivalents for Spark operations for which a specific operation node hasn't been created.
  *
  * @param operation An input Spark operation
  */
private class GenericNodeBuilder(val operation: LogicalPlan) extends OperationNodeBuilder[LogicalPlan] {
  def build(): OperationNode = GenericNode(buildNodeProps())
}


/**
  * The class represents a builder of operations nodes dedicated for Spark alias operation.
  *
  * @param operation An input Spark alias operation
  */
private class AliasNodeBuilder(val operation: SubqueryAlias) extends OperationNodeBuilder[SubqueryAlias] {
  def build(): OperationNode = AliasNode(buildNodeProps(), operation.alias)
}

/**
  * The class represents a builder of operations nodes dedicated for Spark load operation.
  *
  * @param operation An input Spark load operation
  */
private class SourceNodeBuilder(val operation: LogicalRelation) extends OperationNodeBuilder[LogicalRelation] {
  def build(): OperationNode = {
    val (sourceType, paths) = getRelationPaths(operation.relation)
    SourceNode(buildNodeProps(), sourceType, paths)
  }

  private def getRelationPaths(relation: BaseRelation) = relation match {
    case hfsr: HadoopFsRelation => (
      hfsr.fileFormat.toString,
      hfsr.location.rootPaths.map(_.toString)
    )
  }
}

/**
  * The class represents a builder of operations nodes dedicated for Spark persist operation.
  *
  * @param operation An input Spark persist operation
  */
private class DestinationNodeBuilder(val operation: SaveIntoDataSourceCommand) extends OperationNodeBuilder[SaveIntoDataSourceCommand] {
  def build(): OperationNode = {
    DestinationNode(
      buildNodeProps() copy (output = None), // output is meaningless for a terminal node
      operation.provider,
      operation.options.getOrElse("path", ""))
  }
}

/**
  * The class represents a builder of operations nodes dedicated for Spark project operation.
  *
  * @param operation An input Spark project operation
  */
private class ProjectionNodeBuilder(val operation: Project) extends OperationNodeBuilder[Project] with ExpressionMapper {
  def build(): OperationNode = {
    val transformations = operation.projectList
      .map(fromSparkExpression)
      .filterNot(_.isInstanceOf[AttributeReference])
      .union(resolveAttributeRemovals())

    ProjectionNode(
      buildNodeProps(),
      transformations)
  }

  private def resolveAttributeRemovals(): Seq[Expression] = {
    val inputAttrs = input flatMap (_.seq)
    val outputAttrs = output map (_.seq) getOrElse Nil
    inputAttrs diff outputAttrs map (AttributeReference(_)) map (AttributeRemoval(_))
  }
}


/**
  * The class represents a builder of operations nodes dedicated for Spark filter operation.
  *
  * @param operation An input Spark filter operation
  */
private class FilterNodeBuilder(val operation: Filter) extends OperationNodeBuilder[Filter] with ExpressionMapper {
  def build(): OperationNode = FilterNode(
    buildNodeProps(),
    operation.condition)
}

/**
  * The class represents a builder of operations nodes dedicated for Spark join operation.
  *
  * @param operation An input Spark join operation
  */
private class JoinNodeBuilder(val operation: Join) extends OperationNodeBuilder[Join] with ExpressionMapper {
  def build(): OperationNode = {
    JoinNode(
      buildNodeProps(),
      operation.condition map fromSparkExpression,
      operation.joinType.toString)
  }
}


