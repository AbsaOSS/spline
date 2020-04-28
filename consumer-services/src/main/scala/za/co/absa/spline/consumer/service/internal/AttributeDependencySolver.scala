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

package za.co.absa.spline.consumer.service.internal

import scalaz.Scalaz._
import scalaz.Semigroup
import za.co.absa.spline.common.graph.DAGTraversals
import za.co.absa.spline.consumer.service.attrresolver.AttributeDependencyResolver
import za.co.absa.spline.consumer.service.internal.AttributeDependencySolver._
import za.co.absa.spline.consumer.service.internal.model.ExecutionPlanDAG
import za.co.absa.spline.consumer.service.model.{AttributeGraph, AttributeNode, AttributeTransition}
import za.co.absa.spline.persistence.model.Operation

class AttributeDependencySolver private(execPlan: ExecutionPlanDAG) {

  def impact(attributeId: AttributeId, dependencyResolver: Option[AttributeDependencyResolver]): AttributeGraph = {
    val originOp = originOperationForAttr(attributeId)
    val impact = getAttributeImpact(originOp, attributeId, dependencyResolver)
    asGraph(impact)
  }

  def lineage(attributeId: AttributeId, dependencyResolver: AttributeDependencyResolver): AttributeGraph = {
    val originOp = originOperationForAttr(attributeId)
    val lineage = getAttributeLineage(originOp, attributeId, dependencyResolver)
    asGraph(lineage)
  }

  private def originOperationForAttr(attributeId: AttributeId) =
    execPlan
      .findOriginOperationForAttr(attributeId)
      .getOrElse(sys.error(s"Execution plan $id doesn't have any operation producing attribute $attributeId"))

  private def asGraph(tuple: (Nodes, Edges)): AttributeGraph = {
    val (nodes, edges) = tuple
    val attEdges = edges.map(e => AttributeTransition(e.from, e.to))
    val attNodes = nodes.map { case (aId, n) => AttributeNode(aId, n.originOpId, n.transOpIds) }
    AttributeGraph(attNodes.toArray, attEdges.toArray)
  }

  /**
   * @param maybeDependencyResolver if no {{AttributeDependencyResolver}} provided the impact will only represent
   *                                direct usage of the attribute in the execution plan, with no transitive impact
   */
  private def getAttributeImpact(
    targetOp: Operation,
    targetAttrId: AttributeId,
    maybeDependencyResolver: Option[AttributeDependencyResolver]) = {

    val Acc(nodesRes, edgesRes, _, _) = DAGTraversals.dfs[Operation, Acc](
      vertex = targetOp,
      acc = Acc(attrsToProcessByOpId = Map(targetOp._key -> Set(targetAttrId))),
      next = execPlan.followingOps,
      filter = (acc, v) => acc.attrsToProcessByOpId.contains(v._key),
      prune = (_, acc, _) => acc.attrsToProcessByOpId.isEmpty,
      collect = {
        case (Acc(nodes, edges, attrsToProcessByOpId, _), op: Operation) =>
          val inputSchema: Set[AttributeId] = execPlan.inputSchemaSet(op._key)
          val myAttrsToProcess = attrsToProcessByOpId(op._key)
          val (transitiveAttrIds, originAttrIds) = myAttrsToProcess.partition(inputSchema)

          val newNodes = originAttrIds.map(attId => {
            attId -> NodeValue(op._key, Set.empty)
          }).toMap

          val updatedNodes = transitiveAttrIds.map(attrId => {
            val oldVal = nodes(attrId)
            attrId -> oldVal.copy(transOpIds = oldVal.transOpIds + op._key)
          }).toMap

          val followingOps = execPlan.followingOps(op)

          val newEdges =
            for {
              dependencyResolver <- maybeDependencyResolver.toSeq
              fo <- followingOps
              inSchema = execPlan.inputSchemaArray(fo._key)
              outSchema = execPlan.outputSchemaArray(fo._key)
              (toAttrId, fromAttrIds) <- dependencyResolver.resolve(fo, inSchema, outSchema)
              fromAttrId <- fromAttrIds
              if toAttrId != fromAttrId
              if myAttrsToProcess(fromAttrId)
            } yield {
              Edge(toAttrId, fromAttrId)
            }

          val nextAttrsByChild: Map[OperationId, Set[AttributeId]] = followingOps.map(fo => {
            val hisOriginAttrs: Set[AttributeId] =
              maybeDependencyResolver
                .map(dependencyResolver => {
                  val foInputSchema = execPlan.inputSchemaArray(fo._key)
                  val foOutputSchema = execPlan.outputSchemaArray(fo._key)
                  val foAttrDeps: Map[AttributeId, Set[AttributeId]] = dependencyResolver
                    .resolve(fo, foInputSchema, foOutputSchema)
                    .filter({ case (_, v) => v.intersect(myAttrsToProcess).nonEmpty })
                  foAttrDeps.keySet
                })
                .getOrElse(Set.empty)

            val hisTransAttrs: Set[AttributeId] = myAttrsToProcess.intersect(execPlan.outputSchemaSet(fo._key))

            fo._key -> (hisOriginAttrs ++ hisTransAttrs)
          }).toMap

          Acc(
            (nodes ++ updatedNodes) |+| newNodes,
            edges ++ newEdges,
            attrsToProcessByOpId - op._key ++ nextAttrsByChild
          )
      }
    )
    (nodesRes, edgesRes)
  }

