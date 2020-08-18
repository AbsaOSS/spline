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
import za.co.absa.spline.consumer.service.model.LineageOverview

import scala.concurrent.{ExecutionContext, Future}

@Repository
class LineageRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends LineageRepository {

  import za.co.absa.spline.persistence.ArangoImplicits._

  override def lineageOverviewForExecutionEvent(eventId: String, maxDepth: Int)(implicit ec: ExecutionContext): Future[LineageOverview] = db
    .queryOne[LineageOverview](
      """
        |WITH progress, progressOf, executionPlan, affects, dataSource
        |LET executionEvent = FIRST(FOR p IN progress FILTER p._key == @eventId RETURN p)
        |LET targetDataSource = FIRST(FOR ds IN 2 OUTBOUND executionEvent progressOf, affects RETURN ds)
        |LET lineageGraph = SPLINE::EVENT_LINEAGE_OVERVIEW(executionEvent, @maxDepth)
        |
        |RETURN lineageGraph && {
        |    "info": {
        |        "timestamp" : executionEvent.timestamp,
        |        "applicationId" : executionEvent.extra.appId,
        |        "targetDataSourceId": targetDataSource._key
        |    },
        |    "graph": {
        |        "depthRequested": @maxDepth,
        |        "depthComputed": lineageGraph.depth || -1,
        |        "nodes": lineageGraph.vertices,
        |        "edges": lineageGraph.edges
        |    }
        |}
        |""".stripMargin,
      Map(
        "eventId" -> eventId,
        "maxDepth" -> (maxDepth: Integer))
    )
    .filter(null.!=)
}
