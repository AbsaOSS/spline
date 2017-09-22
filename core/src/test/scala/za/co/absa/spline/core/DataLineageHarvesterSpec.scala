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

package za.co.absa.spline.core

import java.util.UUID.randomUUID

import za.co.absa.spline.model._
import org.apache.spark.sql.functions._
import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.op._
import za.co.absa.spline.model.{Attribute, Schema}

import scala.language.implicitConversions

case class DataLineageHarvesterSpecTestRow(i: Int, d: Double, s: String)

class DataLineageHarvesterSpec extends FlatSpec with Matchers {

  import TestSparkContext._
  import za.co.absa.spline.common.OptionImplicits._
  import sparkSession.implicits._

  private val initialDataFrame = sparkSession.createDataset(Seq(DataLineageHarvesterSpecTestRow(1, 2.3, "text")))
  private val hadoopConfiguration = sparkSession.sparkContext.hadoopConfiguration

  "When harvest method is called with an empty data frame" should "return a data lineage with one node." in {
    /*assertDataLineage(
      Seq(Generic(NodeProps(
        randomUUID,
        "LogicalRDD",
        "",
        Seq.empty,
        None))),
      DataLineageHarvester.harvestLineage(sparkSession.emptyDataFrame.queryExecution, hadoopConfiguration))*/
  }

