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

package za.co.absa.spline.common.webmvc

import org.slf4s.Logging
import org.springframework.core.MethodParameter
import org.springframework.lang.Nullable
import org.springframework.web.context.request.async.{DeferredResult, WebAsyncUtils}
import org.springframework.web.context.request.{NativeWebRequest, WebRequest}
import org.springframework.web.method.support.{AsyncHandlerMethodReturnValueHandler, ModelAndViewContainer}
import org.springframework.web.servlet.mvc.method.annotation.DeferredResultMethodReturnValueHandler

import scala.concurrent.duration._
import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}


class ScalaFutureMethodReturnValueHandler(
  defaultTimeout: Duration,
  maximumTimeout: Duration
)(implicit ec: ExecutionContext)
  extends DeferredResultMethodReturnValueHandler
    with AsyncHandlerMethodReturnValueHandler
    with Logging {

  import ScalaFutureMethodReturnValueHandler._

  log.debug(s"Default timeout: $defaultTimeout")
  log.debug(s"Maximum timeout: $maximumTimeout")

  protected type F <: Future[_]

  override def supportsReturnType(returnType: MethodParameter): Boolean =
    classOf[Future[_]].isAssignableFrom(returnType.getParameterType) || super.supportsReturnType(returnType)

  override def isAsyncReturnValue(@Nullable returnValue: Any, returnType: MethodParameter): Boolean =
    returnValue.isInstanceOf[Future[_]]

  override def handleReturnValue(retVal: Any, retType: MethodParameter, mav: ModelAndViewContainer, req: NativeWebRequest): Unit = retVal match {
    case future: F =>
      val maybeTimeout = getFutureTimeout(future, req)
      log.debug(s"Future timeout: $maybeTimeout")
      val deferredResult = toDeferredResult(future, maybeTimeout)
      WebAsyncUtils
        .getAsyncManager(req)
        .startDeferredResultProcessing(deferredResult, mav)
    case _ =>
      super.handleReturnValue(retVal, retType, mav, req)
  }

  protected def getFutureTimeout(future: F, req: WebRequest): Long =
    getTimeout(
      Option(req.getHeader(TIMEOUT_HEADER)).map(_.toLong.millis),
      defaultTimeout,
      maximumTimeout
    ).toMillis

  private def toDeferredResult(returnValue: Future[_], timeout: Long): DeferredResult[_] =
    new DeferredResult[Any](timeout) {
      returnValue.andThen {
        case Success(value) => setResult(value)
        case Failure(error) => setErrorResult(error)
      }
    }
}

object ScalaFutureMethodReturnValueHandler {
  private val TIMEOUT_HEADER = "X-SPLINE-TIMEOUT"

  private def convertNegOrZeroToInf(t: Duration): Duration = {
    if (t.isFinite() && t.toMillis < 1) Duration.Inf
    else t
  }

  private def convertInfToZero(t: Duration): Duration = {
    if (t.isFinite()) t
    else 0.millis
  }

  private[webmvc] def getTimeout(
    maybeRequestedTimeout: Option[Duration],
    defaultTimeout: Duration,
    maximumTimeout: Duration
  ): Duration = {
    val requestedTOpt = maybeRequestedTimeout.map(convertNegOrZeroToInf)
    val defaultT = convertNegOrZeroToInf(defaultTimeout)
    val maximumT = convertNegOrZeroToInf(maximumTimeout)

    val resultT =
      requestedTOpt
        .getOrElse(defaultT)
        .min(maximumT)

    convertInfToZero(resultT)
  }
}
