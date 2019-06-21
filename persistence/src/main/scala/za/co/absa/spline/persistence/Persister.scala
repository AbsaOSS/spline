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

  private val TotalRetriesOnConflictingKey = 5

  val vpack: VPack = new VPack.Builder()
    .registerModule(new VPackScalaModule)
    .build

  def save[T, R](entity: T, attemptSave: T => Future[R]): Future[R] = {
    saveWithRetry(entity, attemptSave, TotalRetriesOnConflictingKey)
  }

  @throws(classOf[IllegalArgumentException])
  @throws(classOf[ArangoDBException])
  private def saveWithRetry[T, R](entity: T, attemptSave: T => Future[R], retries: Int): Future[R] = {
    val left = retries - 1
    for {
      res <- attemptSave(entity).recoverWith {
        case RetryableException(e) =>
          if (left == 0) throw e
          else {
            log.warn(s"Ignoring ${e.getClass.getSimpleName} and $left left. Exception message: ${e.getMessage}.")
            saveWithRetry(entity, attemptSave, left)
          }
        case _ =>
          throw new IllegalArgumentException(s"Unexpected exception aborting remaining $left retries.")
      }
    } yield res
  }
}
