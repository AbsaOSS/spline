/*
 * Copyright 2023 ABSA Group Limited
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

package za.co.absa.spline.persistence

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

class DryRunnableSpec extends AnyFlatSpec with Matchers {

  behavior of "unlessDryRun"

  it should "when dryRun == false, run the given code and return the result" in {
    val dryRunnable = new DryRunnable {
      override def dryRun: Boolean = false
    }

    var x = 1
    dryRunnable.unlessDryRun({
      x += 2
      x
    }, 0) should be(3)
    x should be(3)
  }

  it should "when dryRun == true, skip the given code and return default value" in {
    val dryRunnable = new DryRunnable {
      override def dryRun: Boolean = true
    }

    var x = 1
    dryRunnable.unlessDryRun({
      x += 2
      x
    }, 0) should be(0)
    x should be(1)
  }

  it should "when dryRun == true and return type is AnyRef, return null" in {
    val dryRunnable = new DryRunnable {
      override def dryRun: Boolean = true
    }

    var x = ""
    dryRunnable.unlessDryRun({
      x += "blah"
      x
    }) should be(null)
    x should be("")

  }
}
