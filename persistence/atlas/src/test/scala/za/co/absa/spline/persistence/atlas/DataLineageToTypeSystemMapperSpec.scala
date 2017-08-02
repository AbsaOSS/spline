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

package za.co.absa.spline.persistence.atlas

import java.util.UUID

import org.apache.atlas.typesystem.json.InstanceSerialization
import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.model._
import za.co.absa.spline.common.OptionImplicits._
import za.co.absa.spline.persistence.atlas.conversion.DataLineageToTypeSystemConverter

class DataLineageToTypeSystemMapperSpec extends FlatSpec with Matchers{
  "A simple lineage graph with several nodes" should "be serializable to JSON via Atlas API" in {
    // Arrange
    val attributes = Attributes(Seq(Attribute(1L, "_1", SimpleType("StringType", true)), Attribute(2L, "_2", SimpleType("StringType", true)), Attribute(3L, "_3", SimpleType("StringType", true))))
    val lineage = DataLineage(
      UUID.randomUUID(),
      "TestApp",
      Seq(
        GenericNode(NodeProps("Union", "desc1", Seq(attributes, attributes), attributes, Seq.empty[Int], Seq(1, 3))),
        GenericNode(NodeProps("Filter", "desc2", Seq(attributes), attributes, Seq(0), Seq(2))),
        GenericNode(NodeProps("LogicalRDD", "desc3", Seq.empty[Attributes], attributes, Seq(1, 3), Seq.empty[Int])),
        GenericNode(NodeProps("Filter", "desc4", Seq(attributes), attributes, Seq(0), Seq(2)))
      )
    )

    // Act
    val entities = DataLineageToTypeSystemConverter.convert(lineage)
    val jsonObjects = entities.map(i => InstanceSerialization.toJson(i, true))

    // Assert
    entities.length shouldEqual jsonObjects.length
    jsonObjects.length shouldEqual jsonObjects.filter(i => i != null && i.length > 0).length
  }

}
