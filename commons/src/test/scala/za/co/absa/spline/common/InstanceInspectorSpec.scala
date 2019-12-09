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

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

class InstanceInspectorSpec extends AnyFlatSpec with Matchers {

  class DummyClass(a: String, b : Int){
    def methodUsingFields: String = a + b.toString
  }

  "getFieldValue" should "return correct values of DummyClass" in
  {
    val expectedA = "value"
    val expectedB = 123
    val dc = new DummyClass(expectedA, expectedB)

    val a = ReflectionUtils.extractFieldValue[String](dc, "a")
    val b = ReflectionUtils.extractFieldValue[Int](dc, "b")

    a shouldEqual expectedA
    b shouldEqual expectedB
  }

}
