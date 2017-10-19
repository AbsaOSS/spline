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

package za.co.absa.spline.core.transformations

import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.expr._
import za.co.absa.spline.model.op.{Join, OperationProps, Projection}
import java.util.UUID.randomUUID

class ProjectionMergerSpec extends FlatSpec with Matchers {
  val attributeId = randomUUID()

  private def createGenericExpressions(names: String*): Seq[Expression] = {
    names.map(n => Generic("exprType", n, Simple("type", nullable = true), Seq.empty))
  }

  private def createCompositeExpressions(attributeNames: (String, String)*): Seq[Expression] = {
    val simpleType = Simple("type", nullable = true)
    attributeNames.map(ns => Alias(ns._2, ns._2, simpleType, Seq(AttributeReference(attributeId, ns._1, simpleType))))
  }

  "A graph with two compatible projections" should "be joined into one node" in {

    val metaDatasetId = randomUUID
    val outputMetaDataset = randomUUID

    val inputNodes = ProjectionMerger(Seq(
      Projection(
        OperationProps(
          randomUUID,
          "node2",
          Seq(metaDatasetId),
          outputMetaDataset),
        createGenericExpressions("c", "d")),
      Projection(
        OperationProps(
          randomUUID,
          "node1",
          Seq.empty,
          metaDatasetId),
        createGenericExpressions("a", "b"))
    ))

    val expectedNodes = Seq(Projection(
      OperationProps(
        id = null,
        "node1",
        Seq.empty,
        outputMetaDataset),
      createGenericExpressions("a", "b", "c", "d")))

    val result = ProjectionMerger.apply(inputNodes)

    result.map(_.updated(_.copy(id = null))) shouldEqual expectedNodes
  }

  "A graph with two incompatible projections" should "remain the same" in {
    val metaDatasetId = randomUUID
    val outputMetaDataset = randomUUID

    val input = Seq(
      Projection(
        OperationProps(
          randomUUID,
          "node2",
          Seq(metaDatasetId),
          outputMetaDataset),
        createCompositeExpressions(("b", "c"))),
      Projection(
        OperationProps(
          randomUUID,
          "node1",
          Seq(),
          metaDatasetId),
        createCompositeExpressions(("a", "b")))
    )

    val result = ProjectionMerger(input)

    result shouldEqual input
  }

  "A graph with three compatible projections" should "be joined into one node" in {
    val metaDataset1Id = randomUUID
    val metaDataset2Id = randomUUID
    val outputMetaDataset = randomUUID

    val inputNodes = ProjectionMerger(Seq(
      Projection(
        OperationProps(
          randomUUID,
          "node3",
          Seq(metaDataset2Id),
          outputMetaDataset),
        createGenericExpressions("e", "f")),
      Projection(
        OperationProps(
          randomUUID,
          "node2",
          Seq(metaDataset1Id),
          metaDataset2Id),
        createGenericExpressions("c", "d")),
      Projection(
        OperationProps(
          randomUUID,
          "node1",
          Seq.empty,
          metaDataset1Id),
        createGenericExpressions("a", "b"))
    ))

    val expectedNodes = Seq(Projection(
      OperationProps(
        id = null,
        "node1",
        Seq.empty,
        outputMetaDataset),
      createGenericExpressions("a", "b", "c", "d", "e", "f"))
    )

    val result = ProjectionMerger.apply(inputNodes)

    result.map(_.updated(_.copy(id = null))) shouldEqual expectedNodes
  }

