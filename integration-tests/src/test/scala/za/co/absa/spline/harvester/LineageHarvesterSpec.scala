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

package za.co.absa.spline.harvester

import java.util.UUID
import java.util.UUID.randomUUID

import org.apache.spark.SPARK_VERSION
import org.apache.spark.sql.functions._
import org.scalatest.Inside._
import org.scalatest.{Assertion, FlatSpec, Matchers}
import za.co.absa.spline.common.ConditionalTestTags.ignoreIf
import za.co.absa.spline.common.TempDirectory
import za.co.absa.spline.common.Version.VersionOrdering.{max => _, min => _, _}
import za.co.absa.spline.common.Version._
import za.co.absa.spline.model.{Attribute, dt}
import za.co.absa.spline.producer.rest.model._
import za.co.absa.spline.test.fixture.spline.SplineFixture
import za.co.absa.spline.test.fixture.{SparkDatabaseFixture, SparkFixture}

class LineageHarvesterSpec extends FlatSpec
  with Matchers
  with SparkFixture
  with SplineFixture
  with SparkDatabaseFixture {

  import za.co.absa.spline.harvester.LineageHarvesterSpec._

  "When harvest method is called with an empty data frame" should "return a data lineage with one node." in
    withNewSparkSession(spark => {
      withLineageTracking(spark) { lineageCaptor =>
        import lineageCaptor._
        import spark.implicits._

        inside(lineageOf(spark.emptyDataset[TestRow].write.save(tmpDest))) {
          case (ExecutionPlan(_, Operations(Nil, _, Seq(op)), _, _, _), _) =>
            op.id should be(1)
            op.childIds should be(empty)
            op.schema should not be empty
            op.params should contain("name" -> "LocalRelation")
        }
      }
    })

  "When harvest method is called with a simple non-empty data frame" should "return a data lineage with one node." in
    withNewSparkSession(spark => {
      withLineageTracking(spark) { lineageCaptor =>
        import lineageCaptor._
        import spark.implicits._

        val df = spark.createDataset(Seq(TestRow(1, 2.3, "text")))

        val expectedAttributes = Seq(
          Attribute(randomUUID, "i", integerType.id),
          Attribute(randomUUID, "d", doubleType.id),
          Attribute(randomUUID, "s", stringType.id))

        val expectedOperations = Seq(
          WriteOperation(
            id = 0,
            childIds = Seq(1),
            outputSource = s"file:$tmpDest",
            append = false,
            schema = Some(expectedAttributes.map(_.id))
          ),
          DataOperation(
            id = 1,
            childIds = Nil,
            schema = Some(expectedAttributes.map(_.id)),
            params = Map("name" -> "LocalRelation")))

        val (plan, _) = lineageOf(df.write.save(tmpDest))

        assertDataLineage(expectedOperations, expectedAttributes, plan)
      }
    })

  "When harvest method is called with a filtered data frame" should "return a data lineage forming a path with three nodes." in
    withNewSparkSession(spark => {
      withLineageTracking(spark) { lineageCaptor =>
        import lineageCaptor._
        import spark.implicits._

        val df = spark.createDataset(Seq(TestRow(1, 2.3, "text")))
          .withColumnRenamed("i", "A")
          .filter($"A".notEqual(5))

        val expectedAttributes = Seq(
          Attribute(randomUUID, "A", integerType.id),
          Attribute(randomUUID, "d", doubleType.id),
          Attribute(randomUUID, "s", stringType.id),
          Attribute(randomUUID, "i", integerType.id))

        val expectedOperations = Seq(
          WriteOperation(
            id = 0,
            childIds = Seq(1),
            outputSource = s"file:$tmpDest",
            append = false,
            schema = Some(Seq(expectedAttributes(0).id, expectedAttributes(1).id, expectedAttributes(2).id))
          ),
          DataOperation(
            1, Seq(2), Some(Seq(expectedAttributes(0).id, expectedAttributes(1).id, expectedAttributes(2).id)),
            Map("name" -> "Filter")),
          DataOperation(
            2, Seq(3), Some(Seq(expectedAttributes(0).id, expectedAttributes(1).id, expectedAttributes(2).id)),
            Map("name" -> "Project")),
          DataOperation(
            3, Nil, Some(Seq(expectedAttributes(3).id, expectedAttributes(1).id, expectedAttributes(2).id)),
            Map("name" -> "LocalRelation")))

        val (plan, _) = lineageOf(df.write.save(tmpDest))

        assertDataLineage(expectedOperations, expectedAttributes, plan)
      }
    })

  "When harvest method is called with an union data frame" should "return a data lineage forming a diamond graph." in
    withNewSparkSession(spark => {
      withLineageTracking(spark) { lineageCaptor =>
        import lineageCaptor._
        import spark.implicits._

        val initialDF = spark.createDataset(Seq(TestRow(1, 2.3, "text")))
        val filteredDF1 = initialDF.filter($"i".notEqual(5))
        val filteredDF2 = initialDF.filter($"d".notEqual(5))
        val df = filteredDF1.union(filteredDF2)

        val expectedAttributes =
          Seq(
            Attribute(randomUUID, "i", integerType.id),
            Attribute(randomUUID, "d", doubleType.id),
            Attribute(randomUUID, "s", stringType.id)
          )

        val schema = expectedAttributes.map(_.id)

        val expectedOperations = Seq(
          WriteOperation(
            id = 0,
            childIds = Seq(1),
            outputSource = s"file:$tmpDest",
            append = false,
            schema = Some(schema)
          ),
          DataOperation(1, Seq(2, 4), Some(schema), Map("name" -> "Union")),
          DataOperation(2, Seq(3), Some(schema), Map("name" -> "Filter")),
          DataOperation(4, Seq(3), Some(schema), Map("name" -> "Filter")),
          DataOperation(3, Nil, Some(schema), Map("name" -> "LocalRelation")))

        val (plan, _) = lineageOf(df.write.save(tmpDest))

        assertDataLineage(expectedOperations, expectedAttributes, plan)
      }
    })

  "When harvest method is called with a joined data frame" should "return a data lineage forming a diamond graph." in
    withNewSparkSession(spark => {
      withLineageTracking(spark) { lineageCaptor =>
        import lineageCaptor._
        import spark.implicits._

        val initialDF = spark.createDataset(Seq(TestRow(1, 2.3, "text")))
        val filteredDF = initialDF
          .filter($"i" =!= 5)
        val aggregatedDF = initialDF
          .withColumnRenamed("i", "A")
          .groupBy($"A")
          .agg(
            min("d").as("MIN"),
            max("s").as("MAX"))

        val df = filteredDF.join(aggregatedDF, filteredDF.col("i").eqNullSafe(aggregatedDF.col("A")), "inner")

        val expectedAttributes = Seq(
          Attribute(randomUUID, "i", integerType.id),
          Attribute(randomUUID, "d", doubleType.id),
          Attribute(randomUUID, "s", stringType.id),
          Attribute(randomUUID, "A", integerType.id),
          Attribute(randomUUID, "MIN", doubleNullableType.id),
          Attribute(randomUUID, "MAX", stringType.id)
        )

        val expectedOperations = Seq(
          WriteOperation(
            id = 0,
            childIds = Seq(1),
            outputSource = s"file:$tmpDest",
            append = false,
            schema = Some(expectedAttributes.map(_.id))
          ),
          DataOperation(
            1, Seq(2, 4), Some(expectedAttributes.map(_.id)),
            Map(
              "name" -> "Join",
              "joinType" -> Some("INNER"))),
          DataOperation(
            2, Seq(3), Some(Seq(expectedAttributes(0).id, expectedAttributes(1).id, expectedAttributes(2).id)),
            Map("name" -> "Filter")),
          DataOperation(
            3, Nil, Some(Seq(expectedAttributes(0).id, expectedAttributes(1).id, expectedAttributes(2).id)),
            Map("name" -> "LocalRelation")),
          DataOperation(
            4, Seq(5), Some(Seq(expectedAttributes(3).id, expectedAttributes(4).id, expectedAttributes(5).id)),
            Map("name" -> "Aggregate")),
          DataOperation(
            5, Seq(3), Some(Seq(expectedAttributes(3).id, expectedAttributes(1).id, expectedAttributes(2).id)),
            Map("name" -> "Project")))

        val (plan, _) = lineageOf(df.write.save(tmpDest))

        assertDataLineage(expectedOperations, expectedAttributes, plan)
      }
    })

  "Create table as" should "produce lineage when creating a Hive table from temp view" taggedAs ignoreIf(ver"$SPARK_VERSION" < ver"2.3") in
    withRestartingSparkContext {
      withCustomSparkSession(_
        .enableHiveSupport()
        .config("hive.exec.dynamic.partition.mode", "nonstrict")) { spark =>

        val databaseName = s"unitTestDatabase_${this.getClass.getSimpleName}"
        withHiveDatabase(spark)(databaseName) {

          val (plan, _)= withLineageTracking(spark) { lineageCaptor => {

            import spark.implicits._

            val df = spark.createDataset(Seq(TestRow(1, 2.3, "text")))

            lineageCaptor.lineageOf {
              df.createOrReplaceTempView("tempView")
              spark.sql("create table users_sales as select * from tempView ")
            }
          }}

          val writeOperation = plan.operations.write
          writeOperation.id shouldEqual 0
          writeOperation.append shouldEqual false
          writeOperation.childIds shouldEqual Seq(1)
          writeOperation.params("destinationType") shouldEqual Some("hive")

          val otherOperations = plan.operations.other.sortBy(_.id)

          val firstOperation = otherOperations(0)
          firstOperation.id shouldEqual 1
          firstOperation.childIds shouldEqual Seq(2)
          firstOperation.params("name") shouldEqual "Project"

          val secondOperation = otherOperations(1)
          secondOperation.id shouldEqual 2
          secondOperation.childIds shouldEqual Seq(3)
          if (ver"$SPARK_VERSION" < ver"2.4")
            secondOperation.params("name") shouldEqual "SubqueryAlias"
          else
            secondOperation.params("name") shouldEqual Some("`tempview`")

          val thirdOperation = otherOperations(2)
          thirdOperation.id shouldEqual 3
          thirdOperation.childIds shouldEqual Nil
          thirdOperation.params("name") shouldEqual "LocalRelation"
        }
      }
    }
}

