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

import ch.qos.logback.classic.{Level, Logger}
import org.mockito.ArgumentMatchers._
import org.mockito.Mockito._
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FlatSpec, Matchers, OneInstancePerTest}
import org.slf4j.Logger.ROOT_LOGGER_NAME
import org.slf4j.LoggerFactory
import za.co.absa.spline.common.TempFile
import za.co.absa.spline.common.scalatest.{ConsoleStubs, MatcherImplicits, SystemExitFixture}
import za.co.absa.spline.migrator.MigratorCLISpec.SuccessStats

import scala.concurrent.ExecutionContext

object MigratorCLISpec {
  private val SuccessStats = SimpleStats(42, 0, 0)
}

class MigratorCLISpec
  extends FlatSpec
    with OneInstancePerTest
    with MockitoSugar
    with Matchers
    with MatcherImplicits
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

  behavior of "--log-level"

  it should "set the root log level" in {
    val rootLogger = LoggerFactory.getLogger(ROOT_LOGGER_NAME).asInstanceOf[Logger]

    when(migratorToolMock.migrate(any())) thenReturn SuccessStats

    Seq("OFF", "ERROR", "WARN", "INFO", "DEBUG", "TRACE", "ALL") foreach { level =>
      assertingExitStatus(be(0)) {
        assertingStdOut(startWith("SUCCESS. All records migrated: 42")) {
          cli.exec(dummyArgs ++ Seq("--log-level", level))
        }
        rootLogger.getLevel should be(Level.valueOf(level))
      }
    }
  }

  it should "fail on an incorrect log level name" in {
    assertingExitStatus(be(1)) {
      assertingStdOut(include("OFF, ERROR, WARN, INFO, DEBUG, TRACE, ALL") and include("--help")) {
        cli.exec(dummyArgs ++ Seq("--log-level", "WRONG"))
      }
    }
  }

  behavior of "--failrec"

  it should "fail when file already exist" in {
    val existingFile = TempFile().deleteOnExit().file
    assertingExitStatus(be(1)) {
      assertingStdOut(include("file already exists")) {
        cli.exec(dummyArgs ++ Seq("--failrec", existingFile.getPath))
      }
    }
  }

  behavior of "--retry-from"

  it should "fail when file does not exist" in {
    val missingFile = TempFile(pathOnly = true).file
    assertingExitStatus(be(1)) {
      assertingStdOut(include("file must exist")) {
        cli.exec(dummyArgs ++ Seq("--retry-from", missingFile.getPath))
      }
    }
  }

  behavior of "result status reporting"

  it should "be SUCCESS when all docs succeeded" in {
    when(migratorToolMock.migrate(any())) thenReturn SuccessStats
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
