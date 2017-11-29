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

import java.util.UUID
import java.util.UUID.randomUUID

import com.databricks.spark.xml.XmlRelation
import org.apache.hadoop.conf.Configuration
import org.apache.spark.sql.catalyst.expressions.SortOrder
import org.apache.spark.sql.catalyst.plans.logical._
import org.apache.spark.sql.execution.datasources.{HadoopFsRelation, LogicalRelation, SaveIntoDataSourceCommand}
import org.apache.spark.sql.sources.BaseRelation
import za.co.absa.spline.model.op.MetaDataSource
import za.co.absa.spline.model.{op, _}

import scala.collection.mutable

/**
  * The class represents a factory creating a specific node builders for a particular operations from Spark logical plan.
  *
  * @param hadoopConfiguration A hadoop configuration
  * @param metaDatasetFactory  A factory of meta data sets
  */
class OperationNodeBuilderFactory(implicit hadoopConfiguration: Configuration, metaDatasetFactory: MetaDatasetFactory) {

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
    case s: Sort => new SortNodeBuilder(s)
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
sealed trait OperationNodeBuilder[OpType <: LogicalPlan] extends DataTypeMapper {

  /**
    * A type of a node from the Spark logical plan.
    */
  val operation: OpType

  /**
    * A meta data set factory
    */
  val metaDatasetFactory: MetaDatasetFactory

  /**
    * An Attribute factory
    */
  val attributeFactory: AttributeFactory = metaDatasetFactory.attributeFactory

  /**
    * ID of child meta data set
    */
  val outputMetaDataset: UUID = metaDatasetFactory.create(operation)

  /**
    * IDs of parent meta data sets
    */
  val inputMetaDatasets: mutable.ListBuffer[UUID] = mutable.ListBuffer[UUID]()

  /**
    * The method produces an operation node based on gathered information
    *
    * @return An operation node
    */
  def build(): op.Operation


