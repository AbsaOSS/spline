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

package za.co.absa.spline.web.rest.service

import java.util.UUID

import org.mockito.ArgumentMatchers.{eq => ≡, _}
import org.mockito.Mockito._
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{AsyncFlatSpec, Matchers}
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.expr.AttrRef
import za.co.absa.spline.model.op._
import za.co.absa.spline.model.{Attribute, DataLineage, MetaDataset, Schema, _}
import za.co.absa.spline.persistence.api.{CloseableIterable, DataLineageReader}

import scala.concurrent.Future
import scala.language.postfixOps

/**
  * This is a test suite for high order lineage construction algorithm
  * defined in LineageService
  *
  * This test suite is for the non-blocking/async version
  */
//noinspection NameBooleanParameters,LanguageFeature
class LineageServiceSpec extends AsyncFlatSpec with Matchers with MockitoSugar {

  /*
      Composite [lineage] is a lineage viewed as an operation on datasets produced by other lineages
      This is a small example of 2 composites where one composite output is the other composite's input

          S1 --> S2

      The schema of C is the same as in A
  */

  val UUIDS1: UUID = UUID fromString "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
  val UUIDS2: UUID = UUID fromString "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"

  val xUUID1: UUID = UUID fromString "11111111-1111-1111-1111-111111111111"
  val xUUID2: UUID = UUID fromString "22222222-2222-2222-2222-222222222222"
  val xUUID3: UUID = UUID fromString "33333333-3333-3333-3333-333333333333"

  private val intType = Simple("int", nullable = false)

  val lineage1 = DataLineage("AppId1", "AppName1", 0, "0.0.42", Seq(
    BatchWrite(OperationProps(UUID fromString "6d4d9268-2cf1-19d8-b654-d3a52f0affa1", "SaveIntoDataSourceCommand", Seq(), UUIDS1), "fileS1", "fileS1.txt", append = false, Map.empty, Map.empty)),
    Seq(MetaDataset(UUIDS1, Schema(Seq(xUUID3)))),
    Seq(Attribute(xUUID3, "a", intType.id)),
    Seq(intType)
  )

  private val longType = Simple("long", nullable = false)
  val lineage2 = DataLineage("AppId2", "AppName2", 0, "0.0.42", Seq(
    BatchWrite(OperationProps(UUID fromString "6d4d9268-2cf1-19d8-b654-d3a52f0affa3", "SaveIntoDataSourceCommand", Seq(xUUID2), UUIDS2), "fileOut", "fileOut.txt", append = false, Map.empty, Map.empty),
    BatchRead(OperationProps(UUID fromString "6d4d9268-2cf1-19d8-b654-d3a52f0affa2", "LogicalRelation", Seq(UUIDS1), xUUID2), "fileS1", Seq(MetaDataSource("fileS1.txt", Seq(UUIDS1))))),
    Seq(
      MetaDataset(UUIDS2, Schema(Seq(xUUID3))),
      MetaDataset(xUUID2, Schema(Seq(xUUID3))),
      MetaDataset(UUIDS1, Schema(Seq(xUUID3)))),
    Seq(Attribute(xUUID3, "b", longType.id)),
    Seq(longType))

  it should "be able to construct small high order lineage out of 2 composites" in {
    val readerMock: DataLineageReader = mock[DataLineageReader]

    when(readerMock.loadByDatasetId(≡(UUIDS1), any())(any())) thenReturn Future.successful(Some(lineage1))
    when(readerMock.loadByDatasetId(≡(UUIDS2), any())(any())) thenReturn Future.successful(Some(lineage2))

    when(readerMock.findByInputId(≡(UUIDS1), any())(any())) thenReturn Future.successful(new CloseableIterable(Iterator(lineage2), {}))
    when(readerMock.findByInputId(≡(UUIDS2), any())(any())) thenReturn Future.successful(CloseableIterable.empty[DataLineage])

    val svc = new LineageService(readerMock)

    for (lin <- svc getPrelinked UUIDS1) yield {
      lin.operations.size shouldEqual 2
      lin.datasets.size shouldEqual 2
      lin.attributes.size shouldEqual 2
    }
  }


  /*
    This is an example of a more complicated high order lineage, consisting of 5 composites
         D        ->B
          \      /
           -->A--
          /      \
         E        ->C
    The schema of C is the same as in A
  */

