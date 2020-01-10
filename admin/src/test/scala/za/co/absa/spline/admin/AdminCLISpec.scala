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

package za.co.absa.spline.admin

import org.mockito.ArgumentCaptor
import org.mockito.ArgumentMatchers._
import org.mockito.Mockito._
import org.scalatest.OneInstancePerTest
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import org.scalatestplus.mockito.MockitoSugar
import za.co.absa.commons.scalatest.{ConsoleStubs, SystemExitFixture}
import za.co.absa.spline.persistence.{ArangoConnectionURL, ArangoInit}

import scala.concurrent.Future

class AdminCLISpec
  extends AnyFlatSpec
    with OneInstancePerTest
    with MockitoSugar
    with Matchers
    with SystemExitFixture.SuiteHook
    with SystemExitFixture.Methods
    with ConsoleStubs {

  private val arangoInitMock = mock[ArangoInit]
  private val cli = new AdminCLI(arangoInitMock)


  behavior of "AdminCLI"

  {
    it should "when called with no args, print welcome message" in {
      val msg = captureStdErr(captureExitStatus(cli.exec(Array.empty)) should be(1))
      msg should include("Try --help for more information")
    }
  }


  behavior of "DB Commands"

  {
    val connUrlCaptor: ArgumentCaptor[ArangoConnectionURL] = ArgumentCaptor.forClass(classOf[ArangoConnectionURL])
    val dropFlgCaptor: ArgumentCaptor[Boolean] = ArgumentCaptor.forClass(classOf[Boolean])

    (when(
      arangoInitMock.initialize(connUrlCaptor.capture, dropFlgCaptor.capture))
      thenReturn Future.successful({}))

    (when(
      arangoInitMock.upgrade(connUrlCaptor.capture))
      thenReturn Future.successful({}))

    it should "when called with wrong options, print welcome message" in {
      captureStdErr {
        captureExitStatus(cli.exec(Array("db-init"))) should be(1)
      } should include("--help")

      captureStdErr {
        captureExitStatus(cli.exec(Array("db-upgrade", "-f"))) should be(1)
      } should include("--help")
    }

    it should "initialize database" in assertingStdOut(include("DONE")) {
      cli.exec(Array("db-init", "arangodb://foo/bar"))
      connUrlCaptor.getValue should be(ArangoConnectionURL("arangodb://foo/bar"))
      dropFlgCaptor.getValue should be(false)
    }

    it should "initialize database forcedly" in assertingStdOut(include("DONE")) {
      cli.exec(Array("db-init", "arangodb://foo/bar", "-f"))
      connUrlCaptor.getValue should be(ArangoConnectionURL("arangodb://foo/bar"))
      dropFlgCaptor.getValue should be(true)
    }

    it should "upgrade database" in assertingStdOut(include("DONE")) {
      cli.exec(Array("db-upgrade", "arangodb://foo/bar"))
      connUrlCaptor.getValue should be(ArangoConnectionURL("arangodb://foo/bar"))
    }

    it must "not say DONE when it's not done" in {
      when(arangoInitMock.upgrade(any())) thenReturn Future.failed(new Exception("Boom!"))
      assertingStdOut(not(include("DONE"))) {
        intercept[Exception] {
          cli.exec(Array("db-upgrade", "arangodb://foo/bar"))
        }
      }
    }
  }
}
