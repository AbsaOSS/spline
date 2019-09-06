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

package za.co.absa.spline.migrator

object Stats {
  def empty = SimpleStats(0, 0, 0)

  def emptyTree = TreeStats(0, 0, 0, empty)

  def unapply(arg: Stats): Option[(Int, Int)] = arg match {
    case SimpleStats(a, b, _) => Some((a, b))
    case TreeStats(a, b, _, _) => Some((a, b))
  }
}

sealed trait Stats {
  type T <: Stats

  val success: Int
  val failures: Int
  val queued: Int

  def processed: Int = success + failures

  def inc(successInc: Int, failureInc: Int, queued: Int): T

  def incSuccess: T = inc(1, 0, -1)

  def incFailure: T = inc(0, 1, -1)

  def incQueue: T = inc(0, 0, 1)
}

case class SimpleStats private(success: Int, failures: Int, queued: Int) extends Stats {
  override type T = SimpleStats

  override def inc(successInc: Int, failureInc: Int, queueInc: Int) =
    SimpleStats(success + successInc, failures + failureInc, queued + queueInc)
}

case class TreeStats private(success: Int, failures: Int, queued: Int, parentStats: Stats) extends Stats {
  override type T = TreeStats

  override def inc(successInc: Int, failureInc: Int, queueInc: Int) =
    TreeStats(success + successInc, failures + failureInc, queued + queueInc, parentStats.inc(successInc, failureInc, queueInc))
}