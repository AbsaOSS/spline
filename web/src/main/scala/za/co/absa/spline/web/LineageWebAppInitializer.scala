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

package za.co.absa.spline.web

import javax.servlet.ServletContext

import za.co.absa.spline.web.html.HTMLDispatcherConfig
import za.co.absa.spline.web.rest.RESTDispatcherConfig
import org.springframework.web.WebApplicationInitializer
import org.springframework.web.context.ContextLoaderListener
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext
import org.springframework.web.servlet.DispatcherServlet

class LineageWebAppInitializer extends WebApplicationInitializer {

  override def onStartup(container: ServletContext): Unit = {
    container addListener new ContextLoaderListener(new AnnotationConfigWebApplicationContext {
      register(classOf[LineageWebAppConfig])
    })

    registerDispatcher("rest_dispatcher", classOf[RESTDispatcherConfig], "/rest/*")(container)
    registerDispatcher("html_dispatcher", classOf[HTMLDispatcherConfig], "/*")(container)
  }

  private def registerDispatcher(servletName: String, clazz: Class[_], mappingPattern: String)(container: ServletContext): Unit = {
    val dispatcher = container.addServlet(servletName, new DispatcherServlet(new AnnotationConfigWebApplicationContext {
      register(clazz)
    }))

    dispatcher setLoadOnStartup 1
    dispatcher addMapping mappingPattern
  }
}
