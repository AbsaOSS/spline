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
package za.co.absa.spline.consumer.service.repo

import com.arangodb.async.ArangoDatabaseAsync
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.consumer.service.model.search.FoundAttribute

import scala.concurrent.{ExecutionContext, Future}

@Repository
class AttributeRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends AttributeRepository {

  import za.co.absa.spline.persistence.ArangoImplicits._

  def findAttributesByPrefix(search: String, limit: Int)(implicit ec: ExecutionContext): Future[Array[FoundAttribute]] = {
    val result = db.queryStream[FoundAttribute](
      """
        |WITH progress, progressOf, executionPlan, affects, dataSource
        |FOR exec IN attributeSearchView
        |    SEARCH STARTS_WITH(exec.extra.attributes.name, @searchTerm)
        |
        |    LET timestamp = FIRST(FOR prog IN 1 INBOUND exec progressOf SORT prog.timestamp DESC RETURN prog.timestamp)
        |    LET dataSourceKey = FIRST(FOR ds IN 1 OUTBOUND exec affects RETURN ds._key)
        |
        |    COLLECT dsk = dataSourceKey INTO groups = {
        |        "executionPlan": exec,
        |        "timestamp": timestamp
        |    }
        |
        |    LET lastWriteExec = FIRST(FOR exg IN groups SORT exg.timestamp DESC RETURN exg.executionPlan)
        |
        |    FOR att IN lastWriteExec.extra.attributes
        |        FILTER CONTAINS(att.name, @searchTerm, true) == 0
        |        SORT att.name
        |        LET type = FIRST(FOR t IN lastWriteExec.extra.dataTypes FILTER t.id == att.dataTypeId RETURN t)
        |        LIMIT @limit
        |        RETURN {
        |            "id": att.id,
        |            "name": att.name,
        |            "attributeType": type,
        |            "executionEventId": lastWriteExec._key,
        |            "executionEventName": lastWriteExec.extra.appName
        |        }
        |""".stripMargin,
      Map(
        "searchTerm" -> search,
        "limit" -> (limit: Integer)
      )
    )

    result.map(_.toArray)
  }

}
