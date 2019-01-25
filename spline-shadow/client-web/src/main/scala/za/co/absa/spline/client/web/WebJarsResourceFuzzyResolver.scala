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

import org.springframework.web.servlet.resource.WebJarsResourceResolver
import org.webjars.WebJarAssetLocator

class WebJarsResourceFuzzyResolver(webJarAssetLocator: WebJarAssetLocator)
  extends WebJarsResourceResolver(webJarAssetLocator) {

  private val webjarPartialPathExtractor = """^.*/([^/]+/[^/]+)/?$""".r

  override def findWebJarResourcePath(path: String): String =
    Option(super.findWebJarResourcePath(path))
      .orElse(findFullPath(path))
      .flatMap(webjarPartialPathExtractor.findFirstMatchIn(_).map(_.group(1)))
      .orNull

  private def findFullPath(path: String): Option[String] =
    try {
      Option(webJarAssetLocator.getFullPath(path))
    } catch {
      case _: IllegalArgumentException => None
    }
}
