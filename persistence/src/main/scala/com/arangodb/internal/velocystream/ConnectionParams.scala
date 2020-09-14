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

import com.arangodb.async.internal.velocystream.VstCommunicationAsync
import com.arangodb.internal.net.{AccessType, HostDescription, HostHandler}
import za.co.absa.commons.reflect.ReflectionUtils

import scala.reflect.ClassTag

object ConnectionParams {
  def unapply(comm: VstCommunicationAsync): Option[(String, Int, Option[String], Option[String])] = {
    val user = comm.user
    val password = comm.password
    val hostHandler = extractFieldValue[VstCommunication[_, _], HostHandler](comm, "hostHandler")
    val host = hostHandler.get(null, AccessType.WRITE)
    val hostDescr = ReflectionUtils.extractFieldValue[HostDescription](host, "description")
    Some((
      hostDescr.getHost,
      hostDescr.getPort,
      Option(user),
      Option(password)
    ))
  }

  /**
   * Remove when https://github.com/AbsaOSS/commons/issues/28 is fixed
   */
  private def extractFieldValue[A: ClassTag, B](o: AnyRef, fieldName: String) = {
    val declaringClass = implicitly[ClassTag[A]]
    val field = declaringClass.runtimeClass.getDeclaredField(fieldName)
    field.setAccessible(true)
    field.get(o).asInstanceOf[B]
  }
}

