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
import com.typesafe.scalalogging.LazyLogging
import org.springframework.beans.factory.DisposableBean
import za.co.absa.commons.version.Version

import javax.net.ssl._
import scala.concurrent._

class ArangoDatabaseFacade(connectionURL: ArangoConnectionURL, maybeSSLContext: Option[SSLContext], activeFailover: Boolean)
  extends DisposableBean {

  import za.co.absa.commons.lang.extensions.AnyExtension._
  import za.co.absa.spline.persistence.ArangoDatabaseFacade._

  private val ArangoConnectionURL(_, maybeUser, maybePassword, hostsWithPorts, dbName) = connectionURL

  private val isSecure = connectionURL.isSecure

  private val arango: ArangoDBAsync = {
    val arangoBuilder = new ArangoDBAsync.Builder()
      .registerModule(new VPackScalaModule)
      .having(maybeUser)(_ user _)
      .having(maybePassword)(_ password _)

    // enable SSL if required
    if (isSecure) {
      arangoBuilder
        .useSsl(true)
        .having(maybeSSLContext)(_ sslContext _)
    }

    // enable active failover
    arangoBuilder.acquireHostList(activeFailover)

    for ((host, port) <- hostsWithPorts) arangoBuilder.host(host, port)

    // build ArangoDB Client
    arangoBuilder.build
  }

  // The val is lazy to not prevent a facade instance from being created.
  // It allows connection to be re-attempted later and the {{shutdown()}} method to be called.
  lazy val db: ArangoDatabaseAsync = {
    val db = arango.db(dbName)
    warmUpDb(db)
    db
  }

  override def destroy(): Unit = {
    arango.shutdown()
  }
}

object ArangoDatabaseFacade extends LazyLogging {

  import za.co.absa.commons.version.Version._

  val MinArangoVerRequired: Version = semver"3.6.0"
  val MinArangoVerRecommended: Version = ver"3.10"

  private def warmUpDb(db: ArangoDatabaseAsync): Unit = {
    val verStr = try {
      blocking {
        db.arango
          .getVersion
          .get
          .getVersion
      }
    } catch {
      case ce: ExecutionException =>
        throw ce.getCause
    }

    val arangoVer = Version.asSemVer(verStr)

    // check ArangoDb server version requirements
    if (arangoVer < MinArangoVerRequired)
      sys.error(s"" +
        s"Unsupported ArangoDB server version ${arangoVer.asString}. " +
        s"Required version: ${MinArangoVerRequired.asString} or later. " +
        s"Recommended version: ${MinArangoVerRecommended.asString} or later.")

    if (arangoVer < MinArangoVerRecommended)
      logger.warn(s"WARNING: " +
        s"The ArangoDB server version ${arangoVer.asString} might contain a bug that can cause Spline malfunction. " +
        s"It's highly recommended to upgrade to ArangoDB ${MinArangoVerRecommended.asString} or later. " +
        s"See: https://github.com/arangodb/arangodb/issues/12693")
  }
}
