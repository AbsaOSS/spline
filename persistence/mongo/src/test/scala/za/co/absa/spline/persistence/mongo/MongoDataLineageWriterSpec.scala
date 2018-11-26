/*
 * Copyright 2017 ABSA Group Limited
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

package za.co.absa.spline.persistence.mongo

import java.util.UUID.randomUUID

import org.scalatest.Inside._
import org.scalatest.Matchers
import za.co.absa.spline.model._
import za.co.absa.spline.model.op.{OperationProps, Projection}

class MongoDataLineageWriterSpec extends MongoDataLineagePersistenceSpecBase with Matchers {

  private val lineage = createDataLineage("appID", "appName")

  describe("store()") {

    it("should store data lineage to a database") {
      for {
        _ <- lineageWriter store lineage
        storedLineage <- mongoReader.loadByDatasetId(lineage.rootDataset.id, overviewOnly = false)
      } yield {
        storedLineage.get shouldEqual lineage
      }
    }

    it("should store fields with dots correctly") {
      val lineageWithDotsAndDollar = {
        val dummyExpression = expr.Literal(42, randomUUID)
        val aggregateOperationWithDotsAnd$ =
          op.Aggregate(OperationProps(randomUUID, "aggregate", Nil, randomUUID), Nil, Map("field.with.dots.and.$" -> dummyExpression))
        val resultLineage = lineage.copy(operations = lineage.operations :+ aggregateOperationWithDotsAnd$)
        resultLineage
      }

      for {
        _ <- lineageWriter store lineageWithDotsAndDollar
        storedLineage <- mongoReader.loadByDatasetId(lineageWithDotsAndDollar.rootDataset.id, overviewOnly = false)
      } yield
        storedLineage shouldEqual Option(lineageWithDotsAndDollar)
    }

    it("should store expressions") {
      val lineageWithExpressions = lineage.copy(operations =
        lineage.operations :+ op.Projection(OperationProps(randomUUID, "", Nil, randomUUID), Seq(
          expr.Generic("", randomUUID, Nil, "", None),
          expr.GenericLeaf("", randomUUID, "", None),
          expr.Alias("", expr.Literal(42, randomUUID)),
          expr.AttrRef(randomUUID),
          expr.Literal(42, randomUUID),
          expr.Binary("+", randomUUID, Nil),
          expr.UDF("", randomUUID, Nil)
        )))
      for {
        _ <- lineageWriter store lineageWithExpressions
        storedLineage <- mongoReader.loadByDatasetId(lineageWithExpressions.rootDataset.id, overviewOnly = false)
      } yield {
        storedLineage.get shouldEqual lineageWithExpressions
      }
    }

    it("should support Projection operation with no transformations") {
      val lineageWithExpressions = lineage.copy(operations =
        lineage.operations :+ op.Projection(OperationProps(randomUUID, "", Nil, randomUUID), Nil))
      for {
        _ <- lineageWriter store lineageWithExpressions
        storedLineage <- mongoReader.loadByDatasetId(lineageWithExpressions.rootDataset.id, overviewOnly = false)
      } yield {
        storedLineage.get shouldEqual lineageWithExpressions
      }
    }

    it("should support Literal(None) as Literal(null)") {
      val lineageWithNoneLiteral = lineage.copy(
        operations = lineage.operations :+ op.Projection(OperationProps(randomUUID, "", Nil, randomUUID),
          Seq(
            expr.Literal(null, randomUUID),
            expr.Literal(None, randomUUID)
          )))
      for {
        _ <- lineageWriter store lineageWithNoneLiteral
        storedLineage <- mongoReader loadByDatasetId(lineageWithNoneLiteral.rootDataset.id, false)
      } yield {
        inside(storedLineage.get.operations.last) {
          case Projection(_, literals) =>
            every(literals) should have('value (null))
        }
      }
    }

  }
}
