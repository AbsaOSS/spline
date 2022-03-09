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

package za.co.absa.spline.testdatagen
import za.co.absa.commons.reflect.EnumerationMacros

sealed abstract class GraphType(val name: String)

object GraphType {

  case object ChainType extends GraphType("chain")

  case object DiamondType extends GraphType("diamond")

  case object TriangleType extends GraphType("triangle")

  private val values: Set[GraphType] = EnumerationMacros.sealedInstancesOf[GraphType]
  val stringValues: Set[String] = values.map(_.name)

  def fromString(value: String): Option[GraphType] = {
    values.find(_.name.equalsIgnoreCase(value))
  }

}
