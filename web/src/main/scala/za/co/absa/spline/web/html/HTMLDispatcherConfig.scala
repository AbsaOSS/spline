/*
 * Copyright 2017 Barclays Africa Group Limited
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

package za.co.absa.spline.web.html

import org.springframework.context.annotation.{Bean, ComponentScan, Configuration}
import org.springframework.web.servlet.config.annotation.{DefaultServletHandlerConfigurer, EnableWebMvc, WebMvcConfigurerAdapter}
import org.thymeleaf.spring4.SpringTemplateEngine
import org.thymeleaf.spring4.templateresolver.SpringResourceTemplateResolver
import org.thymeleaf.spring4.view.ThymeleafViewResolver
import org.thymeleaf.templatemode.TemplateMode.HTML

@Configuration
@EnableWebMvc
@ComponentScan(Array("za.co.absa.spline.web.html.controller"))
class HTMLDispatcherConfig extends WebMvcConfigurerAdapter {

  override def configureDefaultServletHandling(configurer: DefaultServletHandlerConfigurer): Unit = configurer.enable()

  @Bean
  def viewResolver = new ThymeleafViewResolver() {
    setTemplateEngine(templateEngine)
    setCharacterEncoding("UTF-8")
  }

  @Bean
  def templateEngine = new SpringTemplateEngine() {
    setTemplateResolver(templateResolver)
  }

  @Bean
  def templateResolver = new SpringResourceTemplateResolver() {
    setPrefix("/WEB-INF/html/")
    setSuffix(".html")
    setTemplateMode(HTML)
    setCacheable(false)
  }

}
