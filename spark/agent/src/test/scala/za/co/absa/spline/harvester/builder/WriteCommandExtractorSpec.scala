/*
 * Copyright 2019 ABSA Group Limited
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

package za.co.absa.spline.harvester.builder

import java.net.URI

import org.apache.hadoop.fs.Path
import org.apache.spark.sql.SaveMode
import org.apache.spark.sql.catalyst.TableIdentifier
import org.apache.spark.sql.catalyst.catalog.{CatalogStorageFormat, CatalogTable}
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.command.CreateDataSourceTableAsSelectCommand
import org.apache.spark.sql.execution.datasources.InsertIntoHadoopFsRelationCommand
import org.apache.spark.sql.execution.datasources.text.TextFileFormat
import org.mockito.Mockito.when
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.harvester.builder.WriteCommandExtractorSpec._
import za.co.absa.spline.harvester.qualifier.PathQualifier

class WriteCommandExtractorSpec extends FlatSpec with Matchers with MockitoSugar {

  it should "convert InsertIntoHadoopFsRelationCommand" in {
    val command = mock[InsertIntoHadoopFsRelationCommand]
    when(command.outputPath).thenReturn(new Path("path1"))
    when(command.mode).thenReturn(SaveMode.Append)
    when(command.fileFormat).thenReturn(new TextFileFormat())
    val query = mock[LogicalPlan]
    when(command.query).thenReturn(query)
    val writeCommand = new WriteCommandExtractor(PathQualifierStub, null).asWriteCommand(command)
    writeCommand shouldBe Some(WriteCommand(
      SourceIdentifier(Some("Text"), Seq("qualified{path1}")),
      SaveMode.Append,
      query))
  }

  it should "convert CreateDataSourceTableAsSelectCommand" in {
    val tableIdentifier = mock[TableIdentifier]
    when(tableIdentifier.database).thenReturn(Some("foo"))
    when(tableIdentifier.table).thenReturn("bar")

    val storageMock = mock[CatalogStorageFormat]
    when(storageMock.locationUri).thenReturn(Some(new URI("/baz")))

    val mockTable = mock[CatalogTable]
    when(mockTable.identifier).thenReturn(tableIdentifier)
    when(mockTable.storage).thenReturn(storageMock)
    when(mockTable.provider).thenReturn(Some("xyz"))

    val command = mock[CreateDataSourceTableAsSelectCommand]
    when(command.table).thenReturn(mockTable)
    when(command.mode).thenReturn(SaveMode.Append)

    val query = mock[LogicalPlan]
    when(command.query).thenReturn(query)
    val writeCommand = new WriteCommandExtractor(PathQualifierStub, null).asWriteCommand(command)
    writeCommand shouldBe Some(WriteCommand(
      SourceIdentifier(Some("xyz"), Seq("qualified{/baz}")),
      SaveMode.Append,
      query,
      Map("table" -> mockTable)))
  }
}

object WriteCommandExtractorSpec {

  object PathQualifierStub extends PathQualifier {
    override def qualify(path: String) = s"qualified{$path}"
  }

}
