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
import com.arangodb.async.{ArangoDBAsync, ArangoDatabaseAsync}
import org.springframework.beans.factory.DisposableBean
import za.co.absa.commons.lang.OptionImplicits.AnyWrapper

import javax.net.ssl._
import java.security.SecureRandom
import java.security.cert.X509Certificate

class ArangoDatabaseFacade(connectionURL: ArangoConnectionURL) extends DisposableBean {

  private val ArangoConnectionURL(_, maybeUser, maybePassword, host, port, dbName) = connectionURL

  private val isSecure = connectionURL.isSecure

  private def createSslContext: SSLContext = {
    val sslContext = SSLContext.getInstance("SSL")
    sslContext.init(null, Array(TrustAll), new SecureRandom())
    sslContext
  }

  // Bypasses both client and server validation.
  private object TrustAll extends X509TrustManager {
    val getAcceptedIssuers = null
    def checkClientTrusted(x509Certificates: Array[X509Certificate], s: String) = {}
    def checkServerTrusted(x509Certificates: Array[X509Certificate], s: String) = {}
  }

  // Verifies all host names by simply returning true.
  private object VerifiesAllHostNames extends HostnameVerifier {
    def verify(s: String, sslSession: SSLSession) = true
  }

  private val arango: ArangoDBAsync = new ArangoDBAsync.Builder()
    .registerModule(new VPackScalaModule)
    .useSsl(isSecure)
    .optionally(_.sslContext(_: SSLContext), Option(isSecure).map(_ => createSslContext))
    .host(host, port)
    .optionally(_.user(_: String), maybeUser)
    .optionally(_.password(_: String), maybePassword)
    .build

  val db: ArangoDatabaseAsync = arango.db(dbName)

  override def destroy(): Unit = arango.shutdown()
}

