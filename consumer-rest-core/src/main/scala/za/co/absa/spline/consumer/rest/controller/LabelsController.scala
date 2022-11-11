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
package za.co.absa.spline.consumer.rest.controller

import io.swagger.annotations.{Api, ApiOperation, ApiParam}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation._
import za.co.absa.spline.consumer.rest.controller.LabelsController.{Unbounded, Zero}
import za.co.absa.spline.consumer.service.model.Label
import za.co.absa.spline.consumer.service.repo.LabelRepository

import scala.concurrent.Future

@RestController
@RequestMapping(Array("/labels"))
@Api(tags = Array("labels"))
class LabelsController @Autowired()(
  val repo: LabelRepository
) {

  import za.co.absa.commons.lang.extensions.StringExtension._

  import scala.concurrent.ExecutionContext.Implicits._

  @GetMapping(Array("/names"))
  @ApiOperation(
    value = "Find label names",
    response = classOf[Seq[Label.Name]]
  )
  def labelNames(
    @ApiParam(value = "Text to filter the results")
    @RequestParam(value = "search", required = false) search: String,

    @ApiParam(value = "Page offset")
    @RequestParam(value = "offset", defaultValue = Zero) offset: Int,

    @ApiParam(value = "Page length")
    @RequestParam(value = "length", defaultValue = Unbounded) length: Int,

  ): Future[Seq[Label.Name]] = {
    repo.findNames(
      search.nonBlankOption,
      offset,
      if (length > 0) length else Int.MaxValue
    )
  }

  @GetMapping(Array("/names/{labelName}/values"))
  @ApiOperation(
    value = "Find label values",
    response = classOf[Seq[Label.Name]]
  )
  def labelValues(
    @ApiParam(value = "Text to filter the results")
    @PathVariable(value = "labelName", required = true) labelName: String,

    @ApiParam(value = "Text to filter the results")
    @RequestParam(value = "search", required = false) search: String,

    @ApiParam(value = "Page offset")
    @RequestParam(value = "offset", defaultValue = Zero) offset: Int,

    @ApiParam(value = "Page length")
    @RequestParam(value = "length", defaultValue = Unbounded) length: Int,

  ): Future[Seq[Label.Name]] = {
    repo.findValuesFor(
      labelName,
      search.nonBlankOption,
      offset,
      if (length > 0) length else Int.MaxValue
    )
  }
}

object LabelsController {
  final val Zero = "0"
  final val Unbounded = "-1"
}
