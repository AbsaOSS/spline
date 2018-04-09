/*
 * Copyright 2017 Barclays Africa Group Limited
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

package za.co.absa.spline.web.handler

import org.scalatest.{FlatSpec, Matchers}
import org.springframework.core.MethodParameter
import org.springframework.web.method.support.ModelAndViewContainer
import za.co.absa.spline.web.handler.UnitMethodReturnValueHandlerSpec.{ClassWithNonUnitMethods, ClassWithUnitMethods}

import scala.runtime.BoxedUnit

class UnitMethodReturnValueHandlerSpec extends FlatSpec with Matchers {

  behavior of "UnitMethodReturnValueHandler"

  it should "support Unit return types" in {
    for (unitMethod <- classOf[ClassWithUnitMethods].getDeclaredMethods) {
      val unitReturn = new MethodParameter(unitMethod, -1)
      new UnitMethodReturnValueHandler() supportsReturnType unitReturn shouldBe true
    }
  }

  it should "not support other return types" in {
    for (nonUnitMethod <- classOf[ClassWithNonUnitMethods].getDeclaredMethods) {
      val nonUnitReturn = new MethodParameter(nonUnitMethod, -1)
      new UnitMethodReturnValueHandler() supportsReturnType nonUnitReturn shouldBe false
    }
  }

  it should "handle return value by doing nothing and just marking the given request as 'handled'" in {
    val mavContainer = new ModelAndViewContainer
    new UnitMethodReturnValueHandler().handleReturnValue(null, null, mavContainer, null)
    mavContainer.isRequestHandled shouldBe true
  }
}

object UnitMethodReturnValueHandlerSpec {

  class ClassWithUnitMethods {
    def unit(): Unit = ???

    def boxedUnit(): BoxedUnit = ???
  }

  class ClassWithNonUnitMethods {
    def m1(): Nothing = ???

    def m2(): Any = ???

    def m3(): AnyRef = ???

    def m4(): Null = ???

    def m5(): String = ???

    def m6(): Boolean = ???

    def m7(): Option[Unit] = ???
  }

}
