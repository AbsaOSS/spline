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

package za.co.absa.spline.migrator

import java.net.URI

import org.scalatest.{AsyncFunSpec, Ignore, Matchers}
import za.co.absa.spline.persistence.{ArangoFactory, ArangoInit}

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, Future}

@Ignore
class MigratorToolSpec extends AsyncFunSpec with Matchers {

  private val mongoUri = "mongodb://localhost:27017/spline_jedi"
  private val arangoUri = "http://root:root@localhost:8529/manual-test"

  describe("migration tool test") {
    it("migrate from mongo to arango") {
      val db = ArangoFactory.create(new URI(arangoUri))
      ArangoInit.initialize(db, dropIfExists = true)
      val config = new MigratorConfig(mongoUri, arangoConnectionUrl = arangoUri, batchSize = 20, batchesMax = 1, streamNewLineages = false)
      MigratorTool.migrate(config)
        .flatMap(stats => stats.failures shouldBe 0)
    }
  }

}
