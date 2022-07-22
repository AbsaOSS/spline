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
import org.scalatest.OptionValues._
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import org.scalatestplus.mockito.MockitoSugar
import za.co.absa.commons.scalatest.{ConsoleStubs, SystemExitFixture}
import za.co.absa.spline.arango.AuxiliaryDBAction._
import za.co.absa.spline.arango.OnDBExistsAction._
import za.co.absa.spline.arango._
import za.co.absa.spline.common.SplineBuildInfo
import za.co.absa.spline.common.security.TLSUtils
import za.co.absa.spline.persistence._
import za.co.absa.spline.persistence.model.{EdgeDef, NodeDef}

import javax.net.ssl.SSLContext
import scala.concurrent.Future

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

    for (arg <- Seq("-v", "--version"))
      it should s"when called with $arg, print the version info" in {
        val msg = captureStdOut(captureExitStatus(cli.exec(Array(arg))) should be(0))
        msg should include(SplineBuildInfo.Version)
        msg should include(SplineBuildInfo.Revision)
      }
  }


  behavior of "DB Commands"

  {
    val connUrlCaptor: ArgumentCaptor[ArangoConnectionURL] = ArgumentCaptor.forClass(classOf[ArangoConnectionURL])
    val dbOptionCaptor: ArgumentCaptor[DatabaseCreateOptions] = ArgumentCaptor.forClass(classOf[DatabaseCreateOptions])
    val actionFlgCaptor: ArgumentCaptor[OnDBExistsAction] = ArgumentCaptor.forClass(classOf[OnDBExistsAction])
    val sslCtxCaptor: ArgumentCaptor[Option[SSLContext]] = ArgumentCaptor.forClass(classOf[Option[SSLContext]])

    (when(
      arangoManagerFactoryMock.create(connUrlCaptor.capture, sslCtxCaptor.capture))
      thenReturn arangoManagerMock)

    (when(
      arangoManagerMock.initialize(actionFlgCaptor.capture, dbOptionCaptor.capture))
      thenReturn Future.successful(true))

    (when(
      arangoManagerMock.upgrade())
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

    it should "when called with option --disable-ssl-validation, create a non-validating SSLContext" in {
      cli.exec(Array("db-exec", "arangodbs://foo/bar", "--disable-ssl-validation"))
      sslCtxCaptor.getValue.nonEmpty should be(true)
      sslCtxCaptor.getValue.get should be(TLSUtils.TrustingAllSSLContext)
    }

    it should "not create any custom SSLContext (leave the default one) by default" in {
      cli.exec(Array("db-exec", "arangodbs://foo/bar"))
      sslCtxCaptor.getValue.isEmpty should be(true)
    }

    behavior of "DB-Init"

    it should "accept custom collection options" in assertingStdOut(include("DONE")) {
      cli.exec(Array(
        "db-init",
        "--shard-num-default", "42",
        "--shard-num", "executionPlan=3,progressOf=5",

        "--shard-keys-default", "a+b+c",
        "--shard-keys", "executionPlan=x+y,progressOf=z",

        "--repl-factor-default", "55",
        "--repl-factor", "executionPlan=7,progressOf=9",

        "--wait-for-sync",

        "arangodb://foo/bar"))

      dbOptionCaptor.getValue.numShards(NodeDef.ExecutionPlan) should equal(3)
      dbOptionCaptor.getValue.numShards(EdgeDef.ProgressOf) should equal(5)
      dbOptionCaptor.getValue.numShardsDefault should equal(Some(42))

      dbOptionCaptor.getValue.shardKeys(NodeDef.ExecutionPlan) should contain theSameElementsInOrderAs Seq("x", "y")
      dbOptionCaptor.getValue.shardKeys(EdgeDef.ProgressOf) should contain theSameElementsInOrderAs Seq("z")
      dbOptionCaptor.getValue.shardKeysDefault should be(defined)
      dbOptionCaptor.getValue.shardKeysDefault.value should contain theSameElementsInOrderAs Seq("a", "b", "c")

      dbOptionCaptor.getValue.replFactor(NodeDef.ExecutionPlan) should equal(7)
      dbOptionCaptor.getValue.replFactor(EdgeDef.ProgressOf) should equal(9)
      dbOptionCaptor.getValue.replFactorDefault should equal(Some(55))

      dbOptionCaptor.getValue.waitForSync should equal(true)
    }

    it should "validate '--shard-num'" in {
      captureExitStatus(cli.exec(Array("db-init", "--shard-num", "operation=1", "arangodb://foo/bar"))) should be(0)

      captureStdErr(
        captureExitStatus(
          cli.exec(Array("db-init", "--shard-num", "operation=0", "arangodb://foo/bar"))
        ) should be(1)
      ) should include("Shard number should be positive")
    }

    it should "validate '--shard-num-default'" in {
      captureExitStatus(cli.exec(Array("db-init", "--shard-num-default", "1", "arangodb://foo/bar"))) should be(0)

      captureStdErr(
        captureExitStatus(
          cli.exec(Array("db-init", "--shard-num-default", "0", "arangodb://foo/bar"))
        ) should be(1)
      ) should include("Shard number should be positive")
    }

    it should "validate '--repl-factor'" in {
      captureExitStatus(cli.exec(Array("db-init", "--repl-factor", "operation=1", "arangodb://foo/bar"))) should be(0)

      captureStdErr(
        captureExitStatus(
          cli.exec(Array("db-init", "--repl-factor", "operation=0", "arangodb://foo/bar"))
        ) should be(1)
      ) should include("Replication factor should be positive")
    }

    it should "validate '--repl-factor-default'" in {
      captureExitStatus(cli.exec(Array("db-init", "--repl-factor-default", "1", "arangodb://foo/bar"))) should be(0)

      captureStdErr(
        captureExitStatus(
          cli.exec(Array("db-init", "--repl-factor-default", "0", "arangodb://foo/bar"))
        ) should be(1)
      ) should include("Replication factor should be positive")
    }

    it should "initialize database" in assertingStdOut(include("DONE")) {
      cli.exec(Array("db-init", "arangodb://foo/bar"))
      connUrlCaptor.getValue should be(ArangoConnectionURL("arangodb://foo/bar"))
      actionFlgCaptor.getValue should be(Fail)
    }

    it should "initialize database eagerly" in assertingStdOut(include("DONE")) {
      cli.exec(Array("db-init", "arangodb://foo/bar", "-f"))
      connUrlCaptor.getValue should be(ArangoConnectionURL("arangodb://foo/bar"))
      actionFlgCaptor.getValue should be(Drop)
    }

    it should "initialize database lazily" in assertingStdOut(include("DONE")) {
      cli.exec(Array("db-init", "arangodb://foo/bar", "-s"))
      connUrlCaptor.getValue should be(ArangoConnectionURL("arangodb://foo/bar"))
      actionFlgCaptor.getValue should be(Skip)
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
    }

    it must "not say DONE when it's not done" in {
      when(arangoManagerMock.upgrade()) thenReturn Future.failed(new Exception("Boom!"))
      assertingStdOut(not(include("DONE"))) {
        intercept[Exception] {
          cli.exec(Array("db-upgrade", "arangodb://foo/bar"))
        }
      }
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
        "--search-views-delete",
        "--search-analyzers-delete",
        "--foxx-reinstall",
        "--search-analyzers-create",
        "--search-views-create",
        "--indices-create",
      ))
      verify(arangoManagerMock).execute(
        IndicesDelete,
        SearchViewsDelete,
        SearchAnalyzerDelete,
        FoxxReinstall,
        SearchAnalyzerCreate,
        SearchViewsCreate,
        IndicesCreate,
      )
    }
  }
}
