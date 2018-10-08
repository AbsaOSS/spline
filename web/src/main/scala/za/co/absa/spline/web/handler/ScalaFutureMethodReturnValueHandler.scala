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

package za.co.absa.spline.web.handler

import org.apache.commons.lang.math.NumberUtils
import org.springframework.core.MethodParameter
import org.springframework.web.context.request.NativeWebRequest
import org.springframework.web.context.request.async.{DeferredResult, WebAsyncUtils}
import org.springframework.web.method.support.{AsyncHandlerMethodReturnValueHandler, ModelAndViewContainer}
import org.springframework.web.servlet.mvc.method.annotation.DeferredResultMethodReturnValueHandler

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}

class ScalaFutureMethodReturnValueHandler(implicit ec: ExecutionContext) extends DeferredResultMethodReturnValueHandler with AsyncHandlerMethodReturnValueHandler {

  import ScalaFutureMethodReturnValueHandler._

  override def supportsReturnType(returnType: MethodParameter): Boolean = isFutureClass(returnType.getParameterType) || super.supportsReturnType(returnType)

  override def isAsyncReturnValue(returnValue: scala.Any, returnType: MethodParameter): Boolean = isFutureClass(returnType.getParameterType)

  override def handleReturnValue(retVal: scala.Any, retType: MethodParameter, mavContainer: ModelAndViewContainer, req: NativeWebRequest): Unit =
    retVal match {
      case future: Future[_] =>
        val timeout = NumberUtils.createLong(req.getHeader(TIMEOUT_HEADER))
        val deferredResult = toDeferredResult(future, timeout)
        WebAsyncUtils.getAsyncManager(req).startDeferredResultProcessing(deferredResult, mavContainer)
      case _ => super.handleReturnValue(retVal, retType, mavContainer, req)
    }

  private def toDeferredResult[T](returnValue: Future[T], timeout: java.lang.Long): DeferredResult[T] =
    new DeferredResult[T](timeout) {
      returnValue.asInstanceOf[Future[T]] andThen {
        case Success(value) => setResult(value)
        case Failure(error) => setErrorResult(error)
      }
    }
}

object ScalaFutureMethodReturnValueHandler {
  private val TIMEOUT_HEADER = "X-SPLINE-TIMEOUT"

  private def isFutureClass(clazz: Class[_]): Boolean = classOf[Future[_]].isAssignableFrom(clazz)
}
