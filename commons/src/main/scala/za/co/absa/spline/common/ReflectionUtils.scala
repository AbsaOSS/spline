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

package za.co.absa.spline.common

import scala.reflect.runtime.{universe => ru}

/**
  * Reflection utils
  */
object ReflectionUtils {

  private val mirror: ru.Mirror = ru.runtimeMirror(getClass.getClassLoader)

  /**
    * Lists all direct sub-classes of the given trait T
    *
    * @tparam T sealed trait type
    * @return List of Class[_] instances
    */
  def subClassesOf[T: ru.TypeTag]: List[Class[_]] = {
    val clazz: ru.ClassSymbol = ru.typeOf[T].typeSymbol.asClass
    require(clazz.isTrait && clazz.isSealed)
    clazz.knownDirectSubclasses.toList map ((s: ru.Symbol) => mirror runtimeClass s.asClass)
  }

  /**
    * The method returns value for any field utilized by the class business logic
 *
    * @param instance An instance the will be inspected
    * @param fieldName A name of the field
    * @tparam TValue A type of the returned value
    * @return A value for any field utilized by the class business logic
    */
  def getFieldValue[TValue](instance : AnyRef, fieldName : String): TValue =
  {
    val cls = instance.getClass
    val field = cls.getDeclaredField(fieldName)
    val defaultAccessibility = field.isAccessible
    field.setAccessible(true)
    val value = field.get(instance).asInstanceOf[TValue]
    field.setAccessible(defaultAccessibility)
    value
  }
}
