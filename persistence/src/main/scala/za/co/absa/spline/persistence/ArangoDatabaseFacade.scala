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

import java.security.SecureRandom
import java.security.cert.X509Certificate
import java.util.concurrent.ExecutionException

import com.arangodb.async.{ArangoDBAsync, ArangoDatabaseAsync}
import com.arangodb.velocypack.module.scala.VPackScalaModule
import javax.net.ssl._
import org.springframework.beans.factory.DisposableBean
import za.co.absa.commons.lang.OptionImplicits.AnyWrapper
import za.co.absa.spline.persistence.ArangoDatabaseFacade._

class ArangoDatabaseFacade(connectionURL: ArangoConnectionURL) extends DisposableBean {

  private val ArangoConnectionURL(_, maybeUser, maybePassword, hostsWithPorts, dbName) = connectionURL

  private val isSecure = connectionURL.isSecure

  private val arango: ArangoDBAsync = {
    val arangoBuilder = new ArangoDBAsync.Builder()
      .registerModule(new VPackScalaModule)
      .useSsl(isSecure)
      .optionally(_.user(_: String), maybeUser)
      .optionally(_.password(_: String), maybePassword)

    // set SSL Context
    if (isSecure) arangoBuilder.sslContext(createSslContext())

    // enable active failover
    arangoBuilder.acquireHostList(true)
    for ((host, port) <- hostsWithPorts) arangoBuilder.host(host, port)

    // build ArangoDB Client
    arangoBuilder.build
  }

  val db: ArangoDatabaseAsync = {
    val db = arango.db(dbName)
    warmUpDb(db)
    db
  }

  override def destroy(): Unit = {
    withWorkaroundForArangoAsyncBug {
      arango.shutdown()
    }
  }
}

object ArangoDatabaseFacade {

  private def warmUpDb(db: ArangoDatabaseAsync): Unit = {
    withWorkaroundForArangoAsyncBug {
      db.getInfo.get()
    }
  }

  private def createSslContext(): SSLContext = {
    val sslContext = SSLContext.getInstance("SSL")
    sslContext.init(null, Array(TrustAll), new SecureRandom())
    sslContext
  }

  // Bypasses both client and server validation.
  private object TrustAll extends X509TrustManager {
    override val getAcceptedIssuers: Array[X509Certificate] = Array.empty

    override def checkClientTrusted(x509Certificates: Array[X509Certificate], s: String): Unit = {
      // do nothing
    }

    override def checkServerTrusted(x509Certificates: Array[X509Certificate], s: String): Unit = {
      // do nothing
    }
  }

  def withWorkaroundForArangoAsyncBug[A](body: => A): A = {
    try {
      body
    } catch {
      // The first call sometime fails with a CCE due to a bug in ArangoDB Java Driver
      // see: https://github.com/arangodb/arangodb-java-driver-async/issues/21
      case _: ClassCastException => body
      case ee: ExecutionException
        if ee.getCause.isInstanceOf[ClassCastException] => body
    }
  }
}