object LineageHarvesterSpec extends Matchers {

  case class TestRow(i: Int, d: Double, s: String)

  private def tmpDest: String = TempDirectory(pathOnly = true).deleteOnExit().path.toString

  private val integerType = dt.Simple("integer", nullable = false)
  private val doubleType = dt.Simple("double", nullable = false)
  private val doubleNullableType = dt.Simple("double", nullable = true)
  private val stringType = dt.Simple("string", nullable = true)
  private val testTypesById = Seq(
    integerType,
    doubleType,
    doubleNullableType,
    stringType)
    .map(t => t.id -> t).toMap

  implicit class ReferenceMatchers(schema: Seq[UUID]) {

    import ReferenceMatchers._

    def shouldReference(references: Seq[Attribute]) = new ReferenceMatcher[Attribute](schema, references)

    def references(references: Seq[Attribute]) = new ReferenceMatcher[Attribute](schema, references)
  }

  object ReferenceMatchers {

    import scala.language.reflectiveCalls

    type ID = UUID
    type Refs = Seq[ID]

    class ReferenceMatcher[A <: {def id : ID}](val refs: Refs, val attributes: Seq[A]) {
      private lazy val targets = attributes.map(_.id)

      private def referencePositions = refs.map(targets.indexOf)

      def as(anotherComparator: ReferenceMatcher[A]): Assertion = {
        referencePositions shouldEqual anotherComparator.referencePositions
      }
    }

  }

