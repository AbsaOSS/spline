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

import java.util

import javax.servlet.{DispatcherType, ServletContext}
import org.springframework.web.WebApplicationInitializer
import org.springframework.web.context.ContextLoaderListener
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext
import org.springframework.web.servlet.DispatcherServlet
import org.springframework.web.filter.DelegatingFilterProxy

object AppInitializer extends WebApplicationInitializer {
  override def onStartup(container: ServletContext): Unit = {
    container.addFilter("springFilterProxy", new DelegatingFilterProxy).addMappingForUrlPatterns( util.EnumSet.of(DispatcherType.REQUEST, DispatcherType.ASYNC), false, "/*")
    container.addListener(new ContextLoaderListener(new AnnotationConfigWebApplicationContext {
      register(classOf[AppConfig])
    }))

    val dispatcher = container.addServlet("dispatcher", new DispatcherServlet(new AnnotationConfigWebApplicationContext {
      register(classOf[RESTConfig])
    }))

    dispatcher.setLoadOnStartup(1)
    dispatcher.addMapping("/*")
    dispatcher.setAsyncSupported(true)
  }
}
