/*
 * Copyright 2023 ABSA Group Limited
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

import scala.concurrent.Future

trait DryRunnable {
  def dryRun: Boolean

  def unlessDryRun[T <: Any](code: => T, default: => T): T = {
    if (dryRun) default
    else code
  }

  def unlessDryRun[T <: AnyRef](code: => T): T = {
    unlessDryRun(code, null).asInstanceOf[T]
  }

  def unlessDryRunAsync[T](code: => Future[T]): Future[T] = {
    unlessDryRun(code, Future.successful(null)).asInstanceOf[Future[T]]
  }
}
