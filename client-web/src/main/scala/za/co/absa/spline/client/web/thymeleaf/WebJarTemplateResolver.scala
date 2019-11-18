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

package za.co.absa.spline.client.web.thymeleaf

import java.util

import org.springframework.beans.factory.annotation.Autowired
import org.thymeleaf.IEngineConfiguration
import org.thymeleaf.templateresolver.AbstractConfigurableTemplateResolver
import org.thymeleaf.templateresource.{ClassLoaderTemplateResource, ITemplateResource}
import org.webjars.WebJarAssetLocator

class WebJarTemplateResolver @Autowired()(webJarAssetLocator: WebJarAssetLocator)
  extends AbstractConfigurableTemplateResolver {

  override def computeTemplateResource(
    configuration: IEngineConfiguration,
    ownerTemplate: String,
    template: String,
    resourceName: String,
    characterEncoding: String,
    templateResolutionAttributes: util.Map[String, AnyRef]
  ): ITemplateResource = {
    val path = webJarAssetLocator.getFullPath(resourceName)
    new ClassLoaderTemplateResource(path, characterEncoding)
  }
}
