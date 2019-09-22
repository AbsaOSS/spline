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
import za.co.absa.spline.common.Version._

import scala.Ordering.Implicits._

class VersionSpec extends FlatSpec with Matchers {

  behavior of "Version"

  it should "unapplySeq" in {
    val Version(a, b, c) = Version("1.22.333")
    (a, b, c) should be((1, 22, 333))
  }

  it should "apply" in {
    Version("1.22.333") should be(Version(1, 22, 333))
  }

  behavior of "VersionStringInterpolator"

  it should "parse version" in {
    ver"1.${22}.333" should be(Version(1, 22, 333))
  }

  behavior of "VersionOrdering"

  it should "compare" in {
    (ver"0" equiv ver"0.0.0") should be(true)
    (ver"1.1" equiv ver"1.1.0") should be(true)
    (ver"1.22" > ver"0.22") should be(true)
    (ver"1.22" > ver"1.21") should be(true)
    (ver"1.22" > ver"1.9") should be(true)
    (ver"1.22" > ver"1.9.9999") should be(true)
    (ver"1.22" > ver"1.21.9999") should be(true)
    (ver"1.22" < ver"1.22.0.1") should be(true)
    (ver"1.22" < ver"1.111") should be(true)
  }

  it should "sort" in {
    Seq(
      ver"1.21",
      ver"1.9",
      ver"1.111",
      ver"0.22",
      ver"1.9.9999",
      ver"1.22.0.1",
      ver"1.21.9999"
    ).sorted should equal(Seq(
      ver"0.22",
      ver"1.9",
      ver"1.9.9999",
      ver"1.21",
      ver"1.21.9999",
      ver"1.22.0.1",
      ver"1.111"
    ))
  }
}
