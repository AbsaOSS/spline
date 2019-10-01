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

package za.co.absa.spline.harvester.json

import org.json4s.{DefaultFormats, Formats, ShortTypeHints}
import za.co.absa.spline.common.ReflectionUtils._
import za.co.absa.spline.common.json.format.FormatsBuilder
import za.co.absa.spline.harvester.json.ShortTypeHintForSpline03ModelSupport._
import za.co.absa.spline.model

import scala.reflect.runtime.universe._

trait ShortTypeHintForSpline03ModelSupport extends FormatsBuilder {
  override protected def formats: Formats = createFormats(Map(
    "typeHintFieldName" -> "_typeHint",
    "typeHints" -> ShortTypeHints(
      subClassesOf[model.dt.DataType] ++
        subClassesOf[model.expr.Expression]
    ),
    "dateFormatterFn" -> DefaultFormats.losslessDate.get _))
}

object ShortTypeHintForSpline03ModelSupport {
  private val createFormats: Map[String, Any] => Formats = compile[Formats](
    q"""
      import java.text.SimpleDateFormat
      import org.json4s.{DefaultFormats, TypeHints}
      new DefaultFormats {
        override val typeHints: TypeHints = args("typeHints")
        override val typeHintFieldName: String = args("typeHintFieldName")
        override def dateFormatter = args[() => SimpleDateFormat]("dateFormatterFn")()
      }
    """)
}
