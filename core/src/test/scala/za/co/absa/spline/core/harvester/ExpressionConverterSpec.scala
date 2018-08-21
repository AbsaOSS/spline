/*
 * Copyright 2017 Barclays Africa Group Limited
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

package za.co.absa.spline.core.harvester

import org.apache.spark.sql.catalyst.InternalRow
import org.apache.spark.sql.catalyst.expressions.{Expression, Literal}
import org.apache.spark.sql.catalyst.expressions.codegen.{CodegenContext, ExprCode}
import org.apache.spark.sql.types.{DataType, IntegerType, StringType}
import org.mockito.Mockito._
import org.scalatest.mockito.MockitoSugar
import org.scalatest.{FlatSpec, Matchers, OneInstancePerTest}
import za.co.absa.spline.model.dt
import za.co.absa.spline.model.expr

object ExpressionConverterSpec {

  case class Foo
  (
    returnType: DataType,
    isNullable: Boolean,
    childExpression: Expression,
    otherExpression: Expression,
    string: String,
    javaInteger: Integer,
    scalaInt: Int,
    scalaIntWithDefault: Int = 42,
    option: Option[Any],
    optionWithDefault: Option[Any] = Some("this is a default value"),
    any: Any,
    seq: Any
  ) extends Expression {

    def this() = this(null, false, null, null, null, null, -1, -1, null, None, null, null)

    val additionalPropertyNotFromConstructor = "this should not be captured"

    override def children: List[Expression] = Option(childExpression).toList

    override def dataType: DataType = returnType

    override def nullable: Boolean = isNullable

    override def eval(input: InternalRow): Any = ()

    override def doGenCode(ctx: CodegenContext, ev: ExprCode): ExprCode = null
  }

}

class ExpressionConverterSpec extends FlatSpec with OneInstancePerTest with MockitoSugar with Matchers {
  import ExpressionConverterSpec._

  behavior of "ExpressionConverter.convert()"

  behavior of "Converting arbitrary Spark Expression"

  private val dtConverterMock = mock[DataTypeConverter]
  private val attrConverterMock = mock[AttributeConverter]
  private val converter = new ExpressionConverter(dtConverterMock, attrConverterMock)

  it should "support secondary constructor, but only capture params from the primary one" in {
    val nullableStringDataType = dt.Simple("String", nullable = true)
    val nonNullableIntDataType = dt.Simple("Integer", nullable = false)

    when(dtConverterMock convert StringType -> true) thenReturn nullableStringDataType
    when(dtConverterMock convert IntegerType -> false) thenReturn nonNullableIntDataType

    val expression = (new Foo).copy(isNullable = true, returnType = StringType, childExpression = Literal(42))
    converter convert expression should have (
      'dataTypeId(nullableStringDataType.id),
      'children(Seq(expr.Literal(42, nonNullableIntDataType.id))),
      'exprType(classOf[Foo].getName)
    )
  }

  it should "support ???" in {
    val nullableStringDataType = dt.Simple("String", nullable = true)
    val nonNullableIntDataType = dt.Simple("Integer", nullable = false)

    when(dtConverterMock convert StringType -> true) thenReturn nullableStringDataType
    when(dtConverterMock convert IntegerType -> false) thenReturn nonNullableIntDataType

    val expression = (new Foo)
    converter convert expression
//    should have (
//      'dataTypeId(nullableStringDataType.id),
//      'children(Seq(expr.Literal(42, nonNullableIntDataType.id))),
//      'exprType(classOf[Foo].getName)
//    )
  }

}
