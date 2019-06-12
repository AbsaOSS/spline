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

import org.apache.commons.codec.net.URLCodec
import org.apache.spark.SparkContext
import org.apache.spark.sql.SaveMode
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.command.CreateDataSourceTableAsSelectCommand
import org.apache.spark.sql.execution.datasources.jdbc.JdbcRelationProvider
import org.apache.spark.sql.execution.datasources.{InsertIntoHadoopFsRelationCommand, SaveIntoDataSourceCommand}
import za.co.absa.spline.producer.rest.model.WriteOperation


class WriteCommandParserFactoryImpl extends WriteCommandParserFactory {
  override def createParsers(sparkContext: SparkContext): Seq[WriteCommandParserNew[LogicalPlan]] = List(
    new WriteCommandParserImpl(),
    new SaveAsTableCommandParserImpl(sparkContext),
    new SaveJdbcCommandParserImpl())
}

class SaveAsTableCommandParserImpl(sparkContext : SparkContext) extends WriteCommandParserNew[LogicalPlan] {

  def execute(operation: LogicalPlan)(implicit factory: ComponentCreatorFactoryIface): Option[OperationNodeBuilder] = {
    operation match {
      case op: CreateDataSourceTableAsSelectCommand => {
        Some(new OperationNodeBuilder(factory, op) {

          override def build(): WriteOperation = {

            val clusterUrl = sparkContext.getConf.getOption("spark.master")

            val identifier = op.table.storage.locationUri match {
              case Some(location) => location.toURL.toString
              case _ =>
                val codec = new URLCodec()
                URIPrefixes.managedTablePrefix +
                  codec.encode(clusterUrl.getOrElse(throw new IllegalArgumentException("Unknown cluster name."))) + ":" +
                  codec.encode(op.table.identifier.database.getOrElse("default")) + ":" +
                  codec.encode(op.table.identifier.table)
            }

            WriteOperation(
              outputSource = identifier,
              append = op.mode == SaveMode.Append,
              id = id,
              childIds = childIds(),
              schema = makeSchema(),
              params = Map.empty
            )
          }

        })
      }
      case _ => None
    }
  }
}

class SaveJdbcCommandParserImpl extends WriteCommandParserNew[LogicalPlan] {

  def execute(operation: LogicalPlan)(implicit factory: ComponentCreatorFactoryIface): Option[OperationNodeBuilder] = {
    operation match {
      case op: SaveIntoDataSourceCommand => {
        Some(new OperationNodeBuilder(factory, op)  {

          override def getChildPlans(): Seq[LogicalPlan] = List(op.query)

          override def build(): WriteOperation = {

            val url = op.options.getOrElse("url", throw new NoSuchElementException("Cannot get name of JDBC connection string."))
            val table = op.options.getOrElse("dbtable", throw new NoSuchElementException("Cannot get name of JDBC table."))
            val identifier = s"${URIPrefixes.jdbcTablePrefix}$url:$table"

            WriteOperation(
              outputSource = identifier,
              append = op.mode == SaveMode.Append,
              id = id,
              childIds = childIds(),
              schema = makeSchema(),
              params = Map.empty
            )
          }
        })
      }
      case _ => None
    }
  }
}


class WriteCommandParserImpl extends WriteCommandParserNew[LogicalPlan] {

  def execute(operation: LogicalPlan)(implicit factory: ComponentCreatorFactoryIface): Option[OperationNodeBuilder] = {
    operation match {
      case op:InsertIntoHadoopFsRelationCommand => {
        Some(new OperationNodeBuilder(factory, op)  {

          override def getChildPlans(): Seq[LogicalPlan] = List(op.query)

          override def build(): WriteOperation = {
            WriteOperation(
              outputSource = op.outputPath.toString,
              append = op.mode == SaveMode.Append,
              id = id,
              childIds = childIds(),
              schema = makeSchema(),
              params = Map.empty
            )
          }
        })
      }
      case _ => None
    }
  }
}
