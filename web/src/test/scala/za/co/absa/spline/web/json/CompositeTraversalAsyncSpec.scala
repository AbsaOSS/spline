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

package za.co.absa.spline.web.json

import java.util.UUID

import org.mockito.Mockito._
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.{Attribute, MetaDataset, Schema}
import za.co.absa.spline.model.op.{Composite, CompositeWithDependencies, OperationProps, TypedMetaDataSource}
import za.co.absa.spline.persistence.api.DataLineageReader
import za.co.absa.spline.web.rest.service.LineageService

import scala.concurrent.duration._
import scala.concurrent.{Await, Future}

/**
  * This is a test suite for high order lineage construction algorithm
  * defined in LineageService
  *
  * This test suite is for the non-blocking/async version
  */
//noinspection NameBooleanParameters,LanguageFeature
class CompositeTraversalAsyncSpec  extends FlatSpec with Matchers with MockitoSugar {

  /**
    * Composite [lineage] is a lineage viewed as an operation on datasets produced by other lineages
    * This is a small example of 2 composites where one composite output is the other composite's input
    *
    *       S1 --> S2
    *
    * The schema of C is the same as in A
    */

  val UUIDS1: UUID = UUID fromString "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
  val UUIDS2: UUID = UUID fromString "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"

  val xUUID1: UUID = UUID fromString "11111111-1111-1111-1111-111111111111"
  val xUUID2: UUID = UUID fromString "22222222-2222-2222-2222-222222222222"

  val compositeS1 = CompositeWithDependencies(Composite(
    OperationProps(UUID fromString "6d4d9268-2cf1-19d8-b654-d3a52f0affa1", "SaveIntoDataSourceCommand", Seq(), UUIDS1), Seq(), TypedMetaDataSource("fileS1", "fileS1.txt", Some(UUIDS1)),
    0, "AppId", "AppName"), Seq(MetaDataset(xUUID1, Schema(Seq(xUUID2)))), Seq(Attribute(xUUID2, "attr2", Simple("String", true) )))

  val compositeS2 = CompositeWithDependencies(Composite(
    OperationProps(UUID fromString "6d4d9268-2cf1-19d8-b654-d3a52f0affa2", "SaveIntoDataSourceCommand", Seq(
      UUID fromString "4647b1b0-425f-ce2d-b0c1-02c148c504af"), UUIDS2), Seq(TypedMetaDataSource("fileS1", "fileS1.txt", Some(UUIDS1))), TypedMetaDataSource("fileOut", "fileOut.txt", None),
    0, "AppId", "AppName"), Seq(MetaDataset(xUUID1, Schema(Seq(xUUID1)))), Seq(Attribute(xUUID1, "attr1", Simple("String", true) )))

  it should "be able to construst small high order lineage out of 2 composits" in {
    val readerMock: DataLineageReader = mock[DataLineageReader]

    when(readerMock.loadCompositeByOutput(UUIDS1)) thenReturn Future.successful(Some(compositeS1))
    when(readerMock.loadCompositeByOutput(UUIDS2)) thenReturn Future.successful(Some(compositeS2))

    when(readerMock.loadCompositesByInput(UUIDS1)) thenReturn Future.successful(List(compositeS2).toIterator)

    val svc = new LineageService(readerMock)

    val linf= svc.getDatasetOverviewLineageAsync(UUIDS1)
    val lin = Await.result(linf, 10 seconds)

    lin.operations.size shouldEqual 2
    lin.datasets.size shouldEqual 2
    lin.attributes.size shouldEqual 2
  }


  /**
    * This is an example of a more complicated high order lineage, consisting of 5 composites
    *       D        ->B
    *        \      /
    *         -->A--
    *        /      \
    *       E        ->C
    *
    * The schema of C is the same as in A
    */
  val aUUID: UUID = UUID fromString "aaaaaaaa-aaaa-aaaa-aaaa-111111111111"
  val bUUID: UUID = UUID fromString "bbbbbbbb-bbbb-bbbb-bbbb-111111111111"
  val cUUID: UUID = UUID fromString "cccccccc-cccc-cccc-cccc-111111111111"
  val dUUID: UUID = UUID fromString "dddddddd-dddd-dddd-dddd-111111111111"
  val eUUID: UUID = UUID fromString "eeeeeeee-eeee-eeee-eeee-111111111111"

  val xUUID3: UUID = UUID fromString "33333333-3333-3333-3333-333333333333"
  val xUUID4: UUID = UUID fromString "44444444-4444-4444-4444-444444444444"
  val xUUID5: UUID = UUID fromString "55555555-5555-5555-5555-555555555555"

  val operationAUUID: UUID = UUID fromString "aaaaaaaa-1111-1111-1111-111111111111"
  val operationBUUID: UUID = UUID fromString "bbbbbbbb-1111-1111-1111-111111111111"
  val operationCUUID: UUID = UUID fromString "cccccccc-1111-1111-1111-111111111111"
  val operationDUUID: UUID = UUID fromString "dddddddd-1111-1111-1111-111111111111"
  val operationEUUID: UUID = UUID fromString "eeeeeeee-1111-1111-1111-111111111111"

