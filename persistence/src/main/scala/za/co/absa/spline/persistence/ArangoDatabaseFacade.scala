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

import com.arangodb.async.{ArangoDBAsync, ArangoDatabaseAsync}
import com.arangodb.velocypack.module.scala.VPackScalaModule
import org.springframework.beans.factory.DisposableBean
import za.co.absa.commons.lang.OptionImplicits.AnyWrapper

class ArangoDatabaseFacade(connectionURL: ArangoConnectionURL) extends DisposableBean {

  private val ArangoConnectionURL(maybeUser, maybePassword, hostsWithPorts, dbName) = connectionURL

  private val arango: ArangoDBAsync = {
    val arangoBuilder = new ArangoDBAsync.Builder()
      .registerModule(new VPackScalaModule)
      .optionally(_.user(_: String), maybeUser)
      .optionally(_.password(_: String), maybePassword)

    // enable active failover
    arangoBuilder.acquireHostList(true)
    for ((host, port) <- hostsWithPorts) arangoBuilder.host(host, port)

    arangoBuilder.build
  }

  val db: ArangoDatabaseAsync = arango.db(dbName)

  override def destroy(): Unit = arango.shutdown()
}

