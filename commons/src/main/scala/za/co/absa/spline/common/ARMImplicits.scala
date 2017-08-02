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

package za.co.absa.spline.common

import scala.language.reflectiveCalls

object ARMImplicits {

    type Closeable = {def close(): Unit}

    implicit class ArmResourceWrapper[ResourceType <: Closeable](private val resource: ResourceType) {
      def usingResourceDo[ResultType](body: ResourceType => ResultType): ResultType =
        try body(resource)
        finally resource.close()

      // implementing a for-comprehension contract

      def foreach(f: (ResourceType) => Unit): Unit = usingResourceDo(f)

      def map[ResultType](body: ResourceType => ResultType): ResultType = usingResourceDo(body)

      def flatMap[ResultType](body: (ResourceType) => ResultType): ResultType = usingResourceDo(body)

      def withFilter(f: (ResourceType) => Boolean): ArmResourceWrapper[ResourceType] = this
    }

}
