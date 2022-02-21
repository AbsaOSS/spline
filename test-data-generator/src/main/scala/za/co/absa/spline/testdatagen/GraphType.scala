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

object GraphType extends Enumeration {
  type GraphType = Value

  val ChainType: Value = Value("chain")
  val DiamondType: Value = Value("diamond")
  val TriangleType: Value = Value("triangle")

  def withNameWithDefault(name: String): Value =
    values.find(_.toString.toLowerCase() == name.toLowerCase()).getOrElse(ChainType)
}