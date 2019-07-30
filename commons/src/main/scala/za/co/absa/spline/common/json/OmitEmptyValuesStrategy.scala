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

import org.json4s.JsonAST.JString
import org.json4s.prefs.EmptyValueStrategy
import org.json4s.{JArray, JField, JNothing, JNull, JObject, JValue}

object OmitEmptyValuesStrategy extends EmptyValueStrategy {

  private val replaceEmptyWithJNothing: PartialFunction[JValue, JNothing.type] = {
    case JNull => JNothing
    case JString("") => JNothing
    case JArray(items) if items.isEmpty => JNothing
    case JObject(fields) if fields.isEmpty => JNothing
  }

  private def recursively(fn: JValue => JValue): PartialFunction[JValue, JValue] = {
    case JArray(items) => JArray(items map fn)
    case JObject(fields) => JObject(fields map {
      case JField(name, v) => JField(name, fn(v))
    })
  }

  private val recursivelyReplaceEmpty: JValue => JValue =
    replaceEmptyWithJNothing
      .orElse(recursively(replaceEmpty))
      .orElse(PartialFunction(identity))

  override def replaceEmpty(value: JValue): JValue = recursivelyReplaceEmpty(value)

  override def noneValReplacement: Option[AnyRef] = None
}
