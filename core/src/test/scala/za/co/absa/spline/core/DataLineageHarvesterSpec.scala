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

import za.co.absa.spline.model._
import org.apache.spark.sql.functions._
import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.model.{Attribute, Attributes}

import scala.language.implicitConversions

case class DataLineageHarvesterSpecTestRow(i: Int, d: Double, s: String)

class DataLineageHarvesterSpec extends FlatSpec with Matchers {

  import TestSparkContext._
  import za.co.absa.spline.common.OptionImplicits._
  import sparkSession.implicits._

  private val initialDataFrame = sparkSession.createDataset(Seq(DataLineageHarvesterSpecTestRow(1, 2.3, "text")))

  "When harvest method is called with an empty data frame" should "return a data lineage with one node." in {
    assertDataLineage(
      Seq(GenericNode(NodeProps("LogicalRDD", "", Seq.empty[Attributes], Attributes(Seq.empty[Attribute]), Seq.empty[Int], Seq.empty[Int]))),
      DataLineageHarvester.harvestLineage(sparkSession.emptyDataFrame.queryExecution))
  }

  "When harvest method is called with a simple non-empty data frame" should "return a data lineage with one node." in {
    val df = initialDataFrame
    val expectedGraph = Seq(GenericNode(NodeProps("LocalRelation", "", Seq.empty[Attributes], Attributes(Seq(Attribute(1l, "i", SimpleType("integer", false)), Attribute(2l, "d", SimpleType("double", false)), Attribute(3l, "s", SimpleType("string", true)))), Seq.empty[Int], Seq.empty[Int])))

    val givenLineage = DataLineageHarvester.harvestLineage(df.queryExecution)

    assertDataLineage(expectedGraph, givenLineage)
  }

  "When harvest method is called with a filtered data frame" should "return a data lineage forming a path with three nodes." in {
    val df = initialDataFrame
      .withColumnRenamed("i", "A")
      .filter($"A".notEqual(5))
    val expectedGraph = Seq(
      FilterNode(NodeProps("Filter", "", Seq(Attributes(Seq(Attribute(1l, "A", SimpleType("integer", false)), Attribute(2l, "d", SimpleType("double", false)), Attribute(3l, "s", SimpleType("string", true))))), Attributes(Seq(Attribute(1l, "A", SimpleType("integer", false)), Attribute(2l, "d", SimpleType("double", false)), Attribute(3l, "s", SimpleType("string", true)))), Seq.empty[Int], Seq(1)), null),
      ProjectionNode(NodeProps("Project", "", Seq(Attributes(Seq(Attribute(1l, "i", SimpleType("integer", false)), Attribute(2l, "d", SimpleType("double", false)), Attribute(3l, "s", SimpleType("string", true))))), Attributes(Seq(Attribute(1l, "A", SimpleType("integer", false)), Attribute(2l, "d", SimpleType("double", false)), Attribute(3l, "s", SimpleType("string", true)))), Seq(0), Seq(2)), null),
      GenericNode(NodeProps("LocalRelation", "", Seq.empty[Attributes], Attributes(Seq(Attribute(1l, "i", SimpleType("integer", false)), Attribute(2l, "d", SimpleType("double", false)), Attribute(3l, "s", SimpleType("string", true)))), Seq(1), Seq.empty[Int]))
    )

    val givenLineage = DataLineageHarvester.harvestLineage(df.queryExecution)

    assertDataLineage(expectedGraph, givenLineage)
  }

  "When harvest method is called with an union data frame" should "return a data lineage forming a diamond graph." in {
    val filteredDF = initialDataFrame.filter($"i".notEqual(5))
    val filteredDF2 = initialDataFrame.filter($"d".notEqual(5))
    val df = filteredDF.union(filteredDF2)

    val attributes = Attributes(Seq(Attribute(1l, "i", SimpleType("integer", false)), Attribute(2l, "d", SimpleType("double", false)), Attribute(3l, "s", SimpleType("string", true))))

    val expectedGraph = Seq(
      GenericNode(NodeProps("Union", "", Seq(attributes, attributes), attributes, Seq.empty[Int], Seq(1, 3))),
      FilterNode(NodeProps("Filter", "", Seq(attributes), attributes, Seq(0), Seq(2)), null),
      GenericNode(NodeProps("LocalRelation", "", Seq.empty[Attributes], attributes, Seq(1, 3), Seq.empty[Int])),
      FilterNode(NodeProps("Filter", "", Seq(attributes), attributes, Seq(0), Seq(2)), null)
    )

    val givenLineage = DataLineageHarvester.harvestLineage(df.queryExecution)

    assertDataLineage(expectedGraph, givenLineage)
  }