  val aUUID: UUID = UUID fromString "aaaaaaaa-aaaa-aaaa-aaaa-111111111111"
  val bUUID: UUID = UUID fromString "bbbbbbbb-bbbb-bbbb-bbbb-111111111111"
  val cUUID: UUID = UUID fromString "cccccccc-cccc-cccc-cccc-111111111111"
  val dUUID: UUID = UUID fromString "dddddddd-dddd-dddd-dddd-111111111111"
  val eUUID: UUID = UUID fromString "eeeeeeee-eeee-eeee-eeee-111111111111"

  val xUUID4: UUID = UUID fromString "44444444-4444-4444-4444-444444444444"
  val xUUID5: UUID = UUID fromString "55555555-5555-5555-5555-555555555555"

  val operationAUUID: UUID = UUID fromString "aaaaaaaa-1111-1111-1111-111111111111"
  val operationBUUID: UUID = UUID fromString "bbbbbbbb-1111-1111-1111-111111111111"
  val operationCUUID: UUID = UUID fromString "cccccccc-1111-1111-1111-111111111111"
  val operationDUUID: UUID = UUID fromString "dddddddd-1111-1111-1111-111111111111"
  val operationEUUID: UUID = UUID fromString "eeeeeeee-1111-1111-1111-111111111111"

  private val stringType1 = Simple("String", true)
  private val stringType2 = Simple("String", true)

  private val lineageD = DataLineage("AppId", "AppNameD", 0, "0.0.42",
    operations = Seq(BatchWrite(OperationProps(operationDUUID, "Save", Seq(), dUUID), "fileD", "fileD.csv", append = false, Map.empty, Map.empty)),
    datasets = Seq(MetaDataset(dUUID, Schema(Seq(xUUID1)))),
    attributes = Seq(Attribute(xUUID1, "attributeD", stringType1.id)),
    dataTypes = Seq(stringType1))

  private val lineageE = DataLineage("AppId", "AppNameE", 0, "0.0.42",
    operations = Seq(BatchWrite(OperationProps(operationEUUID, "Save", Seq(), eUUID), "fileE", "fileE.csv", append = false, Map.empty, Map.empty)),
    datasets = Seq(MetaDataset(eUUID, Schema(Seq(xUUID2)))),
    attributes = Seq(Attribute(xUUID2, "attributeE", stringType1.id)),
    dataTypes = Seq(stringType1))

  private val lineageA = DataLineage("AppId", "AppNameA", 0, "0.0.42",
    operations = Seq(
      BatchWrite(OperationProps(operationAUUID, "Save", null, aUUID), "fileA", "fileA.csv", append = false, Map.empty, Map.empty),
      BatchRead(OperationProps(operationAUUID, "Read", Seq(dUUID), null), "fileD", Seq(MetaDataSource("dileD.csv", Seq(dUUID)))),
      BatchRead(OperationProps(operationAUUID, "Read", Seq(eUUID), null), "fileE", Seq(MetaDataSource("dileE.csv", Seq(eUUID))))),
    datasets = Seq(MetaDataset(aUUID, Schema(Seq(xUUID3)))),
    attributes = Seq(Attribute(xUUID3, "attributeA", stringType2.id)),
    dataTypes = Seq(stringType2))

  private val lineageB = DataLineage("AppId", "AppNameB", 0, "0.0.42",
    operations = Seq(
      BatchWrite(OperationProps(operationBUUID, "Save", null, bUUID), "fileB", "fileB.csv", append = false, Map.empty, Map.empty),
      BatchRead(OperationProps(operationBUUID, "Read", Seq(aUUID), null), "fileA", Seq(MetaDataSource("dileA.csv", Seq(aUUID))))
    ),
    datasets = Seq(MetaDataset(bUUID, Schema(Seq(xUUID4)))),
    attributes = Seq(Attribute(xUUID4, "attributeB", stringType2.id)),
    dataTypes = Seq(stringType2))

