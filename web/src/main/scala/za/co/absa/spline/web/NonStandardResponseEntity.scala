/*
 * Copyright 2017 ABSA Group Limited
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

package za.co.absa.spline.web

import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.util.MultiValueMap

case class NonStandardResponseEntity[T](statusCode: Int, body: T = null, headers: MultiValueMap[String, String] = null)
  extends ResponseEntity(body, headers, HttpStatus.SEE_OTHER) {

  require(HttpStatus.resolve(statusCode) == null, "For standard response codes, use ResponseEntity class instead")

  override def getStatusCodeValue: Int = statusCode

  override def toString: String = {
    val builder = new StringBuilder("<")
    builder.append(statusCode)
    builder.append(',')
    if (body != null) {
      builder.append(body)
      builder.append(',')
    }
    builder.append(getHeaders)
    builder.append('>')
    builder.toString
  }
}
