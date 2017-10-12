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

import za.co.absa.spline.model._
import org.apache.spark.sql.catalyst.plans.logical._
import org.apache.spark.sql.execution.datasources.{HadoopFsRelation, LogicalRelation, SaveIntoDataSourceCommand}
import com.databricks.spark.xml.XmlRelation
import org.apache.hadoop.conf.Configuration
import org.apache.spark.sql.sources.BaseRelation

import scala.collection.mutable

/**
  * The class represents a factory creating a specific node builders for a particular operations from Spark logical plan.
  * @param hadoopConfiguration A hadoop configuration
  * @param metaDatasetFactory A factory of meta data sets
  */
class OperationNodeBuilderFactory(hadoopConfiguration: Configuration, metaDatasetFactory: MetaDatasetFactory) {

  /**
    * Creates a specific node builders for a particular operations from Spark logical plan.
    *
    * @param logicalPlan An input operation from Spark logical plan
    * @return A specific node builder
    */
  def create(logicalPlan: LogicalPlan): OperationNodeBuilder[_] = logicalPlan match {
    case j: Join => new JoinNodeBuilder(j, metaDatasetFactory)
    case p: Project => new ProjectionNodeBuilder(p, metaDatasetFactory)
    case f: Filter => new FilterNodeBuilder(f, metaDatasetFactory)
    case a: SubqueryAlias => new AliasNodeBuilder(a, metaDatasetFactory)
    case sc: SaveIntoDataSourceCommand => new DestinationNodeBuilder(sc, hadoopConfiguration, metaDatasetFactory)
    case lr: LogicalRelation => new SourceNodeBuilder(lr, hadoopConfiguration, metaDatasetFactory)
    case x => new GenericNodeBuilder(x, metaDatasetFactory)
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
  val attributeFactory: AttributeFactory =  metaDatasetFactory.attributeFactory

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
  * @param operation An input Spark operation
  * @param metaDatasetFactory A factory of meta data sets
  */
private class GenericNodeBuilder(val operation: LogicalPlan, val metaDatasetFactory: MetaDatasetFactory) extends OperationNodeBuilder[LogicalPlan] {
  def build(): op.Operation = op.Generic(buildOperationProps(), operation.verboseString)
}


/**
  * The class represents a builder of operations nodes dedicated for Spark alias operation.
  *
  * @param operation An input Spark alias operation
  * @param metaDatasetFactory A factory of meta data sets
  */
private class AliasNodeBuilder(val operation: SubqueryAlias, val metaDatasetFactory: MetaDatasetFactory) extends OperationNodeBuilder[SubqueryAlias] {
  def build(): op.Operation = op.Alias(buildOperationProps(), operation.alias)
}

/**
  * The class represents a builder of operations nodes dedicated for Spark load operation.
  *
  * @param operation An input Spark load operation
  * @param hadoopConfiguration A hadoop configuration
  * @param metaDatasetFactory A factory of meta data sets
  */
private class SourceNodeBuilder(val operation: LogicalRelation, hadoopConfiguration: Configuration, val metaDatasetFactory: MetaDatasetFactory) extends OperationNodeBuilder[LogicalRelation] {
  def build(): op.Operation = {
    val (sourceType, paths) = getRelationPaths(operation.relation)
    op.Source(
      buildOperationProps(),
      sourceType,
      paths.map(i => PathUtils.getQualifiedPath(hadoopConfiguration)(i))
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
  * @param operation An input Spark persist operation
  * @param hadoopConfiguration A hadoop configuration
  * @param metaDatasetFactory A factory of meta data sets
  */
private class DestinationNodeBuilder(val operation: SaveIntoDataSourceCommand, hadoopConfiguration: Configuration, val metaDatasetFactory: MetaDatasetFactory) extends OperationNodeBuilder[SaveIntoDataSourceCommand] {

  override val outputMetaDataset: UUID = metaDatasetFactory.create(operation.query)

  def build(): op.Operation = {
    op.Destination(
      buildOperationProps(),
      operation.provider,
      PathUtils.getQualifiedPath(hadoopConfiguration)(operation.options.getOrElse("path", ""))
    )
  }
}

/**
  * The class represents a builder of operations nodes dedicated for Spark project operation.
  *
  * @param operation An input Spark project operation
  * @param metaDatasetFactory A factory of meta data sets
  */
private class ProjectionNodeBuilder(val operation: Project, val metaDatasetFactory: MetaDatasetFactory) extends OperationNodeBuilder[Project] with ExpressionMapper {
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
    def createAttributeByNamesMap(metaDatasetIds : Seq[UUID]) : Map[String, Attribute] = metaDatasetIds
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
  * @param operation An input Spark filter operation
  * @param metaDatasetFactory A factory of meta data sets
  */
private class FilterNodeBuilder(val operation: Filter, val metaDatasetFactory: MetaDatasetFactory) extends OperationNodeBuilder[Filter] with ExpressionMapper {
  def build(): op.Operation = op.Filter(
    buildOperationProps(),
    operation.condition)
}

/**
  * The class represents a builder of operations nodes dedicated for Spark join operation.
  *
  * @param operation An input Spark join operation
  * @param metaDatasetFactory A factory of meta data sets
  */
private class JoinNodeBuilder(val operation: Join, val metaDatasetFactory: MetaDatasetFactory) extends OperationNodeBuilder[Join] with ExpressionMapper {
  def build(): op.Operation = {
    op.Join(
      buildOperationProps(),
      operation.condition map fromSparkExpression,
      operation.joinType.toString)
  }
}


