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

package za.co.absa.spline.web.rest.controller

import java.util.UUID
import za.co.absa.spline.web.json.StringJSONConverters
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMethod._
import org.springframework.web.bind.annotation.{PathVariable, RequestMapping, ResponseBody}
import za.co.absa.spline.persistence.api.DataLineageReader

import scala.concurrent.Await
import scala.concurrent.duration._
import scala.language.postfixOps

@Controller
class LineageController @Autowired()
(
  val reader: DataLineageReader
) {

  import StringJSONConverters._

  @RequestMapping(path = Array("/dataset/descriptors"), method = Array(GET))
  @ResponseBody
  def lineageDescriptors: String = Await.result(reader.list(), 10 seconds).toSeq.toJsonArray

  @RequestMapping(path = Array("/lineage/{id}"), method = Array(GET))
  @ResponseBody
  def lineage(@PathVariable("id") id: UUID): String = Await.result(reader load id, 10 seconds).get.toJson
}