  "A branch of compatible projections within a diamond graph" should "be joined into one node" in {
    val metaDatasetRootId = randomUUID
    val metaDatasetAnotherBranchId = randomUUID
    val metaDatasetBranch1Id = randomUUID
    val metaDatasetBranch2Id = randomUUID
    val metaDatasetBranch3Id = randomUUID
    val outputMetaDataset = randomUUID

    val inputNodes = ProjectionMerger(Seq(
      Join(
        OperationProps(
          randomUUID,
          "join",
          Seq(metaDatasetAnotherBranchId, metaDatasetBranch3Id),
          outputMetaDataset),
        None,
        "inner"),
      Projection(
        OperationProps(
          randomUUID,
          "branch3",
          Seq(metaDatasetBranch2Id),
          metaDatasetBranch3Id),
        createGenericExpressions("e", "f")),
      Projection(
        OperationProps(
          randomUUID,
          "branch2",
          Seq(metaDatasetBranch1Id),
          metaDatasetBranch2Id),
        createGenericExpressions("c", "d")),
      Projection(
        OperationProps(
          randomUUID,
          "branch1",
          Seq(metaDatasetRootId),
          metaDatasetBranch1Id),
        createGenericExpressions("a", "b")),
      Projection(
        OperationProps(
          randomUUID,
          "anotherBranch",
          Seq(metaDatasetRootId),
          metaDatasetAnotherBranchId),
        createGenericExpressions("n")),
      Projection(
        OperationProps(
          randomUUID,
          "root",
          Seq.empty,
          metaDatasetRootId),
        createGenericExpressions("r"))
    ))

    val expectedNodes = Seq(
      Join(
        OperationProps(
          id = null,
          "join",
          Seq(metaDatasetAnotherBranchId, metaDatasetBranch3Id),
          outputMetaDataset),
        None,
        "inner"),
      Projection(
        OperationProps(
          id = null,
          "branch1",
          Seq(metaDatasetRootId),
          metaDatasetBranch3Id),
        createGenericExpressions("a", "b", "c", "d", "e", "f")),
      Projection(
        OperationProps(
          id = null,
          "anotherBranch",
          Seq(metaDatasetRootId),
          metaDatasetAnotherBranchId),
        createGenericExpressions("n")),
      Projection(
        OperationProps(
          id = null,
          "root",
          Seq.empty,
          metaDatasetRootId),
        createGenericExpressions("r"))
    )

    val result = ProjectionMerger.apply(inputNodes)

    result.map(_.updated(_.copy(id = null))) shouldEqual expectedNodes
  }


  "A graph with two branches of projections. Only the branch of compatible nodes" should "be merged into one node" in {
    val metaDatasetRootId = randomUUID
    val metaDatasetCompatible1Id = randomUUID
    val metaDatasetCompatible2Id = randomUUID
    val metaDatasetIncompatible1Id = randomUUID
    val metaDatasetIncompatible2Id = randomUUID
    val outputMetaDataset = randomUUID

    val inputNodes = ProjectionMerger(Seq(
      Join(
        OperationProps(
          randomUUID,
          "join",
          Seq(metaDatasetCompatible2Id, metaDatasetIncompatible2Id),
          outputMetaDataset),
        None,
        "inner"),
      Projection(
        OperationProps(
          randomUUID,
          "incompatible2",
          Seq(metaDatasetIncompatible1Id),
          metaDatasetIncompatible2Id),
        createCompositeExpressions(("b", "c"))),
      Projection(
        OperationProps(
          randomUUID,
          "incompatible1",
          Seq(metaDatasetRootId),
          metaDatasetIncompatible1Id),
        createCompositeExpressions(("a", "b"))),
      Projection(
        OperationProps(
          randomUUID,
          "compatible2",
          Seq(metaDatasetCompatible1Id),
          metaDatasetCompatible2Id),
        createCompositeExpressions(("a", "b"))),
      Projection(
        OperationProps(
          randomUUID,
          "compatible1",
          Seq(metaDatasetRootId),
          metaDatasetCompatible1Id),
        createCompositeExpressions(("b", "c"))),
      Projection(
        OperationProps(
          randomUUID,
          "root",
          Seq.empty,
          metaDatasetRootId),
        createGenericExpressions("r"))
    ))

    val expectedNodes= Seq(
      Join(
        OperationProps(
          id = null,
          "join",
          Seq(metaDatasetCompatible2Id, metaDatasetIncompatible2Id),
          outputMetaDataset),
        None,
        "inner"),
      Projection(
        OperationProps(
          id = null,
          "incompatible2",
          Seq(metaDatasetIncompatible1Id),
          metaDatasetIncompatible2Id),
        createCompositeExpressions(("b", "c"))),
      Projection(
        OperationProps(
          id = null,
          "incompatible1",
          Seq(metaDatasetRootId),
          metaDatasetIncompatible1Id),
        createCompositeExpressions(("a", "b"))),
      Projection(
        OperationProps(
          id = null,
          "compatible1",
          Seq(metaDatasetRootId),
          metaDatasetCompatible2Id),
        createCompositeExpressions(("b", "c"), ("a", "b"))),
      Projection(
        OperationProps(
          id = null,
          "root",
          Seq.empty,
          metaDatasetRootId),
        createGenericExpressions("r"))
    )

    val result = ProjectionMerger.apply(inputNodes)

    result.map(_.updated(_.copy(id = null))) shouldEqual expectedNodes
  }

}
