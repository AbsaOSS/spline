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

import org.springframework.http.HttpStatus.{INTERNAL_SERVER_ERROR, NOT_FOUND}
import org.springframework.web.bind.annotation.{ControllerAdvice, ExceptionHandler, ResponseStatus}
import org.springframework.web.servlet.ModelAndView
import za.co.absa.spline.web.exception.LineageNotFoundException
import za.co.absa.spline.web.logging.ErrorCode

@ControllerAdvice(basePackageClasses = Array(classOf[_package]))
class HTMLErrorControllerAdvice {

  @ExceptionHandler(Array(
    classOf[NoSuchElementException]
  ))
  @ResponseStatus(NOT_FOUND)
  def handle_404_generic = new ModelAndView("errors/generic", "message", "resource not found")

  @ExceptionHandler(Array(classOf[LineageNotFoundException]))
  @ResponseStatus(NOT_FOUND)
  def handle_404_lineage = new ModelAndView("errors/generic", "message", "lineage not found")

  @ExceptionHandler
  @ResponseStatus(INTERNAL_SERVER_ERROR)
  def handle_500(e: Throwable): ModelAndView =
    new ModelAndView("errors/generic")
      .addObject("message", "Oops! Something went wrong")
      .addObject("error_code", ErrorCode(e).error_id)

}
