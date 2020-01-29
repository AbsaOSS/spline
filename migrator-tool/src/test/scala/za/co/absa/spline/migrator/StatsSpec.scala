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

import org.scalatest.{FlatSpec, Matchers}

class StatsSpec extends FlatSpec with Matchers {

  behavior of "SimpleStats"

  it should "count stats" in {
    val statsWithAllZeros = Stats.empty
    val statsWithQueueCnt = statsWithAllZeros
      .incQueue
      .incQueue
      .incQueue
    val statsAfterSuccess = statsWithQueueCnt
      .incSuccess
      .incSuccess
    val statsAfterFailure = statsAfterSuccess
      .incFailure

    statsWithAllZeros should have('success(0), 'failures(0), 'queued(0))
    statsWithQueueCnt should have('success(0), 'failures(0), 'queued(3))
    statsAfterSuccess should have('success(2), 'failures(0), 'queued(1))
    statsAfterFailure should have('success(2), 'failures(1), 'queued(0))
  }

  behavior of "TreeStats"

  it should "update parent stats" in {
    val statsWithInitialState = TreeStats(1, 2, 3, SimpleStats(5, 5, 5))
    val statsWithQueueCnt = statsWithInitialState
      .incQueue
      .incQueue
      .incQueue
    val statsAfterSuccess = statsWithQueueCnt
      .incSuccess
      .incSuccess
    val statsAfterFailure = statsAfterSuccess
      .incFailure

    statsWithInitialState should have(
      'success(1), 'failures(2), 'queued(3))
    statsWithInitialState.parentStats should have(
      'success(5), 'failures(5), 'queued(5))

    statsWithQueueCnt should have(
      'success(1), 'failures(2), 'queued(6))
    statsWithQueueCnt.parentStats should have(
      'success(5), 'failures(5), 'queued(8))

    statsAfterSuccess should have(
      'success(3), 'failures(2), 'queued(4))
    statsAfterSuccess.parentStats should have(
      'success(7), 'failures(5), 'queued(6))

    statsAfterFailure should have(
      'success(3), 'failures(3), 'queued(3))
    statsAfterFailure.parentStats should have(
      'success(7), 'failures(6), 'queued(5))
  }

}
