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

import za.co.absa.spline.common.TypeFreaks._
import salat.{Context, grater}

object StringJSONConverters {

  implicit class JsonToModel(json: String)(implicit ctx: Context) {

    def fromJson[T <: AnyRef : Manifest]: T = grater[T] fromJSON json

    def fromJsonArray[T <: AnyRef : Manifest]: Seq[T] = grater[T] fromJSONArray json
  }

  implicit class CollectionToJson[T <: AnyRef : Manifest](xs: Traversable[T])(implicit ctx: Context) {
    def toJsonArray: String = grater[T] toCompactJSONArray xs
  }

  implicit class EntityToJson[T <: AnyRef : `not a subtype of`[Traversable[_]]#λ : Manifest](entity: T)(implicit ctx: Context) {
    def toJson: String = grater[T] toCompactJSON entity
  }


}
