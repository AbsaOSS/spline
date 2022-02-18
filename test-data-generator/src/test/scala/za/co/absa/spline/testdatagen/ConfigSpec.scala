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

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers.{all, convertToAnyShouldWrapper}

class ConfigSpec extends AnyFlatSpec{

  private val varAttr = Config(reads = Constant(2) ,operations = Constant(5), attributes = Variable(2,8,2), expressions = Constant(3))
  private val constTriangle = Config(graphType= "triangle", reads= Constant(3), operations = Constant(1), attributes = Constant(2))
  private val varReadOpDiamond = Config(graphType= "diamond", reads = Variable(1,2,1), operations = Variable(4, 10, 3),
    attributes = Constant(4), expressions = Constant(3))

  behavior of "config expand"

  it should "expand var" in {
    val configs = varAttr.expand()

    varAttr.isExpanded shouldBe false
    configs.size shouldEqual 4
    configs.head.attributes shouldEqual Constant(2)
    configs(1).attributes shouldEqual Constant(4)
    configs(2).attributes shouldEqual Constant(6)
    configs(3).attributes shouldEqual Constant(8)
    all(configs.map(_.graphType)) shouldEqual varAttr.graphType
    all(configs.map(_.reads)) shouldEqual varAttr.reads
    all(configs.map(_.operations)) shouldEqual varAttr.operations
    all(configs.map(_.expressions)) shouldEqual varAttr.expressions
    all(configs.map(_.isExpanded)) shouldBe true
  }

  it should "expand constant config" in {
    val configs = constTriangle.expand()

    constTriangle.isExpanded shouldBe true
    configs.size shouldEqual 1
    configs.head.attributes shouldEqual Constant(2)
  }

  it should "expand 2 vars" in {
    val configs = varReadOpDiamond.expand()

    varAttr.isExpanded shouldBe false
    varAttr.isExpanded shouldBe false
    configs.size shouldEqual 6
    configs.head.reads shouldEqual Constant(1)
    configs.head.operations shouldEqual Constant(4)
    configs(1).reads shouldEqual Constant(1)
    configs(1).operations shouldEqual Constant(7)
    configs(2).reads shouldEqual Constant(1)
    configs(2).operations shouldEqual Constant(10)
    configs(3).reads shouldEqual Constant(2)
    configs(3).operations shouldEqual Constant(4)
    configs(4).reads shouldEqual Constant(2)
    configs(4).operations shouldEqual Constant(7)
    configs(5).reads shouldEqual Constant(2)
    configs(5).operations shouldEqual Constant(10)
    all(configs.map(_.graphType)) shouldEqual varReadOpDiamond.graphType
    all(configs.map(_.attributes)) shouldEqual varReadOpDiamond.attributes
    all(configs.map(_.expressions)) shouldEqual varReadOpDiamond.expressions
    all(configs.map(_.isExpanded)) shouldBe true
  }
}
