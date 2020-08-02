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
  import com.arangodb.internal.velocystream.ServerCoordinates
  import org.apache.commons.io.IOUtils
  import org.apache.http.client.methods.HttpPost
  import org.apache.http.entity.StringEntity
  import org.apache.http.impl.client.HttpClients
  import za.co.absa.commons.lang.ARM.managed
  import za.co.absa.commons.reflect.ReflectionUtils

  import scala.concurrent.Future

  /**
   * A workaround for the ArangoDB Java Driver issue #353
   *
   * @see [[https://github.com/arangodb/arangodb-java-driver/issues/353]]
   */
  object InternalArangoDatabaseImplicits {

    implicit class InternalArangoDatabaseOps(db: ArangoDatabaseAsync) {

      def adminExecute(script: String): Future[Unit] = {
        val executor = db.asInstanceOf[ArangoExecuteable[_ <: ArangoExecutorAsync]].executor
        val dbName = db.name
        val comm = ReflectionUtils.extractFieldValue[VstCommunicationAsync](executor, "communication")
        val ServerCoordinates(host, port, user, password) = comm

        val request = {
          val post = new HttpPost(s"http://$host:$port/_db/$dbName/_admin/execute")
          post.setEntity(new StringEntity(script))
          // fixme: add authentication
          post
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

  package velocystream {

    import com.arangodb.internal.net.{AccessType, HostDescription, HostHandler}

    import scala.reflect.ClassTag

    case class ServerCoordinates(host: String, port: Int, user: Option[String], password: Option[String])

    object ServerCoordinates {
      def unapply(comm: VstCommunicationAsync): Option[(String, Int, Option[String], Option[String])] = {
        val user = comm.user
        val password = comm.password
        val hostHandler = extractFieldValue[VstCommunication[_, _], HostHandler](comm, "hostHandler")
        val host = hostHandler.get(null, AccessType.WRITE)
        val hostDescr = ReflectionUtils.extractFieldValue[HostDescription](host, "description")
        Some((
          hostDescr.getHost,
          hostDescr.getPort,
          Option(user),
          Option(password)
        ))
      }

      private def extractFieldValue[A: ClassTag, B](o: AnyRef, fieldName: String) = {
        // fixme: incorporate it into the commons impl / fix one to find field in super-classes
        val declaringClass = implicitly[ClassTag[A]]
        val field = declaringClass.runtimeClass.getDeclaredField(fieldName)
        field.setAccessible(true)
        field.get(o).asInstanceOf[B]
      }
    }

  }

}
