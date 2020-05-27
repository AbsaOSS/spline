/*
 * Copyright 2020 ABSA Group Limited
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

package za.co.absa.spline.producer.modelmapper.v1


import za.co.absa.commons.lang.CachingConverter
import za.co.absa.spline.producer.model.v1_1._
import za.co.absa.spline.producer.modelmapper.ModelMapper
import za.co.absa.spline.producer.{model => v1}

object ModelMapperV1 extends ModelMapper {

  override type P = v1.ExecutionPlan
  override type E = v1.ExecutionEvent

  override def fromDTO(plan1: v1.ExecutionPlan): ExecutionPlan = {

    val epccf = ExecutionPlanComponentConverterFactory.forPlan(plan1)

    val maybeExpressionConverter = epccf.expressionConverter
    val maybeOutputConverter = epccf.outputConverter
    val operationConverter = new OperationConverter(maybeExpressionConverter, maybeOutputConverter) with CachingConverter

    plan1.operations.all.foreach(operationConverter.convert)

    val operations = asOperationsObject(operationConverter.values)
    val maybeExpressions =
      for {
        expressionConverter <- maybeExpressionConverter
        expressions = expressionConverter.values if expressions.nonEmpty
      } yield asExpressionsObject(expressions)

    ExecutionPlan(
      id = plan1.id,
      operations = operations,
      expressions = maybeExpressions,
      systemInfo = NameAndVersion(plan1.systemInfo.name, plan1.systemInfo.version),
      agentInfo = plan1.agentInfo.map(ai => NameAndVersion(ai.name, ai.version)),
      extraInfo = plan1.extraInfo
    )
  }

  override def fromDTO(event: v1.ExecutionEvent): ExecutionEvent = ExecutionEvent(
    planId = event.planId,
    timestamp = event.timestamp,
    error = event.error,
    extra = event.extra
  )

  private def asOperationsObject(ops: Seq[OperationLike]) = {
    val (Some(write), reads, others) =
      ops.foldLeft((Option.empty[WriteOperation], Seq.empty[ReadOperation], Seq.empty[DataOperation])) {
        case (z, wop: WriteOperation) => z.copy(_1 = Some(wop))
        case (z, rop: ReadOperation) => z.copy(_2 = rop +: z._2)
        case (z, dop: DataOperation) => z.copy(_3 = dop +: z._3)
      }
    Operations(
      write = write,
      reads = reads,
      other = others
    )
  }

  private def asExpressionsObject(exprs: Seq[ExpressionLike]) = {
    val (attrs, funcs, consts) =
      exprs.foldLeft((Seq.empty[Attribute], Seq.empty[FunctionalExpression], Seq.empty[Literal])) {
        case (z, a: Attribute) if a.name.nonEmpty => z.copy(_1 = a +: z._1)
        case (z, f: FunctionalExpression) => z.copy(_2 = f +: z._2)
        case (z, c: Literal) => z.copy(_3 = c +: z._3)
        case (z, _) => z
      }
    Expressions(
      attributes = attrs,
      functions = funcs,
      constants = consts
    )
  }

}