  protected def buildOperationProps() = op.OperationProps(
    randomUUID,
    operation.nodeName,
    inputMetaDatasets.toList,
    outputMetaDataset
  )

}

/**
  * The class represents a builder of generic nodes that are equivalents for Spark operations for which a specific operation node hasn't been created.
  *
  * @param operation          An input Spark operation
  * @param metaDatasetFactory A factory of meta data sets
  */
private class GenericNodeBuilder(val operation: LogicalPlan)
                                (implicit val metaDatasetFactory: MetaDatasetFactory) extends OperationNodeBuilder[LogicalPlan] {
  def build(): op.Operation = op.Generic(buildOperationProps(), operation.verboseString)
}


/**
  * The class represents a builder of operations nodes dedicated for Spark alias operation.
  *
  * @param operation          An input Spark alias operation
  * @param metaDatasetFactory A factory of meta data sets
  */
private class AliasNodeBuilder(val operation: SubqueryAlias)
                              (implicit val metaDatasetFactory: MetaDatasetFactory) extends OperationNodeBuilder[SubqueryAlias] {
  def build(): op.Operation = op.Alias(buildOperationProps(), operation.alias)
}

/**
  * The class represents a builder of operations nodes dedicated for Spark load operation.
  *
  * @param operation           An input Spark load operation
  * @param hadoopConfiguration A hadoop configuration
  * @param metaDatasetFactory  A factory of meta data sets
  */
private class SourceNodeBuilder(val operation: LogicalRelation)
                               (implicit hadoopConfiguration: Configuration, val metaDatasetFactory: MetaDatasetFactory) extends OperationNodeBuilder[LogicalRelation] {
  def build(): op.Operation = {
    val (sourceType, paths) = getRelationPaths(operation.relation)
    op.Read(
      buildOperationProps(),
      sourceType,
      paths.map(path => MetaDataSource(PathUtils.getQualifiedPath(hadoopConfiguration)(path), None))
    )
  }

  private def getRelationPaths(relation: BaseRelation): (String, Seq[String]) = relation match {
    case hfsr: HadoopFsRelation => (
      hfsr.fileFormat.toString,
      hfsr.location.rootPaths.map(_.toString)
    )
    case xmlr: XmlRelation => (
      "XML",
      xmlr.location.toSeq
    )
  }
}

/**
  * The class represents a builder of operations nodes dedicated for Spark persist operation.
  *
  * @param operation           An input Spark persist operation
  * @param hadoopConfiguration A hadoop configuration
  * @param metaDatasetFactory  A factory of meta data sets
  */
private class DestinationNodeBuilder(val operation: SaveIntoDataSourceCommand)
                                    (implicit hadoopConfiguration: Configuration, val metaDatasetFactory: MetaDatasetFactory) extends OperationNodeBuilder[SaveIntoDataSourceCommand] {

  override val outputMetaDataset: UUID = metaDatasetFactory.create(operation.query)

  def build(): op.Operation = {
    op.Write(
      buildOperationProps(),
      operation.provider,
      PathUtils.getQualifiedPath(hadoopConfiguration)(operation.options.getOrElse("path", ""))
    )
  }
}

/**
  * The class represents a builder of operations nodes dedicated for Spark project operation.
  *
  * @param operation          An input Spark project operation
  * @param metaDatasetFactory A factory of meta data sets
  */
private class ProjectionNodeBuilder(val operation: Project)
                                   (implicit val metaDatasetFactory: MetaDatasetFactory) extends OperationNodeBuilder[Project] with ExpressionMapper {
  def build(): op.Operation = {
    val transformations = operation.projectList
      .map(fromSparkExpression)
      .filterNot(_.isInstanceOf[expr.AttributeReference])
      .union(resolveAttributeRemovals())

    op.Projection(
      buildOperationProps(),
      transformations)
  }

  private def resolveAttributeRemovals(): Seq[expr.Expression] = {
    def createAttributeByNamesMap(metaDatasetIds: Seq[UUID]): Map[String, Attribute] = metaDatasetIds
      .flatMap(i => metaDatasetFactory.getById(i))
      .flatMap(i => i.schema.attrs)
      .flatMap(i => attributeFactory.getById(i))
      .map(i => i.name -> i)
      .toMap

    val inputAttributesByName = createAttributeByNamesMap(inputMetaDatasets)
    val outputAttributesByName = createAttributeByNamesMap(Seq(outputMetaDataset))
    val removedAttributeNames = inputAttributesByName.keySet diff outputAttributesByName.keySet
    val removedAttributes = (inputAttributesByName filterKeys removedAttributeNames).values
    val removedAttributesSortedByName = removedAttributes.toSeq sortBy (_.name)
    val result = removedAttributesSortedByName map (i => expr.AttributeRemoval(expr.AttributeReference(i)))
    result
  }
}


/**
  * The class represents a builder of operations nodes dedicated for Spark filter operation.
  *
  * @param operation          An input Spark filter operation
  * @param metaDatasetFactory A factory of meta data sets
  */
private class FilterNodeBuilder(val operation: Filter)
                               (implicit val metaDatasetFactory: MetaDatasetFactory) extends OperationNodeBuilder[Filter] with ExpressionMapper {
  def build(): op.Operation = op.Filter(
    buildOperationProps(),
    operation.condition)
}

/**
  * The class represents a builder of operations nodes dedicated for Spark Sort operation.
  *
  * @param operation          An input Spark sort operation
  * @param metaDatasetFactory A factory of meta data sets
  */
private class SortNodeBuilder(val operation: Sort)
                             (implicit val metaDatasetFactory: MetaDatasetFactory) extends OperationNodeBuilder[Sort] with ExpressionMapper {
  def build(): op.Operation = op.Sort(
    buildOperationProps(),
    for (SortOrder(expression, direction, nullOrdering, _) <- operation.order)
      yield op.SortOrder(expression, direction.sql, nullOrdering.sql)
  )
}

/**
  * The class represents a builder of operations nodes dedicated for Spark join operation.
  *
  * @param operation          An input Spark join operation
  * @param metaDatasetFactory A factory of meta data sets
  */
private class JoinNodeBuilder(val operation: Join)
                             (implicit val metaDatasetFactory: MetaDatasetFactory) extends OperationNodeBuilder[Join] with ExpressionMapper {
  def build(): op.Operation = {
    op.Join(
      buildOperationProps(),
      operation.condition map fromSparkExpression,
      operation.joinType.toString)
  }
}


