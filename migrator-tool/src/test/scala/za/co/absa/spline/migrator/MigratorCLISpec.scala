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

package za.co.absa.spline.migrator

import java.util.concurrent.Executors

import org.mockito.ArgumentMatchers._
import org.mockito.Mockito._
import org.scalatest.{FlatSpec, Matchers, OneInstancePerTest}
import org.scalatestplus.mockito.MockitoSugar
import za.co.absa.spline.common.scalatest.{ConsoleStubs, SystemExitFixture}

import scala.concurrent.ExecutionContext

class MigratorCLISpec
  extends FlatSpec
    with OneInstancePerTest
    with MockitoSugar
    with Matchers
    with SystemExitFixture.SuiteHook
    with SystemExitFixture.Methods
    with ConsoleStubs {

  private val migratorToolMock = mock[MigratorTool]
  private val cli = new MigratorCLI(migratorToolMock)
  private val dummyArgs = Array("-s", "mongodb://foo", "-t", "http://bar")

  behavior of "MigratorCLI"

  private implicit val ex: ExecutionContext = ExecutionContext.fromExecutor(Executors.newFixedThreadPool(1))

  it should "when called with no args, print welcome message" in {

    assertingExitStatus(be(1)) {
      assertingStdOut(include("Try --help for more information")) {
        cli.exec(Array.empty)
      }
    }
  }

  it should "when called with wrong args, print welcome message" in {
    assertingExitStatus(be(1)) {
      assertingStdOut(include("--help")) {
        cli.exec(Array("--wrong-args"))
      }
    }
  }

  it should "be SUCCESS when all docs succeeded" in {
    when(migratorToolMock.migrate(any())) thenReturn SimpleStats(42, 0, 0)
    assertingExitStatus(be(0)) {
      assertingStdOut(startWith("SUCCESS. All records migrated: 42")) {
        cli.exec(dummyArgs)
      }
    }
  }

  it should "be WARNING when some docs failed" in {
    when(migratorToolMock.migrate(any())) thenReturn SimpleStats(40, 2, 0)
    assertingExitStatus(be(2)) {
      assertingStdOut(startWith("WARNING. Totally processed: 42 (of which successfully migrated: 40, failed: 2)")) {
        cli.exec(dummyArgs)
      }
    }
  }

  it should "be FAILURE when all docs failed" in {
    when(migratorToolMock.migrate(any())) thenReturn SimpleStats(0, 42, 0)
    assertingExitStatus(be(1)) {
      assertingStdOut(startWith("FAILURE. All records failed: 42")) {
        cli.exec(dummyArgs)
      }
    }
  }

  it should "be WARNING when no docs processed" in {
    when(migratorToolMock.migrate(any())) thenReturn SimpleStats(0, 0, 0)
    assertingExitStatus(be(2)) {
      assertingStdOut(startWith("WARNING. No records found")) {
        cli.exec(dummyArgs)
      }
    }
  }
}
