/*
 * Copyright 2017 ABSA Group Limited
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

package za.co.absa.spline.scalatest

import org.scalatest.{Ignore, Tag}
import org.apache.spark.SPARK_VERSION

object ConditionalTestIgnore {

  def ignoreWhen(condition: => Boolean): Tag = Tag(if (condition) classOf[Ignore].getName else "")

  def SPARK_22: Boolean = SPARK_VERSION.startsWith("2.2")
}
