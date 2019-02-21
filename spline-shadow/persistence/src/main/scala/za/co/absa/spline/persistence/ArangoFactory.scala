/*
 * Copyright 2017 ABSA Group Limited
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

import java.net.URI

import com.arangodb.{ArangoDB, ArangoDatabase, Protocol}

object ArangoFactory {

  def create(uri: URI): ArangoDatabase = {
    val dbName = uri.getPath.replaceFirst("/", "")
    val protocol: Protocol = Option(uri.getScheme)
      .map(parseProtocol)
      .getOrElse(Protocol.HTTP_VPACK)
    val (user, password) = Option(uri.getUserInfo)
      .map(_.split(':'))
      .map(s => (s(0), s(1)))
      .getOrElse(("root", "root"))
    new ArangoDB.Builder()
      .user(user)
      .password(password)
      .host(uri.getHost, uri.getPort)
      .useProtocol(protocol)
      .build()
      .db(dbName)
  }

  def parseProtocol(scheme: String): Protocol = {
    scheme match {
      case "https" | "http" => Protocol.HTTP_VPACK
      case "http-json" => Protocol.HTTP_JSON
      case "vst" => Protocol.VST
      case _ => Protocol.HTTP_VPACK
    }
  }

}
