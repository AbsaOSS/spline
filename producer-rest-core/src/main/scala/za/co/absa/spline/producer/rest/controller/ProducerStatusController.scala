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

package za.co.absa.spline.producer.rest.controller

import io.swagger.annotations.ApiOperation
import javax.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation._
import za.co.absa.spline.producer.service.repo.ExecutionProducerRepository

import scala.concurrent.ExecutionContext

@RestController
class ProducerStatusController @Autowired()(
  val repo: ExecutionProducerRepository) {

  import ExecutionContext.Implicits.global

  @RequestMapping(value = Array("/status"), method = Array(RequestMethod.HEAD))
  @ApiOperation(
    value = "/status",
    notes =
      """
        Check that producer is running and that the database is accessible and initialized

        Returned status code:

        200 OK                    // when everything's working, or
        503 Service Unavailable   // when there is a problem
      """
  )
  def status(response: HttpServletResponse): Unit = {
    repo.isDatabaseOk().foreach {
      case true  => response.setStatus(HttpStatus.OK.value())
      case false => response.setStatus(HttpStatus.SERVICE_UNAVAILABLE.value())
    }
  }

}
