/*
 * Copyright 2024 ABSA Group Limited
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

package com.arangodb.util

import com.arangodb.velocypack.VPackSlice
import com.fasterxml.jackson.core.`type`.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import za.co.absa.commons.reflect.ReflectionUtils

import java.lang.reflect.Type

/**
 * This is a workaround for a ArangoJack deserializer limitation.
 * The ArangoJack serde being a wrapper over the Jackson serde needs to be able to take a `TypeReference` instance
 * and pass it over to Jackson in order to deserialize generic entities. This is not possible in the current ArangoJack version.
 * Hence, we have to add another method that we'd use to pass the type reference instance to the ArrangoJack's underlying Jackson
 * mapper directly, bypassing the ArangoJack's public API.
 */
class TypeRefAwareArangoDeserializerDecor(deserializer: ArangoDeserializer) extends ArangoDeserializer {
  private lazy val vpackMapper: ObjectMapper = ReflectionUtils.extractValue[ObjectMapper](deserializer, "vpackMapper")

  def deserialize[A](vpack: VPackSlice)(implicit typeRef: TypeReference[A]): A = {
    val aType = typeRef.getType
    if (aType == classOf[String]) {
      deserializer.deserialize[A](vpack, aType)
    } else {
      vpackMapper.readValue(vpack.getBuffer, vpack.getStart, vpack.getStart + vpack.getByteSize, typeRef)
    }
  }

  override def deserialize[T](vpack: VPackSlice, aType: Type): T = deserializer.deserialize[T](vpack, aType)
}
