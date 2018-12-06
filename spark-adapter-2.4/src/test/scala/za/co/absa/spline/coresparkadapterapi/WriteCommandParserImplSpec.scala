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