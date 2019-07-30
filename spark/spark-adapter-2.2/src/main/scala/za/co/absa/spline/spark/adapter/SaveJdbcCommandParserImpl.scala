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

package za.co.absa.spline.spark.adapter

import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.datasources.SaveIntoDataSourceCommand

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
      SaveAsTableCommand(identifier, op.mode, "jdbc", op.query)
  }
}
