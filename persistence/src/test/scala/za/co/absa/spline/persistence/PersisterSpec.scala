/*
 * Copyright 2019 ABSA Group Limited
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

package za.co.absa.spline.persistence

import java.lang.Iterable
import java.util

import com.arangodb.ArangoDBException
import com.arangodb.model.TransactionOptions
import com.arangodb.velocypack.VPackSlice
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{AsyncFunSpec, BeforeAndAfterAll, Matchers}
import za.co.absa.spline.persistence.model.DataSource

import scala.collection.JavaConverters._
import scala.compat.java8.FutureConverters._
import scala.language.implicitConversions

class PersisterSpec
  extends AsyncFunSpec
    with Matchers
    with MockitoSugar
    with BeforeAndAfterAll {

  private val connectionURL = ArangoConnectionURL(System.getProperty("test.spline.arangodb.url"))
  private val arangoFacade = new ArangoDatabaseFacade(connectionURL)

  import arangoFacade.db

  override protected def afterAll(): Unit =
    try db.arango.shutdown()
    finally super.afterAll()

  describe("Persister") {

    it("Persister should be able to insert an example lineage to an empty database") {
      for {
        _ <- ArangoInit.initialize(connectionURL, dropIfExists = true)
        saved <- Persister.execute(attemptSave(createDataSources()))
        thrown: ArangoDBException <- recoverToExceptionIf[ArangoDBException] {
          Persister.execute(attemptSave(createDataSources()))
        }
      } yield {
        saved.get("_id") should be("dataSource/92242e53-eaea-4c5b-bc90-5e174ab3e898")
        thrown.getErrorMessage should include("unique constraint violated")
      }
    }
  }

  private def attemptSave(params: Any) = {
    val insertScript: String =
      s"""
         |function (params) {
         |  const db = require('internal').db;
         |  return db.dataSource.insert(params[0]);
         |}
         |""".stripMargin
    val transactionOptions = new TransactionOptions()
      .params(params) // Serialized hash map with json string values.
      .writeCollections("dataSource")
      .allowImplicit(false)
    db.transaction(insertScript, classOf[util.HashMap[String, String]], transactionOptions).toScala
  }

  private def createDataSources(): Iterable[VPackSlice] = {
    Seq(
      DataSource("hdfs//blabla", "92242e53-eaea-4c5b-bc90-5e174ab3e898")
    ).map(Persister.vpack.serialize).asJava
  }

}
