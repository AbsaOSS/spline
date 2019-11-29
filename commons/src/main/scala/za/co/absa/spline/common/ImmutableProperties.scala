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

package za.co.absa.spline.common

import java.io.{ByteArrayInputStream, ByteArrayOutputStream, InputStream, OutputStream}
import java.util.function.BiFunction
import java.util.{Properties, function}
import java.{util => ju}

object ImmutableProperties {
  def fromStream(stream: InputStream): ImmutableProperties = new ImmutableProperties(new Properties() {
    load(stream)
  })

  def apply(props: Properties): ImmutableProperties = {
    val baos = new ByteArrayOutputStream
    props.store(baos, "")
    fromStream(new ByteArrayInputStream(baos.toByteArray))
  }
}

class ImmutableProperties private(props: Properties) extends Properties(props) {
  override def setProperty(key: String, value: String): Nothing = throw new UnsupportedOperationException

  override def save(out: OutputStream, comments: String): Nothing = throw new UnsupportedOperationException

  override def loadFromXML(in: InputStream): Nothing = throw new UnsupportedOperationException

  override def stringPropertyNames(): ju.Set[String] = ju.Collections.unmodifiableSet(props.stringPropertyNames())

  override def rehash(): Unit = {}

  override def put(key: AnyRef, value: AnyRef): Nothing = throw new UnsupportedOperationException

  override def remove(key: AnyRef): Nothing = throw new UnsupportedOperationException

  override def putAll(t: ju.Map[_ <: AnyRef, _ <: AnyRef]): Nothing = throw new UnsupportedOperationException

  override def clear(): Nothing = throw new UnsupportedOperationException

  override def clone(): this.type = this

  override def keySet(): ju.Set[AnyRef] = ju.Collections.unmodifiableSet(props.keySet())

  override def entrySet(): ju.Set[ju.Map.Entry[AnyRef, AnyRef]] = ju.Collections.unmodifiableSet(props.entrySet())

  override def values(): ju.Collection[AnyRef] = ju.Collections.unmodifiableCollection(props.values())

  override def replaceAll(function: BiFunction[_ >: AnyRef, _ >: AnyRef, _ <: AnyRef]): Nothing = throw new UnsupportedOperationException

  override def putIfAbsent(key: AnyRef, value: AnyRef): Nothing = throw new UnsupportedOperationException

  override def remove(key: AnyRef, value: AnyRef): Nothing = throw new UnsupportedOperationException

  override def replace(key: AnyRef, oldValue: AnyRef, newValue: AnyRef): Nothing = throw new UnsupportedOperationException

  override def replace(key: AnyRef, value: AnyRef): Nothing = throw new UnsupportedOperationException

  override def merge(key: AnyRef, value: AnyRef, fn: BiFunction[_ >: AnyRef, _ >: AnyRef, _ <: AnyRef]): Nothing = throw new UnsupportedOperationException

  override def computeIfAbsent(key: AnyRef, fn: function.Function[_ >: AnyRef, _ <: AnyRef]): Nothing = throw new UnsupportedOperationException

  override def computeIfPresent(key: AnyRef, fn: BiFunction[_ >: AnyRef, _ >: AnyRef, _ <: AnyRef]): Nothing = throw new UnsupportedOperationException

  override def compute(key: AnyRef, fn: BiFunction[_ >: AnyRef, _ >: AnyRef, _ <: AnyRef]): Nothing = throw new UnsupportedOperationException
}