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

package za.co.absa.spline.harvester.conf

import org.scalatest.FunSuite
import org.scalatest.matchers.should.Matchers

trait ReadOnlyConfigurationTest extends FunSuite with Matchers {
  protected val givenConf: ReadOnlyConfiguration
  protected val emptyConf: ReadOnlyConfiguration

  test("testContainsKey") {
    givenConf containsKey "spline.x.y" shouldBe true
    givenConf containsKey "spline.w.z" shouldBe true
    givenConf containsKey "non-existent" shouldBe false
  }

  test("testGetProperty") {
    givenConf getProperty "spline.x.y" shouldEqual "foo"
    givenConf getProperty "spline.w.z" shouldEqual "bar"
    givenConf getProperty "non-existent" shouldBe null
  }

  test("testIsEmpty") {
    givenConf isEmpty() shouldBe false
    emptyConf isEmpty() shouldBe true
  }

  test("testGetKeys") {
    import scala.collection.JavaConverters._
    (givenConf getKeys "spline.x").asScala.toSeq should contain("spline.x.y")
    (givenConf getKeys "spline.x").asScala.toSeq shouldNot contain("spline.w.z")
    (givenConf getKeys "non-existent").asScala shouldBe empty
  }
}
