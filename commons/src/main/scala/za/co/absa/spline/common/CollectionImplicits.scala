/*
 * Copyright 2021 ABSA Group Limited
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

import scala.collection.generic.CanBuildFrom
import scala.collection.mutable
import scala.language.higherKinds

object CollectionImplicits {

  implicit class IterableOps[A, M[X] <: Iterable[X]](val xs: M[A]) extends AnyVal {

    def distinctBy[B](f: A => B)(implicit cbf: CanBuildFrom[M[A], A, M[A]]): M[A] = {
      val seen = mutable.Set.empty[B]
      val builder = cbf(xs)
      xs foreach { x =>
        val y = f(x)
        if (!seen(y)) {
          builder += x
          seen += y
        }
      }
      builder.result()
    }
  }

}
