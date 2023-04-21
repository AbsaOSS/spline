/*
 * Copyright 2022 ABSA Group Limited
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

package za.co.absa.spline.test.fixture

import com.arangodb.async.ArangoDatabaseAsync
import io.testcontainers.arangodb.containers.ArangoContainer
import za.co.absa.spline.persistence.ArangoDatabaseFacade.MinArangoVerRecommended
import za.co.absa.spline.persistence.{ArangoConnectionURL, ArangoDatabaseFacade}

trait ArangoDbFixtureLike {
  val ArangoDbContainer: ArangoContainer = ArangoDbFixtureLike.ArangoDbContainer

  def runTestBody[A](testBody: (ArangoDatabaseAsync, ArangoConnectionURL) => A)(container: ArangoContainer): A = {
    val connUrl = getConnUrl(container)
    val arangoDb = getDb(connUrl)
    testBody(arangoDb, connUrl)
  }

  private def getConnUrl(container: ArangoContainer): ArangoConnectionURL = {
    val host = container.getHost
    val port = container.getPort
    ArangoConnectionURL(s"arangodb://$host:$port/test")
  }

  private def getDb(connUrl: ArangoConnectionURL): ArangoDatabaseAsync = {
    new ArangoDatabaseFacade(connUrl, None, activeFailover = false).db
  }
}

object ArangoDbFixtureLike {
  private val ArangoDbVersion = MinArangoVerRecommended
  private val ArangoDbContainer: ArangoContainer = new ArangoContainer(ArangoDbVersion.asString).withoutAuth()
}
