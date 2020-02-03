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

package za.co.absa.spline.persistence

import java.util.concurrent.CompletionException

import com.arangodb.ArangoDBException
import org.mockito.Mockito._
import org.scalatest.flatspec.AsyncFlatSpec
import org.scalatest.matchers.should.Matchers
import org.scalatestplus.mockito.MockitoSugar
import za.co.absa.spline.persistence.PersisterSpec.ARecoverableArangoErrorCode

import scala.concurrent.Future
import scala.concurrent.Future._
import scala.language.implicitConversions

object PersisterSpec {
  private val ARecoverableArangoErrorCode = ArangoCode.ClusterTimeout.code
}

class PersisterSpec
  extends AsyncFlatSpec
    with Matchers
    with MockitoSugar {

  behavior of "Persister"

  it should "call an underlying method and return a result" in {
    val spy = mock[() => Future[String]]
    when(spy()) thenReturn successful("result")
    for (result <- Persister.execute(spy()))
      yield {
        verify(spy, times(1))()
        result should equal("result")
      }
  }

  it should "retry after a recoverable failure" in {
    Future.traverse(RetryableException.RetryableCodes) {
      errorCode => {
        val spy = mock[() => Future[String]]
        (when(spy())
          thenReturn failed(new ArangoDBException("1st call failed", errorCode))
          thenReturn failed(new CompletionException(new ArangoDBException("2st call failed", errorCode)))
          thenReturn successful("3rd call succeeded"))
        for (result <- Persister.execute(spy()))
          yield {
            verify(spy, times(3))()
            result should equal("3rd call succeeded")
          }
      }
    }.map(_.head)
  }

  it should "only retry up to the maximum number of retries" in {
    val spy = mock[() => Future[String]]
    when(spy()) thenReturn failed(new ArangoDBException("oops", ARecoverableArangoErrorCode))
    for (thrown <- recoverToExceptionIf[ArangoDBException](Persister.execute(spy())))
      yield {
        verify(spy, times(Persister.MaxRetries + 1))()
        thrown.getMessage should equal("oops")
      }
  }

  it should "not retry on a non-recoverable error" in {
    val spy = mock[() => Future[String]]
    when(spy()) thenReturn failed(new RuntimeException("boom"))
    for (thrown <- recoverToExceptionIf[Exception](Persister.execute(spy())))
      yield {
        verify(spy, times(1))()
        thrown.getMessage should equal("boom")
      }
  }
}