  private val lineageC = {
    val ds1Id = UUID.randomUUID
    val ds2Id = UUID.randomUUID
    val attr1Id = UUID.randomUUID
    val attr2Id = UUID.randomUUID
    val dt1Id = UUID.randomUUID
    val dt2Id = UUID.randomUUID
    DataLineage("AppId", "AppNameC", 0, "0.0.42",
      operations = Seq(
        BatchWrite(OperationProps(operationCUUID, "Save", Seq(ds2Id), cUUID), "fileC", "fileC.csv", append = false, Map.empty, Map.empty),
        Filter(OperationProps(UUID.randomUUID, "Filter 2", Seq(ds1Id), ds2Id), expr.Binary(">", dt1Id, children = Seq(AttrRef(attr1Id)))),
        Filter(OperationProps(UUID.randomUUID, "Filter 1", Seq(aUUID), ds1Id), expr.Binary("<", dt2Id, children = Seq(AttrRef(attr2Id)))),
        BatchRead(OperationProps(operationCUUID, "Read", Seq(aUUID), null), "fileA", Seq(MetaDataSource("dileA.csv", Seq(aUUID))))
      ),
      datasets = Seq(
        MetaDataset(cUUID, Schema(Seq(xUUID3))),
        MetaDataset(ds1Id, Schema(Seq(ds1Id))),
        MetaDataset(ds2Id, Schema(Seq(ds2Id)))
      ),
      attributes = Seq(
        Attribute(xUUID3, "attributeA", stringType2.id),
        Attribute(attr1Id, "attributeA1", dt1Id),
        Attribute(attr2Id, "attributeA2", dt2Id)
      ),
      dataTypes = Seq(
        stringType2,
        Simple("some type 1", false),
        Simple("some type 2", false)
      ))
  }

  def prepareBigLineageMock(readerMock: DataLineageReader): Unit = {
    when(readerMock.loadByDatasetId(≡(aUUID), any())(any())) thenReturn Future.successful(Some(lineageA))
    when(readerMock.loadByDatasetId(≡(bUUID), any())(any())) thenReturn Future.successful(Some(lineageB))
    when(readerMock.loadByDatasetId(≡(cUUID), any())(any())) thenReturn Future.successful(Some(lineageC))
    when(readerMock.loadByDatasetId(≡(dUUID), any())(any())) thenReturn Future.successful(Some(lineageD))
    when(readerMock.loadByDatasetId(≡(eUUID), any())(any())) thenReturn Future.successful(Some(lineageE))

    when(readerMock.findByInputId(≡(aUUID), any())(any())) thenReturn Future.successful(new CloseableIterable(Iterator(lineageB, lineageC), {}))
    when(readerMock.findByInputId(≡(bUUID), any())(any())) thenReturn Future.successful(CloseableIterable.empty[DataLineage])
    when(readerMock.findByInputId(≡(cUUID), any())(any())) thenReturn Future.successful(CloseableIterable.empty[DataLineage])
    when(readerMock.findByInputId(≡(dUUID), any())(any())) thenReturn Future.successful(new CloseableIterable(Iterator(lineageA), {}))
    when(readerMock.findByInputId(≡(eUUID), any())(any())) thenReturn Future.successful(new CloseableIterable(Iterator(lineageA), {}))
  }

  it should "be able to construst small high order lineage out of 5 composites, starting at point A" in {
    val readerMock: DataLineageReader = mock[DataLineageReader]
    val svc = new LineageService(readerMock)
    prepareBigLineageMock(readerMock)

    for (lin <- svc getPrelinked aUUID) yield {
      lin.operations.size shouldEqual 5
      lin.datasets.size shouldEqual 5
      lin.attributes.size shouldEqual 4
      lin.dataTypes.size shouldEqual 2
    }
  }

  it should "be able to construct small high order lineage out of 5 composits, starting at point C" in {
    val readerMock: DataLineageReader = mock[DataLineageReader]
    val svc = new LineageService(readerMock)
    prepareBigLineageMock(readerMock)

    for (lin <- svc getPrelinked cUUID) yield {
      lin.operations.size shouldEqual 5
      lin.datasets.size shouldEqual 5
      lin.attributes.size shouldEqual 4
      lin.dataTypes.size shouldEqual 2
    }
  }

  it should "be able to construct small high order lineage out of 5 composites, starting at point D" in {
    val readerMock: DataLineageReader = mock[DataLineageReader]
    val svc = new LineageService(readerMock)
    prepareBigLineageMock(readerMock)

    for (lin <- svc getPrelinked dUUID) yield {
      lin.operations.size shouldEqual 5
      lin.datasets.size shouldEqual 5
      lin.attributes.size shouldEqual 4
      lin.dataTypes.size shouldEqual 2
    }
  }

}
