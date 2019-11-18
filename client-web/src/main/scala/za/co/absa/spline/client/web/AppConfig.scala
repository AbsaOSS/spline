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

package za.co.absa.spline.client.web

import java.net.URL

import za.co.absa.spline.common.ConfigurationImplicits._
import za.co.absa.spline.common.config.{ConfTyped, DefaultConfigurationStack}

object AppConfig extends DefaultConfigurationStack with ConfTyped {

  override val rootPrefix: String = "spline"

  object Consumer extends Conf("consumer") {
    val url: URL = new URL(AppConfig.this.getRequiredString(Prop("url")))
  }

}