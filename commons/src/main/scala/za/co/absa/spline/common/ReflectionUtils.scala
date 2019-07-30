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

import scala.collection.concurrent.TrieMap
import scala.reflect.runtime.{universe => ru}

/**
  * Reflection utils
  */
object ReflectionUtils {

  private val mirror: ru.Mirror = ru.runtimeMirror(getClass.getClassLoader)
  private val gettersCache = TrieMap.empty[ru.ClassSymbol, Iterable[ru.Symbol]]

  object ModuleClassSymbolExtractor {
    def unapply(o: Any): Option[ru.ClassSymbol] = {
      val symbol = mirror.classSymbol(o.getClass)
      if (symbol.isModuleClass) Some(symbol)
      else None
    }
  }

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

  def extractFieldValue[T](o: AnyRef, fieldName: String): T = {
    val field = o.getClass.getDeclaredField(fieldName)
    field.setAccessible(true)
    field.get(o).asInstanceOf[T]
  }

  def extractProductElementsWithNames(product: Product): Map[String, _] = {
    val pMirror = mirror.reflect(product)
    constructorArgSymbols(pMirror.symbol)
      .map(argSymbol => {
        val name = argSymbol.name.toString
        val value = pMirror.reflectMethod(argSymbol.asMethod).apply()
        name -> value
      })
      .toMap
  }

  private def constructorArgSymbols(classSymbol: ru.ClassSymbol) =
    gettersCache.getOrElseUpdate(classSymbol, {
      val primaryConstr = classSymbol.primaryConstructor

      val paramNames = (
        for {
          pList <- primaryConstr.typeSignature.paramLists
          pSymbol <- pList
        } yield
          pSymbol.name.toString
        )
        .toSet

      classSymbol.info.decls.filter(d =>
        d.isMethod
          && d.asMethod.isGetter
          && paramNames(d.name.toString))
    })
}
