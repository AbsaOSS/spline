/*
 * Copyright 2021 ABSA Group Limited
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

package za.co.absa.spline.consumer.service.repo

import com.arangodb.async.ArangoDatabaseAsync
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.consumer.service.model.Label
import za.co.absa.spline.consumer.service.model.Label.{Name, Value}
import za.co.absa.spline.persistence.model.NodeDef

import scala.concurrent.{ExecutionContext, Future}

@Repository
class LabelRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends LabelRepository {

  import za.co.absa.spline.persistence.ArangoImplicits._

  override def findNames(query: Option[String], offset: Int, length: Int)(implicit ec: ExecutionContext): Future[Seq[Name]] = {
    require(offset >= -1)
    require(length > 0)

    db.queryStream[Label.Name](
      s"""
         |WITH ${NodeDef.ExecutionPlan.name}, ${NodeDef.Progress.name}
         |    FOR x IN UNION_DISTINCT (
         |        FOR ep IN executionPlan FOR a IN ATTRIBUTES(ep.labels) RETURN a,
         |        FOR ee IN progress FOR a IN ATTRIBUTES(ee.labels) RETURN a
         |    )
         |    FILTER @searchTerm == null OR CONTAINS(LOWER(x), @searchTerm)
         |    LIMIT @offset, @length
         |RETURN x
         |""".stripMargin,
      Map(
        "searchTerm" -> query.orNull,
        "offset" -> Int.box(offset),
        "length" -> Int.box(length),
      ))
  }

  override def findValuesFor(labelName: Name, query: Option[String], offset: Int, length: Int)(implicit ec: ExecutionContext): Future[Seq[Value]] = {
    require(offset >= -1)
    require(length > 0)

    db.queryStream[Label.Value](
      s"""
         |WITH ${NodeDef.ExecutionPlan.name}, ${NodeDef.Progress.name}
         |FOR x IN UNION_DISTINCT (
         |        FOR ep IN executionPlan FOR a IN (ep.labels[@labelName]||[]) RETURN a,
         |        FOR ee IN progress FOR a IN (ee.labels[@labelName]||[]) RETURN a
         |    )
         |    FILTER @searchTerm == null OR CONTAINS(LOWER(x), @searchTerm)
         |    LIMIT @offset, @length
         |    RETURN x
         |""".stripMargin,
      Map(
        "labelName" -> labelName,
        "searchTerm" -> query.orNull,
        "offset" -> Int.box(offset),
        "length" -> Int.box(length),
      ))
  }
}
