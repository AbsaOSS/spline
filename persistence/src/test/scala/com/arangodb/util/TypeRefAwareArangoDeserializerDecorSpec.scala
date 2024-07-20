/*
 * Copyright 2024 ABSA Group Limited
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

package com.arangodb.util

import com.arangodb.mapping.ArangoJack
import com.arangodb.util.TypeRefAwareArangoDeserializerDecorSpec._
import com.arangodb.velocypack.{VPackParser, VPackSlice}
import com.fasterxml.jackson.core.`type`.TypeReference
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import org.mockito.Mockito.{verify, verifyNoMoreInteractions}
import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import org.scalatestplus.mockito.MockitoSugar.mock

import java.lang.reflect.Type
import scala.reflect.ClassTag

class TypeRefAwareArangoDeserializerDecorSpec extends AnyFlatSpec with Matchers {

  private val vpackParser = new VPackParser.Builder().build

  behavior of "deserialize(VPackSlice, Type) method"

  it should "delegate to underlying ArangoJack deserializer unconditionally" in {
    val dummyVPack = mock[VPackSlice]
    val dummyType = mock[Type]
    val mockArangoDeserializer = mock[ArangoDeserializer]
    val deserializerDecorator = new TypeRefAwareArangoDeserializerDecor(mockArangoDeserializer)

    deserializerDecorator.deserialize(dummyVPack, dummyType)

    verify(mockArangoDeserializer).deserialize(dummyVPack, dummyType)
    verifyNoMoreInteractions(mockArangoDeserializer)
  }

  behavior of "deserialize(VPackSlice, TypeReference) method"

  it should "delegate string types to the underlying deserializer" in {
    val dummyVPack = mock[VPackSlice]
    val stringTypeRef = new TypeReference[String] {}
    val mockArangoDeserializer = mock[ArangoDeserializer]
    val deserializerDecorator = new TypeRefAwareArangoDeserializerDecor(mockArangoDeserializer)

    deserializerDecorator.deserialize(dummyVPack)(stringTypeRef)

    verify(mockArangoDeserializer).deserialize(dummyVPack, classOf[String])
    verifyNoMoreInteractions(mockArangoDeserializer)
  }

  it should "deserialize generic types" in {
    val arangoJack = new ArangoJack {
      configure(mapper => mapper.registerModule(new DefaultScalaModule))
    }
    val deserializerDecorator = new TypeRefAwareArangoDeserializerDecor(arangoJack)

    val result = deserializerDecorator.deserialize[GenericContainer[Blah]](vpackParser.fromJson(
      """
        |{
        |  "offset": 42,
        |  "totalCount": 777,
        |  "item": {"a": 0, "b": "bbb"},
        |  "items": [
        |    {"a": 111, "b": "foo"},
        |    {"a": 222, "b": "bar"}
        |  ]
        |}
        |""".stripMargin
    ))

    result shouldEqual GenericContainer(
      item = Blah(0, "bbb"),
      items = Seq(Blah(111, "foo"), Blah(222, "bar"))
    )
  }
}

object TypeRefAwareArangoDeserializerDecorSpec {
  implicit val typeRef: TypeReference[GenericContainer[Blah]] = new TypeReference[GenericContainer[Blah]]() {}

  case class GenericContainer[T: ClassTag](
    items: Seq[T],
    item: T
  )

  case class Blah(a: Int, b: String)
}
