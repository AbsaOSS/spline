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

package za.co.absa.spline.migrator.rest

import akka.actor.ActorRefFactory
import akka.stream.ActorMaterializer
import play.api.libs.ws.DefaultBodyWritables._
import play.api.libs.ws.ahc.StandaloneAhcWSClient
import za.co.absa.spline.migrator.ActorSystemFacade
import za.co.absa.spline.migrator.rest.HttpConstants._
import za.co.absa.spline.migrator.rest.RestClient.HttpException

import scala.concurrent.{ExecutionContext, Future}

class RestClientPlayWsImpl(baseUrl: String) extends RestClient with AutoCloseable {

  private implicit val actorFactory: ActorRefFactory = ActorSystemFacade.actorFactory
  private implicit val materializer: ActorMaterializer = ActorMaterializer()
  private val ws = StandaloneAhcWSClient()

  override def createEndpoint(resourceName: String): RestEndpoint = {
    val request = ws
      .url(s"$baseUrl/$resourceName")
      .addHttpHeaders((Header.ContentType, MimeType.Json))

    new RestEndpoint {
      override def head()(implicit ec: ExecutionContext): Future[Unit] = request
        .head()
        .flatMap({
          case resp if resp.status >= 400 =>
            Future.failed(HttpException(s"${resp.status} ${resp.statusText}"))
          case _ =>
            Future.successful(Unit)
        })

      override def post(data: String)(implicit ec: ExecutionContext): Future[String] = request
        .post(data)
        .flatMap({
          case resp if resp.status >= 400 =>
            Future.failed(HttpException(resp.body))
          case resp =>
            Future.successful(resp.body)
        })
    }
  }

  override def close(): Unit = ws.close()
}
