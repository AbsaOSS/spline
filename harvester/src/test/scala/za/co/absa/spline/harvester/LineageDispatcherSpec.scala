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

package za.co.absa.spline.harvester

import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FunSuite, Matchers}
import salat.grater
import za.co.absa.spline.fixture.LineageFixture
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.mongo.serialization.BSONSalatContext._
import org.mockito.Mockito._
import org.mockito.ArgumentMatchers._
import org.mockito.invocation.InvocationOnMock
import org.mockito.stubbing.Answer

class LineageDispatcherSpec extends FunSuite with Matchers with LineageFixture with MockitoSugar {

  test("testSend with retries") {
    var captured = Array[Byte]()
    var retriesUntilSuccess = 3
    val httpSender = mock[HttpSender]
    when(httpSender.attemptSend(any[String](), any[Array[Byte]]()))
      .thenAnswer(new Answer[Boolean] {
        override def answer(invocation: InvocationOnMock): Boolean = {
          captured = invocation.getArgument[Array[Byte]](1)
          retriesUntilSuccess = retriesUntilSuccess - 1
          retriesUntilSuccess == 0
        }
      })
    val lineageDispatcher = new LineageDispatcher(3, "http://localhost/dummy", httpSender)
    val expectedLineage = fiveOpsLineage()
    lineageDispatcher.send(expectedLineage)
    val actualLineage = grater[DataLineage]
      .fromBSON(captured)
    actualLineage shouldBe expectedLineage
  }

}
