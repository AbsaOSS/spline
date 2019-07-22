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
package za.co.absa.spline.producer.service.model

import java.lang.Iterable

import com.arangodb.model.TransactionOptions
import com.arangodb.velocypack.VPackSlice
import za.co.absa.spline.persistence.Persister

import scala.collection.JavaConverters._
import scala.language.implicitConversions

abstract class ArangoParams {

  def fields: Array[String] = getClass
    .getDeclaredFields
    .map(_.getName)
    .filter(_ != "$outer")

  def saveCollectionsJs: String =
    fields.map {
      case field@"execution" => s"""
        return db.$field.insert(params.$field[0]);
        """.stripMargin
      case field => s"""
        params.$field.forEach(o => db.$field.insert(o));
        """
    }.mkString("\n")

  def transactionOptions: TransactionOptions = {
    new TransactionOptions()
      .params(this) // Serialized hash map with json string values.
      .writeCollections(this.fields: _*)
      .allowImplicit(false)
  }

  def insertScript: String =
    s"""
       |function (params) {
       |  const db = require('internal').db;
       |  ${this.saveCollectionsJs}
       |}
       |""".stripMargin
}

object ArangoParams {

  def ser(it: scala.collection.Iterable[AnyRef]): Iterable[VPackSlice] = it.map(Persister.vpack.serialize).asJava

  def ser(a: Any): Iterable[VPackSlice] = Seq(a).map(Persister.vpack.serialize).asJava
}
