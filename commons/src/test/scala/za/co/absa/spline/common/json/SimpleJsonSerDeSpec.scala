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

package za.co.absa.spline.common.json

import java.util
import java.util.UUID

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import za.co.absa.spline.common.json.SimpleJsonSerDeSpec._

class SimpleJsonSerDeSpec extends AnyFlatSpec with Matchers with SimpleJsonSerDe {

  behavior of "serializer"

  it should "serialize simple types" in {
    "some test string".toJson should equal(""""some test string"""")
    Integer.valueOf(7).toJson should equal("7")
    Boolean.box(false).toJson should equal("false")
  }

  it should "serialize UUID" in {
    UUID.fromString("8460b4a5-fcb9-4ad1-845d-a417b300f33a").toJson should equal(""""8460b4a5-fcb9-4ad1-845d-a417b300f33a"""")
  }

  it should "serialize collections" in {
    Array(1, 2, 3).toJson should equal("""[1,2,3]""")
    util.Arrays.asList(1, 2, 3).toJson should equal("""[1,2,3]""")
    Seq(1, 2, 3).toJson should equal("""[1,2,3]""")
    Map("a" -> 1, "b" -> 2).toJson should equal("""{"a":1,"b":2}""")
  }

  it should "serialize objects" in {
    Foo().toJson should equal("""{}""")
    Foo(Some(42)).toJson should equal("""{"any":42}""")
    Foo(Some(Bar)).toJson should equal("""{}""")
    Foo(Some(Foo(Some(7)))).toJson should equal("""{"any":{"any":7}}""")
    Foo(anySeq = Seq(Map("a" -> 1, "b" -> 2), Map("c" -> 3))).toJson should equal("""{"anySeq":[{"a":1,"b":2},{"c":3}]}""")
    Foo(quxSeq = Seq(Qux(1), Qux(2))).toJson should equal("""{"quxSeq":[{"z":1},{"z":2}]}""")
  }

  it should "omit empty values" in {
    Bar(None, map = Map(
      "a" -> null,
      "b" -> None,
      "c" -> Nil,
      "d" -> "",
      "e" -> new AnyRef)
    ).toJson should be("""{"map":{}}""")
  }

  behavior of "deserializer"

  it should "deserialize simple types" in {
    "\"s\"".fromJson[String] should equal("s")
    "12345".fromJson[Int] should equal(12345)
    "false".fromJson[Boolean] should be(false)
  }

  it should "deserialize UUID" in {
    """"8460b4a5-fcb9-4ad1-845d-a417b300f33a"""".fromJson[UUID] should equal(UUID.fromString("8460b4a5-fcb9-4ad1-845d-a417b300f33a"))
  }

  it should "deserialize collections" in {
    """[1,2,3,4,5,6]""".fromJson[Array[Int]] should equal(Array(1, 2, 3, 4, 5, 6))
    """{"a":1,"b":2}""".fromJson[Map[String, _]] should equal(Map("a" -> 1, "b" -> 2))
    """[{"z":1},{"z":2}]""".fromJson[Array[Qux]] should equal(Array(Qux(1), Qux(2)))
  }

  it should "deserialize Foo" in {
    """{}""".fromJson[Foo] should equal(Foo())
    """{"any":42}""".fromJson[Foo] should equal(Foo(Some(42)))
    """{"any":{}}""".fromJson[Foo] should equal(Foo(Some(Map())))
    """{"any":{"any":7}}""".fromJson[Foo] should equal(Foo(Some(Map("any" -> 7))))
    """{"anySeq":[{"a":1, "b":2},{"c":3}]}""".fromJson[Foo] should equal(Foo(anySeq = Seq(Map("a" -> 1, "b" -> 2), Map("c" -> 3))))
    """{"quxSeq":[{"z":1},{"z":2}]}""".fromJson[Foo] should equal(Foo(quxSeq = Seq(Qux(1), Qux(2))))
  }

  it should "deserialize Bar" in {
    """{}""".fromJson[Bar] should equal(Bar(None, Map.empty))
    """{"foo":{"any":42}}""".fromJson[Bar] should equal(Bar(Some(Foo(Some(42)))))
    """{"map":{"z":[42]}}""".fromJson[Bar] should equal(Bar(None, Map("z" -> Seq(42))))
  }
}

object SimpleJsonSerDeSpec {

  case class Foo(any: Option[Any] = None, anySeq: Seq[Any] = Nil, quxSeq: Seq[Qux] = Nil)

  case class Bar(foo: Option[Foo], map: Map[String, Any] = Map.empty)

  case class Qux(z: Int)

}
