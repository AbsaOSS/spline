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

import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FlatSpec, Matchers}

class SystemExitFixtureSpec_Methods
  extends FlatSpec
    with Matchers
    with MockitoSugar
    with SystemExitFixture.Methods {

  behavior of "SystemExitFixture.Method"

  it should "intercept System.exit() call and return the status" in {
    captureExitStatus(System.exit(42)) should be(42)
  }

  it should "return status 0 when System.exit() was not called" in {
    captureExitStatus() should be(0)
  }

  it should "propagate exceptions to the caller" in {
    intercept[RuntimeException](captureExitStatus(sys.error("foo error"))).getMessage should be("foo error")
  }

  it should "restore previous security manager after return" in {
    val originalSecurityManager = System.getSecurityManager
    val dummySecurityManager = mock[SecurityManager]
    System.setSecurityManager(dummySecurityManager)
    try {
      captureExitStatus {
        captureExitStatus(System.exit(42))
        intercept[RuntimeException](sys.error("test error"))
      }
      System.getSecurityManager should be theSameInstanceAs dummySecurityManager
    } finally {
      System.setSecurityManager(originalSecurityManager)
    }
  }

}
