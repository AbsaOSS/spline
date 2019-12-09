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

package za.co.absa.spline.common.webmvc

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import org.springframework.http.HttpHeaders

class NonStandardResponseEntitySpec extends AnyFlatSpec with Matchers {

  it should "support non-standard HTTP response statuses" in {
    NonStandardResponseEntity(42).getStatusCodeValue shouldEqual 42
    NonStandardResponseEntity(42).toString shouldEqual "<42,[]>"

    NonStandardResponseEntity(42, "foo").toString shouldEqual "<42,foo,[]>"

    NonStandardResponseEntity(42, "foo", new HttpHeaders() {
      add("bar", "baz")
    }).toString shouldEqual """<42,foo,[bar:"baz"]>"""

    NonStandardResponseEntity(42, null, new HttpHeaders() {
      add("bar", "baz")
    }).toString shouldEqual """<42,[bar:"baz"]>"""
  }

  it should "not support standard HTTP response codes" in {
    intercept[IllegalArgumentException](NonStandardResponseEntity(200)).getMessage should include("use ResponseEntity")
    intercept[IllegalArgumentException](NonStandardResponseEntity(404)).getMessage should include("use ResponseEntity")
    intercept[IllegalArgumentException](NonStandardResponseEntity(500)).getMessage should include("use ResponseEntity")
  }
}
