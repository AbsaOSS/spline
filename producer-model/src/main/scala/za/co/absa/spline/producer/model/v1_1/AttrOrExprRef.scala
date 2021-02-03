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

package za.co.absa.spline.producer.model.v1_1

/**
 * Represents expression or attribute ID in untyped or weakly typed data structures,
 * where the former has to be distinguished from any other arbitrary value.
 * It can be thought of as an alternative to a type hint.
 *
 * @param __attrId attribute ID
 * @param __exprId expression ID
 */

case class AttrOrExprRef(
  __attrId: Option[Attribute.Id],
  __exprId: Option[ExpressionLike.Id]) {

  require(
    __attrId.isDefined ^ __exprId.isDefined,
    s"Either `__attrId` or `__exprId` should be defined. Was: ${__attrId}, ${__exprId}")

  def refId: ExpressionLike.Id = (__attrId orElse __exprId).get

  def isAttribute: Boolean = __attrId.isDefined

  def isExpression: Boolean = __exprId.isDefined
}

object AttrOrExprRef {

  def attrRef(attrId: Attribute.Id): AttrOrExprRef = AttrOrExprRef(Option(attrId), None)

  def exprRef(exprId: ExpressionLike.Id): AttrOrExprRef = AttrOrExprRef(None, Option(exprId))

  def fromMap(obj: Map[String, Any]): Option[AttrOrExprRef] = {
    if (obj.size != 1) None
    else obj.head match {
      case ("__attrId", attrId: Attribute.Id) => Some(attrRef(attrId))
      case ("__exprId", exprId: ExpressionLike.Id) => Some(exprRef(exprId))
      case _ => None
    }
  }
}
