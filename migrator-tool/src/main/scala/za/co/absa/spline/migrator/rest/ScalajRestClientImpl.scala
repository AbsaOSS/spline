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

import scalaj.http.{Http, StringBodyConnectFunc}
import za.co.absa.spline.migrator.rest.ScalajRestClientImpl._

import scala.concurrent.{ExecutionContext, Future, blocking}

class ScalajRestClientImpl(baseUrl: String) extends RestClient {

  override def createEndpoint(resourceName: String): RestEndpoint = new RestEndpoint {

    private val httpRequest =
      Http(s"$baseUrl/$resourceName")
        .header(Header.ContentType, MimeType.Json)
        .method(Method.Post)

    override def post(data: String)(implicit ec: ExecutionContext): Future[String] = Future {
      blocking {
        httpRequest
          .copy(connectFunc = StringBodyConnectFunc(data))
          .asString
          .throwError
          .body
      }
    }
  }
}

object ScalajRestClientImpl {

  private object MimeType {
    val Json = "application/json"
  }

  private object Header {
    val ContentType = "Content-Type"
  }

  private object Method {
    val Post = "POST"
  }

}