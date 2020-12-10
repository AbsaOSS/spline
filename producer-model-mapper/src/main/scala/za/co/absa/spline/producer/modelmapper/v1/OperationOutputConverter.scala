/*
 * Copyright 2020 ABSA Group Limited
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

package za.co.absa.spline.producer.modelmapper.v1

import za.co.absa.commons.lang.Converter
import za.co.absa.spline.producer.model.v1_1
import za.co.absa.spline.producer.{model => v1}

trait OperationOutputConverter extends Converter {
  type OperExprParams = Map[String, Seq[v1_1.ExpressionLike.Id]]
  type Output = Seq[v1_1.Attribute.Id]

  override type From = v1.OperationLike
  override type To = Option[Output]
}
