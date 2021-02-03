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

package za.co.absa.spline.common.graph

import scalax.collection.Graph
import scalax.collection.GraphEdge.DiEdge
import scalax.collection.GraphPredef.EdgeAssoc

object GraphUtils {

  trait NodeNavigation[Node, Id] {
    def id(n: Node): Id
    def nextIds(n: Node): Seq[Id]
  }

  implicit class NodeSeqOps[A](val xs: Seq[A]) extends AnyVal {
    def sortedTopologically[B](reverse: Boolean = false)(implicit nav: NodeNavigation[A, B]): Seq[A] =
      if (xs.length < 2) xs
      else {
        val itemById = xs.map(op => nav.id(op) -> op).toMap

        val createEdge: (A, B) => DiEdge[A] =
          if (reverse)
            (item, nextId) => itemById(nextId) ~> item
          else
            (item, nextId) => item ~> itemById(nextId)

        val edges: Seq[DiEdge[A]] =
          for {
            item <- xs
            nextId <- nav.nextIds(item)
          } yield createEdge(item, nextId)

        Graph
          .from(edges = edges)
          .topologicalSort match {
          case Right(res) => res.toOuter.toSeq
        }
      }
  }

}
