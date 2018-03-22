package za.co.absa.spline.coresparkadapterapi

import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.datasources.SaveIntoDataSourceCommand

class WriteCommandParserImpl extends WriteCommandParser[SaveIntoDataSourceCommand] {
  override def asWriteCommand(operation: LogicalPlan): WriteCommand = {
    WriteCommand(operation.options.getOrElse("path", ""), operation.mode, operation.provider, operation.query)
  }
}
