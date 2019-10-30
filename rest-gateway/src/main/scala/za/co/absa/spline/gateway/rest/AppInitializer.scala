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

import javax.servlet.DispatcherType._
import javax.servlet.ServletContext
import org.springframework.web.WebApplicationInitializer
import org.springframework.web.context.ContextLoaderListener
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext
import org.springframework.web.servlet.DispatcherServlet
import za.co.absa.spline.common.webmvc.cors.PermissiveCorsFilter
import za.co.absa.spline.consumer.rest.ConsumerRESTConfig
import za.co.absa.spline.consumer.service.ConsumerServicesConfig
import za.co.absa.spline.persistence.ArangoRepoConfig
import za.co.absa.spline.producer.rest.ProducerRESTConfig
import za.co.absa.spline.producer.service.ProducerServicesConfig

import scala.reflect.ClassTag

object AppInitializer extends WebApplicationInitializer {
  override def onStartup(container: ServletContext): Unit = {
    container
      .addListener(new ContextLoaderListener(new AnnotationConfigWebApplicationContext {
        setAllowBeanDefinitionOverriding(false)
        register(
          classOf[ConsumerServicesConfig],
          classOf[ProducerServicesConfig],
          classOf[ArangoRepoConfig])
      }))

    container
      .addFilter("CORSFilter", new PermissiveCorsFilter)
      .addMappingForUrlPatterns(util.EnumSet.of(REQUEST, ASYNC), false, "/*")

    container
      .addServlet("RootDispatcher", new DispatcherServlet(new AnnotationConfigWebApplicationContext {
        setAllowBeanDefinitionOverriding(false)
        register(classOf[RootWebContextConfig])
      }))
      .addMapping("/*")

    registerRESTDispatcher[ConsumerRESTConfig](container, "consumer")
    registerRESTDispatcher[ProducerRESTConfig](container, "producer")
  }

  private def registerRESTDispatcher[A: ClassTag](container: ServletContext, name: String): Unit = {
    val restConfigClassTag = implicitly[ClassTag[A]]
    val webContext = new AnnotationConfigWebApplicationContext {
      setAllowBeanDefinitionOverriding(false)
      register(restConfigClassTag.runtimeClass)
    }
    val dispatcher = container.addServlet(s"${name}Dispatcher", new DispatcherServlet(webContext))
    dispatcher.setLoadOnStartup(1)
    dispatcher.addMapping(s"/$name/*")
    dispatcher.setAsyncSupported(true)
  }
}
