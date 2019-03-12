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

package za.co.absa.spline

import java.util.concurrent.Executors

import org.scalatest._
import za.co.absa.spline.fixture.{ArangoFixture, LineageFixture, MongoFixture}
import za.co.absa.spline.migrator.MongoStreamMigrator

import scala.concurrent.{ExecutionContext, ExecutionContextExecutor, Future}

class MongoStreamMigratorSpec extends AsyncFunSpec
  with Matchers with MongoFixture with ArangoFixture with LineageFixture {

  // Prevents insufficient number of threads causing test failure.
  implicit val ec: ExecutionContextExecutor = ExecutionContext.fromExecutor(Executors.newFixedThreadPool(3))

  private val lineage = fiveOpsLineage()

  describe("migration tool test") {
    it("stream new lineages to db") {
      val streaming = Future { new MongoStreamMigrator(mongoUri, arangoUri).start() }
      Thread.sleep(5000)
      lineageWriter.store(lineage).map(_ => {
        var count = 0
        do {
          count = count + 1
          Thread.sleep(1000)
          println(s"Looking for lineage with id ${lineage.id} for $count time.")
        } while(!isLineageStoredInArango(lineage.id) && count < 90)
        isLineageStoredInArango(lineage.id) shouldBe true
      })
    }
  }

  private def isLineageStoredInArango(lineageId: String) =
    arangodb
      .collection("execution")
      .documentExists(lineage.id.replaceFirst("ln_", ""))

}

