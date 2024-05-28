/*
 * Copyright 2020 ABSA Group Limited
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

package com.arangodb.internal

import com.arangodb.async.ArangoDatabaseAsync
import com.arangodb.async.internal.ArangoExecutorAsync
import com.arangodb.internal.net.{AccessType, HostDescription}
import com.arangodb.internal.velocystream.VstCommunication
import com.arangodb.internal.velocystream.internal.VstConnection
import org.apache.commons.lang3.StringUtils
import org.apache.http.auth.UsernamePasswordCredentials
import za.co.absa.commons.reflect.ReflectionUtils
import za.co.absa.spline.common.rest.{HttpStatusException, RESTClient, RESTClientApacheHttpImpl}

import java.net.URI
import javax.net.ssl.SSLContext
import scala.concurrent.{ExecutionContext, Future}

class InternalArangoDatabaseOps(db: ArangoDatabaseAsync)(implicit ec: ExecutionContext) {

  import com.arangodb.internal.velocystream.VstImplicits._

  /**
   * @see [[https://github.com/arangodb/arangodb-java-driver/issues/353]]
   */
  def restClient: RESTClient = {
    val vstComm = {
      val asyncExecutable = db.asInstanceOf[ArangoExecuteable[ArangoExecutorAsync]]
      val executor = asyncExecutable.executor
      ReflectionUtils.extractValue[ArangoExecutorAsync, VstCommunication[_, VstConnection[_]]](executor, "communication")
    }
    val connection = vstComm.connect(AccessType.WRITE)

    val maybeSslContext = Option(ReflectionUtils.extractValue[VstConnection[_], SSLContext](connection, "sslContext"))
    val scheme = if (maybeSslContext.isDefined) "https" else "http"

    val hostDescription = ReflectionUtils.extractValue[VstConnection[_], HostDescription](connection, "host")
    val host = hostDescription.getHost
    val port = hostDescription.getPort
    val database = db.name

    val maybeCredentials =
      for {
        username <- Option(vstComm.getUser)
        password = StringUtils.defaultString(vstComm.getPassword)
      } yield
        new UsernamePasswordCredentials(username, password)

    new RESTClientApacheHttpImpl(new URI(s"$scheme://$host:$port/_db/$database"), maybeCredentials, maybeSslContext)
  }


  /**
   * @see [[https://github.com/arangodb/arangodb-java-driver/issues/353]]
   */
  def adminExecute(script: String)(implicit ec: ExecutionContext): Future[Unit] =
    restClient.post("_admin/execute", script).recover {
      case e: HttpStatusException if e.status == 404 =>
        sys.error("" +
          "'/_admin/execute' endpoint is unreachable. " +
          "Make sure ArangoDB server is running with '--javascript.allow-admin-execute' option. " +
          "See https://www.arangodb.com/docs/stable/programs-arangod-javascript.html#javascript-code-execution")
    }
}
