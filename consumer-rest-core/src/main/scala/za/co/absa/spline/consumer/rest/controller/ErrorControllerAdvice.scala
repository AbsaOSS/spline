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

import org.springframework.beans.TypeMismatchException
import org.springframework.http.HttpStatus._
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageConversionException
import org.springframework.web.bind.annotation.{ControllerAdvice, ExceptionHandler}
import org.springframework.web.context.request.async.AsyncRequestTimeoutException
import za.co.absa.spline.common.logging.{ErrorCode, ErrorMsg}
import za.co.absa.spline.common.webmvc.NonStandardResponseEntity
import za.co.absa.spline.consumer.rest.controller.ErrorControllerAdvice._

@ControllerAdvice(basePackageClasses = Array(classOf[_package]))
class ErrorControllerAdvice {

  @ExceptionHandler(Array(
    classOf[NoSuchElementException]
  ))
  def notFound(e: Exception): ResponseEntity[_] = new ResponseEntity(ErrorCode(e), NOT_FOUND)

  @ExceptionHandler(Array(
    classOf[TypeMismatchException],
    classOf[HttpMessageConversionException]
  ))
  def badRequest(e: Exception): ResponseEntity[_] = new ResponseEntity(ErrorMsg(e.getMessage), BAD_REQUEST)

  @ExceptionHandler(Array(
    classOf[AsyncRequestTimeoutException]
  ))
  def asyncTimeout(e: Exception): ResponseEntity[_] = NonStandardResponseEntity(ASYNC_TIMEOUT, ErrorCode(e))

  @ExceptionHandler
  def serverError(e: Throwable): ResponseEntity[_] = new ResponseEntity(ErrorCode(e), INTERNAL_SERVER_ERROR)
}

object ErrorControllerAdvice {
  /**
    * This could probably be replaced by the standard 503 response code.
    * See: https://github.com/AbsaOSS/spline/issues/474
    */
  private val ASYNC_TIMEOUT = 598

}
