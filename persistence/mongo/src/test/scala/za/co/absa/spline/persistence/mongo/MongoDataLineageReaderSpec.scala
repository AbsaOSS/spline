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
import java.util.UUID.randomUUID

import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model._
import za.co.absa.spline.model.op._

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
      path = new URI(l.rootOperation.asInstanceOf[Write].path),
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

  "LoadCompositeByOutput method" should "load correct composite operation with dependencies" in {
    val testLineages = Seq(
      createDataLineage("appID1", "appName1", 1L),
      createDataLineage("appID2", "appName2", 2L),
      createDataLineage("appID3", "appName3", 3L),
      createDataLineage("appID4", "appName4", 4L),
      createDataLineage("appID5", "appName5", 5L)
    )

    val datasetId = testLineages(2).rootDataset.id
    val lineageId = testLineages(2).id

    val result = Future.sequence(testLineages.map(i => mongoWriter.store(i))).flatMap(_ => mongoReader.loadCompositeByOutput(datasetId))

    result.map{
      case Some(CompositeWithDependencies(composite, _, _)) => {
        composite.lineageId shouldEqual lineageId
        composite.mainProps.id shouldEqual lineageId
      }
      case None => fail("There should be an record.")
    }
  }

  protected def createDataLineageWithSources(appId : String, appName: String, sources: Seq[MetaDataSource]) : DataLineage = {
    val timestamp: Long = 123L
    val outputPath: String = "hdfs://foo/bar/path"

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
        Write(OperationProps(randomUUID, "Write", Seq(md1.id), md1.id), "parquet", outputPath),
        Generic(OperationProps(randomUUID, "Union", Seq(md1.id, md2.id), md3.id), "rawString1"),
        Generic(OperationProps(randomUUID, "Filter", Seq(md4.id), md2.id), "rawString2"),
        Read(OperationProps(randomUUID, "Read", sources.flatMap(_.datasetId), md4.id), "rawString3", sources),
        Generic(OperationProps(randomUUID, "Filter", Seq(md4.id), md1.id), "rawString4")
      ),
      Seq(md1, md2, md3, md4),
      attributes
    )
  }

  "LoadCompositesByInputs method" should "load correct composite operation with dependencies" in {
    val sources = Seq(
      MetaDataSource("path1", Some(randomUUID)),
      MetaDataSource("path2", Some(randomUUID)),
      MetaDataSource("path3", Some(randomUUID))
    )

    val testLineages = Seq(
      createDataLineageWithSources("appID1", "appName1", sources.tail),
      createDataLineageWithSources("appID2", "appName2", sources),
      createDataLineageWithSources("appID3", "appName3", Seq.empty),
      createDataLineageWithSources("appID4", "appName4", sources.tail)
    )

    val datasetId = sources(0).datasetId.get
    val lineageId = testLineages(1).id

    val result = Future.sequence(testLineages.map(i => mongoWriter.store(i)))
      .flatMap(_ => mongoReader.loadCompositesByInput(datasetId))
      .map(_.toSeq)

    result.map(res => {
      res.length shouldEqual 1
      res.head match {
        case (CompositeWithDependencies(composite, _, _)) => {
          composite.lineageId shouldEqual lineageId
          composite.mainProps.id shouldEqual lineageId
        }
      }
    })
  }
}