  def assertDataLineage(
    expectedOperations: Seq[OperationLike],
    expectedAttributes: Seq[Attribute],
    actualPlan: ExecutionPlan): Unit = {

    actualPlan.operations shouldNot be(null)

    val actualAttributes = actualPlan.extraInfo("attributes").asInstanceOf[Seq[Attribute]]
    val actualDataTypes = actualPlan.extraInfo("dataTypes").asInstanceOf[Seq[dt.DataType]].map(t => t.id -> t).toMap

    val actualOperationsSorted = actualPlan.operations.all.sortBy(_.id)
    val expectedOperationsSorted = expectedOperations.sortBy(_.id)

    for ((opActual, opExpected) <- actualOperationsSorted.zip(expectedOperationsSorted)) {
      opActual.id should be(opExpected.id)
      opActual.childIds should contain theSameElementsInOrderAs opExpected.childIds
      opActual.params should contain allElementsOf opExpected.params

      opActual.schema shouldBe defined
      val Some(actualSchema: Seq[UUID]) = opActual.schema
      val Some(expectedSchema: Seq[UUID]) = opExpected.schema
      actualSchema shouldReference actualAttributes as (expectedSchema references expectedAttributes)
    }

    for ((attrActual: Attribute, attrExpected: Attribute) <- actualAttributes.zip(expectedAttributes)) {
      attrActual.name shouldEqual attrExpected.name
      val typeActual = actualDataTypes(attrActual.dataTypeId)
      val typeExpected = testTypesById(attrExpected.dataTypeId)
      inside(typeActual) {
        case dt.Simple(_, typeName, nullable) =>
          typeName should be(typeExpected.name)
          nullable should be(typeExpected.nullable)
      }
    }
  }
}
