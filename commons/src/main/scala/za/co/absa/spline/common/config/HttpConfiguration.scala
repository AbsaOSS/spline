/*
 * Copyright 2022 ABSA Group Limited
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

package za.co.absa.spline.common.config

import org.apache.commons.configuration.Configuration
import za.co.absa.commons.config.ConfTyped
import za.co.absa.commons.config.ConfigurationImplicits._

import scala.concurrent.duration._

trait HttpConfiguration {
  this: ConfTyped with Configuration =>

  val MaybeDefaultTimeout: Option[Duration] = this.getOptionalLong(Prop("timeoutDefault")).map(_.millis)
  val MaybeMaximumTimeout: Option[Duration] = this.getOptionalLong(Prop("timeoutMaximum")).map(_.millis)

}
