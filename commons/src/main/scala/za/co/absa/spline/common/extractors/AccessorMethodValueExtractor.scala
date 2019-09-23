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

package za.co.absa.spline.common.extractors

import org.apache.commons.lang3.reflect.TypeUtils.isAssignable

import scala.Function.unlift
import scala.reflect.ClassTag
import scala.reflect.ManifestFactory.Any
import scala.util.Try

class AccessorMethodValueExtractor[T](methodNames: String*)(implicit val mf: Manifest[T]) {
  require(methodNames.nonEmpty)

  private val extractFn: Any => Option[T] = AccessorMethodValueExtractor.firstOf(methodNames: _*)

  def unapply(arg: Any): Option[T] = extractFn(arg)
}

object AccessorMethodValueExtractor {
  def apply[T: ClassTag](methodName: String): Any => Option[T] = {
    val ct = implicitly[ClassTag[T]]
    arg =>
      for {
        m <- Try(arg.getClass.getMethod(methodName)).toOption
        if ct == Any || isAssignable(m.getReturnType, ct.runtimeClass)
      } yield m.invoke(arg).asInstanceOf[T]
  }

  def firstOf[T: Manifest](methodNames: String*): Any => Option[T] =
    methodNames
      .map((apply[T] _).andThen[PartialFunction[Any, T]](unlift))
      .reduce(_ orElse _)
      .lift
}

