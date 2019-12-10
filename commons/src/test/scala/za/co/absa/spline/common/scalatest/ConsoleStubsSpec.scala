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

package za.co.absa.spline.common.scalatest

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers

class ConsoleStubsSpec
  extends AnyFlatSpec
    with Matchers
    with ConsoleStubs {

  behavior of "ConsoleStubs"

  it should "capture stdout" in {
    captureStdOut(Console.out.print("foo")) should be("foo")
  }

  it should "capture stderr" in {
    captureStdErr(Console.err.print("bar")) should be("bar")
  }

  it should "populate stdin" in withStdIn("qux") {
    Console.in.readLine() should be("qux")
  }

}
