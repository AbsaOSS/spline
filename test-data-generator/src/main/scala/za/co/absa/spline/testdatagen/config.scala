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

import za.co.absa.spline.testdatagen.GraphType.ChainType

case class ExpandedConfig(graphType: GraphType, reads: Int, operations: Int, attributes: Int)

case class Config(graphType: GraphType = ChainType,
                  reads: NumericValue = Constant(0),
                  operations: NumericValue = Constant(0),
                  attributes: NumericValue = Constant(0)) {

  def expand(): Seq[ExpandedConfig] = for {
    cr: Config <- reads match {
      case v: Variable => v.expand().map(i => this.copy(reads = i))
      case _ => Seq(this)
    }
    co: Config <- cr.operations match {
      case v: Variable => v.expand().map(i => cr.copy(operations = i))
      case _ => Seq(cr)
    }
    ca: Config <- co.attributes match {
      case v: Variable => v.expand().map(i => co.copy(attributes = i))
      case _ => Seq(co)
    }
  } yield ca.toExpandedConfig()

  private def toExpandedConfig(): ExpandedConfig = ExpandedConfig(graphType,
    reads.valueOf(), operations.valueOf(), attributes.valueOf())
}
