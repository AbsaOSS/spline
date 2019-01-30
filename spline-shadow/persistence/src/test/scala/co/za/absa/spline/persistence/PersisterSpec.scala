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

package co.za.absa.spline.persistence

import java.net.URI
import java.util.UUID
import java.util.UUID.randomUUID

import com.arangodb._
import com.arangodb.model.{OptionsBuilder, TransactionOptions}
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FunSpec, Matchers}
import za.co.absa.spline.model.arango._
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.op.{BatchRead, BatchWrite, Generic, OperationProps}
import za.co.absa.spline.model.{DataLineage, MetaDataSource, MetaDataset}
import za.co.absa.spline.persistence.{ArangoFactory, ArangoInit, Persister}
import za.co.absa.spline.{model => splinemodel}

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, Future}
import scala.util.Try
import org.mockito.Mockito._
import org.mockito.ArgumentMatchers._
import org.mockito.invocation.InvocationOnMock
import org.mockito.stubbing.{Answer, Answer3}
import io.circe.generic.semiauto.deriveDecoder
import com.outr.arango.managed._
import io.circe.Decoder.Result
import io.circe.{DecodingFailure, Json, ParsingFailure}
import io.circe.parser.parse

import scala.collection.JavaConverters._


class PersisterSpec extends FunSpec with Matchers with MockitoSugar {

  val arangoUri = "http://root:root@localhost:8529/unit-test"

  describe("Persister") {

    it("Persister should be able to insert an example lineage to an empty database") {
      val db = ArangoFactory.create(new URI(arangoUri))
      Try(db.drop())
      db.create()
      db.util()
      ArangoInit.initialize(db)
      val persister = new Persister(db, true)
      val dataLineage = bigDataLineage()
      awaitForever(persister.save(dataLineage))
      // Dupe insert should only log warning on Arango server.
      val thrown = intercept[IllegalArgumentException] {
        awaitForever(persister.save(dataLineage))
      }
      thrown.getCause.getMessage.contains("unique constraint violated") shouldBe true
    }

    // Useful for debugging
    it("print transaction js") {
      val db = ArangoFactory.create(new URI(arangoUri))
      val dbMock: ArangoDatabase = mock[ArangoDatabase]
      when(dbMock.transaction(anyString(), any(), any())).thenAnswer(new Answer[Unit] {
        override def answer(invocation: InvocationOnMock): Unit = {
          val action = invocation.getArgument(0).asInstanceOf[String]
          val options = invocation.getArgument(2).asInstanceOf[TransactionOptions]
          println(db.util().serialize(OptionsBuilder.build(options, action)).toString.replaceAll("\\\\n", " "))
        }
      })

      val cursor =mock[ArangoCursor[String]]
      when(cursor.hasNext).thenReturn(false)
      when(dbMock.query(anyString(), any[Class[String]])).thenReturn(cursor)
      awaitForever(new Persister(dbMock, true).save(shortLineage()))
    }

  }


  def awaitForever[T](future: Future[T]): T = {
    Await.result(future, Duration.Inf)
  }

  private def bigDataLineage(
                           appId: String = "appId1",
                           appName: String = "appName1",
                           timestamp: Long = 123L,
                           datasetId: UUID = randomUUID,
                           path: String = "hdfs://foo/bar/path",
                           append: Boolean = false)
    : DataLineage = {
      val dataType = Simple("StringType", nullable = true)
      val dataTypes = Seq(dataType)

      val attributes = Seq(
        splinemodel.Attribute(randomUUID(), "_1", dataType.id),
        splinemodel.Attribute(randomUUID(), "_2", dataType.id),
        splinemodel.Attribute(randomUUID(), "_3", dataType.id)
      )
      val aSchema = splinemodel.Schema(attributes.map(_.id))
      val bSchema = splinemodel.Schema(attributes.map(_.id).tail)

      val md1 = MetaDataset(datasetId, aSchema)
      val md2 = MetaDataset(randomUUID, aSchema)
      val md3 = MetaDataset(randomUUID, bSchema)
      val md4 = MetaDataset(randomUUID, bSchema)
      val mdOutput = MetaDataset(randomUUID, bSchema)
      val mdInput = MetaDataset(randomUUID, bSchema)

      DataLineage(
        appId,
        appName,
        timestamp,
        "2.3.0",
        Seq(
          BatchWrite(OperationProps(randomUUID, "Write", Seq(md3.id), mdOutput.id), "parquet", path, append, Map.empty, Map.empty),
          Generic(OperationProps(randomUUID, "Filter", Seq(md4.id), md2.id), "rawString2"),
          BatchRead(OperationProps(randomUUID, "BatchRead", Seq(mdInput.id), md4.id), "csv", Seq(MetaDataSource("hdfs://catSizes/brownCats", Seq(randomUUID)))),
          Generic(OperationProps(randomUUID, "Filter", Seq(md4.id), md1.id), "rawString4"),
          Generic(OperationProps(randomUUID, "Union", Seq(md1.id, md2.id), md3.id), "rawString1")
        ),
        Seq(mdOutput, md1, md2, md3, md4),
        attributes,
        dataTypes
      )
    }

  def shortLineage(): DataLineage = {
    val dataTypes = Seq()
    val aSchema = splinemodel.Schema(Seq())
    val mdOutput = MetaDataset(randomUUID, aSchema)
    DataLineage(
      "app1",
      "appName1",
      System.currentTimeMillis(),
      "2.3.0",
      Seq(
        BatchWrite(OperationProps(randomUUID, "Union", Seq(), mdOutput.id), "parquet", "nopath", append = false)
      ),
      Seq(mdOutput),
      Seq(),
      dataTypes
    )
  }

}
