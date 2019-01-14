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

import org.scalatest.{FunSpec, Ignore}

import scala.concurrent.Await
import scala.concurrent.duration.Duration

@Ignore
class MigratorToolSpec extends FunSpec {

  describe("migration tool test") {
    it("migrate from mongo to arango") {
      Await.result(MigratorTool.migrate(new MigratorConfig("mongodb://localhost:27017/migration-test", batchSize = 10, batchesMax = 1)), Duration.Inf)
    }
  }

}
