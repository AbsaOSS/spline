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

package za.co.absa.spline.producer.modelmapper.v1.spark

import za.co.absa.spline.producer.modelmapper.v1.{ExpressionConverter, ObjectConverter, TypesV1}

class SparkSplineObjectConverter(
  attrRefConverter: AttributeRefConverter,
  expressionConverter: ExpressionConverter,
) extends ObjectConverter {

  override def convert(obj: Any): Any = obj match {
    case exprDef: TypesV1.ExprDef if attrRefConverter.isAttrRef(exprDef) => attrRefConverter.convert(exprDef)
    case exprDef: TypesV1.ExprDef if expressionConverter.isExpression(exprDef) => expressionConverter.convert(exprDef)
    case arr: Seq[_] => arr.map(this.convert)
    case m: Map[_, _] => m.mapValues(this.convert)
    case _ => obj
  }
}
