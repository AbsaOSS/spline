/*
 * Copyright 2021 ABSA Group Limited
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

package za.co.absa.spline.producer.modelmapper.v1.spark

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers
import za.co.absa.spline.producer.model.v1_1.Literal

class SparkSplineExpressionConverterSpec extends AnyFlatSpec with Matchers {

  behavior of "convert()"

  it should "convert Literal" in {
    val converter = new SparkSplineExpressionConverter(null)

    val lit = converter.convert(Map(
      "_typeHint" -> "expr.Literal",
      "dataTypeId" -> "d32cfc1f-e90f-4ece-93f5-15193534c855",
      "value" -> "foo"
    ))

    lit should be(a[Literal])
    lit.asInstanceOf[Literal].id should not be empty
    lit.asInstanceOf[Literal].value should be(a[String])
    lit.asInstanceOf[Literal].value should equal("foo")
    lit.asInstanceOf[Literal].dataType should equal(Some("d32cfc1f-e90f-4ece-93f5-15193534c855"))
    lit.asInstanceOf[Literal].extra should be(empty)
  }

  it should "support missing values" in {
    val converter = new SparkSplineExpressionConverter(null)

    val lit = converter.convert(Map("_typeHint" -> "expr.Literal"))

    lit should be(a[Literal])
    assert(lit.asInstanceOf[Literal].value == null)
    assert(lit.asInstanceOf[Literal].dataType.isEmpty)
  }
}
