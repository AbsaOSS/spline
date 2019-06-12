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

import com.databricks.spark.xml.XmlRelation
import org.apache.spark.sql.catalyst.expressions.{AttributeReference, SortOrder}
import org.apache.spark.sql.catalyst.plans.logical._
import org.apache.spark.sql.execution.datasources.{HadoopFsRelation, LogicalRelation}
import org.apache.spark.sql.sources.BaseRelation
import org.apache.spark.sql.JDBCRelation
import za.co.absa.spline.model.endpoint._
import za.co.absa.spline.producer.rest.model.{DataOperation, OperationLike, ReadOperation}
import za.co.absa.spline.sparkadapterapi.StreamingRelationAdapter.instance.extractDataSourceInfo
import za.co.absa.spline.sparkadapterapi.{Constants, DataSourceInfo, OperationNodeBuilder}

class GenericNodeBuilder
(val operation: LogicalPlan)
(implicit val componentCreatorFactory: ComponentCreatorFactory)
  extends OperationNodeBuilder(componentCreatorFactory, operation) {
  override def build() = DataOperation(
    params = Map(Constants.name -> "GENERIC"),
    schema = makeSchema(),
    id = id,
    childIds = childIds()
  )
}

class AliasNodeBuilder
(val operation: SubqueryAlias)
(implicit val componentCreatorFactory: ComponentCreatorFactory)
  extends OperationNodeBuilder(componentCreatorFactory, operation) {

  override def build(): DataOperation = {
    DataOperation(
      params = Map(Constants.name -> "ALIAS", Constants.alias -> operation.alias),
      schema = makeSchema(),
      id = id,
      childIds = childIds()
    )
  }
}

trait FSAwareBuilder {
  protected def getQualifiedPath(path: String): String
}

class ReadNodeBuilder
(val operation: LogicalRelation)
(implicit val componentCreatorFactory: ComponentCreatorFactory)
  extends OperationNodeBuilder(componentCreatorFactory, operation) {
  this: FSAwareBuilder =>

  override def build(): ReadOperation = {
    val (sourceType, paths) = getRelationPaths(operation.relation)
    ReadOperation(
      inputSources = paths,
      id = id,
      schema = makeSchema(),
      params = Map(Constants.sourceType -> sourceType)
    )
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

class StreamReadNodeBuilder
(val operation: LogicalPlan)
(implicit val componentCreatorFactory: ComponentCreatorFactory)
  extends OperationNodeBuilder(componentCreatorFactory, operation) {

  private val endpoint = createEndpoint(extractDataSourceInfo(operation).get)
  override def build(): ReadOperation =
  ReadOperation(
    inputSources =  endpoint.paths.map(path => path.toString),
    schema = makeSchema(),
    id = id,
    params = Map.empty
    //TODO sourceType - need properties
  )

  private def createEndpoint(dataSource: DataSourceInfo): StreamEndpoint = dataSource.name match {
    case x if x startsWith "FileSource" => FileEndpoint(
      dataSource.className,
      dataSource.options.getOrElse("path", "")
    )
    case "kafka" => KafkaEndpoint(
      dataSource.options.getOrElse("kafka.bootstrap.servers", "").split(","),
      dataSource.options.getOrElse("subscribe", "").split(",")
    )
    case "textSocket" | "socket" => SocketEndpoint(
      dataSource.options.getOrElse("host", ""),
      dataSource.options.getOrElse("port", "")
    )
    case _ => VirtualEndpoint(operation.getClass)
  }
}

trait RootNode {
  def ignoreLineageWrite:Boolean
}

class ProjectionNodeBuilder
(val operation: Project)
(implicit val componentCreatorFactory: ComponentCreatorFactory)
  extends OperationNodeBuilder(componentCreatorFactory, operation) {
  override def build(): DataOperation = {
    val transformations = operation.projectList
      .filterNot(_.isInstanceOf[AttributeReference])
      .map(convertExpression)

    DataOperation(
      params = Map(Constants.name -> "PROJECTION", Constants.projectionTransformation -> transformations),
      schema = makeSchema(),
      id = id,
      childIds = childIds()
    )
  }
}

class FilterNodeBuilder
(val operation: Filter)
(implicit val componentCreatorFactory: ComponentCreatorFactory)
  extends OperationNodeBuilder(componentCreatorFactory, operation) {
  override def build(): DataOperation = {
    val expression = convertExpression(operation.condition)

    DataOperation(
      params = Map(Constants.name -> "FILTER", Constants.filterExpression -> expression),
      schema = makeSchema(),
      id = id,
      childIds = childIds()
    )
  }
}

class SortNodeBuilder
(val operation: Sort)
(implicit val componentCreatorFactory: ComponentCreatorFactory)
  extends OperationNodeBuilder(componentCreatorFactory, operation) {
  override def build() : DataOperation = {

    val sort_order = for (SortOrder(expression, direction, nullOrdering, _) <- operation.order)
          yield Map("expression " -> convertExpression(expression),
            "direction" ->  direction.sql,
            "null_ordering" -> nullOrdering.sql
          )

    DataOperation(
      params = Map(Constants.name -> "SORT", Constants.sorOrder -> sort_order),
      schema = makeSchema(),
      id = id,
      childIds = childIds()
    )
  }
}

class AggregateNodeBuilder
(val operation: Aggregate)
(implicit val componentCreatorFactory: ComponentCreatorFactory)
  extends OperationNodeBuilder(componentCreatorFactory, operation) {
override def build() : OperationLike =
  DataOperation(
    params = Map(Constants.name -> "AGGREGATE",
      Constants.groupingExpression -> operation.groupingExpressions.map(convertExpression),
      Constants.aggregateExpression -> operation.aggregateExpressions.map(namedExpr =>
      namedExpr.name -> convertExpression(namedExpr)).toMap),
    schema = makeSchema(),
    id = id,
    childIds = childIds()
  )
}

class JoinNodeBuilder
(val operation: Join)
(implicit val componentCreatorFactory: ComponentCreatorFactory)
  extends OperationNodeBuilder(componentCreatorFactory, operation) {
  override def build() : OperationLike  =
  DataOperation(
    params = Map(Constants.name -> "JOIN",
      Constants.joinType -> operation.joinType.toString,
      Constants.condition -> operation.condition.map(convertExpression)),
    schema = makeSchema(),
    id = id,
    childIds = childIds()
  )
}

class UnionNodeBuilder
(val operation: Union)
(implicit val componentCreatorFactory: ComponentCreatorFactory)
  extends OperationNodeBuilder(componentCreatorFactory, operation) {
  override def build() : OperationLike = DataOperation(
    params = Map(Constants.name -> "UNION"),
    schema = makeSchema(),
    id = id,
    childIds = childIds()
  )
}
