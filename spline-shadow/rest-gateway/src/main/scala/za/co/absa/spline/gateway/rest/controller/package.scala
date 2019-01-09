package za.co.absa.spline.gateway.rest

import org.springframework.http.HttpStatus.{INTERNAL_SERVER_ERROR, NOT_FOUND}
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.{ControllerAdvice, ExceptionHandler}
import org.springframework.web.context.request.async.AsyncRequestTimeoutException
import za.co.absa.spline.common.logging.ErrorCode
import za.co.absa.spline.common.webmvc.NonStandardResponseEntity

package object controller {

  trait _package

  @ControllerAdvice(basePackageClasses = Array(classOf[_package]))
  class RESTErrorControllerAdvice {

    @ExceptionHandler(Array(
      classOf[NoSuchElementException]
    ))
    def handle_404 = new ResponseEntity(NOT_FOUND)

    @ExceptionHandler
    def handle_500(e: Throwable) = new ResponseEntity(ErrorCode(e), INTERNAL_SERVER_ERROR)

    @ExceptionHandler(Array(
      classOf[AsyncRequestTimeoutException]
    ))
    def handle_598(e: AsyncRequestTimeoutException) = NonStandardResponseEntity(598, ErrorCode(e))
  }

}
