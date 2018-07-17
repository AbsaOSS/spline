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
import java.util.UUID.randomUUID

import org.apache.atlas.typesystem.json.InstanceSerialization
import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.model._
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.op.{Generic, OperationProps, Write}
import za.co.absa.spline.persistence.atlas.conversion.DataLineageToTypeSystemConverter

class DataLineageToTypeSystemMapperSpec extends FlatSpec with Matchers{
  "A simple lineage graph with several nodes" should "be serializable to JSON via Atlas API" in {
    // Arrange
    val lineage = createDataLineage("app1", "app1")
    // Act
    val entities = DataLineageToTypeSystemConverter.convert(lineage)
    val jsonObjects = entities.map(i => InstanceSerialization.toJson(i, withBigDecimals = true))

    // Assert
    entities.length shouldEqual jsonObjects.length
    jsonObjects.length shouldEqual jsonObjects.count(o => o != null && o.length > 0)
  }

  protected def createDataLineage(
                                   appId: String,
                                   appName: String,
                                   timestamp: Long = 123L,
                                   datasetId: UUID = randomUUID,
                                   path: String = "hdfs://foo/bar/path",
                                   append: Boolean = false)
  : DataLineage = {
    val stringType = Simple("StringType", nullable = true)
    val attributes = Seq(
      Attribute(randomUUID(), "_1", stringType.id),
      Attribute(randomUUID(), "_2", stringType.id),
      Attribute(randomUUID(), "_3", stringType.id)
    )
    val aSchema = Schema(attributes.map(_.id))
    val bSchema = Schema(attributes.map(_.id).tail)

    val md1 = MetaDataset(datasetId, aSchema)
    val md2 = MetaDataset(randomUUID, aSchema)
    val md3 = MetaDataset(randomUUID, bSchema)
    val md4 = MetaDataset(randomUUID, bSchema)

    DataLineage(
      appId,
      appName,
      timestamp,
      Seq(
        Write(OperationProps(randomUUID, "Write", Seq(md1.id), md1.id), "parquet", path, append),
        Generic(OperationProps(randomUUID, "Union", Seq(md1.id, md2.id), md3.id), "rawString1"),
        Generic(OperationProps(randomUUID, "Filter", Seq(md4.id), md2.id), "rawString2"),
        Generic(OperationProps(randomUUID, "LogicalRDD", Seq.empty, md4.id), "rawString3"),
        Generic(OperationProps(randomUUID, "Filter", Seq(md4.id), md1.id), "rawString4")
      ),
      Seq(md1, md2, md3, md4),
      attributes,
      Seq(stringType)
    )
  }

}
