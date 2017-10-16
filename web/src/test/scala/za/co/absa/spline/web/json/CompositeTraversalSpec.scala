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

class CompositeTraversalSpec  extends FlatSpec with Matchers with MockitoSugar {

  import StringJSONConverters._

  val aUUID: UUID = UUID fromString "d14963fd-43bc-93f4-a002-4d31015a9cb3"
  val bUUID: UUID = UUID fromString "9441c2e7-9fb7-31d0-1964-2437f6b2a183"

  val xUUID1: UUID = UUID fromString "11111111-1111-1111-1111-111111111111"
  val xUUID2: UUID = UUID fromString "22222222-2222-2222-2222-222222222222"

//  implicit val formats: Formats = Serialization.formats(NoTypeHints) ++ org.json4s.ext.JavaTypesSerializers.all

//  val compositeA = Serialization.read[Seq[MetaDataset]](aJson)

  val compositeA = CompositeWithDependencies(Composite(
    OperationProps(UUID fromString "6d4d9268-2cf1-19d8-b654-d3a52f0affad", "SaveIntoDataSourceCommand", Seq(
      UUID fromString "4647b1b0-425f-ce2d-b0c1-02c148c504af"), aUUID), Seq(), TypedMetaDataSource("file", "file.txt", Some(aUUID)),
    xUUID1, 0, "AppId", "AppName"), Seq(MetaDataset(xUUID1, Schema(Seq(xUUID2)))), Seq(Attribute(xUUID2, "attr2", Simple("String", true) )))

  val compositeB = CompositeWithDependencies(Composite(
    OperationProps(UUID fromString "6d4d9268-2cf1-19d8-b654-d3a52f0affad", "SaveIntoDataSourceCommand", Seq(
      UUID fromString "4647b1b0-425f-ce2d-b0c1-02c148c504af"), bUUID), Seq(TypedMetaDataSource("file", "file://file", Some(aUUID))), TypedMetaDataSource("file", "file.txt", None),
    xUUID1, 0, "AppId", "AppName"), Seq(MetaDataset(xUUID1, Schema(Seq(xUUID1)))), Seq(Attribute(xUUID1, "attr1", Simple("String", true) )))

  it should "just work" in {

    val readerMock: DataLineageReader = mock[DataLineageReader]

    when(readerMock.loadCompositeByOutput(aUUID)) thenReturn Future.successful(Some(compositeA))
    when(readerMock.loadCompositeByOutput(bUUID)) thenReturn Future.successful(Some(compositeB))

    when(readerMock.loadCompositesByInput(aUUID)) thenReturn Future.successful(List(compositeB).toIterator)

    val svc = new LineageService(readerMock)

    val linf= svc.getDatasetOverviewLineage(aUUID)

    val lin = Await.result(linf, 10 seconds)

    lin.operations.size shouldEqual 2
    lin.datasets.size shouldEqual 2
    lin.attributes.size shouldEqual 2
  }


}
