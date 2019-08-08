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

package za.co.absa.spline.harvester.converter

import org.apache.spark.sql.catalyst.InternalRow
import org.apache.spark.sql.catalyst.expressions.{Expression, NamedExpression, SortOrder}
import org.apache.spark.sql.catalyst.plans.JoinType
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.types.DataType
import za.co.absa.spline.common.ReflectionUtils
import za.co.absa.spline.common.transformations.AbstractConverter
import za.co.absa.spline.harvester.converter.OperationParamsConverter._

class OperationParamsConverter(
  dataConverter: DataConverter,
  expressionConverter: ExpressionConverter
) extends AbstractConverter {
  override type From = LogicalPlan
  override type To = Map[String, _]

  private val renderer = ValueDecomposer.addHandler(_ => {
    case (row: InternalRow, rowType: DataType) => Some(dataConverter.convert((row, rowType)))
    case (jt: JoinType, _) => Some(jt.sql)
    case (so: SortOrder, _) => Some(Map(
      "expression" -> expressionConverter.convert(so.child),
      "direction" -> so.direction.sql,
      "nullOrdering" -> so.nullOrdering.sql))
    case (exp: NamedExpression, _) => Some(Seq(exp.name, expressionConverter.convert(exp)))
    case (exp: Expression, _) => Some(expressionConverter.convert(exp))
  })

  override def convert(operation: LogicalPlan): Map[String, _] = {
    val isChildOperation: Any => Boolean = {
      val children = operation.children.toSet
      PartialFunction.cond(_) {
        case oi: LogicalPlan if children(oi) => true
      }
    }

    for {
      (p, v) <- ReflectionUtils.extractProductElementsWithNames(operation)
      if !knownPropNames(p)
      if !isChildOperation(v)
    } yield
      p -> renderer.decompose(v, operation.schema)
  }
}

object OperationParamsConverter {
  private val knownPropNames = Set("nodeName", "output", "children")
}
