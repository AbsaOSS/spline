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

/** TODO: update the doc
 * The class is designed for representing expression IDs in untyped or weakly typed data structures,
 * when expression IDs need to be distinguished from other arbitrary values.
 * It can be thought of as an alternative to a type hint.
 *
 * @param `@@attrId` attribute ID
 * @param `@@exprId` expression ID
 */

case class AttrOrExprRef(
  `@@attrId`: Option[Attribute.Id],
  `@@exprId`: Option[ExpressionLike.Id]) {

  require(
    `@@attrId`.isDefined ^ `@@exprId`.isDefined,
    s"Either `@@attrId` or `@@exprId` should be defined. Was: ${`@@attrId`}, ${`@@exprId`}")

  def isAttribute: Boolean = `@@attrId`.isDefined

  def isExpression: Boolean = `@@exprId`.isDefined

  def refId: ExpressionLike.Id = (`@@attrId` orElse `@@exprId`).get
}

object AttrOrExprRef {

  def attrRef(attrId: Attribute.Id): AttrOrExprRef = AttrOrExprRef(Option(attrId), None)

  def exprRef(exprId: ExpressionLike.Id): AttrOrExprRef = AttrOrExprRef(None, Option(exprId))

  def fromMap(obj: Map[String, Any]): Option[AttrOrExprRef] = {
    if (obj.size != 1) None
    else obj.head match {
      case ("@@attrId", attrId: Attribute.Id) => Some(attrRef(attrId))
      case ("@@exprId", exprId: ExpressionLike.Id) => Some(exprRef(exprId))
      case _ => None
    }
  }
}
