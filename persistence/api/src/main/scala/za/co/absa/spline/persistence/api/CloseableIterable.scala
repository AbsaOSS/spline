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

package za.co.absa.spline.persistence.api

import java.io.Closeable

/**
  * A wrapper for Iterable that can be closed by the client when not needed any more.
  *
  * @param iterator      an iterator of type T
  * @param closeFunction close callback
  * @tparam T item type
  */
class CloseableIterable[+T](val iterator: Iterator[T], closeFunction: => Unit) extends Closeable {
  override def close(): Unit = closeFunction
}

object CloseableIterable {
  def empty[T]: CloseableIterable[T] = new CloseableIterable[T](Iterator.empty, () => {})
}