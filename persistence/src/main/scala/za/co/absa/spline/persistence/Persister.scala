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

import java.util.UUID.randomUUID

import com.arangodb.ArangoDatabase
import com.arangodb.model.TransactionOptions
import com.arangodb.velocypack.module.scala.VPackScalaModule
import com.arangodb.velocypack.{VPack, VPackSlice}
import org.slf4j.LoggerFactory
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.Persister._
import za.co.absa.spline.persistence.model.DataSource
import za.co.absa.spline.{model => splinemodel}

import scala.annotation.tailrec
import scala.collection.JavaConverters._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.util.{Failure, Success, Try}

class Persister(db: ArangoDatabase, debug: Boolean = false) {

  private val log = LoggerFactory.getLogger(getClass)

  def save(dataLineage: DataLineage) = Future {
    val attempts = saveWithRetry(dataLineage, TotalRetriesOnConflictingKey)
    if (attempts.isFailure) {
       throw new IllegalArgumentException("Exhausted retries.", attempts.failed.get)
    }
  }

  @tailrec
  private def saveWithRetry(dataLineage: DataLineage, retries: Int): Try[Unit] = {
    val left = retries - 1
    Try(attemptSave(dataLineage))
      match {
        case s: Success[Unit] => s
        case Failure(RetryableException(e)) =>
            if (retries == 0) {
              Failure(e)
            } else {
              log.warn(s"Ignoring ${e.getClass.getSimpleName} and $left left. Exception message: ${e.getMessage}.")
              saveWithRetry(dataLineage, left)
            }
        case Failure(e) =>
          throw new IllegalArgumentException(s"Unexpected exception aborting remaining $left retries.", e)
      }
  }

  private def attemptSave(dataLineage: DataLineage): Unit = {
    val uris = referencedUris(dataLineage)
    val uriExistingKey = queryExistingToKey(uris)
    val uriToNewKey = generateNewKeys(uris, uriExistingKey)
    val uriToKey = uriExistingKey ++ uriToNewKey
    val params = DataLineageTransactionParams
      .create(dataLineage, uriToNewKey, uriToKey)
    val options = new TransactionOptions()
      .params(params) // Serialized hash map with json string values.
      .writeCollections(params.fields: _*)
      .allowImplicit(false)
    val action: String = s"""
        |function (params) {
        |  var db = require('internal').db;
        |  ${params.saveCollectionsJs}
        |}
        |""".stripMargin
    db.transaction(action, classOf[Void], options)
  }

  private def referencedUris(dataLineage: DataLineage) = {
    dataLineage.operations
      .flatMap(op => op match {
        case r: splinemodel.op.Read => r.sources.map(s => s.path)
        case w: splinemodel.op.Write => Some(w.path)
        case _ => None })
      .distinct
  }

  private def queryExistingToKey(uris: Seq[String]): Map[String, String] = {
    val urisList = uris
      .map(uri => "\"" + uri + "\"")
      .mkString(", ")
    val query = s"for ds in dataSource filter ds.uri in [$urisList] return ds"
    val result = db.query(query, classOf[VPackSlice])
    result
      .asInstanceOf[java.util.Iterator[VPackSlice]]
      .asScala
      .map(vpack.deserialize[DataSource](_, classOf[DataSource]))
      .map(ds => ds.uri -> ds._key.get)
      .toMap
  }

  private def generateNewKeys(uris: Seq[String], uriToExistingKey: Map[String, String]) = {
    (uris.toSet -- uriToExistingKey.keys)
        .map(_ -> randomUUID.toString)
        .toMap
  }

}


object Persister {

  def create(arangoUri: String): Persister =
    new Persister(ArangoDatabaseFacade.create(arangoUri))

  private val TotalRetriesOnConflictingKey = 5

  val vpack: VPack = new VPack.Builder()
    .registerModule(new VPackScalaModule)
    .build
}
