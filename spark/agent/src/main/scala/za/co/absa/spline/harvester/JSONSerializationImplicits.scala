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

package za.co.absa.spline.harvester

import org.json4s.Extraction.decompose
import org.json4s.ext.JavaTypesSerializers
import org.json4s.jackson.JsonMethods.{compact, render}
import org.json4s.jackson.Serialization.read
import org.json4s.{DateFormat, DefaultFormats, Formats, ShortTypeHints, TypeHints}
import za.co.absa.spline.common.json.OmitEmptyValuesStrategy
import za.co.absa.spline.model

import scala.reflect.Manifest

object JSONSerializationImplicits {

  import za.co.absa.spline.common.ReflectionUtils._

  private implicit val formats: Formats = {
    val formats: Formats = new Formats {
      override val dateFormat: DateFormat = DefaultFormats.lossless.dateFormat
      override val typeHintFieldName: String = "_typeHint"
      override val typeHints: TypeHints = ShortTypeHints(
        subClassesOf[model.dt.DataType] ++
          subClassesOf[model.expr.Expression])
    }
    formats
      .withEmptyValueStrategy(OmitEmptyValuesStrategy)
      .++(JavaTypesSerializers.all)
  }

  implicit class EntityToJson[A <: AnyRef](entity: A) {
    def toJson: String = compact(render(decompose(entity)))
  }

  implicit class JsonToEntity(json: String) {
    def fromJson[A: Manifest]: A = read(json)
  }

}
