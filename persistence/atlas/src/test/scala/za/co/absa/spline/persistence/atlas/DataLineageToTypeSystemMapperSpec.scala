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

import java.util.UUID.randomUUID

import org.apache.atlas.typesystem.json.InstanceSerialization
import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.common.OptionImplicits._
import za.co.absa.spline.model._
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.persistence.atlas.conversion.DataLineageToTypeSystemConverter

class DataLineageToTypeSystemMapperSpec extends FlatSpec with Matchers{
/*
  "A simple lineage graph with several nodes" should "be serializable to JSON via Atlas API" in {
    // Arrange
    val aSchema = Schema(Seq(
      Attribute(1L, "_1", Simple("StringType", nullable = true)),
      Attribute(2L, "_2", Simple("StringType", nullable = true)),
      Attribute(3L, "_3", Simple("StringType", nullable = true))))

    val md1 = MetaDataset(randomUUID, aSchema)
    val md2 = MetaDataset(randomUUID, aSchema)
    val md3 = MetaDataset(randomUUID, aSchema)
    val md4 = MetaDataset(randomUUID, aSchema)

    val lineage = DataLineage(
      randomUUID,
      "TestApp",
      Seq(
        Generic(NodeProps(randomUUID, "Union", "desc1", Seq(md1.id, md2.id), md3.id)),
        Generic(NodeProps(randomUUID, "Filter", "desc2", Seq(md4.id), md2.id)),
        Generic(NodeProps(randomUUID, "LogicalRDD", "desc3", Seq.empty, md4.id)),
        Generic(NodeProps(randomUUID, "Filter", "desc4", Seq(md4.id), md1.id))),
      Seq(md1, md2, md3, md4)
    )

    // Act
    val entities = DataLineageToTypeSystemConverter.convert(lineage)
    val jsonObjects = entities.map(i => InstanceSerialization.toJson(i, withBigDecimals = true))

    // Assert
    entities.length shouldEqual jsonObjects.length
    jsonObjects.length shouldEqual jsonObjects.count(o => o != null && o.length > 0)
  }
*/

}
