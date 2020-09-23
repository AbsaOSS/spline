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

import java.time.{ZoneId, ZonedDateTime}

import org.mockito.ArgumentMatchers._
import org.mockito.Mockito._
import org.mockito.{ArgumentCaptor, Mockito}
import org.scalatest.OneInstancePerTest
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import org.scalatestplus.mockito.MockitoSugar
import za.co.absa.commons.scalatest.{ConsoleStubs, SystemExitFixture}
import za.co.absa.spline.persistence.OnDBExistsAction.{Drop, Fail, Skip}
import za.co.absa.spline.persistence.{ArangoConnectionURL, ArangoManager, ArangoManagerFactory}

import scala.concurrent.Future
import scala.concurrent.duration._

class AdminCLISpec
  extends AnyFlatSpec
    with OneInstancePerTest
    with MockitoSugar
    with Matchers
    with SystemExitFixture.SuiteHook
    with SystemExitFixture.Methods
    with ConsoleStubs {

  private val arangoManagerFactoryMock = mock[ArangoManagerFactory]
  private val arangoManagerMock = mock[ArangoManager]
  private val cli = new AdminCLI(arangoManagerFactoryMock)


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

    (when(
      arangoManagerFactoryMock.create(connUrlCaptor.capture))
      thenReturn arangoManagerMock)

    (when(
      arangoManagerMock.initialize(any()))
      thenReturn Future.successful(true))

    (when(
      arangoManagerMock.upgrade())
      thenReturn Future.successful({}))

    (when(
      arangoManagerMock.prune(any[Duration]()))
      thenReturn Future.successful({}))

    (when(
      arangoManagerMock.prune(any[ZonedDateTime]()))
      thenReturn Future.successful({}))

    (when(
      arangoManagerMock.execute(any()))
      thenReturn Future.successful({}))

    it should "when called with wrong options, print welcome message" in {
      captureStdErr {
        captureExitStatus(cli.exec(Array("db-init"))) should be(1)
      } should include("--help")

      captureStdErr {
        captureExitStatus(cli.exec(Array("db-upgrade", "-f"))) should be(1)
      } should include("--help")
    }

    behavior of "DB-Init"

    it should "initialize database" in assertingStdOut(include("DONE")) {
      cli.exec(Array("db-init", "arangodb://foo/bar"))
      connUrlCaptor.getValue should be(ArangoConnectionURL("arangodb://foo/bar"))
      verify(arangoManagerMock).initialize(Fail)
      verifyNoMoreInteractions(arangoManagerMock)
    }

    it should "initialize database eagerly" in assertingStdOut(include("DONE")) {
      cli.exec(Array("db-init", "arangodb://foo/bar", "-f"))
      connUrlCaptor.getValue should be(ArangoConnectionURL("arangodb://foo/bar"))
      verify(arangoManagerMock).initialize(Drop)
      verifyNoMoreInteractions(arangoManagerMock)
    }

    it should "initialize database lazily" in assertingStdOut(include("DONE")) {
      cli.exec(Array("db-init", "arangodb://foo/bar", "-s"))
      connUrlCaptor.getValue should be(ArangoConnectionURL("arangodb://foo/bar"))
      verify(arangoManagerMock).initialize(Skip)
      verifyNoMoreInteractions(arangoManagerMock)
    }

    it should "not allow for -s and -f to be use simultaneously" in {
      assertingStdErr(include("--force") and include("--skip") and include("cannot be used together")) {
        captureExitStatus(cli.exec(Array("db-init", "arangodb://foo/bar", "-s", "-f"))) should be(1)
      }
    }

    behavior of "DB-Upgrade"

    it should "upgrade database" in assertingStdOut(include("DONE")) {
      cli.exec(Array("db-upgrade", "arangodb://foo/bar"))
      connUrlCaptor.getValue should be(ArangoConnectionURL("arangodb://foo/bar"))
      verify(arangoManagerMock).upgrade()
      verifyNoMoreInteractions(arangoManagerMock)
    }

    it must "not say DONE when it's not done" in {
      when(arangoManagerMock.upgrade()) thenReturn Future.failed(new Exception("Boom!"))
      assertingStdOut(not(include("DONE"))) {
        intercept[Exception] {
          cli.exec(Array("db-upgrade", "arangodb://foo/bar"))
        }
      }
      verify(arangoManagerMock).upgrade()
      verifyNoMoreInteractions(arangoManagerMock)
    }

    behavior of "DB-Prune"

    it should "require either -r or -d option" in {
      val msg = captureStdErr(captureExitStatus(cli.exec(Array("db-prune", "arangodb://foo/bar"))) should be(1))
      msg should include("Try --help for more information")
    }

    it should "support retention duration" in assertingStdOut(include("DONE")) {
      cli.exec(Array("db-prune", "--retain-for", "30d", "arangodb://foo/bar"))
      connUrlCaptor.getValue should be(ArangoConnectionURL("arangodb://foo/bar"))
      verify(arangoManagerMock).prune(30.days)
      verifyNoMoreInteractions(arangoManagerMock)
    }

    it should "prune support threshold timestamp" in assertingStdOut(include("DONE")) {
      cli.exec(Array("db-prune", "--before-date", "2020-04-11", "arangodb://foo/bar"))
      cli.exec(Array("db-prune", "--before-date", "2020-04-11T22:33Z", "arangodb://foo/bar"))

      val inOrder = Mockito.inOrder(arangoManagerMock)

      inOrder.verify(arangoManagerMock).prune(ZonedDateTime.of(2020, 4, 11, 0, 0, 0, 0, ZoneId.systemDefault))
      inOrder.verify(arangoManagerMock).prune(ZonedDateTime.of(2020, 4, 11, 22, 33, 0, 0, ZoneId.of("Z")))
      inOrder.verifyNoMoreInteractions()
    }

    behavior of "DB-exec"

    it should "call no action" in {
      cli.exec(Array("db-exec", "arangodb://foo/bar"))
      verify(arangoManagerMock).execute()
    }

    it should "call DB Manager actions in order" in {
      cli.exec(Array(
        "db-exec",
        "arangodb://foo/bar",
        "--indices-delete",
        "--views-delete",
        "--foxx-reinstall",
        "--views-create",
        "--indices-create"))

      import za.co.absa.spline.persistence.AuxiliaryDBAction._
      verify(arangoManagerMock).execute(IndicesDelete, ViewsDelete, FoxxReinstall, ViewsCreate, IndicesCreate)
    }
  }
}
