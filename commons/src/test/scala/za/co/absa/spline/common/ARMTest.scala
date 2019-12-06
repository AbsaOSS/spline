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

package za.co.absa.spline.common

import org.mockito.Mockito._
import org.scalatest.OneInstancePerTest
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import org.scalatestplus.mockito.MockitoSugar
import za.co.absa.spline.common.ARM.{managed, using}

class ARMTest
  extends AnyFlatSpec
    with OneInstancePerTest
    with MockitoSugar
    with Matchers {

  import ARMTest._

  object Resource {
    private var resourceMock: TestResource = _

    def get: TestResource = resourceMock

    def init: TestResource = {
      require(resourceMock == null, "Double initialization of the resource is not allowed")
      resourceMock = mock[TestResource]
      resourceMock
    }
  }

  "ARM.using(res)" should "close the resource after use" in {
    using(Resource.init)(managedResource => {
      managedResource should be theSameInstanceAs Resource.get
      verifyZeroInteractions(managedResource)
    })
    verify(Resource.get).close()
  }

  it should "close the resource in case of an error" in {
    assertThrows[Exception] {
      using(Resource.init) { _ => sys.error("test exception") }
    }
    verify(Resource.get).close()
  }

  "ARM.managed(res)" should "support monadic style" in {
    for (managedResource <- managed(Resource.init)) {
      managedResource should be theSameInstanceAs Resource.get
      verifyZeroInteractions(managedResource)
    }
    verify(Resource.get).close()
  }

  it should "close the resource in case of an error" in {
    assertThrows[Exception] {
      for (_ <- managed(Resource.init)) sys.error("test exception")
    }
    verify(Resource.get).close()
  }

  "ARM.managed(fn)" should "wrap the given function" in {
    val managedFn = managed((res: TestResource) => {
      res should be theSameInstanceAs Resource.get
      verifyZeroInteractions(res)
    })
    managedFn(Resource.init)
    verify(Resource.get).close()
  }

  it should "close the resource in case of an error" in {
    assertThrows[Exception] {
      managed((_: TestResource) => sys.error("test exception"))(Resource.init)
    }
    verify(Resource.get).close()
  }
}

object ARMTest {

  trait TestResource {
    def close(): Unit
  }

}