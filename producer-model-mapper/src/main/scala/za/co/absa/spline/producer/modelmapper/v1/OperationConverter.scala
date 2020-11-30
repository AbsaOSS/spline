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

import za.co.absa.commons.lang.Converter
import za.co.absa.spline.producer.model.v1_1._
import za.co.absa.spline.producer.{model => v1}

class OperationConverter(maybeExpressionConverter: Option[ExpressionConverter], maybeOutputConverter: Option[OperationOutputConverter]) extends Converter {
  override type From = v1.OperationLike
  override type To = OperationLike

  override def convert(op1: From): To = {
    val exprParams: Map[String, Array[ExpressionLike.Id]] = op1.params.flatMap({
      case (k, v) => maybeAsExpression(v).map(k -> _.toArray) // todo: wrap with ExpressionRef recursively
    })
    val nonExprParams = op1.params.filterKeys(!exprParams.keySet(_))
    val convertedParams = exprParams ++ nonExprParams
    val output = maybeOutputConverter.flatMap(_.convert(op1)).getOrElse(Nil)


    val id = op1.id.toString
    val childIds = op1.childIds.map(_.toString)
    val extra = op1.extra

    op1 match {
      case wop1: v1.WriteOperation =>
        WriteOperation(wop1.outputSource, wop1.append, id, childIds, convertedParams, extra)
      case rop1: v1.ReadOperation =>
        ReadOperation(rop1.inputSources, id, output, convertedParams, extra)
      case _: v1.DataOperation =>
        DataOperation(id, childIds, output, convertedParams, extra)
    }
  }

  private val maybeAsExpression: Any => Option[Seq[ExpressionLike.Id]] = maybeExpressionConverter
    .map(exc => PartialFunction.condOpt(_: Any) {
      case e: ExpressionConverter#From
        if exc.isExpression(e) =>
        Seq(exc.convert(e.asInstanceOf[ExpressionConverter#From]).id)
      case es: Seq[ExpressionConverter#From]
        if es.headOption.exists(exc.isExpression) =>
        // we assume that if the first item is expression then so are the rest ones
        es.map(v => exc.convert(v).id)
    })
    .getOrElse(_ => None)
}
