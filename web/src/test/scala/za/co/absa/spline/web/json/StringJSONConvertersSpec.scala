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

package za.co.absa.spline.web.json

import java.io.StringWriter
import java.net.URI
import java.util.UUID

import org.json4s.native.JsonMethods._
import org.mockito.Mockito._
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.model._
import za.co.absa.spline.persistence.api.CloseableIterable

class StringJSONConvertersSpec extends FlatSpec with Matchers with MockitoSugar {

  import StringJSONConverters._

  val aUUID: UUID = UUID fromString "7d46f047-da82-42fa-8e4b-4b085a210985"

  it should "serialize Foo" in {
    val json = Foo(aUUID, new URI("http://example.com"), aUUID.toString :: Nil).toJson
    json shouldEqual s"""{"id":"$aUUID","uri":"http://example.com","seq":["$aUUID"]}"""
  }

  it should "serialize array of Foo's" in {
    val json = Seq(
      Foo(aUUID, new URI("http://example.com"), aUUID.toString :: Nil),
      Foo(aUUID, new URI("http://example.com"), aUUID.toString :: Nil)).toJsonArray

    json shouldEqual
      s"""[
         |{"id":"$aUUID","uri":"http://example.com","seq":["$aUUID"]},
         |{"id":"$aUUID","uri":"http://example.com","seq":["$aUUID"]}
         |]""".stripMargin.replaceAll("[\n\r]", "")
  }

  it should "deserialize Foo" in {
    val foo = s"""{"id":"$aUUID","uri":"http://example.com","seq":["$aUUID"]}""".fromJson[Foo]
    foo shouldEqual Foo(aUUID, new URI("http://example.com"), aUUID.toString :: Nil)
  }

  it should "deserialize array of Foo's" in {
    val foos = s"""[
                  |{"id":"$aUUID","uri":"http://example.com","seq":["$aUUID"]},
                  |{"id":"$aUUID","uri":"http://example.com","seq":["$aUUID"]}
                  |]""".stripMargin.fromJsonArray[Foo]
    foos shouldEqual Seq(
      Foo(aUUID, new URI("http://example.com"), aUUID.toString :: Nil),
      Foo(aUUID, new URI("http://example.com"), aUUID.toString :: Nil)
    )
  }

  it should "serialize OperationProps" in {
    val testProps = op.OperationProps(aUUID, "foo", Seq(aUUID), aUUID)
    val serializedProps = s"""{"id":"$aUUID","name":"foo","inputs":["$aUUID"],"output":"$aUUID"}"""
    parse(testProps.toJson) shouldEqual parse(serializedProps)
  }

  it should "serialize objects to JSON in a stream fashion" in {
    val writer = new StringWriter()
    ("a" -> "b") asJsonInto writer
    writer.toString shouldEqual """{"a":"b"}"""
  }

  it should "serialize collections to JSON Array in a stream fashion" in {
    val writer = new StringWriter()
    Nil asJsonArrayInto writer
    writer.toString shouldEqual "[]"
  }

  it should "serialize CloseableIterable to JSON Array in a stream fashion and close it when done" in {
    val writer = new StringWriter()
    val closeObserver = mock[() => Unit]
    new CloseableIterable(Iterator("a", "b"), closeObserver()) asJsonArrayInto writer
    writer.toString shouldEqual """["a","b"]"""
    verify(closeObserver)()
  }

}

case class Foo(id: UUID, uri: URI, seq: Seq[String])