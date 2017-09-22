/*
 * Copyright 2017 Barclays Africa Group Limited
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

package za.co.absa.spline.web.salat

import java.net.URI
import java.util.UUID
import java.util.UUID.randomUUID

import org.json4s.native.JsonMethods._
import org.scalatest.{FlatSpec, Matchers}
import salat.grater
import za.co.absa.spline.model.Attribute
import za.co.absa.spline.model.dt.Simple
import za.co.absa.spline.model.expr.{AttrRef, AttributeRemoval}

class JSONSalatContextSpec extends FlatSpec with Matchers {

  val aUUID: UUID = UUID fromString "7d46f047-da82-42fa-8e4b-4b085a210985"

  import JSONSalatContext._

  it should "serialize" in {
    val json = grater[Foo] toCompactJSON Foo(aUUID, new URI("http://example.com"))
    json shouldEqual """{"id":"7d46f047-da82-42fa-8e4b-4b085a210985","uri":"http://example.com"}"""
  }

  it should "deserialize" in {
    val foo = grater[Foo] fromJSON """{"id":"7d46f047-da82-42fa-8e4b-4b085a210985","uri":"http://example.com"}"""
    foo shouldEqual Foo(aUUID, new URI("http://example.com"))
  }

  it should "serialize AttributeRemoval without any loss of information" in {
    val sourceObj = AttributeRemoval(AttrRef(Attribute(randomUUID, "test", Simple("simpleType", nullable = true))))
    val serializedObj = """{"_typeHint":"za.co.absa.spline.model.expr.AttributeRemoval","textualRepresentation":"- test","dataType":{"_typeHint":"za.co.absa.spline.model.dt.Simple","name":"simpleType","nullable":true},"children":[{"_typeHint":"za.co.absa.spline.model.expr.AttributeReference","attributeId":123,"attributeName":"test","textualRepresentation":"test","dataType":{"_typeHint":"za.co.absa.spline.model.dt.Simple","name":"simpleType","nullable":true},"children":[],"exprType":"AttributeReference"}],"exprType":"AttributeRemoval"}"""

    val json = grater[AttributeRemoval] toCompactJSON sourceObj

    parse(json) shouldEqual parse(serializedObj)
  }

}

case class Foo(id: UUID, uri: URI)