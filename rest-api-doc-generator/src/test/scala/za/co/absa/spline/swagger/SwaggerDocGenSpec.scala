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

package za.co.absa.spline.swagger

import io.swagger.annotations.ApiOperation
import org.scalatest.{FlatSpec, Matchers}
import org.springframework.context.annotation.{Bean, Configuration}
import org.springframework.web.bind.annotation.{GetMapping, RestController}
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import za.co.absa.spline.swagger.SwaggerDocGenSpec.FooRESTConfig

class SwaggerDocGenSpec extends FlatSpec with Matchers {

  it should "generate a valid Swagger definition" in {
    val output = SwaggerDocGen.generate(classOf[FooRESTConfig])
    output should not be empty
    output should startWith("""{"swagger":"2.0"""")
    output should include("""/foo""")
    output should include("""FOO-OPERATION""")
    output should endWith("}")
  }
}

object SwaggerDocGenSpec {

  @EnableWebMvc
  @Configuration
  class FooRESTConfig {
    @Bean def fooController = new FooController
  }

  @RestController
  class FooController {
    @GetMapping(Array("/foo"))
    @ApiOperation("FOO-OPERATION")
    def foo(): Unit = ()
  }

}
