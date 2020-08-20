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


  import java.net.URI

  import com.arangodb.async.ArangoDatabaseAsync
  import com.arangodb.async.internal.velocystream.VstCommunicationAsync
  import com.arangodb.async.internal.{ArangoDatabaseAsyncImpl, ArangoExecutorAsync}
  import com.arangodb.internal.velocystream.ConnectionParams
  import org.apache.commons.io.IOUtils
  import org.apache.http.auth.UsernamePasswordCredentials
  import org.apache.http.client.methods.HttpPost
  import org.apache.http.entity.StringEntity
  import org.apache.http.impl.auth.BasicScheme
  import org.apache.http.impl.client.HttpClients
  import za.co.absa.commons.lang.ARM.managed
  import za.co.absa.commons.reflect.ReflectionUtils

  import scala.compat.java8.FutureConverters.CompletionStageOps
  import scala.concurrent.{ExecutionContext, Future}
  import scala.reflect.ClassTag

  /**
   * A set of workarounds for the ArangoDB Java Driver
   */
  object ArangoDatabaseImplicits {

    implicit class InternalArangoDatabaseOps(val db: ArangoDatabaseAsync) extends AnyVal {

      /**
       * @see [[https://github.com/arangodb/arangodb-java-driver/issues/357]]
       */
      def foxxGet[A: ClassTag](path: String)(implicit ec: ExecutionContext): Future[A] = {
        import com.arangodb.async.internal.ArangoDatabaseAsyncImplImplicits._
        val resType = implicitly[ClassTag[A]].runtimeClass
        db.asInstanceOf[ArangoDatabaseAsyncImpl]
          .route(new URI(path))
          .get()
          .toScala
          .map(resp =>
            db.util().deserialize(resp.getBody, resType): A)
      }

      /**
       * @see [[https://github.com/arangodb/arangodb-java-driver/issues/353]]
       */
      def adminExecute(script: String): Future[Unit] = {
        val executor = db.asInstanceOf[ArangoExecuteable[_ <: ArangoExecutorAsync]].executor
        val dbName = db.name
        val comm = ReflectionUtils.extractFieldValue[VstCommunicationAsync](executor, "communication")
        val ConnectionParams(host, port, maybeUser, maybePassword) = comm

        val request = {
          val postReq = new HttpPost(s"http://$host:$port/_db/$dbName/_admin/execute")
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
          case 200 =>
            Future.successful({})
          case 404 =>
            sys.error("" +
              "'/_admin/execute' endpoint isn't reachable. " +
              "Make sure ArangoDB server is running with '--javascript.allow-admin-execute' option. " +
              "See https://www.arangodb.com/docs/stable/programs-arangod-javascript.html#javascript-code-execution")
          case _ =>
            sys.error(s"ArangoDB response: $respStatusLine. $respBody")
        }
      }
    }

  }

}
