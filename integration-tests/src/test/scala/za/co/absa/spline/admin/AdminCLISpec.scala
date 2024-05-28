/*
 * Copyright 2023 ABSA Group Limited
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

package za.co.absa.spline.admin

import com.arangodb.model.CollectionsReadOptions
import org.scalatest.flatspec.AsyncFlatSpec
import org.scalatest.matchers.should.Matchers
import org.testcontainers.shaded.org.hamcrest.Matchers.blankString
import za.co.absa.commons.reflect.EnumerationMacros.sealedInstancesOf
import za.co.absa.commons.scalatest.{ConsoleStubs, SystemExitFixture}
import za.co.absa.spline.persistence.model.CollectionDef
import za.co.absa.spline.test.fixture.{ArangoDbFixtureAsync, TestContainersFixtureAsync}

import scala.jdk.CollectionConverters._
import scala.compat.java8.FutureConverters._

class AdminCLISpec
  extends AsyncFlatSpec
    with TestContainersFixtureAsync
    with ArangoDbFixtureAsync
    with Matchers
    with SystemExitFixture.SuiteHook
    with SystemExitFixture.Methods
    with ConsoleStubs {

  behavior of "db-init"

  it should "create a new database" in {
    withArangoDb { (db, connUrl) =>
      captureExitStatus(AdminCLI.main(Array("db-init", connUrl.asString))) should be(0)

      for {
        collections <- db.getCollections(new CollectionsReadOptions().excludeSystem(true)).toScala
        curDbVersion <- db.query("FOR r IN dbVersion FILTER r.status == 'current' RETURN r.version", classOf[String]).toScala
        foxxSvcResp <- db.route("/_api/foxx").get().toScala
      } yield {

        // verify collections
        collections.asScala.map(_.getName) should contain allElementsOf sealedInstancesOf[CollectionDef].map(_.name)

        // verify db version
        val curDbVers = curDbVersion.iterator().asScala.toArray
        curDbVers should have length 1
        curDbVers.head should not be blankString

        // verify Foxx service
        foxxSvcResp
          .getBody.arrayIterator.asScala
          .map(_.get("mount").getAsString)
          .toArray should contain("/spline")
      }
    }
  }

  it should "re-create the database, when run with '--force'" in {
    withArangoDb { (db, connUrl) =>
      captureExitStatus(AdminCLI.main(Array("db-init", connUrl.asString))) should be(0)
      for {
        testCollection <- db.createCollection("test-collection").toScala
        testColExists1 <- db.collection(testCollection.getName).exists().toScala
        statusOf2ndRun = captureExitStatus(AdminCLI.main(Array("db-init", connUrl.asString, "--force")))
        testColExists2 <- db.collection(testCollection.getName).exists().toScala
      } yield {
        statusOf2ndRun should be(0)
        testColExists1.booleanValue() should be(true)
        testColExists2.booleanValue() should be(false)
      }
    }
  }

  behavior of "db-init --dry-run"

  it should "emulate the process of creating a db without actually writing anything" in {
    withArangoDb { (db, connUrl) =>
      captureStdOut {
        captureExitStatus {
          AdminCLI.main(Array("db-init", connUrl.asString, "--dry-run"))
        } should be(0)
      } should include("Dry-run mode activated")

      for {
        dbExists <- db.exists().toScala
      } yield {
        dbExists.booleanValue() should be(false)
      }
    }
  }
}
