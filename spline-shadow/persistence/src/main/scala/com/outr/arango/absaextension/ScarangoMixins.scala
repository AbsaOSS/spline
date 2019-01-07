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