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
import za.co.absa.spline.common.ReflectionUtils.subClassesOf
import za.co.absa.spline.common.json.format.FormatsBuilder
import za.co.absa.spline.json4s.adapter.FormatsAdapter
import za.co.absa.spline.model

trait ShortTypeHintForOldSplineModelSupport extends FormatsBuilder {
  override protected def formats: Formats =
    FormatsAdapter.instance.defaultFormatsWith(
      typeHintFieldName = "_typeHint",
      typeHints = ShortTypeHints(
        subClassesOf[model.dt.DataType] ++
          subClassesOf[model.expr.Expression]
      ),
      dateFormatter = DefaultFormats.losslessDate.get)
}
