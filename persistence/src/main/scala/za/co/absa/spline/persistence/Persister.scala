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

import com.arangodb.ArangoDBException
import com.arangodb.velocypack.VPack
import com.arangodb.velocypack.module.scala.VPackScalaModule
import za.co.absa.spline.common.logging.Logging

import scala.concurrent.Future

object Persister extends Logging {

  import scala.concurrent.ExecutionContext.Implicits._

  private val MaxRetries = 5

  val vpack: VPack = new VPack.Builder()
    .registerModule(new VPackScalaModule)
    .build

  def save[T, R](entity: T, attemptSave: T => Future[R]): Future[R] = {
    saveWithRetry(entity, attemptSave, None)
  }

  @throws(classOf[IllegalArgumentException])
  @throws(classOf[ArangoDBException])
  private def saveWithRetry[T, R](entity: T, attemptSave: T => Future[R], lastFailure: Option[FailedAttempt]): Future[R] = {
    val eventualResult = attemptSave(entity)
    val attemptsUsed = lastFailure.map(_.count).getOrElse(0)

    for (failure <- lastFailure) {
      eventualResult.onSuccess(PartialFunction(_ =>
        log.warn(s"Succeeded after ${failure.count + 1} attempts. Previous message was: {}", failure.error.getMessage)))
    }

    if (attemptsUsed >= MaxRetries)
      eventualResult
    else
      eventualResult.recoverWith {
      case RetryableException(e) => saveWithRetry(entity, attemptSave, Some(FailedAttempt(attemptsUsed + 1, e)))
    }
  }

  case class FailedAttempt(count: Int, error: Exception)

}
