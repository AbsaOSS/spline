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

package za.co.absa.spline.sparkadapterapi

import org.apache.hadoop.fs.Path
import org.apache.spark.{SparkConf, SparkContext}
import org.apache.spark.sql.SaveMode
import org.apache.spark.sql.catalyst.TableIdentifier
import org.apache.spark.sql.catalyst.catalog.{CatalogStorageFormat, CatalogTable}
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.command.CreateDataSourceTableAsSelectCommand
import org.apache.spark.sql.execution.datasources.InsertIntoHadoopFsRelationCommand
import org.apache.spark.sql.execution.datasources.text.TextFileFormat
import org.mockito.Mockito.when
import org.scalatest.mockito.MockitoSugar.{mock, _}
import org.scalatest.{BeforeAndAfterEach, FunSpec, Matchers}
import za.co.absa.spline.producer.rest.model.WriteOperation

class WriteCommandParserImplSpec extends FunSpec with BeforeAndAfterEach with Matchers {

  describe("WriteCommandParserImpl") {
    it("asWriteCommand") {
      val command = mock[InsertIntoHadoopFsRelationCommand]
      val componentFactory = mock[ComponentCreatorFactoryIface]
      when(componentFactory.uniqueIdGenerator).thenReturn(new UniqueIdGenerator())

      when(command.outputPath).thenReturn(new Path("path1"))
      when(command.mode).thenReturn(SaveMode.Append)
      when(command.fileFormat).thenReturn(new TextFileFormat())
      val query = mock[LogicalPlan]
      when(command.query).thenReturn(query)
      val instance = new WriteCommandParserImpl()
      val builder = instance.execute(command)(componentFactory)
      val write = builder.get.build().asInstanceOf[WriteOperation]
      write.outputSource shouldBe "path1"
      write.append shouldBe true
    }
  }

  describe("SaveAsTableCommandParserImpl") {
    it("asWriteCommand") {
      val tableIdentifier = mock[TableIdentifier]
      when(tableIdentifier.table).thenReturn("tableIdentifier")
      when(tableIdentifier.database).thenReturn(Some("databaseIdentifier"))

      val componentFactory = mock[ComponentCreatorFactoryIface]
      when(componentFactory.uniqueIdGenerator).thenReturn(new UniqueIdGenerator())

      val mockTable = mock[CatalogTable]
      when(mockTable.identifier).thenReturn(tableIdentifier)

      val storage = mock[CatalogStorageFormat]
      when(mockTable.storage).thenReturn(storage)

      val sparkContext = mock[SparkContext]
      val conf = mock[SparkConf]
      when(sparkContext.getConf).thenReturn(conf)
      when(conf.getOption("spark.master")).thenReturn(Some("clusterName"))

      val command = mock[CreateDataSourceTableAsSelectCommand]
      when(command.table).thenReturn(mockTable)
      when(command.mode).thenReturn(SaveMode.Append)

      val query = mock[LogicalPlan]
      when(command.query).thenReturn(query)
      val instance = new SaveAsTableCommandParserImpl(sparkContext)
      instance.execute(command)(componentFactory)
      val writeCommand =  instance.execute(command)(componentFactory).get.build().asInstanceOf[WriteOperation]

      writeCommand.outputSource shouldBe "table://clusterName:databaseIdentifier:tableIdentifier"
      writeCommand.append shouldBe true
    }
  }
}