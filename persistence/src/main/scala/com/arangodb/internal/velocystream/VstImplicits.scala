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

package com.arangodb.internal.velocystream

import com.arangodb.internal.net.AccessType
import com.arangodb.internal.velocystream.internal.VstConnection

object VstImplicits {

  implicit class InternalVstCommunicationOps(val vstComm: VstCommunication[_, VstConnection[_]]) extends AnyVal {

    def getUser: String = vstComm.user

    def getPassword: String = vstComm.password

    def connect(accessType: AccessType): VstConnection[_] = vstComm.connect(null, accessType)
  }
}
