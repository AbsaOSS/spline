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

package za.co.absa.spline.web.json

import java.net.URI

import org.json4s.ext.UUIDSerializer
import org.json4s.native.Serialization
import org.json4s.{CustomSerializer, DateFormat, DefaultFormats, Formats, FullTypeHints, JNull, JString, Serializer}
import za.co.absa.spline.common.ReflectionUtils.subClassesOf
import za.co.absa.spline.common.TypeFreaks._
import za.co.absa.spline.model._

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

  implicit val formats: Formats = SplineFormats

  implicit class JsonToModel(json: String) {

    def fromJson[T <: AnyRef : Manifest]: T = Serialization.read(json)

    def fromJsonArray[T <: AnyRef : Manifest]: Seq[T] = Serialization.read[Seq[T]](json)
  }

  implicit class CollectionToJson[T <: AnyRef : Manifest](xs: Traversable[T]) {
    def toJsonArray: String = Serialization.write(xs)
  }

  implicit class EntityToJson[T <: AnyRef : `not a subtype of`[Traversable[_]]#λ : Manifest](entity: T) {
    def toJson: String = Serialization.write(entity)
  }


}
