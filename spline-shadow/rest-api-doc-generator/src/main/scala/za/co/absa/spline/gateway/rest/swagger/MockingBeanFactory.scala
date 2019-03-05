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

package za.co.absa.spline.gateway.rest.swagger

import java.util

import org.mockito.Mockito
import org.slf4s.Logging
import org.springframework.beans.TypeConverter
import org.springframework.beans.factory.config.DependencyDescriptor
import org.springframework.beans.factory.support.DefaultListableBeanFactory
import org.springframework.beans.factory.{BeanFactory, NoSuchBeanDefinitionException}

import scala.util.Try


class MockingBeanFactory(parentBeanFactory: BeanFactory)
  extends DefaultListableBeanFactory(parentBeanFactory)
    with Logging {

  override def doResolveDependency(descriptor: DependencyDescriptor,
                                   beanName: String,
                                   autowiredBeanNames: util.Set[String],
                                   typeConverter: TypeConverter
                                  ): AnyRef =
    (Try {
      super.doResolveDependency(descriptor, beanName, autowiredBeanNames, typeConverter)
    } recover {
      case ex: NoSuchBeanDefinitionException =>
        val beanType = ex.getBeanType
        log.warn(s"Mocking missing bean of type '$beanType' for bean '${ex.getBeanName}'")
        Mockito.mock(beanType.asInstanceOf[Class[AnyRef]])
    }).get
}
