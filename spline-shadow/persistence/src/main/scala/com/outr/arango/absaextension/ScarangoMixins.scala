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

package com.outr.arango.absaextension

import com.outr.arango.{ArangoDocument, DocumentOption, Query, Value}
import io.circe.syntax._
import io.circe.{Decoder, Encoder, Printer}

import scala.concurrent.Future

trait ScarangoMixins {

  implicit class ArangoDocumentWrapper(doc: ArangoDocument) {

    def upsertByQuery[T <: DocumentOption : Encoder : Decoder, S: Encoder](document: T, search: S = "{ _key: @key }"): Future[T] = {
      val searchJsonString = Printer.spaces2.pretty(search.asJson)
      val jsonString = Printer.spaces2.pretty(document.asJson)
      val queryString =
        s"""
           |UPSERT $searchJsonString
           |INSERT $jsonString
           |UPDATE $jsonString IN ${doc.collection.collection}
           |RETURN NEW
       """.stripMargin
      val query = Query(queryString, Map("key" -> Value.string(document._key.get)))
      doc.collection.db.call[T](query)
    }
  }

}

object ScarangoMixins extends ScarangoMixins