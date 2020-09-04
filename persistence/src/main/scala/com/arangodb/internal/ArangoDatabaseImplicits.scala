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

package com.arangodb.internal {


  import com.arangodb.async.ArangoDatabaseAsync
  import com.arangodb.async.internal.ArangoExecutorAsync
  import com.arangodb.async.internal.velocystream.VstCommunicationAsync
  import com.arangodb.internal.velocystream.ConnectionParams
  import org.apache.commons.io.IOUtils
  import org.apache.http.HttpException
  import org.apache.http.auth.UsernamePasswordCredentials
  import org.apache.http.client.methods.HttpPost
  import org.apache.http.entity.StringEntity
  import org.apache.http.impl.auth.BasicScheme
  import org.apache.http.impl.client.HttpClients
  import za.co.absa.commons.lang.ARM.managed
  import za.co.absa.commons.reflect.ReflectionUtils

  import scala.concurrent.Future

  /**
   * A set of workarounds for the ArangoDB Java Driver
   */
  object ArangoDatabaseImplicits {

    class HttpStatusException(val status: Int, message: String) extends HttpException(message)

    implicit class InternalArangoDatabaseOps(val db: ArangoDatabaseAsync) extends AnyVal {

      /**
       * @see [[https://github.com/arangodb/arangodb-java-driver/issues/353]]
       */
      def adminExecute(script: String): Future[Unit] =
        try {
          post("_admin/execute", script)
        }
        catch {
          case e: HttpStatusException if e.status == 404 =>
            sys.error("" +
              "'/_admin/execute' endpoint is unreachable. " +
              "Make sure ArangoDB server is running with '--javascript.allow-admin-execute' option. " +
              "See https://www.arangodb.com/docs/stable/programs-arangod-javascript.html#javascript-code-execution")
        }

      /**
       * @see [[https://github.com/arangodb/arangodb-java-driver/issues/353]]
       */
      def foxxRegister(mountPrefix: String, script: String): Future[Unit] =
        post(s"_api/foxx?mount=$mountPrefix", script)

      @throws[HttpStatusException]
      private def post(path: String, script: String): Future[Unit] = {
        val executor = db.asInstanceOf[ArangoExecuteable[_ <: ArangoExecutorAsync]].executor
        val dbName = db.name
        val comm = ReflectionUtils.extractFieldValue[VstCommunicationAsync](executor, "communication")
        val ConnectionParams(host, port, maybeUser, maybePassword) = comm

        val request = {
          val postReq = new HttpPost(s"http://$host:$port/_db/$dbName/$path")
          postReq.setEntity(new StringEntity(script))
          maybeUser.foreach(user => {
            val credentials = new UsernamePasswordCredentials(user, maybePassword.orNull)
            val authHeader = new BasicScheme().authenticate(credentials, postReq, null)
            postReq.addHeader(authHeader)
          })
          postReq
        }

        val (respStatusLine, respBody) =
          for {
            httpClient <- managed(HttpClients.createDefault)
            response <- managed(httpClient.execute(request))
            inputStream <- managed(response.getEntity.getContent)
          } yield {
            val encoding = Option(response.getEntity.getContentEncoding).map(_.getValue).getOrElse("UTF-8")
            val body = IOUtils.toString(inputStream, encoding)
            (response.getStatusLine, body)
          }

        respStatusLine.getStatusCode match {
          case 200 | 201 | 204 =>
            Future.successful({})
          case _ =>
            throw new HttpStatusException(respStatusLine.getStatusCode, s"ArangoDB response: $respStatusLine. $respBody")
        }
      }
    }

  }

}
