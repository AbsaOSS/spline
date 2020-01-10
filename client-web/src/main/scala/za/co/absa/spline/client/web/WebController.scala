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

import java.lang.Boolean._

import javax.servlet.http.{HttpServletRequest, HttpServletResponse}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.{HttpHeaders, MediaType}
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.thymeleaf.ITemplateEngine
import org.thymeleaf.context.WebContext
import za.co.absa.commons.BuildInfo
import za.co.absa.spline.client.web.WebController.{IndexPageConf, IndexPageTemplateName}

import scala.collection.JavaConverters._

@Controller
class WebController @Autowired()(templateEngine: ITemplateEngine) {

  @RequestMapping(path = Array("/"))
  def root(httpRequest: HttpServletRequest): String = s"redirect:/app/"

  @RequestMapping(path = Array("/app/**"))
  def index(request: HttpServletRequest, response: HttpServletResponse): Unit = {
    val context = request.getServletContext
    val locale = request.getLocale
    val pageVars = Map[String, AnyRef](
      IndexPageConf.Title -> "Spline - Data Lineage Tracking And Visualization",
      IndexPageConf.ApiUrl -> AppConfig.Consumer.url.toExternalForm,
      IndexPageConf.EmbeddedMode -> FALSE
    )
    response.setHeader(
      HttpHeaders.CONTENT_TYPE,
      MediaType.TEXT_HTML_VALUE)

    templateEngine.process(
      IndexPageTemplateName,
      new WebContext(request, response, context, locale, pageVars.asJava),
      response.getWriter)
  }

  @RequestMapping(path = Array("/build-info"), produces = Array("text/x-java-properties"))
  def buildInfo(res: HttpServletResponse): Unit =
    BuildInfo.BuildProps.store(res.getWriter, "Spline Web Client")
}

object WebController {

  val IndexPageTemplateName = "index"

  private object IndexPageConf {
    val Title = "title"
    val ApiUrl = "apiUrl"
    val EmbeddedMode = "embeddedMode"
  }

}