  /*"When harvest method is called with a simple non-empty data frame" should "return a data lineage with one node." in {
    val df = initialDataFrame
    val expectedGraph = Seq(Generic(NodeProps(
      randomUUID,
      "LocalRelation",
      "",
      Seq.empty,
      Schema(Seq(
        Attribute(1l, "i", Simple("integer", nullable = false)),
        Attribute(2l, "d", Simple("double", nullable = false)),
        Attribute(3l, "s", Simple("string", nullable = true)))))))

    val givenLineage = DataLineageHarvester.harvestLineage(df.queryExecution, hadoopConfiguration)

    assertDataLineage(expectedGraph, givenLineage)
  }

  "When harvest method is called with a filtered data frame" should "return a data lineage forming a path with three nodes." in {
    val df = initialDataFrame
      .withColumnRenamed("i", "A")
      .filter($"A".notEqual(5))
    val expectedGraph = Seq(
      Filter(
        NodeProps(
          randomUUID,
          "Filter",
          "",
          Seq(Schema(Seq(
            Attribute(1l, "A", Simple("integer", nullable = false)),
            Attribute(2l, "d", Simple("double", nullable = false)),
            Attribute(3l, "s", Simple("string", nullable = true))))),
          Schema(Seq(
            Attribute(1l, "A", Simple("integer", nullable = false)),
            Attribute(2l, "d", Simple("double", nullable = false)),
            Attribute(3l, "s", Simple("string", nullable = true)))),
          Seq.empty,
          Seq(1)),
        null),
      Projection(
        NodeProps(
          randomUUID,
          "Project",
          "",
          Seq(Schema(Seq(
            Attribute(1l, "i", Simple("integer", nullable = false)),
            Attribute(2l, "d", Simple("double", nullable = false)),
            Attribute(3l, "s", Simple("string", nullable = true))))),
          Schema(Seq(
            Attribute(1l, "A", Simple("integer", nullable = false)),
            Attribute(2l, "d", Simple("double", nullable = false)),
            Attribute(3l, "s", Simple("string", nullable = true)))),
          Seq(0),
          Seq(2)),
        null),
      Generic(NodeProps(
        randomUUID,
        "LocalRelation",
        "",
        Seq.empty,
        Schema(Seq(
          Attribute(1l, "i", Simple("integer", nullable = false)),
          Attribute(2l, "d", Simple("double", nullable = false)),
          Attribute(3l, "s", Simple("string", nullable = true)))),
        Seq(1),
        Seq.empty))
    )

    val givenLineage = DataLineageHarvester.harvestLineage(df.queryExecution, hadoopConfiguration)

    assertDataLineage(expectedGraph, givenLineage)
  }

  "When harvest method is called with an union data frame" should "return a data lineage forming a diamond graph." in {
    val filteredDF = initialDataFrame.filter($"i".notEqual(5))
    val filteredDF2 = initialDataFrame.filter($"d".notEqual(5))
    val df = filteredDF.union(filteredDF2)

    val attributes = Schema(Seq(
      Attribute(1l, "i", Simple("integer", nullable = false)),
      Attribute(2l, "d", Simple("double", nullable = false)),
      Attribute(3l, "s", Simple("string", nullable = true))))

    val expectedGraph = Seq(
      Generic(NodeProps(randomUUID, "Union", "", Seq(attributes, attributes), attributes, Seq.empty, Seq(1, 3))),
      Filter(NodeProps(randomUUID, "Filter", "", Seq(attributes), attributes, Seq(0), Seq(2)), null),
      Generic(NodeProps(randomUUID, "LocalRelation", "", Seq.empty, attributes, Seq(1, 3), Seq.empty)),
      Filter(NodeProps(randomUUID, "Filter", "", Seq(attributes), attributes, Seq(0), Seq(2)), null)
    )

    val givenLineage = DataLineageHarvester.harvestLineage(df.queryExecution, hadoopConfiguration)

    assertDataLineage(expectedGraph, givenLineage)
  }

  "When harvest method is called with a joined data frame" should "return a data lineage forming a diamond graph." in {
    val filteredDF = initialDataFrame.filter($"i".notEqual(5))
    val aggregatedDF = initialDataFrame.withColumnRenamed("i", "A").groupBy($"A").agg(min("d").as("MIN"), max("s").as("MAX"))
    val df = filteredDF.join(aggregatedDF, filteredDF.col("i").eqNullSafe(aggregatedDF.col("A")), "inner")

    val initialAttributes = Schema(Seq(
      Attribute(1l, "i", Simple("integer", nullable = false)),
      Attribute(2l, "d", Simple("double", nullable = false)),
      Attribute(3l, "s", Simple("string", nullable = true))))
    val projectedAttributes = Schema(Seq(
      Attribute(1l, "A", Simple("integer", nullable = false)),
      Attribute(2l, "d", Simple("double", nullable = false)),
      Attribute(3l, "s", Simple("string", nullable = true))))
    val aggregatedAttributes = Schema(Seq(
      Attribute(1l, "A", Simple("integer", nullable = false)),
      Attribute(2l, "MIN", Simple("double", nullable = true)),
      Attribute(3l, "MAX", Simple("string", nullable = true))))


    val expectedGraph = Seq(
      Join(
        NodeProps(
          randomUUID,
          "Join",
          "",
          Seq(initialAttributes, aggregatedAttributes),
          Schema(initialAttributes.attrs ++ aggregatedAttributes.attrs),
          Seq.empty,
          Seq(1, 3)),
        None,
        "Inner"),
      Filter(
        NodeProps(
          randomUUID,
          "Filter",
          "",
          Seq(initialAttributes),
          initialAttributes,
          Seq(0),
          Seq(2)),
        null),
      Generic(
        NodeProps(
          randomUUID,
          "LocalRelation",
          "",
          Seq.empty,
          initialAttributes,
          Seq(1, 4),
          Seq.empty)),
      Generic(NodeProps(
        randomUUID,
        "Aggregate",
        "",
        Seq(projectedAttributes),
        aggregatedAttributes,
        Seq(0),
        Seq(4))),
      Projection(
        NodeProps(
          randomUUID,
          "Project",
          "",
          Seq(initialAttributes),
          projectedAttributes,
          Seq(3),
          Seq(2)),
        null)
    )

    val givenLineage = DataLineageHarvester.harvestLineage(df.queryExecution, hadoopConfiguration)

    assertDataLineage(expectedGraph, givenLineage)
  }

  def assertDataLineage(expectedGraph: Seq[Operation], tested: DataLineage): Unit = {
    val expectedLineage = DataLineage(
      null,
      appName = appName,
      operations = null
    )

    tested.copy(operations = null, id = null) shouldEqual expectedLineage

    tested.operations shouldNot be(null)
    tested.operations.length shouldEqual expectedGraph.length

    for ((testedNode: Operation, expectedNode: Operation) <- tested.operations.zip(expectedGraph)) {
      testedNode shouldEqualStripped expectedNode
      testedNode shouldEqualAttributes expectedNode
    }
  }

  implicit class NodeAssertions(node: Operation) {

    def shouldEqualStripped(anotherNode: Operation): Unit = stripped(node) shouldEqual stripped(anotherNode)

    def shouldEqualAttributes(expectedNode: Operation): Unit = {
      assertAttributesEquality(expectedNode.mainProps.output, node.mainProps.output)
      node.mainProps.inputs.length shouldEqual node.mainProps.inputs.length
      node.mainProps.inputs.zip(expectedNode.mainProps.inputs).foreach({
        case (testedInputAttributes, expectedInputAttributes) => assertAttributesEquality(expectedInputAttributes, testedInputAttributes)
      })
    }

    private def assertAttributesEquality(expectedAttributesOpt: Option[Schema], testedAttributesOpt: Option[Schema]): Unit = {
      testedAttributesOpt.isDefined shouldEqual expectedAttributesOpt.isDefined
      for {
        testedAttributes <- testedAttributesOpt
        expectedAttributes <- expectedAttributesOpt
      } {
        testedAttributes.attrs.length shouldEqual expectedAttributes.attrs.length
        testedAttributes.attrs.zip(expectedAttributes.attrs).foreach({
          case (testedAttribute, expectedAttribute) => testedAttribute.copy(id = 0L) shouldEqual expectedAttribute.copy(id = 0L)
        })
      }
    }

    private def stripped(n: Operation): Operation = n match {
      case (jn: Join) => jn copy (mainProps = strippedProps(jn)) copy (condition = null)
      case (fn: Filter) => fn copy (mainProps = strippedProps(fn)) copy (condition = null)
      case (pn: Projection) => pn copy (mainProps = strippedProps(pn)) copy (transformations = null)
      case (gn: Generic) => gn copy (mainProps = strippedProps(gn))
      case (an: Alias) => an copy (mainProps = strippedProps(an))
      case (sn: Source) => sn copy (mainProps = strippedProps(sn))
      case (dn: Destination) => dn copy (mainProps = strippedProps(dn))
    }

    private def strippedProps(n: Operation): NodeProps = n.mainProps.copy(inputs = null, output = null, rawString = null)
  }*/

}
