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

import java.net.MalformedURLException

import org.scalatest.{FlatSpec, Matchers}

class ArangoConnectionURLSpec extends FlatSpec with Matchers {

  it should "parse ArangoDB connection URL without port number" in {
    val url = ArangoConnectionURL("arangodb://my.host.com/foo-bar_db")
    url.host shouldEqual "my.host.com"
    url.dbName shouldEqual "foo-bar_db"
  }

  it should "parse ArangoDB connection URL with port number" in {
    val url = ArangoConnectionURL("arangodb://my.host.com:1234/foo-bar_db")
    url.host shouldEqual "my.host.com"
    url.port shouldEqual Some(1234)
    url.dbName shouldEqual "foo-bar_db"
  }

  it should "parse ArangoDB connection URL with user and empty password" in {
    val url = ArangoConnectionURL("arangodb://user-123@my.host.com/foo-bar_db")
    url.host shouldEqual "my.host.com"
    url.dbName shouldEqual "foo-bar_db"
    url.user shouldEqual Some("user-123")
  }

  it should "parse ArangoDB connection URL with user and password" in {
    val url = ArangoConnectionURL("arangodb://user-123:this:is@my_sup&r~5a$$w)rd@my.host.com/foo-bar_db")
    url.host shouldEqual "my.host.com"
    url.dbName shouldEqual "foo-bar_db"
    url.user shouldEqual Some("user-123")
    url.password shouldEqual Some("this:is@my_sup&r~5a$$w)rd")
  }

  it should "fail on null or malformed connectionUrl" in {
    a[MalformedURLException] should be thrownBy ArangoConnectionURL(null)
    a[MalformedURLException] should be thrownBy ArangoConnectionURL("bull**it")
  }

  it should "fail on missing host, port or database name" in {
    a[MalformedURLException] should be thrownBy ArangoConnectionURL("arangodb://my.host.com:1234")
  }

}
