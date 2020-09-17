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

package com.arangodb.internal.velocystream

import com.arangodb.internal.net.{AccessType, HostDescription, HostHandler, HostImpl}
import za.co.absa.commons.reflect.ReflectionUtils.extractFieldValue

object VstCommunicationExtractor {
  private final val HostHandlerField = "hostHandler"

  def unapply(comm: VstCommunication[_, _]): Option[(HostDescription, String, String)] = {
    val hostHandler = extractFieldValue[VstCommunication[_, _], HostHandler](comm, HostHandlerField)
    val host = hostHandler.get(null, AccessType.WRITE).asInstanceOf[HostImpl]
    val hostDescription = host.getDescription

    Some(
      hostDescription,
      comm.user,
      comm.password
    )
  }
}
