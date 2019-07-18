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

package za.co.absa.spline.common

object CollectionImplicits {

  implicit class IteratorWrapper[A](iter: Iterator[A]) {
    /**
      * A better version of <code>Iterator.copyToArray</code>,
      * that returns the number of actually read elements.
      *
      * @param  xs    the array to fill.
      * @param  start the starting index.
      * @param  len   the maximal number of elements to copy.
      * @tparam B the type of the elements of the array.
      * @note Reuse: $consumesIterator
      */
    def fetch[B >: A](xs: Array[B], start: Int, len: Int): Int = {
      require(start >= 0 && (start < xs.length || xs.length == 0), s"start $start out of range ${xs.length}")
      var i = start
      val end = start + math.min(len, xs.length - start)
      while (i < end && iter.hasNext) {
        xs(i) = iter.next()
        i += 1
      }
      i - start
    }

    def fetch[B >: A : Manifest](len: Int): Array[B] = {
      val xs = new Array[B](len)
      val size = fetch(xs, 0, len)
      xs.take(size)
    }
  }

}
