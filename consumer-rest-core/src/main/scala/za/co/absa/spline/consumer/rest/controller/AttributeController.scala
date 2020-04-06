/*
 * Copyright 2020 ABSA Group Limited
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
import za.co.absa.spline.consumer.service.model.search.FoundAttribute
import za.co.absa.spline.consumer.service.repo.AttributeRepository

import scala.concurrent.Future

@RestController
@Api(tags = Array("attribute"))
class AttributeController @Autowired()(val repo: AttributeRepository) {

  private val SearchResultsLimit = 10;

  @GetMapping(Array("attribute-search"))
  @ApiOperation(
    value = "Get attributes starting with provided string",
    notes = "Only attributes of the most recent executions are returned for the same write destination")
  def attributeSearch(
    @ApiParam(value = "search term")
    @RequestParam("search") search: String
  ): Future[Array[FoundAttribute]] = {

    import scala.concurrent.ExecutionContext.Implicits._

    repo.findAttributesByPrefix(search, SearchResultsLimit)
  }
}
