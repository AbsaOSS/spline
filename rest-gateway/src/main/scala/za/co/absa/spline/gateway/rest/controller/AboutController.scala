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

package za.co.absa.spline.gateway.rest.controller

import com.typesafe.config.{ConfigFactory, ConfigRenderOptions}
import io.swagger.annotations._
import org.springframework.http.MediaType._
import org.springframework.web.bind.annotation.{GetMapping, RequestMapping, RestController}
import za.co.absa.spline.common.SplineBuildInfo

@RestController
@RequestMapping(Array("/about"))
class AboutController {

  @GetMapping(path = Array("/build"), produces = Array(APPLICATION_JSON_VALUE))
  @ApiOperation("Get application version and build information")
  def buildInfo: String =
    ConfigFactory
      .parseProperties(SplineBuildInfo.buildProps)
      .root()
      .render(ConfigRenderOptions.concise)
}