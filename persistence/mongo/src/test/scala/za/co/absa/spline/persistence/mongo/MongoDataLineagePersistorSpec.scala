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

import java.util.UUID

import com.mongodb.casbah.Imports.MongoClientURI
import com.mongodb.casbah.MongoClient
import org.scalatest.{AsyncFlatSpec, BeforeAndAfterEach, Matchers}
import za.co.absa.spline.model._
import za.co.absa.spline.common.OptionImplicits._
import za.co.absa.spline.model.{Attribute, Attributes}

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

    val storedLineage = mongoPersistor.store(lineage).flatMap(_ => mongoPersistor.load(lineage.id))

    storedLineage map(i => i shouldEqual Option(lineage))
  }

  "Exits method" should "return an appropriate document id." in {
    val expectedId = UUID.randomUUID()
    val attributes = Attributes(Seq(Attribute(1L, "_1", SimpleType("StringType", true)), Attribute(2L, "_2", SimpleType("StringType", true)), Attribute(3L, "_3", SimpleType("StringType", true))))
    val graph = Seq(
      GenericNode(mainProps = NodeProps("Union", "desc1", Seq(attributes, attributes), attributes, Seq.empty[Int], Seq(1, 3))),
      GenericNode(mainProps = NodeProps("Filter", "desc2", Seq(attributes), attributes, Seq(0), Seq(2))),
      GenericNode(mainProps = NodeProps("LogicalRDD", "desc3", Seq.empty[Attributes], attributes, Seq(1, 3), Seq.empty[Int])),
      GenericNode(mainProps = NodeProps("Filter", "desc4", Seq(attributes), attributes, Seq(0), Seq(2)))
    )
    val dataLineage = DataLineage(expectedId, "TestApp1", graph)

    val returnedId = mongoPersistor.store(dataLineage).flatMap(_ => mongoPersistor.exists(dataLineage))

    returnedId map (i => i shouldEqual Option(expectedId))
  }

  "List method" should "load descriptions from a database." in {
    val testData = Seq(
      DataLineage(UUID.randomUUID(), "TestApp1", Seq.empty),
      DataLineage(UUID.randomUUID(), "TestApp2", Seq.empty),
      DataLineage(UUID.randomUUID(), "TestApp3", Seq.empty)
    )
    val expectedDescriptions = testData.map(i => DataLineageDescriptor(i.id, i.appName))
    val descriptions = Future.sequence(testData.map(i => mongoPersistor.store(i))).flatMap(_=> mongoPersistor.list().map(_.toSeq))

    descriptions.map(i => i should contain allElementsOf  expectedDescriptions)
  }
}