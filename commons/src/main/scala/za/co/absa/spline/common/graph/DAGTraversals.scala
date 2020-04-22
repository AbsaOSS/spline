/*
 * Copyright 2020 ABSA Group Limited
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

package za.co.absa.spline.common.graph

object DAGTraversals {

  def dfs[A, B](
    vertex: A,
    acc: B,
    next: A => Iterable[A],
    collect: (B, A) => B,
    filter: (B, A) => Boolean = (_: B, _: A) => true,
    prune: (B, B, A) => Boolean = (_: B, _: B, _: A) => false
  ): B = {
    // collect vertex satisfying predicate
    val isSolution = filter(acc, vertex)
    val acc1 =
      if (isSolution) collect(acc, vertex)
      else acc

    // traverse children unless pruned
    val isPruned = prune(acc, acc1, vertex)
    if (isPruned) acc1
    else next(vertex).foldLeft(acc1) {
      case (zi, vi) => dfs(vi, zi, next, collect, filter, prune)
    }
  }
}
