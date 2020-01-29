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

package za.co.absa.spline.migrator

import org.mockito.ArgumentMatchers._
import org.mockito.Mockito._
import org.scalatest.{FlatSpec, Matchers}
import org.scalatestplus.mockito.MockitoSugar
import za.co.absa.spline.migrator.rest.{RestClient, RestClientFactory, RestEndpoint}

import scala.concurrent.Future

class MigratorToolImplSpec extends FlatSpec with Matchers with MockitoSugar {

  private val restClientFactoryMock = mock[RestClientFactory]
  private val restClientMock = mock[RestClient]
  private val restEndpointMock = mock[RestEndpoint]

  private val migratorConfig = MigratorConfig(producerRESTEndpointUrl = "testProducerUrl")
  private val migratorTool = new MigratorToolImpl(restClientFactoryMock)

  behavior of "MigratorToolImpl.migrate()"

  when(restClientFactoryMock.createRestClient("testProducerUrl")) thenReturn restClientMock
  when(restClientMock.createEndpoint("status")) thenReturn restEndpointMock
  when(restEndpointMock.head()(any())) thenReturn Future.failed(new Exception("test"))

  it should "report Producer not ready" in {
    intercept[Exception](migratorTool.migrate(migratorConfig)) should have message "Spline Producer is not ready"
  }

}
