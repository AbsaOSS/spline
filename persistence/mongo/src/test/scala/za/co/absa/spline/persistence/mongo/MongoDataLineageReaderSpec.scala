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

import za.co.absa.spline.model.PersistedDatasetDescriptor
import za.co.absa.spline.model.op.Destination

import scala.concurrent.Future

class MongoDataLineageReaderSpec extends MongoDataLineagePersistenceSpecBase{
  "List method" should "load descriptions from a database." in {
    val testLineages = Seq(
      createDataLineage("appID1", "appName1"),
      createDataLineage("appID2", "appName2"),
      createDataLineage("appID3", "appName3")
    )
    val expectedDescriptors = testLineages.map(l => PersistedDatasetDescriptor(
      datasetId = l.rootDataset.id,
      appId = l.appId,
      appName = l.appName,
      lineageId = l.id,
      path = new URI(l.rootNode.asInstanceOf[Destination].path),
      timestamp = l.timestamp))

    val descriptions = Future.sequence(testLineages.map(i => mongoWriter.store(i))).flatMap(_ => mongoReader.list().map(_.toSeq))

    descriptions.map(i => i should contain allElementsOf expectedDescriptors)
  }

  "LoadLatest method" should "load latest lineage record from a database for a give path" in {
    val path = "hdfs://a/b/c"
    val testLineages = Seq(
      createDataLineage("appID1", "appName1", 1L, path),
      createDataLineage("appID2", "appName2", 2L),
      createDataLineage("appID3", "appName3", 30L, path),
      createDataLineage("appID4", "appName4", 4L),
      createDataLineage("appID5", "appName5", 5L, path)
    )

    val result = Future.sequence(testLineages.map(i => mongoWriter.store(i))).flatMap(_ => mongoReader.loadLatest(path))

    result.map(i => i shouldEqual Some(testLineages(2)))
  }

  "LoadLatest method" should "return None if no record exists in database in a given path" in {
    val path = "hdfs://a/b/c"
    val testLineages = Seq(
      createDataLineage("appID1", "appName1", 1L),
      createDataLineage("appID2", "appName2", 2L),
      createDataLineage("appID3", "appName3", 3L)
    )

    val result = Future.sequence(testLineages.map(i => mongoWriter.store(i))).flatMap(_ => mongoReader.loadLatest(path))

    result.map(i => i shouldEqual None)
  }
}
