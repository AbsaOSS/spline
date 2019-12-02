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

import org.json4s.Extraction.decompose
import org.json4s.Formats
import org.json4s.jackson.JsonMethods.{compact, render}
import org.json4s.jackson.Serialization.read
import za.co.absa.spline.common.json.format.FormatsBuilder

import scala.reflect.Manifest

trait AbstractJsonSerDe {
  this: FormatsBuilder =>

  private[this] implicit val _formats: Formats = formats

  implicit class EntityToJson[A <: AnyRef](entity: A) {
    def toJson: String = compact(render(decompose(entity)))

    def toJsonAs[B: Manifest]: B = render(decompose(entity)).extract[B]
  }

  implicit class JsonToEntity(json: String) {
    def fromJson[A: Manifest]: A = read(json)
  }

}
