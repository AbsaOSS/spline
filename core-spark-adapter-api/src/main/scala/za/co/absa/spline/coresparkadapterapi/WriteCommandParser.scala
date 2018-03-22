package za.co.absa.spline.coresparkadapterapi

import org.apache.spark.sql.SaveMode
import org.apache.spark.sql.catalyst.plans.logical.{Command, LogicalPlan}

import scala.language.implicitConversions
import scala.reflect.ClassTag

abstract class WriteCommandParser[T <: LogicalPlan](implicit tag: ClassTag[T]) {

  implicit protected def asSparkSpecific(operation: LogicalPlan): T = {
    operation.asInstanceOf[T]
  }

  def matches(operation: LogicalPlan): Boolean = {
    tag.runtimeClass.isAssignableFrom(operation.getClass)
  }

  implicit def asWriteCommand(operation: LogicalPlan): WriteCommand

}

object WriteCommandParser extends AdapterFactory[WriteCommandParser[LogicalPlan]]

case class WriteCommand(path: String, mode: SaveMode, format: String, query: LogicalPlan) extends Command
