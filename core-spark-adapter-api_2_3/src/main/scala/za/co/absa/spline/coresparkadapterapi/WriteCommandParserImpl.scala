package za.co.absa.spline.coresparkadapterapi

import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.datasources.InsertIntoHadoopFsRelationCommand

class WriteCommandParserImpl extends WriteCommandParser[InsertIntoHadoopFsRelationCommand] {
  override def asWriteCommand(operation: LogicalPlan): WriteCommand = {
    WriteCommand(operation.outputPath.toString, operation.mode, operation.fileFormat.toString, operation.query)
  }
}
