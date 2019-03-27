/*
 * Copyright 2019 ABSA Group Limited
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

package za.co.absa.spline.gateway.common.jackson

import com.fasterxml.jackson.databind.ObjectMapper
import org.scalatest.{FlatSpec, Matchers}
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter
import za.co.absa.spline.gateway.common.jackson.JacksonConfigSpec.DrinkStuff.{Coffee, Drink, Tea}
import za.co.absa.spline.gateway.common.jackson.JacksonConfigSpec.ScalaStuff.{Bar, Foo}
import za.co.absa.spline.scalatest.MatcherImplicits

class JacksonConfigSpec extends FlatSpec with Matchers with MatcherImplicits {

  private val testMapper: ObjectMapper = {
    val mapper = new ObjectMapper
    new JacksonConfig().
      objectMapperConfiguringBeanPostProcessor.
      postProcessBeforeInitialization(
        new RequestMappingHandlerAdapter {
          getMessageConverters.add(new MappingJackson2HttpMessageConverter {
            setObjectMapper(mapper)
          })
        },
        "testRequestMappingHandlerAdapter")
    mapper
  }

  "mapper" should "support basic Scala abstractions" in {
    val json = testMapper.writeValueAsString(Foo(Bar(Some(42))))
    json should equal(
      """
        {
          "bar": {
            "opt": 42
          }
        }
      """)(after being whiteSpaceRemoved)
  }

  it should "support type hint" in {
    val json = testMapper.writeValueAsString(Array[Drink](Tea, Coffee))
    json should equal(
      """
        [
          {"_type": "JacksonConfigSpec$DrinkStuff$Tea$"},
          {"_type": "JacksonConfigSpec$DrinkStuff$Coffee$"}
        ]
      """)(after being whiteSpaceRemoved)
  }
}

object JacksonConfigSpec {

  object ScalaStuff {

    case class Foo(bar: Bar)

    case class Bar(opt: Option[Int])

  }

  object DrinkStuff {

    trait Drink

    case object Tea extends Drink

    case object Coffee extends Drink

  }

}
