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

package za.co.absa.spline.harvester

import java.util.UUID.randomUUID

import org.apache.spark.sql.functions._
import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.fixture.SparkFixture
import za.co.absa.spline.harvester.DataLineageBuilderSpec.TestRow
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.op._
import za.co.absa.spline.model.{Attribute, Schema, _}

import scala.language.implicitConversions

object DataLineageBuilderSpec {

  case class TestRow(i: Int, d: Double, s: String)

}

class DataLineageBuilderSpec extends FlatSpec with Matchers with SparkFixture {

  import spark.implicits._

  private val initialDataFrame = spark.createDataset(Seq(TestRow(1, 2.3, "text")))
  private val hadoopConfiguration = spark.sparkContext.hadoopConfiguration

  private val integerType = Simple("integer", nullable = false)
  private val doubleType = Simple("double", nullable = false)
  private val stringType = Simple("string", nullable = true)

  implicit class OperationAssertions(operation: Operation) {

    import OperationAssertions._

    def shouldReference(references: Seq[MetaDataset]) = new ReferenceToDatasetComparator(operation, references)

    def references(references: Seq[MetaDataset]) = shouldReference(references)

    def shouldEqualStripped(anotherOperation: Operation): Unit = stripped(operation) shouldEqual stripped(anotherOperation)

    private def stripped(operation: Operation): Operation = operation match {
      case jn: Join => jn copy(mainProps = strippedProps(jn), condition = null)
      case un: Union => un copy (mainProps = strippedProps(un))
      case fr: Filter => fr copy(mainProps = strippedProps(fr), condition = null)
      case st: Sort => st copy(mainProps = strippedProps(st), orders = Nil)
      case ag: Aggregate => ag copy(mainProps = strippedProps(ag), groupings = Nil, aggregations = Map.empty)
      case pn: Projection => pn copy(mainProps = strippedProps(pn), transformations = null)
      case gn: Generic => gn copy(mainProps = strippedProps(gn), rawString = null)
      case as: Alias => as copy (mainProps = strippedProps(as))
      case rd: BatchRead => rd copy (mainProps = strippedProps(rd))
      case rd: StreamRead => rd copy (mainProps = strippedProps(rd))
      case wt: BatchWrite => wt copy (mainProps = strippedProps(wt))
      case cm: Composite => cm copy (mainProps = strippedProps(cm))
      case op => ???
    }

    private def strippedProps(n: Operation): OperationProps = n.mainProps.copy(id = null, inputs = null, output = null)
  }

  object OperationAssertions {

    class ReferenceToDatasetComparator(val operation: Operation, val datasets: Seq[MetaDataset]) {
      private lazy val references = datasets.map(_.id)

      private def getReferenceOutputPosition = references.indexOf(operation.mainProps.output)

      private def getReferenceInputPositions = operation.mainProps.inputs.map(i => references.indexOf(i))

      def as(anotherComparator: ReferenceToDatasetComparator) = {
        getReferenceOutputPosition shouldEqual anotherComparator.getReferenceOutputPosition
        getReferenceInputPositions shouldEqual anotherComparator.getReferenceInputPositions
      }

    }

  }

  implicit class MetaDatasetAssertions(dataset: MetaDataset) {

    import MetaDatasetAssertions._

    def shouldReference(references: Seq[Attribute]) = new ReferenceToAttributeComparator(dataset, references)

    def references(references: Seq[Attribute]) = shouldReference(references)
  }

  object MetaDatasetAssertions {

    class ReferenceToAttributeComparator(val dataset: MetaDataset, val attributes: Seq[Attribute]) {
      private lazy val references = attributes.map(_.id)

      private def getReferencePositions = dataset.schema.attrs.map(i => references.indexOf(i))

      def as(anotherComparator: ReferenceToAttributeComparator) = {
        getReferencePositions shouldEqual anotherComparator.getReferencePositions
      }
    }

  }

