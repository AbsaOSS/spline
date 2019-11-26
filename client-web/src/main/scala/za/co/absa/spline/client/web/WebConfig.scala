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

package za.co.absa.spline.client.web

import org.springframework.beans.factory.annotation.{Autowired, Configurable}
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.{Bean, ComponentScan}
import org.springframework.web.servlet.config.annotation.{EnableWebMvc, ResourceHandlerRegistry, WebMvcConfigurer}
import org.thymeleaf.{ITemplateEngine, TemplateEngine}
import org.webjars.WebJarAssetLocator
import za.co.absa.spline.client.web.thymeleaf.WebJarTemplateResolver

@Configurable
@EnableWebMvc
@ComponentScan
class WebConfig @Autowired()(applicationContext: ApplicationContext) extends WebMvcConfigurer {

  private val webJarAssetLocator = new WebJarAssetLocator

  override def addResourceHandlers(registry: ResourceHandlerRegistry) {
    registry
      .addResourceHandler("/**")
      .addResourceLocations("/webjars/absaoss-spline-client/")
      .resourceChain(true)
      .addResolver(new WebJarsResourceFuzzyResolver(webJarAssetLocator))
  }

  @Bean def templateEngine: ITemplateEngine = new TemplateEngine {
    setTemplateResolver(new WebJarTemplateResolver(webJarAssetLocator) {
      setSuffix(".html")
    })
  }
}