  "When harvest method is called with a joined data frame" should "return a data lineage forming a diamond graph." in {
    val filteredDF = initialDataFrame.filter($"i".notEqual(5))
    val aggregatedDF = initialDataFrame.withColumnRenamed("i", "A").groupBy($"A").agg(min("d").as("MIN"), max("s").as("MAX"))
    val df = filteredDF.join(aggregatedDF, filteredDF.col("i").eqNullSafe(aggregatedDF.col("A")), "inner")

    val initialAttributes = Attributes(Seq(Attribute(1l, "i", SimpleType("integer", false)), Attribute(2l, "d", SimpleType("double", false)), Attribute(3l, "s", SimpleType("string", true))))
    val projectedAttributes = Attributes(Seq(Attribute(1l, "A", SimpleType("integer", false)), Attribute(2l, "d", SimpleType("double", false)), Attribute(3l, "s", SimpleType("string", true))))
    val aggregatedAttributes = Attributes(Seq(Attribute(1l, "A", SimpleType("integer", false)), Attribute(2l, "MIN", SimpleType("double", true)), Attribute(3l, "MAX", SimpleType("string", true))))


    val expectedGraph = Seq(
      JoinNode(NodeProps("Join", "", Seq(initialAttributes, aggregatedAttributes), Attributes(initialAttributes.seq ++ aggregatedAttributes.seq), Seq.empty[Int], Seq(1, 3)), None, "Inner"),
      FilterNode(NodeProps("Filter", "", Seq(initialAttributes), initialAttributes, Seq(0), Seq(2)), null),
      GenericNode(NodeProps("LocalRelation", "", Seq.empty[Attributes], initialAttributes, Seq(1, 4), Seq.empty[Int])),
      GenericNode(NodeProps("Aggregate", "", Seq(projectedAttributes), aggregatedAttributes, Seq(0), Seq(4))),
      ProjectionNode(NodeProps("Project", "", Seq(initialAttributes), projectedAttributes, Seq(3), Seq(2)), null)
    )

    val givenLineage = DataLineageHarvester.harvestLineage(df.queryExecution)

    assertDataLineage(expectedGraph, givenLineage)
  }

  def assertDataLineage(expectedGraph: Seq[OperationNode], tested: DataLineage): Unit = {
    val expectedLineage = DataLineage(
      null,
      appName = appName,
      nodes = null
    )

    tested.copy(nodes = null, id = null) shouldEqual expectedLineage

    tested.nodes shouldNot be(null)
    tested.nodes.length shouldEqual expectedGraph.length

    for ((testedNode: OperationNode, expectedNode: OperationNode) <- tested.nodes.zip(expectedGraph)) {
      testedNode shouldEqualStripped expectedNode
      testedNode shouldEqualAttributes expectedNode
    }
  }

  implicit class NodeAssertions(node: OperationNode) {

    def shouldEqualStripped(anotherNode: OperationNode): Unit = stripped(node) shouldEqual stripped(anotherNode)

    def shouldEqualAttributes(expectedNode: OperationNode): Unit = {
      assertAttributesEquality(expectedNode.mainProps.output, node.mainProps.output)
      node.mainProps.inputs.length shouldEqual node.mainProps.inputs.length
      node.mainProps.inputs.zip(expectedNode.mainProps.inputs).foreach({
        case (testedInputAttributes, expectedInputAttributes) => assertAttributesEquality(expectedInputAttributes, testedInputAttributes)
      })
    }

    private def assertAttributesEquality(expectedAttributesOpt: Option[Attributes], testedAttributesOpt: Option[Attributes]): Unit = {
      testedAttributesOpt.isDefined shouldEqual expectedAttributesOpt.isDefined
      for {
        testedAttributes <- testedAttributesOpt
        expectedAttributes <- expectedAttributesOpt
      } {
        testedAttributes.seq.length shouldEqual expectedAttributes.seq.length
        testedAttributes.seq.zip(expectedAttributes.seq).foreach({
          case (testedAttribute, expectedAttribute) => testedAttribute.copy(id = 0L) shouldEqual expectedAttribute.copy(id = 0L)
        })
      }
    }

    private def stripped(n: OperationNode): OperationNode = n match {
      case (jn: JoinNode) => jn copy (mainProps = strippedProps(jn)) copy (condition = null)
      case (fn: FilterNode) => fn copy (mainProps = strippedProps(fn)) copy (condition = null)
      case (pn: ProjectionNode) => pn copy (mainProps = strippedProps(pn)) copy (transformations = null)
      case (gn: GenericNode) => gn copy (mainProps = strippedProps(gn))
      case (an: AliasNode) => an copy (mainProps = strippedProps(an))
      case (sn: SourceNode) => sn copy (mainProps = strippedProps(sn))
      case (dn: DestinationNode) => dn copy (mainProps = strippedProps(dn))
    }

    private def strippedProps(n: OperationNode): NodeProps = n.mainProps.copy(inputs = null, output = null, rawString = null)
  }

}