  def assertDataLineage
  (
    expectedOperations: Seq[Operation],
    expectedDatasets: Seq[MetaDataset],
    expectedAttributes: Seq[Attribute],
    tested: DataLineage): Unit = {

    tested.operations shouldNot be(null)
    tested.operations.length shouldEqual expectedOperations.length

    for ((testedOperation: Operation, expectedOperation: Operation) <- tested.operations.zip(expectedOperations)) {
      testedOperation shouldEqualStripped expectedOperation
      testedOperation shouldReference tested.datasets as (expectedOperation references expectedDatasets)
    }

    for ((testedDataset: MetaDataset, expectedDataset: MetaDataset) <- tested.datasets.zip(expectedDatasets)) {
      testedDataset shouldReference tested.attributes as (expectedDataset references expectedAttributes)
    }

    for ((testedAttribute: Attribute, expectedAttribute: Attribute) <- tested.attributes.zip(expectedAttributes)) {
      testedAttribute.copy(id = null, dataTypeId = null) shouldEqual expectedAttribute.copy(id = null, dataTypeId = null)
    }
  }

  "When harvest method is called with an empty data frame" should "return a data lineage with one node." in {

    val expectedDatasets = Seq(
      MetaDataset(randomUUID, Schema(Seq.empty))
    )

    val expectedOperations = Seq(
      Generic(
        OperationProps(
          randomUUID,
          "LogicalRDD",
          Seq.empty,
          expectedDatasets(0).id
        ),
        "LogicalRDD"
      )
    )

    val sut = new DataLineageBuilderFactory(hadoopConfiguration)

    val result = sut.
      createBuilder(spark.emptyDataFrame.queryExecution.analyzed, None, spark.sparkContext).
      buildLineage()

    assertDataLineage(expectedOperations, expectedDatasets, Seq.empty, result)
  }

  "When harvest method is called with a simple non-empty data frame" should "return a data lineage with one node." in {
    val df = initialDataFrame

    val expectedAttributes = Seq(
      Attribute(randomUUID, "i", integerType.id),
      Attribute(randomUUID, "d", doubleType.id),
      Attribute(randomUUID, "s", stringType.id)
    )

    val expectedDatasets = Seq(
      MetaDataset(randomUUID, Schema(expectedAttributes.map(_.id)))
    )

    val expectedOperations = Seq(
      Generic(
        OperationProps(
          randomUUID,
          "LocalRelation",
          Seq.empty,
          expectedDatasets(0).id
        ),
        "LocalRelation"
      )
    )

    val sut = new DataLineageBuilderFactory(hadoopConfiguration)

    val result = sut.createBuilder(df.queryExecution.analyzed, None, spark.sparkContext).buildLineage()

    assertDataLineage(expectedOperations, expectedDatasets, expectedAttributes, result)
  }

  "When harvest method is called with a filtered data frame" should "return a data lineage forming a path with three nodes." in {
    val df = initialDataFrame
      .withColumnRenamed("i", "A")
      .filter($"A".notEqual(5))

    val expectedAttributes = Seq(
      Attribute(randomUUID, "i", integerType.id),
      Attribute(randomUUID, "d", doubleType.id),
      Attribute(randomUUID, "s", stringType.id),
      Attribute(randomUUID, "A", integerType.id)
    )

    val expectedDatasets = Seq(
      MetaDataset(randomUUID, Schema(Seq(expectedAttributes(3).id, expectedAttributes(1).id, expectedAttributes(2).id))),
      MetaDataset(randomUUID, Schema(Seq(expectedAttributes(3).id, expectedAttributes(1).id, expectedAttributes(2).id))),
      MetaDataset(randomUUID, Schema(Seq(expectedAttributes(0).id, expectedAttributes(1).id, expectedAttributes(2).id)))
    )

    val expectedOperations = Seq(
      Filter(
        OperationProps(
          randomUUID,
          "Filter",
          Seq(expectedDatasets(1).id),
          expectedDatasets(0).id),
        null),
      Projection(
        OperationProps(
          randomUUID,
          "Project",
          Seq(expectedDatasets(2).id),
          expectedDatasets(1).id),
        null),
      Generic(
        OperationProps(
          randomUUID,
          "LocalRelation",
          Seq.empty,
          expectedDatasets(2).id
        ),
        null
      )
    )

    val sut = new DataLineageBuilderFactory(hadoopConfiguration)

    val result = sut.createBuilder(df.queryExecution.analyzed, None, spark.sparkContext).buildLineage()

    assertDataLineage(expectedOperations, expectedDatasets, expectedAttributes, result)
  }

