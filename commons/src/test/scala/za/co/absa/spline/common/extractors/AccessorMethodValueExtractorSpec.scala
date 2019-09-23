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

package za.co.absa.spline.common.extractors

import org.scalatest.{FlatSpec, Matchers}

import scala.language.existentials

class AccessorMethodValueExtractorSpec extends FlatSpec with Matchers {

  import za.co.absa.spline.common.extractors.AccessorMethodValueExtractorSpec._

  behavior of "AccessorMethodValueExtractor"

  it should "unapply" in {
    object X1 extends AccessorMethodValueExtractor[Int]("x")
    object X2 extends AccessorMethodValueExtractor[Int]("wrong", "x")

    val X1(x1: Int) = testObj
    val X2(x2: Int) = testObj

    x1 should be(42)
    x2 should be(42)
  }

  it should "apply [primitive type]" in {
    AccessorMethodValueExtractor[Int]("x").apply(testObj) should be(Some(42))
    AccessorMethodValueExtractor[Long]("x").apply(testObj) should be(Some(42))
    AccessorMethodValueExtractor[Integer]("x").apply(testObj) should be(Some(42))
    AccessorMethodValueExtractor[AnyRef]("x").apply(testObj) should be(Some(42))
    AccessorMethodValueExtractor[Any]("x").apply(testObj) should be(Some(42))
  }

  it should "apply [object type]" in {
    AccessorMethodValueExtractor[Map[_, _]]("map").apply(testObj) should be(Some(Map.empty))
    AccessorMethodValueExtractor[AnyRef]("map").apply(testObj) should be(Some(Map.empty))
    AccessorMethodValueExtractor[Any]("map").apply(testObj) should be(Some(Map.empty))
  }

  it should "not apply [wrong type]" in {
    AccessorMethodValueExtractor("x").apply(testObj) should be(None)
    AccessorMethodValueExtractor[Boolean]("x").apply(testObj) should be(None)
    AccessorMethodValueExtractor[Wrong]("x").apply(testObj) should be(None)
    AccessorMethodValueExtractor[Null]("x").apply(testObj) should be(None)

    AccessorMethodValueExtractor("map").apply(testObj) should be(None)
    AccessorMethodValueExtractor[Wrong]("map").apply(testObj) should be(None)
    AccessorMethodValueExtractor[Int]("map").apply(testObj) should be(None)
  }

  it should "not apply [wrong property]" in {
    AccessorMethodValueExtractor[Any]("wrong").apply(testObj) should be(None)
  }

  it should "extract the first matching property" in {
    AccessorMethodValueExtractor.firstOf[Integer]("wrong", "x", "map").apply(testObj) should be(Some(42))
    AccessorMethodValueExtractor.firstOf[Map[_, _]]("wrong", "x", "map").apply(testObj) should be(Some(Map.empty))
  }
}

object AccessorMethodValueExtractorSpec {

  trait Wrong

  case class TestObj(x: Int, map: Map[_, _])

  private val testObj = TestObj(42, Map.empty)
}
