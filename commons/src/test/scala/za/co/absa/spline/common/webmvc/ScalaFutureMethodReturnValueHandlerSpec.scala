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

package za.co.absa.spline.common.webmvc

import org.mockito.Mockito._
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import org.scalatestplus.mockito.MockitoSugar
import org.springframework.core.MethodParameter
import org.springframework.util.concurrent.ListenableFuture
import org.springframework.web.context.request.async.DeferredResult
import za.co.absa.spline.common.webmvc.ScalaFutureMethodReturnValueHandlerSpec.{SubFuture, mockWith}

import java.util.concurrent.CompletionStage
import scala.concurrent.duration.Duration.Inf
import scala.concurrent.{ExecutionContext, Future}
import scala.reflect.ClassTag

class ScalaFutureMethodReturnValueHandlerSpec extends AnyFlatSpec with MockitoSugar with Matchers {

  import scala.concurrent.duration._

  private implicit val ec: ExecutionContext = mock[ExecutionContext]
  private val handler = new ScalaFutureMethodReturnValueHandler(None, None)

  behavior of "supportsReturnType()"

  it should "report supported return types correctly" in {
    handler.supportsReturnType(mockWith[MethodParameter, Class[_]](_.getParameterType, classOf[Future[_]])) should be(true)
    handler.supportsReturnType(mockWith[MethodParameter, Class[_]](_.getParameterType, classOf[SubFuture])) should be(true)
    handler.supportsReturnType(mockWith[MethodParameter, Class[_]](_.getParameterType, classOf[DeferredResult[_]])) should be(true)
    handler.supportsReturnType(mockWith[MethodParameter, Class[_]](_.getParameterType, classOf[ListenableFuture[_]])) should be(true)
    handler.supportsReturnType(mockWith[MethodParameter, Class[_]](_.getParameterType, classOf[CompletionStage[_]])) should be(true)
    handler.supportsReturnType(mockWith[MethodParameter, Class[_]](_.getParameterType, classOf[AnyRef])) should be(false)
  }

  behavior of "isAsyncReturnValue()"

  it should "return true for any Future type" in {
    handler.isAsyncReturnValue(mock[Future[_]], null) should be(true)
    handler.isAsyncReturnValue(mock[SubFuture], null) should be(true)
    handler.isAsyncReturnValue(mock[AnyRef], null) should be(false)
    handler.isAsyncReturnValue(null, null) should be(false)
  }

  Seq(Inf, 0.millis, -1.millis).foreach(inf => {
    behavior of s"getTimeout() [infinite = $inf]"

    it should "return None when all arguments are None" in {
      ScalaFutureMethodReturnValueHandler.getTimeout(None, None, None) should be(None)
    }

    it should "return default timeout when requested timeout is unspecified" in {
      ScalaFutureMethodReturnValueHandler.getTimeout(None, Some(42.millis), None) should equal(Some(42.millis))
      ScalaFutureMethodReturnValueHandler.getTimeout(None, Some(42.millis), Some(777.millis)) should equal(Some(42.millis))
    }

    it should s"return requested timeout regardless of default timeout settings" in {
      ScalaFutureMethodReturnValueHandler.getTimeout(Some(42.millis), None, None) should equal(Some(42.millis))
      ScalaFutureMethodReturnValueHandler.getTimeout(Some(42.millis), Some(1.milli), None) should equal(Some(42.millis))
      ScalaFutureMethodReturnValueHandler.getTimeout(Some(42.millis), Some(100.milli), None) should equal(Some(42.millis))
      ScalaFutureMethodReturnValueHandler.getTimeout(Some(42.millis), Some(inf), None) should equal(Some(42.millis))
    }

    it should s"return threshold timeout when no timeout is specified" in {
      ScalaFutureMethodReturnValueHandler.getTimeout(None, None, Some(10.millis)) should equal(Some(10.millis))
    }

    it should s"return threshold timeout when any of timeouts exceeds threshold value" in {
      ScalaFutureMethodReturnValueHandler.getTimeout(Some(42.millis), None, Some(10.millis)) should equal(Some(10.millis))
      ScalaFutureMethodReturnValueHandler.getTimeout(None, Some(42.millis), Some(10.millis)) should equal(Some(10.millis))
      ScalaFutureMethodReturnValueHandler.getTimeout(None, Some(inf), Some(10.millis)) should equal(Some(10.millis))
      ScalaFutureMethodReturnValueHandler.getTimeout(Some(inf), None, Some(10.millis)) should equal(Some(10.millis))
    }

    it should s"return 0 when default or requested timeout is infinite" in {
      ScalaFutureMethodReturnValueHandler.getTimeout(Some(inf), None, None) should equal(Some(0.millis))
      ScalaFutureMethodReturnValueHandler.getTimeout(None, Some(inf), None) should equal(Some(0.millis))
    }
  })
}

object ScalaFutureMethodReturnValueHandlerSpec extends MockitoSugar {

  abstract class SubFuture extends Future[Any]

  private def mockWith[A <: AnyRef : ClassTag, B](call: A => B, retVal: B): A = {
    val aMock = mock[A]
    when(call(aMock)).thenReturn(retVal)
    aMock
  }
}
