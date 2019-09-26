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

package za.co.absa.spline.common

import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.common.ReflectionUtilsSpec._

import scala.reflect.runtime.universe._

class ReflectionUtilsSpec extends FlatSpec with Matchers {

  behavior of "ReflectionUtils"

  it should "compile" in {
    val plus = ReflectionUtils.compile[Int](
      q"""
          val x: Int = args("x")
          val y: Int = args("y")
          x + y
        """)
    plus(Map("x" -> 2, "y" -> 40)) should be(42)
  }

  it should "extractProductElementsWithNames" in {
    ReflectionUtils.extractProductElementsWithNames(Foo("bar", 42)) should be(Map("x" -> "bar", "y" -> 42))
  }

  it should "extractFieldValue" in {
    ReflectionUtils.extractFieldValue[Int](Foo, "privateVal") should be(42)
  }

  it should "subClassesOf" in {
    ReflectionUtils.subClassesOf[MyTrait] should be(List(classOf[MyClass], MyObject.getClass))
  }

}

object ReflectionUtilsSpec {

  sealed trait MyTrait

  class MyClass extends MyTrait

  object MyObject extends MyTrait

  case class Foo(x: String, y: Int)

  object Foo {
    //noinspection ScalaUnusedSymbol
    private[this] val privateVal = 42
  }

}