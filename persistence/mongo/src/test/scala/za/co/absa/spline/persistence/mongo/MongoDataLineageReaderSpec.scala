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

import org.scalatest.matchers.{MatchResult, Matcher}
import za.co.absa.spline.common.OptionImplicits._
import za.co.absa.spline.model._
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.op._
import za.co.absa.spline.persistence.api.CloseableIterable
import za.co.absa.spline.persistence.api.DataLineageReader.PageRequest
import za.co.absa.spline.persistence.api.DataLineageReader.PageRequest.EntireLatestContent

import scala.concurrent.Future

class MongoDataLineageReaderSpec extends MongoDataLineagePersistenceSpecBase {

  import CustomMatchers._

  describe("findDatasets()") {

    val testLineages = List(
      createDataLineage("appID0", "App Zero", path = "file://some/path/0.csv", timestamp = 100),
      createDataLineage("appID1", "App One", path = "file://some/path/1.csv", timestamp = 101),
      createDataLineage("appID2", "App Two", path = "file://some/path/2.csv", timestamp = 102),
      createDataLineage("appID3", "App Three", path = "file://some/path/3.csv", timestamp = 103),
      createDataLineage("appID4", "App Four", path = "file://some/path/4.csv", timestamp = 104),
      createDataLineage("appID5", "App Five", path = "file://some/path/5.csv", timestamp = 105),
      createDataLineage("appID6", "App Six", path = "file://some/path/6.csv", timestamp = 106),
      createDataLineage("appID7", "App Seven", path = "file://some/path/7.csv", timestamp = 107),
      createDataLineage("appID8", "App Eight", path = "file://some/path/8.csv", timestamp = 108),
      createDataLineage("appID9", "App Nine", path = "file://some/path/9.csv", timestamp = 109)
    )

    it("should load descriptions from a database.") {
      val expectedDescriptors = testLineages.reverse.map(l => PersistedDatasetDescriptor(
        datasetId = l.rootDataset.id,
        appId = l.appId,
        appName = l.appName,
        path = new URI(l.rootOperation.asInstanceOf[Write].path),
        timestamp = l.timestamp))

      val descriptionsFuture =
        Future.sequence(testLineages map mongoWriter.store).
          flatMap(_ => mongoReader.findDatasets(None, EntireLatestContent).
            map(_.iterator.toList))

      for (descriptors <- descriptionsFuture) yield descriptors shouldEqual expectedDescriptors
    }

    it("should support scrolling") {
      for {
        _ <- Future.sequence(testLineages.map(mongoWriter.store))
        page1 <- mongoReader.findDatasets(None, PageRequest(107, 0, 3))
        page2 <- mongoReader.findDatasets(None, PageRequest(107, 3, 3))
        page3 <- mongoReader.findDatasets(None, PageRequest(107, 6, 3))
      } yield {
        page1 should ConsistOfDescriptorsWithAppIds("appID7", "appID6", "appID5")
        page2 should ConsistOfDescriptorsWithAppIds("appID4", "appID3", "appID2")
        page3 should ConsistOfDescriptorsWithAppIds("appID1", "appID0")
      }
    }

    it("should support text search with scrolling") {
      for {
        _ <- Future.sequence(testLineages.map(mongoWriter.store))
        page <- mongoReader.findDatasets("n", PageRequest(107, 0, 3))
      } yield {
        page should ConsistOfDescriptorsWithAppIds("appID7", "appID1")
      }
    }

    it("should search in text fields case insensitively") {
      for {
        _ <- Future.sequence(testLineages.map(mongoWriter.store))
        page <- mongoReader.findDatasets("nInE", EntireLatestContent)
      } yield {
        page should ConsistOfDescriptorsWithAppIds("appID9")
      }
    }

    it("should search by ID fully matched") {
      for {
        _ <- Future.sequence(testLineages.map(mongoWriter.store))
        searchingLineage = testLineages.head
        searchingDatasetId = searchingLineage.rootDataset.id.toString
        foundSingleMatch <- mongoReader.findDatasets(searchingDatasetId, EntireLatestContent)
        noResultByPrefix <- mongoReader.findDatasets(searchingDatasetId take 10, EntireLatestContent)
        noResultBySuffix <- mongoReader.findDatasets(searchingDatasetId drop 10, EntireLatestContent)
      } yield {
        foundSingleMatch should ConsistOfDescriptorsWithAppIds(searchingLineage.appId)
        noResultByPrefix.iterator shouldBe empty
        noResultBySuffix.iterator shouldBe empty
      }
    }
  }

