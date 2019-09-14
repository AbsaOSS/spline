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

import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.catalyst.TableIdentifier
import org.apache.spark.sql.catalyst.catalog.CatalogTable
import za.co.absa.spline.harvester.qualifier.PathQualifier

object CatalogTableUtils {
  def getSourceIdentifier(table: CatalogTable)
    (pathQualifier: PathQualifier, session: SparkSession): SourceIdentifier = {
    val uri = table.storage.locationUri
      .map(_.toString)
      .getOrElse({
        val catalog = session.catalog
        val TableIdentifier(tableName, maybeTableDatabase) = table.identifier
        val databaseName = maybeTableDatabase getOrElse catalog.currentDatabase
        val databaseLocation = catalog.getDatabase(databaseName).locationUri.stripSuffix("/")
        s"$databaseLocation/${tableName.toLowerCase}"
      })
    SourceIdentifier(table.provider, Seq(pathQualifier.qualify(uri)))
  }
}
