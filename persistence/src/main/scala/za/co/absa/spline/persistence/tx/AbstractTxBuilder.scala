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

import com.arangodb.model.TransactionOptions

abstract class AbstractTxBuilder() {

  protected var queries: Seq[Query] = Vector.empty

  def buildTx: ArangoTx

  def addQuery(q: Query): this.type = {
    queries :+= q
    this
  }

  protected def txOptions: TransactionOptions = {
    val params = queries
      .map({
        case nq: NativeQuery => nq.params
        case iq: InsertQuery => iq.documents.toVector
        case uq: UpdateQuery => uq.data
      })
    val writeCollections = queries
      .flatMap(_.collectionDefs)
      .map(_.name)
      .distinct
    new TransactionOptions()
      .params(params)
      .writeCollections(writeCollections: _*)
      .allowImplicit(false)
  }

}
