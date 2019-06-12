package za.co.absa.spline.sparkadapterapi

import org.apache.spark.sql.catalyst.expressions.{Attribute => SparkAttribute, Expression => SparkExpression}
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import za.co.absa.spline.model.expr.Expression
import za.co.absa.spline.producer.rest.model.OperationLike

abstract class OperationNodeBuilder(val componentCreator: ComponentCreatorFactoryIface, val logicalPlan: LogicalPlan) {

  val id: Int = componentCreator.uniqueIdGenerator.next()

  private var childBuilders: Seq[OperationNodeBuilder] = Nil

  protected val output: AttrGroup = new AttrGroup(logicalPlan.output)

  def addChildBuilder(childBuilder: OperationNodeBuilder): Unit = childBuilders :+= childBuilder

  def build(): OperationLike

  def getChildPlans(): Seq[LogicalPlan] = logicalPlan.children


  def makeParams(params : Map[String, Any]) : Map[String, Any] = params

  def makeSchema() : Option[Any] = {
    None // TODO
  }

  def convertExpression(sparkExpr: SparkExpression): Expression = componentCreator.expressionConverter.convert(sparkExpr)

  def childIds(): Array[Int] = childBuilders.map(child => child.id).toArray

}

class UniqueIdGenerator {
  var last = 1
  def next() = {
    last+=1
    last-1
  }
}

trait ComponentCreatorFactoryIface {
  val uniqueIdGenerator : UniqueIdGenerator
  val expressionConverter : ExpressionConverterIface
}

trait ExpressionConverterIface {
  // TODO expression datamodel is not done yet
  def convert(sparkExpr: SparkExpression): Expression
}


class AttrGroup(val attrs: Seq[SparkAttribute])

object Constants {
  val projectionTransformation = "projection_transformation"

  val filterExpression = "filter_expression"

  val sorOrder = "sort_order"

  val aggregateExpression = "aggregate_expression"

  val groupingExpression = "grouping_expression"

  val condition = "condition"

  val joinType = "join_type"

  val sourceType = "source_type"

  val alias = "alias"
  val name = "name"
}