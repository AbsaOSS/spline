/*
 * Copyright 2024 ABSA Group Limited
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

import scalax.collection.edges._
import scalax.collection.immutable.Graph

import scala.collection.BuildFrom

object GraphImplicits {

  trait DAGNodeIdMapping[Node, Id] {
    /**
     * Returns a node identifier that is referenced by other nodes (edges)
     *
     * @param n graph node
     * @return a node identifier
     */
    def selfId(n: Node): Id

    /**
     * Returns outbound node identifiers
     *
     * @param n graph node
     * @return referenced nodes' identifiers
     */
    def refIds(n: Node): Iterable[Id]
  }

  private object IdOrdering {
    def none[A]: Ordering[A] = (_, _) => 0
  }

  implicit class DAGNodeTraversableOps[Node, M[X] <: Seq[X]](val xs: M[Node]) extends AnyVal {

    def sortedTopologically[Id](
      reverse: Boolean = false
    )(
      implicit
      nim: DAGNodeIdMapping[Node, Id],
      idOrdering: Ordering[Id] = IdOrdering.none[Id],
      bf: BuildFrom[M[Node], Node, M[Node]]
    ): M[Node] = {
      sortedTopologicallyBy(nim.selfId, nim.refIds, reverse)
    }

    def sortedTopologicallyBy[Id <: Any](
      selfIdFn: Node => Id,
      refIdsFn: Node => Iterable[Id],
      reverse: Boolean = false
    )(
      implicit
      idOrdering: Ordering[Id] = IdOrdering.none[Id],
      bf: BuildFrom[M[Node], Node, M[Node]]
    ): M[Node] =
      if (xs.size < 2) {
        // nothing to sort
        // return a clone instead of `xs` for semantic consistency reasons when a mutable collection is used
        (bf.newBuilder(xs) ++= xs).result()

      } else {
        val itemById = xs.map(op => selfIdFn(op) -> op).toMap

        val createEdge: (Node, Id) => DiEdge[Node] =
          if (reverse)
            (item, nextId) => itemById(nextId) ~> item
          else
            (item, nextId) => item ~> itemById(nextId)

        val edges: Iterable[DiEdge[Node]] =
          for {
            item <- xs
            nextId <- refIdsFn(item)
          } yield createEdge(item, nextId)

        val g = Graph.from(edges = edges, nodes = xs)
        val sortResult = g.topologicalSort

        sortResult match {
          case Right(res) =>
            val b = bf.newBuilder(xs)
            val ord = g.NodeOrdering((a, b) => idOrdering.compare(selfIdFn(a.outer), selfIdFn(b.outer)))
            b ++= res.withLayerOrdering(ord).toOuter
            b.result()
          case Left(cycleNode) =>
            throw new IllegalArgumentException("" +
              s"Expected DAG but cycle was detected: " +
              cycleNode.cycle.map(_.nodes).getOrElse(Nil).map(selfIdFn(_)).mkString(" → ")
            )
        }
      }
  }

}
