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

package za.co.absa.spline.harvester.dispatcher

import org.mockito.Mockito._
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatestplus.mockito.MockitoSugar
import scalaj.http._
import za.co.absa.spline.harvester.exception.SplineNotInitializedException

class HttpLineageDispatcherSpec extends AnyFlatSpec with MockitoSugar {

  behavior of "HttpLineageDispatcher"

  val dummyUrl = "http://dummyUrl"

  val httpMock = mock[BaseHttp]
  val httpRequestMock = mock[HttpRequest]
  val httpResponseMock = mock[HttpResponse[String]]

  when(httpMock.apply(s"$dummyUrl/status")) thenReturn httpRequestMock
  when(httpRequestMock.method("HEAD")) thenReturn httpRequestMock
  when(httpRequestMock.asString) thenReturn httpResponseMock

  it should "not do anything when producer is ready" in {

    when(httpResponseMock.isSuccess) thenReturn true

    val dispatcher = new HttpLineageDispatcher(dummyUrl, httpMock)

    dispatcher.ensureProducerReady()
  }

  it should "throw when producer is not ready" in {

    when(httpResponseMock.isSuccess) thenReturn false

    val dispatcher = new HttpLineageDispatcher(dummyUrl, httpMock)

    assertThrows[SplineNotInitializedException] {
      dispatcher.ensureProducerReady()
    }
  }

  it should "throw when connection to producer was not successful" in {

    when(httpResponseMock.isSuccess) thenThrow new RuntimeException

    val dispatcher = new HttpLineageDispatcher(dummyUrl, httpMock)

    assertThrows[SplineNotInitializedException] {
      dispatcher.ensureProducerReady()
    }
  }
}
