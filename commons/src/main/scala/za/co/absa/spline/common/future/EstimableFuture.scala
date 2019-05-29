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

package za.co.absa.spline.common.future

import com.thoughtworks.enableIf

import scala.collection.concurrent.{Map, TrieMap}
import scala.concurrent.duration.{Duration, _}
import scala.concurrent.{CanAwait, ExecutionContext, Future}
import scala.language.implicitConversions
import scala.util.Try

class EstimableFuture[+T](underlyingFuture: Future[T], avgDuration: () => Long) extends Future[T] {
  override def onComplete[U](f: Try[T] => U)(implicit executor: ExecutionContext): Unit = underlyingFuture.onComplete(f)

  override def isCompleted: Boolean = underlyingFuture.isCompleted

  override def value: Option[Try[T]] = underlyingFuture.value

  override def ready(atMost: Duration)(implicit permit: CanAwait): EstimableFuture.this.type = {
    underlyingFuture.ready(atMost)
    this
  }

  override def result(atMost: Duration)(implicit permit: CanAwait): T = underlyingFuture.result(atMost)

  lazy val estimatedDuration: Long = avgDuration()

  @enableIf(scala.util.Properties.versionNumberString.startsWith("2.12."))
  def transform[S](f: Try[T] => Try[S])(implicit executor: ExecutionContext): Future[S] = underlyingFuture.transform(f)

  @enableIf(scala.util.Properties.versionNumberString.startsWith("2.12."))
  def transformWith[S](f: Try[T] => Future[S])(implicit executor: ExecutionContext): Future[S] = underlyingFuture.transformWith(f)
}

object EstimableFuture {

  trait Implicits {

    implicit class FutureToDeferredResultAdapterImpl[T](val future: Future[T]) extends FutureToDeferredResultAdapter[T]

  }

  private[this] val durationMeasurersByCategory: Map[String, MovingAverageCalculator] = TrieMap.empty

  trait FutureToDeferredResultAdapter[T] {
    val future: Future[T]

    def asEstimable(category: String)(implicit executor: ExecutionContext): EstimableFuture[T] = {
      val durationMeasurer = durationMeasurersByCategory.getOrElseUpdate(category, {
        new MovingAverageCalculator(10.seconds.toMillis, 0.05)
      })
      val startTime = System.currentTimeMillis
      future.foreach(_ => durationMeasurer.addMeasurement(System.currentTimeMillis - startTime))

//      future.onSuccess { case _ => durationMeasurer.addMeasurement(System.currentTimeMillis - startTime) }
      new EstimableFuture(future, durationMeasurer.currentAverage _)
    }
  }

}

