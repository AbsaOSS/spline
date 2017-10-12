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

package za.co.absa.spline.persistence.mongo

import java.net.URI
import java.sql.Timestamp
import java.util.UUID.randomUUID

import org.scalatest.{AsyncFlatSpec, BeforeAndAfterEach, Matchers}
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.op.{Destination, Generic, OperationProps}
import za.co.absa.spline.model.{Attribute, Schema, _}

abstract class MongoDataLineagePersistenceSpecBase extends AsyncFlatSpec with Matchers with BeforeAndAfterEach {

  private val mongoConnection = MongoTestProperties.mongoConnection
  protected val mongoWriter = new MongoDataLineageWriter(mongoConnection)
  protected val mongoReader = new MongoDataLineageReader(mongoConnection)

  protected def createDataLineage(appId : String, appName: String, timestamp: Long = 123L, path : String = "hdfs://foo/bar/path") : DataLineage = {
    val attributes = Seq(
      Attribute(randomUUID(), "_1", Simple("StringType", nullable = true)),
      Attribute(randomUUID(), "_2", Simple("StringType", nullable = true)),
      Attribute(randomUUID(), "_3", Simple("StringType", nullable = true))
    )
    val aSchema = Schema(attributes.map(_.id))
    val bSchema = Schema(attributes.map(_.id).tail)

    val md1 = MetaDataset(randomUUID, aSchema)
    val md2 = MetaDataset(randomUUID, aSchema)
    val md3 = MetaDataset(randomUUID, bSchema)
    val md4 = MetaDataset(randomUUID, bSchema)

    DataLineage(
      randomUUID,
      appId,
      appName,
      timestamp,
      Seq(
        Destination(OperationProps(randomUUID, "Destination", Seq(md1.id), md1.id), "parquet", path),
        Generic(OperationProps(randomUUID, "Union", Seq(md1.id, md2.id), md3.id), "rawString1"),
        Generic(OperationProps(randomUUID, "Filter", Seq(md4.id), md2.id), "rawString2"),
        Generic(OperationProps(randomUUID, "LogicalRDD", Seq.empty, md4.id), "rawString3"),
        Generic(OperationProps(randomUUID, "Filter", Seq(md4.id), md1.id), "rawString4")
      ),
      Seq(md1, md2, md3, md4),
      attributes
    )
  }

  override protected def afterEach(): Unit = mongoConnection.dataLineageCollection.drop()
}