  val compositeD = CompositeWithDependencies(Composite(
    OperationProps(operationDUUID, "SaveIntoDataSourceCommand", Seq(), dUUID), Seq(), TypedMetaDataSource("fileD", "fileD.csv", Some(dUUID)),
    0, "AppId", "AppNameD"), Seq(MetaDataset(xUUID1, Schema(Seq(xUUID1)))), Seq(Attribute(xUUID1, "attributeD", Simple("String", true) )))

  val compositeE = CompositeWithDependencies(Composite(
    OperationProps(operationEUUID, "SaveIntoDataSourceCommand", Seq(), eUUID), Seq(), TypedMetaDataSource("fileE", "fileE.csv", Some(eUUID)),
    0, "AppId", "AppNameE"), Seq(MetaDataset(xUUID2, Schema(Seq(xUUID2)))), Seq(Attribute(xUUID2, "attributeE", Simple("String", true) )))

  val compositeA = CompositeWithDependencies(Composite(
    OperationProps(operationAUUID, "SaveIntoDataSourceCommand", Seq(
      dUUID, eUUID), aUUID), Seq(TypedMetaDataSource("fileD", "dileD.csv", Some(dUUID)), TypedMetaDataSource("fileE", "dileE.csv", Some(eUUID))), TypedMetaDataSource("fileA", "fileA.csv", Some(aUUID)),
    0, "AppId", "AppNameA"), Seq(MetaDataset(xUUID3, Schema(Seq(xUUID3)))), Seq(Attribute(xUUID3, "attributeA", Simple("String", true) )))

  val compositeB = CompositeWithDependencies(Composite(
    OperationProps(operationBUUID, "SaveIntoDataSourceCommand", Seq(
      aUUID), bUUID), Seq(TypedMetaDataSource("fileA", "dileA.csv", Some(aUUID))), TypedMetaDataSource("fileB", "fileB.csv", Some(bUUID)),
    0, "AppId", "AppNameB"), Seq(MetaDataset(xUUID4, Schema(Seq(xUUID4)))), Seq(Attribute(xUUID4, "attributeB", Simple("String", true) )))

  val compositeC = CompositeWithDependencies(Composite(
    OperationProps(operationCUUID, "SaveIntoDataSourceCommand", Seq(
      aUUID), cUUID), Seq(TypedMetaDataSource("fileA", "dileA.csv", Some(aUUID))), TypedMetaDataSource("fileC", "fileC.csv", Some(cUUID)),
    0, "AppId", "AppNameC"), Seq(MetaDataset(xUUID3, Schema(Seq(xUUID3)))), Seq(Attribute(xUUID3, "attributeA", Simple("String", true) )))

  def prepareBigLineageMock(readerMock: DataLineageReader): Unit = {
    when(readerMock.loadCompositeByOutput(aUUID)) thenReturn Future.successful(Some(compositeA))
    when(readerMock.loadCompositeByOutput(bUUID)) thenReturn Future.successful(Some(compositeB))
    when(readerMock.loadCompositeByOutput(cUUID)) thenReturn Future.successful(Some(compositeC))
    when(readerMock.loadCompositeByOutput(dUUID)) thenReturn Future.successful(Some(compositeD))
    when(readerMock.loadCompositeByOutput(eUUID)) thenReturn Future.successful(Some(compositeE))

    when(readerMock.loadCompositesByInput(aUUID)) thenReturn Future.successful(List(compositeB, compositeC).toIterator)
    when(readerMock.loadCompositesByInput(bUUID)) thenReturn Future.successful(List().toIterator)
    when(readerMock.loadCompositesByInput(cUUID)) thenReturn Future.successful(List().toIterator)
    when(readerMock.loadCompositesByInput(dUUID)) thenReturn Future.successful(List(compositeA).toIterator)
    when(readerMock.loadCompositesByInput(eUUID)) thenReturn Future.successful(List(compositeA).toIterator)
  }

  it should "be able to construst small high order lineage out of 5 composits, starting at point A" in {
    val readerMock: DataLineageReader = mock[DataLineageReader]
    val svc = new LineageService(readerMock)
    prepareBigLineageMock(readerMock)

    val linf1 = svc.getDatasetOverviewLineageAsync(aUUID)
    val lin1 = Await.result(linf1, 10 seconds)
    lin1.operations.size shouldEqual 5
    lin1.datasets.size shouldEqual 4
    lin1.attributes.size shouldEqual 4
  }

  it should "be able to construst small high order lineage out of 5 composits, starting at point C" in {
    val readerMock: DataLineageReader = mock[DataLineageReader]
    val svc = new LineageService(readerMock)
    prepareBigLineageMock(readerMock)

    val linf = svc.getDatasetOverviewLineageAsync(cUUID)
    val lin = Await.result(linf, 10 seconds)
    lin.operations.size shouldEqual 5
    lin.datasets.size shouldEqual 4
    lin.attributes.size shouldEqual 4
  }

  it should "be able to construst small high order lineage out of 5 composits, starting at point D" in {
    val readerMock: DataLineageReader = mock[DataLineageReader]
    val svc = new LineageService(readerMock)
    prepareBigLineageMock(readerMock)

    val linf= svc.getDatasetOverviewLineageAsync(dUUID)
    val lin = Await.result(linf, 10 seconds)
    lin.operations.size shouldEqual 5
    lin.datasets.size shouldEqual 4
    lin.attributes.size shouldEqual 4
  }

}
