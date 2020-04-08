/*
 * Copyright 2020 ABSA Group Limited
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

package za.co.absa.spline.common.config


import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import org.scalatestplus.mockito.MockitoSugar
import za.co.absa.commons.scalatest.EnvFixture


class UpperSnakeCaseEnvironmentConfigurationSpec extends AnyFlatSpec with Matchers with MockitoSugar with EnvFixture {

  it should "act as normal when given a key in format 'MY_VAR_NAME'" in {
    setEnv("FOO_BAR_BAZ_42_QUX", "right")
    (new UpperSnakeCaseEnvironmentConfiguration).containsKey("FOO_BAR_BAZ_42_QUX") should be(true)
    (new UpperSnakeCaseEnvironmentConfiguration).getString("FOO_BAR_BAZ_42_QUX") should equal("right")
  }

  it should "ignore lower-case keys" in {
    setEnv("foo.barBaz42.Qux", "wrong")
    (new UpperSnakeCaseEnvironmentConfiguration).containsKey("foo.barBaz42.Qux") should be(false)
    (new UpperSnakeCaseEnvironmentConfiguration).getString("foo.barBaz42.Qux") should be(null)
  }

  it should "convert keys per the environment variable naming convention, i.e 'my.varName' to 'MY_VAR_NAME'" in {
    setEnv("FOO_BAR_BAZ_42_QUX", "right")
    (new UpperSnakeCaseEnvironmentConfiguration).containsKey("foo.barBaz42.Qux") should be(true)
    (new UpperSnakeCaseEnvironmentConfiguration).getString("foo.barBaz42.Qux") should equal("right")
  }

  it should "fix issue #616" in {
    setEnv("SPLINE_DATABASE_CONNECTION_URL", "right")
    (new UpperSnakeCaseEnvironmentConfiguration).containsKey("spline.database.connectionUrl") should be(true)
    (new UpperSnakeCaseEnvironmentConfiguration).getString("spline.database.connectionUrl") should equal("right")
  }

  it should "return null if non of the keys found" in {
    (new UpperSnakeCaseEnvironmentConfiguration).containsKey("foo.barBaz42.Qux") should be(false)
    (new UpperSnakeCaseEnvironmentConfiguration).getString("foo.barBaz42.Qux") should be(null)
  }

}
