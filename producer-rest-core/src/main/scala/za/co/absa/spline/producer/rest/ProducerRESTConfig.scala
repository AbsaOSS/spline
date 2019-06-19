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

package za.co.absa.spline.producer.rest

import org.springframework.context.annotation.{ComponentScan, Configuration}
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

import org.springframework.context.annotation.{ComponentScan, Configuration, Import}
import org.springframework.web.method.support.HandlerMethodReturnValueHandler
import org.springframework.web.servlet.config.annotation.{EnableWebMvc, WebMvcConfigurer}
import za.co.absa.spline.common.webmvc.ScalaFutureMethodReturnValueHandler
import za.co.absa.spline.common.webmvc.jackson.JacksonConfig

@EnableWebMvc
@Configuration
@Import(Array(classOf[JacksonConfig]))
@ComponentScan(basePackageClasses = Array(
  classOf[controller._package]
))
class ProducerRESTConfig extends WebMvcConfigurer

