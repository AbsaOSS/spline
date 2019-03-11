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

package za.co.absa.spline.gateway.rest

import org.springframework.context.annotation.{Bean, Configuration, Import}
import org.springframework.web.cors.{CorsConfiguration, UrlBasedCorsConfigurationSource}
import org.springframework.web.filter.CorsFilter
import za.co.absa.spline.gateway.rest.CorsConfig.CorsFilterConf

@Configuration
@Import(Array(classOf[ArangoRepoConfig]))
class AppConfig {
  @Bean def springFilterProxy = {
    val source = new UrlBasedCorsConfigurationSource
    val config = new CorsConfiguration
    config.setAllowCredentials(true)
    if (CorsFilterConf.allowedOrigin != null)
      config.addAllowedOrigin(CorsFilterConf.allowedOrigin)
    else
      config.addAllowedOrigin("*")
    CorsFilterConf.allowedHeader match {
      case ls if ls.nonEmpty => CorsFilterConf.allowedHeader.foreach(config.addAllowedHeader)
      case _ => config.addAllowedHeader("*")
    }
    config.addAllowedMethod("GET")
    source.registerCorsConfiguration("/**", config)
    new CorsFilter(source)
  }
}
