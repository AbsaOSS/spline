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

package za.co.absa.spline.web.html.controller

import java.net.URI

import org.apache.commons.io.IOUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.{RequestMapping, RequestParam, ResponseBody}
import org.springframework.web.bind.annotation.RequestMethod.{GET, HEAD}
import za.co.absa.spline.common.ARMImplicits
import za.co.absa.spline.persistence.api.DataLineageReader

import scala.concurrent.duration._
import scala.concurrent.Await
import org.springframework.http.{HttpHeaders, HttpStatus, ResponseEntity}

@Controller
class MainController @Autowired()
(
  val reader: DataLineageReader
) {

  @RequestMapping(path = Array("/", "/lineage/**", "/dashboard/**"), method = Array(GET, HEAD))
  def index = "index"

  @RequestMapping(path = Array("/dataset/lineage/_search"), method = Array(GET))
  @ResponseBody
  def lineage(@RequestParam("path") path : String, @RequestParam("application_id") applicationId : String) =
    Await.result(reader searchDataset(path, applicationId), 10 seconds) match {
      case Some(x) => {
        val headers = new HttpHeaders
        headers.add("Location", s"/dataset/$x/lineage/overview")
        new ResponseEntity[String](headers, HttpStatus.FOUND)
      }
      case None => ResponseEntity.notFound()
    }

  @RequestMapping(path = Array("/build-info"), method = Array(GET), produces = Array("text/x-java-properties"))
  @ResponseBody
  def buildInfo: String = {
    import ARMImplicits._
    for (stream <- this.getClass getResourceAsStream "/build.properties")
      yield IOUtils.toString(stream)
  }
}
