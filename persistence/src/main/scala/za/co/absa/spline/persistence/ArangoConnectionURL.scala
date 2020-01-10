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

import java.net.{MalformedURLException, URI}

import org.apache.commons.lang3.StringUtils.trimToNull
import za.co.absa.commons.lang.OptionImplicits.StringWrapper
import za.co.absa.spline.persistence.ArangoConnectionURL.ArangoDbScheme

import scala.util.matching.Regex

case class ArangoConnectionURL(user: Option[String], password: Option[String], host: String, port: Int, dbName: String) {
  require(user.isDefined || password.isEmpty, "user cannot be blank if password is specified")

  def toURI: URI = {
    val userInfo = trimToNull(Seq(user, password.map(_ => "*****")).flatten.mkString(":"))
    new URI(ArangoDbScheme, userInfo, host, port, s"/$dbName", null, null)
  }
}

object ArangoConnectionURL {

  private val ArangoDbScheme = "arangodb"
  private val DefaultPort = 8529

  private val arangoConnectionUrlRegex = {
    val user = "([^@:]+)"
    val password = "(.+)"
    val host = "([^@:]+)"
    val port = "(\\d+)"
    val dbName = "(\\S+)"
    new Regex(s"$ArangoDbScheme://(?:$user(?::$password)?@)?$host(?::$port)?/$dbName")
  }

  def apply(url: String): ArangoConnectionURL = try {
    val arangoConnectionUrlRegex(user, password, host, port, dbName) = url
    ArangoConnectionURL(
      user = user.nonBlankOption,
      password = password.nonBlankOption,
      host = host,
      port = port.nonBlankOption.map(_.toInt) getOrElse DefaultPort,
      dbName = dbName
    )
  } catch {
    case e: scala.MatchError => throw new MalformedURLException(e.getMessage)
  }
}
