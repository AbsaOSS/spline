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

package za.co.absa.spline.persistence

import com.arangodb.velocypack.module.scala.VPackScalaModule
import com.arangodb.{ArangoDB, ArangoDBAsync, ArangoDatabase, ArangoDatabaseAsync}
import za.co.absa.spline.common.OptionImplicits.AnyWrapper

object ArangoDatabaseFacade {

  def create(connectionURL: String): ArangoDatabase =
    create(ArangoConnectionURL(connectionURL))

  @deprecated("", "")
  def create(connectionURL: ArangoConnectionURL): ArangoDatabase = {
    val ArangoConnectionURL(maybeUser, maybePassword, host, maybePort, dbName) = connectionURL
    new ArangoDB.Builder()
      .registerModule(new VPackScalaModule)
      .optionally(_.host(host, _: Int), maybePort)
      .optionally(_.user(_: String), maybeUser)
      .optionally(_.password(_: String), maybePassword)
      .build
      .db(dbName)
  }

  def apply(connectionURL: ArangoConnectionURL): ArangoDatabaseAsync = {
    val ArangoConnectionURL(maybeUser, maybePassword, host, maybePort, dbName) = connectionURL
    new ArangoDBAsync.Builder()
      .registerModule(new VPackScalaModule)
      .optionally(_.host(host, _: Int), maybePort)
      .optionally(_.user(_: String), maybeUser)
      .optionally(_.password(_: String), maybePassword)
      .build
      .db(dbName)
  }
}

