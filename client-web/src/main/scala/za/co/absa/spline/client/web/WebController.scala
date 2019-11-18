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

import javax.servlet.http.{HttpServletRequest, HttpServletResponse}
import org.apache.commons.io.IOUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.ClassPathResource
import org.springframework.http.MediaType._
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.{RequestMapping, ResponseBody}
import org.webjars.WebJarAssetLocator
import za.co.absa.spline.common.SplineBuildInfo

@Controller
class WebController @Autowired()(webJarAssetLocator: WebJarAssetLocator) {

  @RequestMapping(path = Array("/"))
  def root(httpRequest: HttpServletRequest): String = s"redirect:/app/"

  @RequestMapping(path = Array("/app/**"), produces = Array(TEXT_HTML_VALUE))
  @ResponseBody
  def index(httpRequest: HttpServletRequest): String = {
    val resourceName = webJarAssetLocator.getFullPath("index.html")
    val resource = new ClassPathResource(resourceName)

    val baseUrlPrefix = httpRequest.getContextPath

    // todo: do something with it!
    IOUtils.toString(resource.getInputStream, "UTF-8")
      .replaceAll(
        """<base href="/?([^"]*)">""",
        s"""<base href="$baseUrlPrefix/$$1">""")
      .replaceAll(
        "PUT_YOUR_SPLINE_CONSUMER_REST_ENDPOINT_URL_HERE",
        AppConfig.Consumer.url.toExternalForm)
      .replaceAll(
        """(?m)^\s*((/\*)|(\*/)|(//.*))""",
        "")
  }

  @RequestMapping(path = Array("/build-info"), produces = Array("text/x-java-properties"))
  def buildInfo(res: HttpServletResponse): Unit =
    SplineBuildInfo.buildProps.store(res.getWriter, "Spline Web Client")
}
