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
import com.arangodb.mapping.ArangoJack
import com.fasterxml.jackson.module.scala.DefaultScalaModule
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
    val arangoJack = new ArangoJack
    arangoJack.configure(mapper => mapper
      .registerModule(new DefaultScalaModule)
    )
    val arangoBuilder = new ArangoDBAsync.Builder()
      .serializer(arangoJack)
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

  private val ArangoDBVerMinIncluding = semver"3.9.0"
  private val ArangoDBVerMaxExcluding = Option(semver"3.12.0")

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
    if (arangoVer < ArangoDBVerMinIncluding || ArangoDBVerMaxExcluding.exists(arangoVer.>=))
      sys.error(s"" +
        s"Unsupported ArangoDB server version detected: ${arangoVer.asString}. " +
        s"Please upgrade ArangoDB to version ${ArangoDBVerMinIncluding.asString} or higher" +
        (ArangoDBVerMaxExcluding.map(v => s" (but less than ${v.asString} which is currently not supported).") getOrElse "."))
  }
}
