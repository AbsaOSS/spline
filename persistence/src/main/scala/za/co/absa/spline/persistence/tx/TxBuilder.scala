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

package za.co.absa.spline.persistence.tx

import com.arangodb.ArangoDatabaseAsync
import com.arangodb.model.TransactionOptions
import za.co.absa.spline.persistence.model.{ArangoDocument, CollectionDef}
import za.co.absa.spline.persistence.tx.TxBuilder.ArangoTxImpl

import scala.compat.java8.FutureConverters._
import scala.concurrent.Future

sealed trait Query

case class InsertQuery(collectionDef: CollectionDef, documents: ArangoDocument*) extends Query

class TxBuilder {

  private var queries: Seq[Query] = Vector.empty

  def addQuery(q: Query): this.type = {
    queries :+= q
    this
  }

  def buildTx: ArangoTx = new ArangoTxImpl(this)

  private def generateJs(): String = {
    val statements = queries.zipWithIndex.map {
      case (InsertQuery(col, _*), _) =>
        s"_params.${col.name}.forEach(o => _db.${col.name}.insert(o));"
    }
    s"""
       |function (_params) {
       |  const _db = require('internal').db;
       |  ${statements.mkString("\n")}
       |}
       |""".stripMargin
  }

  private def options: TransactionOptions = {
    val writeCollections = queries
      .collect({ case InsertQuery(col, docs@_*) => col.name -> docs.toVector })
      .toMap
    new TransactionOptions()
      .params(writeCollections)
      .writeCollections(writeCollections.keys.toArray: _*)
      .allowImplicit(false)
  }

}

object TxBuilder {

  private class ArangoTxImpl(txBuilder: TxBuilder) extends ArangoTx {
    override def execute(db: ArangoDatabaseAsync): Future[Unit] =
      db.transaction(txBuilder.generateJs(), classOf[Unit], txBuilder.options).toScala
  }

}
