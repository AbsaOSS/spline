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

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import za.co.absa.spline.common.ReflectionUtilsSpec._

import scala.reflect.runtime.universe._

class ReflectionUtilsSpec extends AnyFlatSpec with Matchers {

  behavior of "ReflectionUtils"

  "compile()" should "compile a given Scala code block and return an eval() function" in {
    val plus = ReflectionUtils.compile[Int](
      q"""
          val x: Int = args("x")
          val y: Int = args("y")
          x + y
        """)
    plus(Map("x" -> 2, "y" -> 40)) should be(42)
  }

  "extractProductElementsWithNames()" should "for given Product return a map of element names to their values" in {
    ReflectionUtils.extractProductElementsWithNames(Foo("bar")) should be(Map("x" -> "bar", "y" -> 42))
    ReflectionUtils.extractProductElementsWithNames(Foo("bar", 777)) should be(Map("x" -> "bar", "y" -> 777))
  }

  "extractFieldValue()" should "return a value of a private field" in {
    ReflectionUtils.extractFieldValue[Int](Foo, "privateVal") should be(42)
  }

  "directSubClassesOf()" should "return direct subclasses of a sealed class/trait" in {
    ReflectionUtils.directSubClassesOf[MyTrait] should be(Seq(classOf[MyClass], MyObject.getClass))
  }

  it should "fail for non-sealed classes" in intercept[IllegalArgumentException] {
    ReflectionUtils.directSubClassesOf[MyClass]
  }

  "objectsOf()" should "return objects of a sealed class/trait" in {
    ReflectionUtils.objectsOf[MyTrait] should be(Seq(MyObject))
  }

  it should "fail for non-sealed classes" in intercept[IllegalArgumentException] {
    ReflectionUtils.objectsOf[MyClass]
  }

  "objectForName()" should "return an 'static' Scala object instance by a full qualified name" in {
    ReflectionUtils.objectForName[AnyRef](MyObject.getClass.getName) should be theSameInstanceAs MyObject
  }

  "caseClassCtorArgDefaultValue()" should "return a case class constructor argument default value if declared" in {
    ReflectionUtils.caseClassCtorArgDefaultValue[Int](classOf[Foo], "x") should be(None)
    ReflectionUtils.caseClassCtorArgDefaultValue[Int](classOf[Foo], "y") should be(Some(42))
  }
}

object ReflectionUtilsSpec {

  sealed trait MyTrait

  class MyClass extends MyTrait

  object MyObject extends MyTrait

  case class Foo(x: String, y: Int = 42)

  object Foo {
    //noinspection ScalaUnusedSymbol
    private[this] val privateVal = 42
  }

}