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

import org.springframework.beans.factory.support.DefaultListableBeanFactory
import org.springframework.mock.web.MockServletContext
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport
import za.co.absa.spline.common.webmvc.jackson.JacksonConfig
import za.co.absa.spline.common.webmvc.swagger.SwaggerConfig
import za.co.absa.spline.consumer.rest.ConsumerRESTConfig

class SwaggerDocGenAppContext extends AnnotationConfigWebApplicationContext {

  override def createBeanFactory: DefaultListableBeanFactory = new MockingBeanFactory(getInternalParentBeanFactory)

  register(
    classOf[WebMvcConfigurationSupport],
    classOf[SwaggerConfig],
    classOf[JacksonConfig],

    // todo: replace the following compile time dependencies with the runtime parameters. See https://github.com/AbsaOSS/spline/issues/255
    classOf[ConsumerRESTConfig]
    // classOf[ProducerRESTConfig]
  )

  setServletContext(new MockServletContext())
  setAllowBeanDefinitionOverriding(false)
  refresh()
}
