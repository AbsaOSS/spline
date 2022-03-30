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

package za.co.absa.spline.producer.modelmapper.v1_0.spark

import za.co.absa.commons.lang.Converter
import za.co.absa.spline.producer.model.v1_2
import za.co.absa.spline.producer.modelmapper.v1_0.{FieldNamesV10, TypesV10}

trait AttributeRefConverter extends Converter {
  override type From = TypesV10.ExprDef
  override type To = v1_2.AttrOrExprRef

  def isAttrRef(obj: Any): Boolean
}

object AttributeRefConverter extends AttributeRefConverter {

  override def isAttrRef(obj: Any): Boolean = PartialFunction.cond(obj) {
    case attrRef: TypesV10.ExprDef@unchecked => attrRef
      .get(FieldNamesV10.ExpressionDef.TypeHint)
      .map(_.toString)
      .contains("expr.AttrRef")
  }

  override def convert(attrRef: TypesV10.ExprDef): v1_2.AttrOrExprRef = {
    v1_2.AttrOrExprRef.attrRef(attrRef(FieldNamesV10.ExpressionDef.RefId).toString)
  }
}
