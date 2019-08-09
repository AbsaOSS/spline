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

import com.databricks.spark.xml.XmlRelation
import org.apache.spark.sql.catalyst.expressions.{Attribute => SparkAttribute}
import org.apache.spark.sql.catalyst.plans.logical._
import org.apache.spark.sql.execution.datasources.{HadoopFsRelation, LogicalRelation}
import org.apache.spark.sql.sources.BaseRelation
import org.apache.spark.sql.{JDBCRelation, SaveMode}
import za.co.absa.spline.harvester.ModelConstants.OperationParams
import za.co.absa.spline.producer.rest.model.{DataOperation, OperationLike, ReadOperation, WriteOperation}
import za.co.absa.spline.spark.adapter.{SaveAsTableCommand, WriteToPathCommand}

sealed trait OperationNodeBuilder {

  protected type R <: OperationLike

  val id: Int = componentCreatorFactory.nextId

  val operation: LogicalPlan

  private var childBuilders: Seq[OperationNodeBuilder] = Nil

  protected val output: Seq[SparkAttribute] = operation.output

  def +=(childBuilder: OperationNodeBuilder): Unit = childBuilders :+= childBuilder

  def build(): R

  protected def componentCreatorFactory: ComponentCreatorFactory

  protected def outputSchema: Seq[UUID] = output.map(componentCreatorFactory.attributeConverter.convert(_).id)

  protected def childIds: Seq[Int] = childBuilders.map(_.id)
}


trait FSAwareBuilder {
  protected def getQualifiedPath(path: String): String
}

class FSReadNodeBuilder
(val operation: LogicalRelation)
  (implicit val componentCreatorFactory: ComponentCreatorFactory)
  extends OperationNodeBuilder {
  this: FSAwareBuilder =>
  override protected type R = ReadOperation

  override def build(): ReadOperation = {
    val (sourceType, paths) = getRelationPaths(operation.relation)
    ReadOperation(
      inputSources = paths,
      id = id,
      schema = Some(outputSchema),
      params = Map(
        OperationParams.Name -> operation.nodeName,
        OperationParams.SourceType -> sourceType
      ))
  }

  private def getRelationPaths(relation: BaseRelation): (String, Seq[String]) = relation match {
    case HadoopFsRelation(loc, _, _, _, fileFormat, _) => (
      fileFormat.toString,
      loc.rootPaths.map(path => getQualifiedPath(path.toString))
    )
    case XmlRelation(_, loc, _, _) => (
      "XML",
      loc.toSeq map getQualifiedPath
    )
    case JDBCRelation(jdbcOpts) => (
      "JDBC",
      Seq(s"${jdbcOpts.url}/${jdbcOpts.table}")
    )
    case _ => // unrecognized relation type
      (s"???: ${relation.getClass.getName}", Nil)
  }
}


sealed trait WriteNodeBuilder {
  this: OperationNodeBuilder =>

  override protected type R = WriteOperation

  def wasIgnored: Boolean

  def writeMetrics: Map[String, Long]

  def readMetrics: Map[String, Long]
}

class FSWriteNodeBuilder(
  val operation: WriteToPathCommand,
  override val writeMetrics: Map[String, Long],
  override val readMetrics: Map[String, Long])
  (implicit val componentCreatorFactory: ComponentCreatorFactory)
  extends OperationNodeBuilder with WriteNodeBuilder {
  this: FSAwareBuilder =>

  override val output: Seq[SparkAttribute] = operation.query.output

  override def build() = WriteOperation(
    outputSource = getQualifiedPath(operation.path),
    append = operation.mode == SaveMode.Append,
    id = id,
    childIds = childIds,
    schema = Some(outputSchema),
    params = Map(
      OperationParams.Name -> operation.nodeName,
      OperationParams.DestinationType -> operation.format)
  )

  override def wasIgnored: Boolean = {
    writeMetrics.get("numFiles").exists(0.==)
  }
}

class SaveAsTableNodeBuilder(
  val operation: SaveAsTableCommand,
  override val writeMetrics: Map[String, Long],
  override val readMetrics: Map[String, Long])
  (implicit val componentCreatorFactory: ComponentCreatorFactory)
  extends OperationNodeBuilder with WriteNodeBuilder {

  override val output: Seq[SparkAttribute] = operation.query.output

  override def build() = WriteOperation(
    outputSource = operation.tableName,
    append = operation.mode == SaveMode.Append,
    id = id,
    childIds = childIds,
    schema = Some(outputSchema),
    params = Map(
      OperationParams.Name -> operation.nodeName,
      OperationParams.DestinationType -> operation.format)
  )

  override def wasIgnored: Boolean = false
}

class GenericNodeBuilder
(val operation: LogicalPlan)
  (implicit val componentCreatorFactory: ComponentCreatorFactory)
  extends OperationNodeBuilder {
  override protected type R = DataOperation

  override def build() = DataOperation(
    id = id,
    childIds = childIds,
    schema = Some(outputSchema),
    params = componentCreatorFactory.operationParamsConverter.convert(operation)
      + (OperationParams.Name -> operation.nodeName)
  )
}
