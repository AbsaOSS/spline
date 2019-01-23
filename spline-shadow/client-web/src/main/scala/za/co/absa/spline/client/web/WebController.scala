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

import javax.servlet.http.HttpServletRequest
import org.apache.commons.io.IOUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.ClassPathResource
import org.springframework.http.MediaType._
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.{RequestMapping, ResponseBody}
import org.webjars.WebJarAssetLocator

@Controller
class WebController @Autowired()(webJarAssetLocator: WebJarAssetLocator) {

  import WebController._

  @RequestMapping(path = Array("/", "/partial-lineage/**"), produces = Array(TEXT_HTML_VALUE))
  @ResponseBody
  def index(httpRequest: HttpServletRequest): String = {
    val resourceName = webJarAssetLocator.getFullPathExact(splineClientWebJarName, "index.html")
    val resource = new ClassPathResource(resourceName)

    val indexHtml: String = IOUtils.toString(resource.getInputStream, "UTF-8")

    val baseUrlPrefix = httpRequest.getContextPath match {
      case path if !path.isEmpty => s"/$path"
      case _ => ""
    }
    indexHtml.replaceAll(
      """<base href="/">""",
      s"""<base href="$baseUrlPrefix/assets/$splineClientWebJarName/">""")
  }
}

object WebController {
  val splineClientWebJarName = "absaoss-spline-client"
}