  describe("loadLatest()") {
    it("should load latest lineage record from a database for a give path") {
      val path = "hdfs://a/b/c"
      val testLineages = Seq(
        createDataLineage("appID1", "appName1", 1L, path),
        createDataLineage("appID2", "appName2", 2L),
        createDataLineage("appID3", "appName3", 30L, path),
        createDataLineage("appID4", "appName4", 4L),
        createDataLineage("appID5", "appName5", 5L, path)
      )

      val result = Future.sequence(testLineages.map(i => mongoWriter.store(i))).flatMap(_ => mongoReader.loadLatest(path))

      result.map(resultItem => resultItem shouldEqual Some(testLineages(2)))
    }

    it("should return None if no record exists in database in a given path") {
      val path = "hdfs://a/b/c"
      val testLineages = Seq(
        createDataLineage("appID1", "appName1", 1L),
        createDataLineage("appID2", "appName2", 2L),
        createDataLineage("appID3", "appName3", 3L)
      )

      val result = Future.sequence(testLineages.map(i => mongoWriter.store(i))).flatMap(_ => mongoReader.loadLatest(path))

      result.map(resultItem => resultItem shouldEqual None)
    }

  }

  describe("searchDataset()") {
    it("should find the correct lineage ID according a given criteria") {
      val path = "hdfs://a/b/c"
      val testLineages = Seq(
        createDataLineage("appID1", "appName1", 1L, path),
        createDataLineage("appID1", "appName1", 2L),
        createDataLineage("appID2", "appName2", 30L, path),
        createDataLineage("appID2", "appName2", 4L),
        createDataLineage("appID3", "appName2", 5L, path)
      )

      val result = Future.sequence(testLineages.map(i => mongoWriter.store(i))).flatMap(_ => mongoReader.searchDataset(path, "appID2"))

      result.map(resultItem => resultItem shouldEqual Some(testLineages(2).rootDataset.id))
    }

    it("should return None if there is no record for a given criteria") {
      val path = "hdfs://a/b/c"
      val testLineages = Seq(
        createDataLineage("appID1", "appName1", 1L, path),
        createDataLineage("appID1", "appName1", 2L),
        createDataLineage("appID2", "appName2", 30L),
        createDataLineage("appID2", "appName2", 4L),
        createDataLineage("appID3", "appName2", 5L, path)
      )

      val result = Future.sequence(testLineages.map(i => mongoWriter.store(i))).flatMap(_ => mongoReader.searchDataset(path, "appID2"))

      result.map(resultItem => resultItem shouldEqual None)
    }

  }


  describe("loadCompositeByOutput") {
    it("should load correct composite operation with dependencies") {
      val testLineages = Seq(
        createDataLineage("appID1", "appName1", 1L),
        createDataLineage("appID2", "appName2", 2L),
        createDataLineage("appID3", "appName3", 3L),
        createDataLineage("appID4", "appName4", 4L),
        createDataLineage("appID5", "appName5", 5L)
      )

      val datasetId = testLineages(2).rootDataset.id

      val result = Future.sequence(testLineages.map(i => mongoWriter.store(i))).flatMap(_ => mongoReader.loadCompositeByOutput(datasetId))

      result.map {
        case Some(CompositeWithDependencies(composite, _, _)) =>
          composite.mainProps.id shouldEqual datasetId
          composite.mainProps.output shouldEqual datasetId
        case None => fail("There should be an record.")
      }
    }

  }

  describe("loadCompositesByInput()") {
    it("should load correct composite operation with dependencies") {
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

      val datasetId = sources.head.datasetId.get
      val lineageId = testLineages(1).id

      val result = Future.sequence(testLineages.map(i => mongoWriter.store(i)))
        .flatMap(_ => mongoReader.loadCompositesByInput(datasetId))
        .map(_.iterator.toSeq)

      result.map(res => {
        res.length shouldEqual 1
        res.head match {
          case (CompositeWithDependencies(composite, _, _)) =>
            composite.mainProps.id shouldEqual DataLineageId.toDatasetId(lineageId)
        }
      })
    }
  }

  protected def createDataLineageWithSources(appId: String, appName: String, sources: Seq[MetaDataSource]): DataLineage = {
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

  object CustomMatchers {

    class MatcherAdapter[T](matchingFn: T => MatchResult) extends Matcher[T] {
      override def apply(left: T): MatchResult = matchingFn(left)
    }

    object ConsistOfDescriptorsWithAppIds {
      def apply(appIds: String*) = new MatcherAdapter[CloseableIterable[PersistedDatasetDescriptor]](
        actualDescriptors => {
          val actualAppIds = actualDescriptors.iterator.map(_.appId).toList
          val expectedAppIds = appIds.toList
          MatchResult(
            actualAppIds == expectedAppIds,
            s"Returned list of lineage descriptors did not match expected values:" +
              s"\n\tActual  : $actualAppIds" +
              s"\n\tExpected: $expectedAppIds",
            "")
        })
    }

  }

}
