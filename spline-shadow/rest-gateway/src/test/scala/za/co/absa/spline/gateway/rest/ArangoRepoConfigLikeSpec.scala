/*
 * Copyright 2019 ABSA Group Limited
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

package za.co.absa.spline.gateway.rest

import org.apache.commons.configuration.BaseConfiguration
import org.scalatest.{FunSpec, Matchers}
import za.co.absa.spline.gateway.rest.ArangoRepoConfigLikeSpec._

class ArangoRepoConfigLikeSpec extends FunSpec with Matchers {

  describe("configuration") {

    describe("database") {

      it("should parse ArangoDB connection URL with anonymous access") {
        withConnectionUrl("arangodb://my.host.com:1234/foo-bar_db") { conf =>
          conf.Database.host shouldEqual "my.host.com"
          conf.Database.port shouldEqual "1234"
          conf.Database.name shouldEqual "foo-bar_db"
        }
      }

      it("should parse ArangoDB connection URL with user and empty password") {
        withConnectionUrl("arangodb://user-123@my.host.com:1234/foo-bar_db") { conf =>
          conf.Database.host shouldEqual "my.host.com"
          conf.Database.port shouldEqual "1234"
          conf.Database.name shouldEqual "foo-bar_db"
          conf.Database.user shouldEqual "user-123"
        }
      }

      it("should parse ArangoDB connection URL with user and password") {
        withConnectionUrl("arangodb://user-123:this:is@my_sup&r~5a$$w)rd@my.host.com:1234/foo-bar_db") { conf =>
          conf.Database.host shouldEqual "my.host.com"
          conf.Database.port shouldEqual "1234"
          conf.Database.name shouldEqual "foo-bar_db"
          conf.Database.user shouldEqual "user-123"
          conf.Database.password shouldEqual "this:is@my_sup&r~5a$$w)rd"
        }
      }

      it("should fail on missing connectionUrl") {
        def attempt = withConnectionUrl(null)(_.Database)
        intercept[NoSuchElementException](attempt).getMessage should include("spline.database.connectionUrl")
      }

      it("should fail on missing host, port or database name") {
        intercept[MatchError](withConnectionUrl("arangodb://my.host.com:1234")(_.Database))
      }
    }
  }
}

object ArangoRepoConfigLikeSpec {

  def withConnectionUrl[T](value: String)(testBody: ArangoRepoConfigLike => T): T =
    testBody(new BaseConfiguration with ArangoRepoConfigLike {
      setProperty("spline.database.connectionUrl", value)
    })
}
