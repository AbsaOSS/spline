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

package com.arangodb.entity

import com.arangodb.velocypack.{VPack, VPackBuilder, ValueType}

object ErrorEntityImplicits {
  implicit class ErrorEntityOps(val ee: ErrorEntity) {
    def copy(
      errorMessage: String = ee.getErrorMessage,
      exception: String = ee.getException,
      code: Int = ee.getCode,
      errorNum: Int = ee.getErrorNum
    ): ErrorEntity = {
      val vpack = new VPack.Builder().build
      vpack.deserialize[ErrorEntity](
        new VPackBuilder()
          .add(ValueType.OBJECT)
          .add("errorMessage", errorMessage)
          .add("exception", exception)
          .add("code", Int.box(code))
          .add("errorNum", Int.box(errorNum))
          .close()
          .slice(),
        classOf[ErrorEntity]
      )
    }
  }
}
