/*
 * Copyright 2017 ABSA Group Limited
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
import java.util.UUID
import java.util.UUID.randomUUID

import com.mongodb.casbah.commons.Imports.DBObject
import org.scalatest.Matchers
import za.co.absa.spline.common.OptionImplicits.anyToOption
import za.co.absa.spline.model._
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.op._
import za.co.absa.spline.persistence.api.DataLineageReader.PageRequest.EntireLatestContent
import za.co.absa.spline.persistence.api.DataLineageReader.{IntervalPageRequest, PageRequest}

import scala.concurrent.Future

class MongoDataLineageReaderSpec extends MongoDataLineagePersistenceSpecBase with Matchers {

  import CloseableIterableMatchers._

  describe("findDatasets()- batch requests") {

    val testLineages = List(
      createDataLineage("appID0", "App Zero", path = "file://some/path/0.csv", timestamp = 100),
      createDataLineage("appID1", "App One", path = "file://some/path/1.csv", timestamp = 101),
      createDataLineage("appID2", "App Two", path = "file://some/path/2.csv", timestamp = 102),
      createDataLineage("appID3", "App Three", path = "file://some/path/3.csv", timestamp = 103),
      createDataLineage("appID4", "App Four", path = "file://some/path/4.csv", timestamp = 104),
      createDataLineage("appID5", "App Five", path = "file://some/path/5.csv", timestamp = 105),
      createDataLineage("appID6", "App Six", path = "file://some/path/6.csv", timestamp = 106),
      createDataLineage("appID7", "App Seven", path = "file://some/path/7.csv", timestamp = 107),
      createDataLineage("appID8", "App Eight (text) a\\'b$1", path = "file://some/path/8.csv", timestamp = 108),
      createDataLineage("appID9", "App Nine (text2) a'b", path = "file://some/path/9.csv", timestamp = 109)
    )

    it("should load descriptions from a database.") {
      val expectedDescriptors = testLineages.reverse.map(l => PersistedDatasetDescriptor(
        datasetId = l.rootDataset.id,
        appId = l.appId,
        appName = l.appName,
        path = new URI(l.rootOperation.asInstanceOf[BatchWrite].path),
        timestamp = l.timestamp))

      val descriptionsFuture =
        Future.sequence(testLineages map lineageWriter.store).
          flatMap(_ => mongoReader.findDatasets(None, EntireLatestContent).
            map(_.iterator.toList))

      for (descriptors <- descriptionsFuture) yield descriptors shouldEqual expectedDescriptors
    }

    it("should support scrolling") {
      for {
        _ <- Future.sequence(testLineages.map(lineageWriter.store))
        page1 <- mongoReader.findDatasets(None, PageRequest(107, 0, 3))
        page2 <- mongoReader.findDatasets(None, PageRequest(107, 3, 3))
        page3 <- mongoReader.findDatasets(None, PageRequest(107, 6, 3))
      } yield {
        page1 should consistOfItemsWithAppIds[PersistedDatasetDescriptor]("appID7", "appID6", "appID5")
        page2 should consistOfItemsWithAppIds[PersistedDatasetDescriptor]("appID4", "appID3", "appID2")
        page3 should consistOfItemsWithAppIds[PersistedDatasetDescriptor]("appID1", "appID0")
      }
    }

    it("should support text search with scrolling") {
      for {
        _ <- Future.sequence(testLineages.map(lineageWriter.store))
        page <- mongoReader.findDatasets("n", PageRequest(107, 0, 3))
      } yield {
        page should consistOfItemsWithAppIds[PersistedDatasetDescriptor]("appID7", "appID1")
      }
    }

    it("should search in text fields case insensitively") {
      for {
        _ <- Future.sequence(testLineages.map(lineageWriter.store))
        page <- mongoReader.findDatasets("nInE", EntireLatestContent)
      } yield {
        page should consistOfItemsWithAppIds[PersistedDatasetDescriptor]("appID9")
      }
    }

    it("should search by ID fully matched") {
      for {
        _ <- Future.sequence(testLineages.map(lineageWriter.store))
        searchingLineage = testLineages.head
        searchingDatasetId = searchingLineage.rootDataset.id.toString
        foundSingleMatch <- mongoReader.findDatasets(searchingDatasetId, EntireLatestContent)
        noResultByPrefix <- mongoReader.findDatasets(searchingDatasetId take 10, EntireLatestContent)
        noResultBySuffix <- mongoReader.findDatasets(searchingDatasetId drop 10, EntireLatestContent)
      } yield {
        foundSingleMatch should consistOfItemsWithAppIds[PersistedDatasetDescriptor](searchingLineage.appId)
        noResultByPrefix.iterator shouldBe empty
        noResultBySuffix.iterator shouldBe empty
      }
    }

    it("should search verbatim text") {
      for {
        _ <- Future.sequence(testLineages.map(lineageWriter.store))
        set1 <- mongoReader.findDatasets("(text)", EntireLatestContent)
        set2 <- mongoReader.findDatasets("a\\'b", EntireLatestContent)
        set3 <- mongoReader.findDatasets("a\\\\'b", EntireLatestContent)
        set4 <- mongoReader.findDatasets("a\\'b$1", EntireLatestContent)
      } yield {
        set1 should consistOfItemsWithAppIds[PersistedDatasetDescriptor]("appID8")
        set2 should consistOfItemsWithAppIds[PersistedDatasetDescriptor]("appID8")
        set3.iterator shouldBe empty
        set4 should consistOfItemsWithAppIds[PersistedDatasetDescriptor]("appID8")
      }
    }
  }

  describe("findDatasets()- stream requests") {
    val uuid1 = UUID.fromString("11111111-1111-1111-1111-111111111111")
    val uuid2 = UUID.fromString("22222222-2222-2222-2222-222222222222")
    val uuid3 = UUID.fromString("33333333-3333-3333-3333-333333333333")
    val uuid4 = UUID.fromString("44444444-4444-4444-4444-444444444444")
    val uuid5 = UUID.fromString("55555555-5555-5555-5555-555555555555")

    val testLineages = Seq(
      createDataLineage("appID1", "App One", path = "file://some/path/1.csv", timestamp = 101, datasetId = uuid1),
      createDataLineage("appID2", "App Two", path = "file://some/path/2.csv", timestamp = 102, datasetId = uuid2),
      createDataLineage("appID3", "App Three", path = "file://some/path/3.csv", timestamp = 103, datasetId = uuid3),
      createDataLineage("appID4", "App Four", path = "file://some/path/4.csv", timestamp = 104, datasetId = uuid4),
      createDataLineage("appID5", "App Five", path = "file://some/path/5.csv", timestamp = 105, datasetId = uuid5)
    )

    val testEvents = Seq(
      createEvent(testLineages(0), 105, 2, Seq("source"), "none"),
      createEvent(testLineages(0), 110, 2, Seq("source"), "none"),
      createEvent(testLineages(1), 105, 2, Seq("source"), "destination"),
      createEvent(testLineages(1), 110, 2, Seq("source"), "destination"),
      createEvent(testLineages(2), 105, 0, Seq("source"), "destination"),
      createEvent(testLineages(2), 110, 0, Seq("source"), "destination"),
      createEvent(testLineages(3), 205, 2, Seq("source"), "destination"),
      createEvent(testLineages(3), 210, 2, Seq("source"), "destination"),
      createEvent(testLineages(4), 104, 2, Seq("source"), "destination"),
      createEvent(testLineages(4), 120, 2, Seq("source"), "destination")
    )

    it("should load only descriptions matching criteria") {
      for {
        _ <- Future.sequence(testLineages.map(lineageWriter.store))
        _ <- Future.sequence(testEvents.map(eventWriter.store))
        page <- mongoReader.findDatasets("destination", IntervalPageRequest(100, 115))
      } yield {
        page should consistOfItemsWithAppIds[PersistedDatasetDescriptor]("appID5", "appID2")
      }
    }
  }

  describe("findLatestLineagesByPath()") {
    val uuid1 = UUID.fromString("11111111-1111-1111-1111-111111111111")
    val uuid2 = UUID.fromString("22222222-2222-2222-2222-222222222222")
    val uuid3 = UUID.fromString("33333333-3333-3333-3333-333333333333")
    val uuid4 = UUID.fromString("44444444-4444-4444-4444-444444444444")
    val uuid5 = UUID.fromString("55555555-5555-5555-5555-555555555555")

    it("should return latest lineage records from a database for a give path") {
      val path = "hdfs://a/b/c"
      val testLineages = Seq(
        createDataLineage("appID1", "appName1", 1L, uuid1, path),
        createDataLineage("appID2", "appName2", 2L, uuid2),
        createDataLineage("appID3", "appName3", 30L, uuid3, path),
        createDataLineage("appID4", "appName4", 4L, uuid4),
        createDataLineage("appID5", "appName5", 5L, uuid5, path)
      )

      val result = Future.sequence(testLineages.map(i => lineageWriter.store(i))).flatMap(_ => mongoReader.findLatestDatasetIdsByPath(path))

      result.map(resultItems => resultItems should consistOfItems(uuid3))
    }

    it("should return empty result if no records exists in a database for a given path") {
      val path = "hdfs://a/b/c"
      val testLineages = Seq(
        createDataLineage("appID1", "appName1", 1L),
        createDataLineage("appID2", "appName2", 2L),
        createDataLineage("appID3", "appName3", 3L)
      )

      val result = Future.sequence(testLineages map lineageWriter.store) flatMap (_ => mongoReader findLatestDatasetIdsByPath path)

      result.map(_.iterator shouldBe empty)
    }

    it("should return a sequence of all appended lineages sorted by timestamp in chronological order") {
      val path = "hdfs://a/b/c"
      val testLineages = Seq(
        createDataLineage("appID1", "appName1", 1L, uuid1, path, append = true),
        createDataLineage("appID2", "appName2", 2L, uuid2, path, append = true),
        createDataLineage("appID3", "appName3", 3L, uuid3, path, append = true)
      )

      val result = Future.sequence(testLineages.map(i => lineageWriter.store(i))).flatMap(_ => mongoReader.findLatestDatasetIdsByPath(path))

      result.map(resultItems => resultItems should consistOfItems(uuid1, uuid2, uuid3))
    }

    it("should return a sequence of all appended lineages since the last overwrite") {
      val path = "hdfs://a/b/c"
      val testLineages = Seq(
        createDataLineage("appID0", "appName0", 0L, randomUUID, path, append = true),
        createDataLineage("appID1", "appName1", 1L, uuid1, path),
        createDataLineage("appID2", "appName2", 2L, uuid2, path, append = true),
        createDataLineage("appID3", "appName3", 3L, uuid3, path, append = true)
      )

      val result = Future.sequence(testLineages.map(i => lineageWriter.store(i))).flatMap(_ => mongoReader.findLatestDatasetIdsByPath(path))

      result.map(resultItems => resultItems should consistOfItems(uuid1, uuid2, uuid3))
    }

  }

  describe("searchDataset()") {
    it("should find the correct lineage ID according a given criteria") {
      val path = "hdfs://a/b/c"
      val testLineages = Seq(
        createDataLineage("appID1", "appName1", 1L, path = path),
        createDataLineage("appID1", "appName1", 2L),
        createDataLineage("appID2", "appName2", 30L, path = path),
        createDataLineage("appID2", "appName2", 4L),
        createDataLineage("appID3", "appName2", 5L, path = path)
      )

      val result = Future.sequence(testLineages.map(i => lineageWriter.store(i))).flatMap(_ => mongoReader.searchDataset(path, "appID2"))

      result.map(resultItem => resultItem shouldEqual Some(testLineages(2).rootDataset.id))
    }

    it("should return None if there is no record for a given criteria") {
      val path = "hdfs://a/b/c"
      val testLineages = Seq(
        createDataLineage("appID1", "appName1", 1L, path = path),
        createDataLineage("appID1", "appName1", 2L),
        createDataLineage("appID2", "appName2", 30L),
        createDataLineage("appID2", "appName2", 4L),
        createDataLineage("appID3", "appName2", 5L, path = path)
      )

      val result = Future.sequence(testLineages.map(i => lineageWriter.store(i))).flatMap(_ => mongoReader.searchDataset(path, "appID2"))

      result.map(resultItem => resultItem shouldEqual None)
    }

  }

  describe("findByInputId()") {
    it("should load lineages having the given datasetId as an input") {
      val sources = Seq(
        MetaDataSource("path1", Seq(randomUUID, randomUUID, randomUUID)),
        MetaDataSource("path2", Seq(randomUUID, randomUUID, randomUUID)),
        MetaDataSource("path3", Seq(randomUUID, randomUUID, randomUUID))
      )

      val testLineages = Seq(
        createDataLineageWithSources("appID1", "appName1", sources.tail),
        createDataLineageWithSources("appID2", "appName2", sources),
        createDataLineageWithSources("appID3", "appName3", sources),
        createDataLineageWithSources("appID4", "appName4", sources),
        createDataLineageWithSources("appID5", "appName5", Seq.empty)
      )

      val datasetIdToFindBy = sources.head.datasetsIds.head

      Future.sequence(testLineages.map(i => lineageWriter.store(i))).
        flatMap(_ => {
          MongoTestProperties.mongoConnection.db.getCollection("lineages_v5") remove DBObject("appId" -> "appID4") // Emulate incomplete lineage #4
          mongoReader.findByInputId(datasetIdToFindBy, overviewOnly = false)
        }).
        map(_ should consistOfItemsWithAppIds[DataLineage]("appID2", "appID3"))
    }
  }

  describe("findByInterval()") {
    val path = "hdfs://a/b/c"
    val testLineages = Seq(
      createDataLineage("appID1", "appName1", 1L),
      createDataLineage("appID2", "appName1", 2L),
      createDataLineage("appID3", "appName2", 30L),
      createDataLineage("appID4", "appName2", 4L),
      createDataLineage("appID5", "appName2", 5L)
    )

    val testEvents = Seq(
      createEvent(testLineages(0), 105, 2, Seq("source"), "none"),
      createEvent(testLineages(0), 110, 2, Seq("source"), "none"),
      createEvent(testLineages(1), 105, 2, Seq("source"), path),
      createEvent(testLineages(1), 110, 2, Seq("source"), path),
      createEvent(testLineages(2), 105, 0, Seq(path), "destination"),
      createEvent(testLineages(2), 110, 0, Seq(path), "destination"),
      createEvent(testLineages(3), 205, 2, Seq("source"), path),
      createEvent(testLineages(3), 210, 2, Seq("source"), path),
      createEvent(testLineages(4), 104, 2, Seq(path), "destination"),
      createEvent(testLineages(4), 120, 2, Seq(path), "destination")
    )

    it("should find the correct lineages according a given criteria") {
      for {
        _ <- Future.sequence(testLineages.map(lineageWriter.store))
        _ <- Future.sequence(testEvents.map(eventWriter.store))
        result <- mongoReader.getLineagesByPathAndInterval(path, 100, 115)
      } yield {
        result should consistOfItemsWithAppIds[DataLineage]("appID5", "appID2")
      }
    }

    it("should return None if there is no record for a given criteria") {

      val result = Future.sequence(testLineages.map(i => lineageWriter.store(i))).flatMap(_ => mongoReader.searchDataset(path, "appID2"))

      result.map(resultItem => resultItem shouldEqual None)
    }

  }
  protected def createDataLineageWithSources(appId: String, appName: String, sources: Seq[MetaDataSource]): DataLineage = {
    val timestamp: Long = 123L
    val outputPath: String = "hdfs://foo/bar/path"

    val dataTypes = Seq(Simple("StringType", nullable = true))
    val attributes = Seq(
      Attribute(randomUUID(), "_1", dataTypes.head.id),
      Attribute(randomUUID(), "_2", dataTypes.head.id),
      Attribute(randomUUID(), "_3", dataTypes.head.id)
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
      "0.0.42",
      Seq(
        BatchWrite(OperationProps(randomUUID, "Write", Seq(md1.id), md1.id), "parquet", outputPath, append = false, Map("x" -> 42), Map.empty),
        Generic(OperationProps(randomUUID, "Union", Seq(md1.id, md2.id), md3.id), "rawString1"),
        Generic(OperationProps(randomUUID, "Filter", Seq(md4.id), md2.id), "rawString2"),
        BatchRead(OperationProps(randomUUID, "Read", sources.flatMap(_.datasetsIds), md4.id), "rawString3", sources),
        Generic(OperationProps(randomUUID, "Filter", Seq(md4.id), md1.id), "rawString4")
      ),
      Seq(md1, md2, md3, md4),
      attributes,
      dataTypes
    )
  }
}
