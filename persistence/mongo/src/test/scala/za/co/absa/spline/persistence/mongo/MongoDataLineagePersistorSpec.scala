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

import java.util.UUID.randomUUID

import com.mongodb.casbah.Imports.MongoClientURI
import com.mongodb.casbah.MongoClient
import org.scalatest.{AsyncFlatSpec, BeforeAndAfterEach, Matchers}
import za.co.absa.spline.common.OptionImplicits._
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.op.{Generic, NodeProps}
import za.co.absa.spline.model.{Attribute, Schema, _}

import scala.concurrent.Future

class MongoDataLineagePersistorSpec extends AsyncFlatSpec with Matchers with BeforeAndAfterEach {

  private val mongoPersistor = new MongoDataLineagePersistor(
    MongoTestProperties.mongoDBUri,
    MongoTestProperties.mongoDBName
  )

  override protected def afterEach(): Unit = {
    val client = MongoClient(MongoClientURI(MongoTestProperties.mongoDBUri))
    val db = client.getDB(MongoTestProperties.mongoDBName)
    val lineageCollection = db.getCollection(mongoPersistor.dataLineageCollectionName)
    lineageCollection.drop()
  }

  "Store method" should "store data lineage to a database." in {
    ???
    /*val aSchema = Schema(Seq(
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

    val storedLineage = mongoPersistor.store(lineage).flatMap(_ => mongoPersistor.load(lineage.id))

    storedLineage map (i => i shouldEqual Option(lineage))*/
  }

  "List method" should "load descriptions from a database." in {
   /* val testData = Seq(
      DataLineage(randomUUID, "TestApp1", Seq.empty, ???),
      DataLineage(randomUUID, "TestApp2", Seq.empty, ???),
      DataLineage(randomUUID, "TestApp3", Seq.empty, ???)
    )
    val expectedDescriptions = testData.map(i => DataLineageDescriptor(i.id, i.appName))
    val descriptions = Future.sequence(testData.map(i => mongoPersistor.store(i))).flatMap(_ => mongoPersistor.list().map(_.toSeq))

    descriptions.map(i => i should contain allElementsOf expectedDescriptions)*/
    ???
  }
}