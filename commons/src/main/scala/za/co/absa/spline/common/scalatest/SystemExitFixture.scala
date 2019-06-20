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

package za.co.absa.spline.common.scalatest

import java.security.Permission

import org.scalatest.Suite

import scala.util.Try

object SystemExitFixture {

  trait SuiteHook extends org.scalatest.BeforeAndAfterAll {
    this: Suite =>

    private var unstub: () => Unit = _

    override def beforeAll(): Unit = {
      unstub = stubSystemExit()
      super.beforeAll()
    }

    override def afterAll(): Unit =
      try super.afterAll()
      finally unstub()
  }


  trait Methods {
    def captureExitStatus(body: => Unit): Int = withStubbedSystemExitDo {
      Try({
        body
        0
      }).recover({
        case ExitException(status) => status
      }).get
    }
  }

  case class ExitException private(status: Int)
    extends SecurityException(s"System.exit($status)")

  private def stubSystemExit(): () => Unit = {
    val prevManager = System.getSecurityManager
    System.setSecurityManager(new NoExitSecurityManager)
    () => System.setSecurityManager(prevManager)
  }

  private def withStubbedSystemExitDo[A](body: => A): A = {
    val unstub = stubSystemExit()
    try body
    finally unstub()
  }

  private class NoExitSecurityManager extends SecurityManager {
    override def checkPermission(perm: Permission): Unit = {}

    override def checkPermission(perm: Permission, context: Object): Unit = {}

    override def checkExit(status: Int): Unit = throw ExitException(status)
  }

}
