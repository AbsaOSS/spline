/*
 * Copyright 2017 Barclays Africa Group Limited
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

package za.co.absa.spline.persistence.api.composition

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

trait PersistorCombiner[TPersistor] {
  protected val persistors : Set[TPersistor]

  def combine[TResult](function: TPersistor => Future[TResult], combiner: Iterable[TResult] => TResult): Future[TResult] = {
    Future.sequence(persistors.map(function)).map(combiner)
  }
}