  "When harvest method is called with an union data frame" should "return a data lineage forming a diamond graph." in {
    val filteredDF = initialDataFrame.filter($"i".notEqual(5))
    val filteredDF2 = initialDataFrame.filter($"d".notEqual(5))
    val df = filteredDF.union(filteredDF2)

    val expectedAttributes =
      Seq(
        Attribute(randomUUID, "i", integerType.id),
        Attribute(randomUUID, "d", doubleType.id),
        Attribute(randomUUID, "s", stringType.id)
      )

    val attributeReferences = expectedAttributes.map(_.id)

    val expectedDatasets = Seq(
      MetaDataset(randomUUID, Schema(attributeReferences)),
      MetaDataset(randomUUID, Schema(attributeReferences)),
      MetaDataset(randomUUID, Schema(attributeReferences)),
      MetaDataset(randomUUID, Schema(attributeReferences))
    )

    val expectedOperations = Seq(
      Union(
        OperationProps(
          randomUUID,
          "Union",
          Seq(expectedDatasets(1).id, expectedDatasets(2).id),
          expectedDatasets(0).id
        )
      ),
      Filter(
        OperationProps(
          randomUUID,
          "Filter",
          Seq(expectedDatasets(3).id),
          expectedDatasets(1).id
        ),
        null
      ),
      Generic(
        OperationProps(
          randomUUID,
          "LocalRelation",
          Seq.empty,
          expectedDatasets(3).id
        ),
        null
      ),
      Filter(
        OperationProps(
          randomUUID,
          "Filter",
          Seq(expectedDatasets(3).id),
          expectedDatasets(2).id
        ),
        null
      )
    )

    val sut = new DataLineageBuilderFactory(hadoopConfiguration)

    val result = sut.createBuilder(df.queryExecution.analyzed, None, spark.sparkContext).buildLineage()

    assertDataLineage(expectedOperations, expectedDatasets, expectedAttributes, result)
  }

  "When harvest method is called with a joined data frame" should "return a data lineage forming a diamond graph." in {
    val filteredDF = initialDataFrame.filter($"i".notEqual(5))
    val aggregatedDF = initialDataFrame.withColumnRenamed("i", "A").groupBy($"A").agg(min("d").as("MIN"), max("s").as("MAX"))
    val df = filteredDF.join(aggregatedDF, filteredDF.col("i").eqNullSafe(aggregatedDF.col("A")), "inner")

    val expectedAttributes = Seq(
      Attribute(randomUUID, "i", integerType.id),
      Attribute(randomUUID, "d", doubleType.id),
      Attribute(randomUUID, "s", stringType.id),
      Attribute(randomUUID, "A", integerType.id),
      Attribute(randomUUID, "MIN", Simple("double", nullable = true).id),
      Attribute(randomUUID, "MAX", stringType.id)
    )

    val expectedDatasets = Seq(
      MetaDataset(randomUUID, Schema(expectedAttributes.map(_.id))),
      MetaDataset(randomUUID, Schema(Seq(expectedAttributes(0).id, expectedAttributes(1).id, expectedAttributes(2).id))),
      MetaDataset(randomUUID, Schema(Seq(expectedAttributes(3).id, expectedAttributes(4).id, expectedAttributes(5).id))),
      MetaDataset(randomUUID, Schema(Seq(expectedAttributes(3).id, expectedAttributes(1).id, expectedAttributes(2).id))),
      MetaDataset(randomUUID, Schema(Seq(expectedAttributes(0).id, expectedAttributes(1).id, expectedAttributes(2).id))))

    val expectedOperations = Seq(
      Join(
        OperationProps(
          randomUUID,
          "Join",
          Seq(expectedDatasets(1).id, expectedDatasets(2).id),
          expectedDatasets(0).id),
        None,
        "Inner"),
      Filter(
        OperationProps(
          randomUUID,
          "Filter",
          Seq(expectedDatasets(4).id),
          expectedDatasets(1).id),
        null),
      Generic(
        OperationProps(
          randomUUID,
          "LocalRelation",
          Seq.empty,
          expectedDatasets(4).id
        ),
        "LocalRelation"
      ),
      Aggregate(
        OperationProps(
          randomUUID,
          "Aggregate",
          Seq(expectedDatasets(3).id),
          expectedDatasets(2).id
        ),
        Nil,
        Map.empty
      ),
      Projection(
        OperationProps(
          randomUUID,
          "Project",
          Seq(expectedDatasets(4).id),
          expectedDatasets(3).id
        ),
        null
      )
    )

    val sut = new DataLineageBuilderFactory(hadoopConfiguration)

    val result = sut.createBuilder(df.queryExecution.analyzed, None, spark.sparkContext).buildLineage()

    assertDataLineage(expectedOperations, expectedDatasets, expectedAttributes, result)
  }
}
