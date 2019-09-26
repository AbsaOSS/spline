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
import org.apache.spark.sql.catalyst.catalog.CatalogTable
import za.co.absa.spline.harvester.qualifier.PathQualifier

case class SourceIdentifier(format: Option[String], uris: String*)

object SourceIdentifier {
  def forKafka(topics: String*): SourceIdentifier =
    SourceIdentifier(Some("kafka"), topics.map(SourceUri.forKafka): _*)

  def forJDBC(connectionUrl: String, table: String): SourceIdentifier =
    SourceIdentifier(Some("jdbc"), SourceUri.forJDBC(connectionUrl, table))

  def forTable(table: CatalogTable)
    (pathQualifier: PathQualifier, session: SparkSession): SourceIdentifier = {
    val uri = table.storage.locationUri
      .map(_.toString)
      .getOrElse(SourceUri.forTable(table.identifier)(session))
    SourceIdentifier(table.provider, pathQualifier.qualify(uri))
  }
}
