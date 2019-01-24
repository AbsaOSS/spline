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

import java.io
import java.io.Writer
import java.net.URI

import org.json4s.ext.UUIDSerializer
import org.json4s.native.Serialization
import org.json4s.{CustomSerializer, DateFormat, DefaultFormats, Formats, FullTypeHints, JNull, JString, Serializer}
import za.co.absa.spline.common.ReflectionUtils.subClassesOf
import za.co.absa.spline.common.TypeConstraints._
import za.co.absa.spline.model._
import za.co.absa.spline.persistence.api.CloseableIterable

/**
  * Implicit JSON serializer/deserializer
  * <p>
  * Usage examples:
  * <code><pre>
  * import StringJSONConverters._
  *
  * // Serialize object to JSON
  * val myObject: FooBar = ???
  * val json:String == myObject.toJson
  *
  * // Deserialize from JSON
  * val jsonString: String = """{ "foo":42, "bar":777 }"""
  * val myObject: FooBar = jsonString.fromJson[FooBar]
  * </pre></code>
  */
object StringJSONConverters {

  object URISerializer extends CustomSerializer[URI](_ =>
    ( {
      case JString(s) => new URI(s)
      case JNull => null
    }, {
      case uri: URI => JString(uri.toString)
    }))

  object SplineFormats extends Formats {
    val dateFormat: DateFormat = DefaultFormats.lossless.dateFormat

    override def typeHintFieldName: String = "_typeHint"

    override val typeHints = FullTypeHints(
      subClassesOf[op.Operation]
        ++ subClassesOf[expr.Expression]
        ++ subClassesOf[dt.DataType])

    override val customSerializers: List[Serializer[_]] =
      UUIDSerializer :: URISerializer :: super.customSerializers
  }

  private implicit val formats: Formats = SplineFormats

  implicit class JsonToModel(json: String) {

    def fromJson[T <: AnyRef : Manifest]: T = Serialization.read(json)

    def fromJsonArray[T <: AnyRef : Manifest]: Seq[T] = Serialization.read[Seq[T]](json)
  }


  implicit class CloseableIterableToJson[T <: AnyRef with io.Serializable : Manifest](ci: CloseableIterable[T]) {

    import za.co.absa.spline.common.ARM._

    def toJsonArray: String =
      using(ci) { ci => Serialization.write(ci.iterator.toStream) }

    def asJsonArrayInto(out: Writer): Unit =
      using(ci) { ci => Serialization.write(ci.iterator.toStream, out) }
  }

  implicit class CollectionToJson[T <: AnyRef with io.Serializable : Manifest](xs: Traversable[T]) {
    def toJsonArray: String = Serialization.write(xs)

    def asJsonArrayInto(out: Writer): Unit = Serialization.write(xs, out)
  }

  implicit class EntityToJson[T <: AnyRef with io.Serializable : not[Traversable[_]]#λ : Manifest](entity: T) {
    def toJson: String = Serialization.write(entity)

    def asJsonInto(out: Writer): Unit = Serialization.write(entity, out)
  }


}
