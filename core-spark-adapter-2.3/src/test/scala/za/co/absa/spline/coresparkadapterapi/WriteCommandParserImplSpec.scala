package za.co.absa.spline.coresparkadapterapi

import org.apache.hadoop.fs.Path
import org.apache.spark.sql.SaveMode
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.datasources.InsertIntoHadoopFsRelationCommand
import org.apache.spark.sql.execution.datasources.text.TextFileFormat
import org.mockito.Mockito.when
import org.scalatest.mockito.MockitoSugar._
import org.scalatest.{BeforeAndAfterEach, FunSpec, Matchers}

class WriteCommandParserImplSpec extends FunSpec with BeforeAndAfterEach with Matchers {
  describe("WriteCommandParserImpl") {
    it("asWriteCommand") {
      val command = mock[InsertIntoHadoopFsRelationCommand]
      when(command.outputPath).thenReturn(new Path("path1"))
      when(command.mode).thenReturn(SaveMode.Append)
      when(command.fileFormat).thenReturn(new TextFileFormat())
      val query = mock[LogicalPlan]
      when(command.query).thenReturn(query)
      WriteCommandParser.instance.matches(command) shouldBe true
      val writeCommand = WriteCommandParser.instance.asWriteCommand(command)
      writeCommand shouldBe WriteCommand("path1", SaveMode.Append, "Text", query)
    }
  }
}
