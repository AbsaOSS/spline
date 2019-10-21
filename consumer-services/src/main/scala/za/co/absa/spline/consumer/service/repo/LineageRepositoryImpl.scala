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

import com.arangodb.ArangoDatabaseAsync
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.consumer.service.model.LineageOverview

import scala.concurrent.{ExecutionContext, Future}

@Repository
class LineageRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends LineageRepository {

  import za.co.absa.spline.persistence.ArangoImplicits._

  override def findExecutionEventId(executionEventId: String, maxDepth: Int)(implicit ec: ExecutionContext): Future[LineageOverview] = {
    db.queryOne[LineageOverview](
      s"""
        LET executionEvent = FIRST(FOR p IN progress FILTER p._key == @executionEventId RETURN p)
        LET lineageGraph = SPLINE::EVENT_LINEAGE_OVERVIEW(executionEvent, @maxDepth)

        RETURN {
            "lineageInfo": {
                "timestamp" : executionEvent.timestamp,
                "applicationId" : executionEvent.extra.appId
            },
            "lineage": {
                "nodes": (
                    FOR vert IN lineageGraph.vertices
                        LET vertType = SPLIT(vert._id, '/')[0]
                        RETURN vertType == "dataSource"
                            ? {
                                "_id": vert._key,
                                "_class": "za.co.absa.spline.consumer.service.model.DataSourceNode",
                                "name": vert.uri
                            }
                            : {
                                "_id": vert._key,
                                "_class": "za.co.absa.spline.consumer.service.model.ExecutionNode",
                                "name": vert.extra.appName
                            }
                    ),
                "edges": (
                    FOR edge IN lineageGraph.edges
                        LET edgeType = SPLIT(edge._id, '/')[0]
                        LET exKey = SPLIT(edge._from, '/')[1]
                        LET dsKey = SPLIT(edge._to, '/')[1]
                        RETURN {
                            "source": edgeType == "depends" ? dsKey : exKey,
                            "target": edgeType == "affects" ? dsKey : exKey
                        }
                    )
            }
        }
      """,
      Map(
        "executionEventId" -> executionEventId,
        "maxDepth" -> (maxDepth: Integer))
    )
  }
}