  private def getAttributeLineage(
    targetOp: Operation,
    targetAttrId: AttributeId,
    dependencyResolver: AttributeDependencyResolver) = {

    val Acc(nodesRes, edgesRes, _, _) = DAGTraversals.dfs[Operation, Acc](
      vertex = targetOp,
      acc = Acc(attrsToProcessByOpId = Map(targetOp._key -> Set(targetAttrId))),
      next = execPlan.precedingOps,
      filter = (acc, v) => acc.attrsToProcessByOpId.contains(v._key),
      prune = (_, acc, _) => acc.attrsToProcessByOpId.isEmpty,
      collect = {
        case (Acc(nodes, edges, attrsToProcessByOpId, transOpsByAttrId), op: Operation) =>
          val (transitiveAttrIds, originAttrIds) = {
            val inputSchema: Set[AttributeId] = execPlan.inputSchemaSet(op._key)
            attrsToProcessByOpId(op._key).partition(inputSchema)
          }

          val newNodes = originAttrIds.map(attId => {
            val transOpIds = transOpsByAttrId.getOrElse(attId, Set.empty)
            attId -> NodeValue(op._key, transOpIds)
          }).toMap

          val opInputSchema = execPlan.inputSchemaArray(op._key)
          val opOutputSchema = execPlan.outputSchemaArray(op._key)
          val newEdges = dependencyResolver
            .resolve(op, opInputSchema, opOutputSchema)
            .filterKeys(originAttrIds)
            .flatMap {
              case (origAttrId, depAttrIds) =>
                depAttrIds.map(depAttrId => Edge(origAttrId, depAttrId))
            }

          val newTransitiveOpsByAttrId: Map[AttributeId, Set[OperationId]] = transitiveAttrIds
            .map(id => id -> (transOpsByAttrId.getOrElse(id, Set.empty) + op._key))
            .toMap

          val nextAttrIds = transitiveAttrIds ++ newEdges.map(_.to)
          val nextAttrsByChild: Map[OperationId, Set[AttributeId]] =
            execPlan.operationById
              .filterKeys(execPlan.precedingOps(op).map(_._key).contains)
              .mapValues(o => execPlan.outputSchemaSet(o._key).intersect(nextAttrIds))
              .filter { case (_, nextAttrs) => nextAttrs.nonEmpty }

          val updatedAttrsToProcessByOpId = attrsToProcessByOpId - op._key ++ nextAttrsByChild
          val updatedTransOpsByAttrId = transOpsByAttrId -- originAttrIds ++ newTransitiveOpsByAttrId

          Acc(
            nodes |+| newNodes,
            edges ++ newEdges,
            updatedAttrsToProcessByOpId,
            updatedTransOpsByAttrId
          )
      }
    )
    (nodesRes, edgesRes)
  }

}

object AttributeDependencySolver {

  private type AttributeId = String
  private type OperationId = String
  private type Node = (AttributeId, NodeValue)

  private type Nodes = Map[AttributeId, NodeValue]
  private type Edges = Set[Edge]

  private case class NodeValue(originOpId: OperationId, transOpIds: Set[OperationId])

  private object NodeValue {
    implicit val semigroup: Semigroup[NodeValue] =
      Semigroup.instance((a, b) => {
        assume(a.originOpId == b.originOpId, s"can only merge nodes with the same origin ID: ${a.originOpId} <> ${b.originOpId}")
        a.copy(transOpIds = a.transOpIds ++ b.transOpIds)
      })
  }

  private case class Edge(from: AttributeId, to: AttributeId)

  private case class Acc(
    nodes: Nodes = Map.empty,
    edges: Edges = Set.empty,
    attrsToProcessByOpId: Map[OperationId, Set[AttributeId]] = Map.empty,
    transOpsByAttrId: Map[AttributeId, Set[OperationId]] = Map.empty)

  def apply(execPlan: ExecutionPlanDAG) = new AttributeDependencySolver(execPlan)
}

