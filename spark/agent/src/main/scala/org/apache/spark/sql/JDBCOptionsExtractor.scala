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

package org.apache.spark.sql

import org.apache.spark.sql.execution.datasources.jdbc.JDBCRelation
import org.apache.spark.sql.sources.BaseRelation
import za.co.absa.spline.common.extractors.AccessorMethodValueExtractor

object JDBCOptionsExtractor {

  case class SplineJDBCOptions(url: String, table: String)

  def unapply(rel: BaseRelation): Option[SplineJDBCOptions] = PartialFunction.condOpt(rel) {
    case r: JDBCRelation =>
      val toq = tableOrQueryExtractor(r.jdbcOptions) getOrElse sys.error("Cannot extract table or query info")
      SplineJDBCOptions(r.jdbcOptions.url, toq)
  }

  private val tableOrQueryExtractor: Function[Any, Option[String]] =
    AccessorMethodValueExtractor.firstOf[String]("table", "tableOrQuery")
}
