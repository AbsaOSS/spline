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

import com.databricks.spark.xml.XmlRelation
import org.apache.spark.sql.catalyst.catalog.HiveTableRelation
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.datasources.{HadoopFsRelation, LogicalRelation}
import org.apache.spark.sql.{JDBCOptionsExtractor, SparkSession}
import za.co.absa.spline.harvester.qualifier.PathQualifier

import scala.PartialFunction.condOpt
import scala.language.implicitConversions

class ReadCommandExtractor(pathQualifier: PathQualifier, session: SparkSession) {
  def asReadCommand(operation: LogicalPlan): Option[ReadCommand] =
    condOpt(operation) {
      case lr: LogicalRelation =>
        ReadCommand(toSourceIdentifier(lr), operation)

      case htr: HiveTableRelation =>
        val catalogTable = htr.tableMeta
        ReadCommand(CatalogTableUtils.toSourceIdentifier(catalogTable)(pathQualifier, session), operation)
    }

  private def toSourceIdentifier(lr: LogicalRelation) = {
    val (sourceType, paths) = lr.relation match {
      case HadoopFsRelation(loc, _, _, _, fileFormat, _) => (
        fileFormat.toString,
        loc.rootPaths.map(path => pathQualifier.qualify(path.toString))
      )
      case XmlRelation(_, loc, _, _) => (
        "XML",
        loc.toSeq map pathQualifier.qualify
      )
      case JDBCOptionsExtractor(jdbcOpts) => (
        "JDBC",
        Seq(s"${jdbcOpts.url}:${jdbcOpts.table}")
      )
      case _ => // unrecognized relation type
        (s"???: ${lr.relation.getClass.getName}", Nil)
    }
    SourceIdentifier(Some(sourceType), paths)
  }

}

