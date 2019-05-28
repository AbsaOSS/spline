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

import org.apache.commons.codec.net.URLCodec
import org.apache.spark.sql.SaveMode
import org.apache.spark.sql.catalyst.catalog.CatalogTable
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.command.CreateDataSourceTableAsSelectCommand
import org.apache.spark.sql.execution.datasources.{InsertIntoHadoopFsRelationCommand, SaveIntoDataSourceCommand}
import org.apache.spark.sql.hive.execution.InsertIntoHiveTable

class WriteCommandParserFactoryImpl extends WriteCommandParserFactory {
  override def writeParser(): WriteCommandParser[LogicalPlan] = new WriteCommandParserImpl()

  override def saveAsTableParser(clusterUrl: Option[String]): WriteCommandParser[LogicalPlan] = new SaveAsTableCommandParserImpl(clusterUrl)

  override def jdbcParser(): WriteCommandParser[LogicalPlan] = new SaveJdbcCommandParserImpl()
}

object SaveAsTableCommandParserImpl {
  val INSERT_INTO_HIVE_CLASS_NAME = "org.apache.spark.sql.hive.execution.InsertIntoHiveTable"
}

class SaveAsTableCommandParserImpl(clusterUrl: Option[String]) extends WriteCommandParser[LogicalPlan] {

  override def matches(operation: LogicalPlan): Boolean = {
    operation.getClass.getName == SaveAsTableCommandParserImpl.INSERT_INTO_HIVE_CLASS_NAME || operation.isInstanceOf[CreateDataSourceTableAsSelectCommand]
  }

  override def asWriteCommand(operation: LogicalPlan): AbstractWriteCommand = {
    operation match {
      case op:CreateDataSourceTableAsSelectCommand => SaveAsTableCommand(createTableWrite(op.table), op.mode, "table", op.query)
      case op:InsertIntoHiveTable => {
        val mode = if (op.overwrite) SaveMode.Overwrite else SaveMode.Append
        SaveAsTableCommand(createTableWrite(op.table), mode, "table", op.query)
      }
    }
  }

  private def createTableWrite(table: CatalogTable) = {
    val identifier = table.storage.locationUri match {
      case Some(location) => location.toURL.toString
      case _ =>
        val codec = new URLCodec()
        URIPrefixes.managedTablePrefix +
          codec.encode(clusterUrl.getOrElse(throw new IllegalArgumentException("Unknown cluster name."))) + ":" +
          codec.encode(table.identifier.database.getOrElse("default")) + ":" +
          codec.encode(table.identifier.table)
    }
    identifier
  }
}

class SaveJdbcCommandParserImpl extends WriteCommandParser[LogicalPlan] {
  override def matches(operation: LogicalPlan): Boolean = {
    operation.isInstanceOf[SaveIntoDataSourceCommand] &&
      operation.asInstanceOf[SaveIntoDataSourceCommand].provider == "jdbc"
  }

  override def asWriteCommand(operation: LogicalPlan): AbstractWriteCommand = operation match {
    case op: SaveIntoDataSourceCommand =>
      val url = op.options.getOrElse("url", throw new NoSuchElementException("Cannot get name of JDBC connection string."))
      val table = op.options.getOrElse("dbtable", throw new NoSuchElementException("Cannot get name of JDBC table."))
      val identifier = s"${URIPrefixes.jdbcTablePrefix}$url:$table"
      SaveJDBCCommand(identifier, op.mode, "jdbc", op.query)
  }
}

class WriteCommandParserImpl extends WriteCommandParser[LogicalPlan] {

  override def matches(operation: LogicalPlan): Boolean = {
    operation.isInstanceOf[SaveIntoDataSourceCommand] ||
      operation.isInstanceOf[InsertIntoHadoopFsRelationCommand]
  }

  override def asWriteCommand(operation: LogicalPlan): WriteCommand = operation match {
    case op: InsertIntoHadoopFsRelationCommand =>
      WriteCommand(op.outputPath.toString, op.mode, "table", op.query)
    case op: SaveIntoDataSourceCommand =>
      WriteCommand(op.options.getOrElse("path", ""), op.mode, "table", op.query)
  }

}
