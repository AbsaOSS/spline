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

package za.co.absa.spline.gateway.rest.messageconverter

import java.io.{Reader, Writer}
import java.lang.reflect.Type
import java.net.URI

import org.json4s.JsonAST.{JNull, JString}
import org.json4s.ext.UUIDSerializer
import org.json4s.native.Serialization
import org.json4s.reflect.ManifestFactory
import org.json4s.{CustomSerializer, DateFormat, DefaultFormats, Formats, FullTypeHints, Serializer}
import org.springframework.http.converter.json.AbstractJsonHttpMessageConverter
import za.co.absa.spline.common.ReflectionUtils.subClassesOf
import za.co.absa.spline.model._

class Json4sHttpMessageConverter extends AbstractJsonHttpMessageConverter {

  import Json4sHttpMessageConverter._

  override def supports(clazz: Class[_]): Boolean = {
    reflect.runtime.currentMirror.classSymbol(clazz).isCaseClass
  }

  override def writeInternal(o: AnyRef, `type`: Type, writer: Writer): Unit = {
    Serialization.write(o, writer)
  }

  override def readInternal(resolvedType: Type, reader: Reader): AnyRef = {
    val mf = ManifestFactory.manifestOf(resolvedType)
    Serialization.read(reader)(formats, mf).asInstanceOf[AnyRef]
  }
}

object Json4sHttpMessageConverter {
  private implicit val formats: Formats = SplineFormats

  private object SplineFormats extends Formats {
    val dateFormat: DateFormat = DefaultFormats.lossless.dateFormat

    override def typeHintFieldName: String = "_typeHint"

    override val typeHints = FullTypeHints(
      subClassesOf[op.Operation]
        ++ subClassesOf[expr.Expression]
        ++ subClassesOf[dt.DataType])

    override val customSerializers: List[Serializer[_]] =
      UUIDSerializer :: URISerializer :: super.customSerializers
  }

  private object URISerializer extends CustomSerializer[URI](_ =>
    ( {
      case JString(s) => new URI(s)
      case JNull => null
    }, {
      case uri: URI => JString(uri.toString)
    }))

}