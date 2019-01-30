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

package za.co.absa.spline.persistence

import java.net.URI
import java.util.UUID.randomUUID

import com.arangodb.{ArangoDBException, ArangoDatabase}
import com.arangodb.model.TransactionOptions
import io.circe.generic.semiauto.deriveDecoder
import io.circe.parser.parse
import org.slf4j.LoggerFactory
import za.co.absa.spline.model.arango.DataSource
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.{model => splinemodel}

import scala.util.Try

// import com.outr.arango.managed._ needed for decoder creation
import com.outr.arango.managed._

import scala.collection.JavaConverters._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class Persister(db: ArangoDatabase, debug: Boolean = false) {

  private val log = LoggerFactory.getLogger(getClass)
  private val TotalRetriesOnConflictingKey = 3

  def save(dataLineage: DataLineage) = Future {
    saveWithRetry(dataLineage)
  }


  private def saveWithRetry(dataLineage: DataLineage): Unit = {
    val results: Seq[Try[Throwable]] = for {
        retries <- TotalRetriesOnConflictingKey to 1 by -1
      } yield {
        Try(attemptSave(dataLineage))
          // Immediately returns on success.
          .map(_ => return)
          .recover(logOrThrow(retries))
      }
    throw new IllegalArgumentException("Exhausted retries.", results.reverse.head.get)
  }

  private def logOrThrow(retries: Int): PartialFunction[Throwable, Throwable] = {
    case e if
    e.isInstanceOf[ArangoDBException]
      && e.asInstanceOf[ArangoDBException].getErrorNum == 1210 =>
      log.warn(s"Ignoring ${e.getClass.getSimpleName} and $retries left. Exception message: ${e.getMessage}.")
      e
    case e: Exception =>
      throw new IllegalArgumentException(s"Unexpected exception aborting remaining $retries retries.", e)
  }

  private def attemptSave(dataLineage: DataLineage): Unit = {
    val uris = referencedUris(dataLineage)
    val uriExistingKey = queryExistingToKey(uris)
    val uriToNewKey = filterUriToNewKey(uris, uriExistingKey)
    val uriToKey = uriExistingKey ++ uriToNewKey
    val params = DataLineageTransactionParams
      .create(dataLineage, uriToNewKey, uriToKey)
    val options = new TransactionOptions()
      .params(params) // Serialized hash map with json string values.
      .writeCollections(params.fields: _*)
    val action: String =
        "function (params) {\n" +
        "  var db = require('internal').db;\n" +
           params.saveCollectionsJs +
        "}\n"
    db.transaction(action, classOf[Void], options)
  }

  def onDebug(varName: String): String = {
    if (debug) {
      s"  console.info('$varName: ' + JSON.stringify($varName));\n"
    } else {
      ""
    }
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
    val result = db.query(query, classOf[String])
    result
      .asInstanceOf[java.util.Iterator[String]]
      .asScala
      .map(s => {
        val json = parse(s).right.get
        deriveDecoder[DataSource]
          .decodeJson(json)
          .right.get
      })
      .map(ds => ds.uri -> ds._key.get)
      .toMap
  }

  private def filterUriToNewKey(uris: Seq[String], uriToExistingKey: Map[String, String]) = {
    uris
      .filter(uri => !uriToExistingKey.keys.exists(_ == uri))
      .map(uri => uri -> randomUUID.toString)
      .toMap
  }

}


object Persister {

  def create(arangoUri: String): Persister =
    new Persister(ArangoFactory.create(new URI(arangoUri)))

}
