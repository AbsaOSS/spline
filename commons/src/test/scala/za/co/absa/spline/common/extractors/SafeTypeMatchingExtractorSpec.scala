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

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

class SafeTypeMatchingExtractorSpec extends AnyFlatSpec with Matchers {

  behavior of "SafeTypeMatchingExtractor"

  it should "unapply for matching existing non-null types" in {
    trait FooType
    object FooObject extends FooType
    object FooExtractor extends SafeTypeMatchingExtractor(classOf[FooType])

    val FooExtractor(foo: FooType) = FooObject
    foo should be theSameInstanceAs FooObject

    FooExtractor.unapply(null) should be(None)
    FooExtractor.unapply(new Object) should be(None)
  }

  it should "unapply for missing types" in {
    object A extends SafeTypeMatchingExtractor("definitely.missing.type")
    object B extends SafeTypeMatchingExtractor((throw new NoClassDefFoundError("simulate missing type")): Class[String])
    A.unapply(new Object) should be(None)
    B.unapply(new Object) should be(None)
  }
}
