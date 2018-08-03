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

package za.co.absa.spline.model.expr

import java.util.UUID

import salat.annotations.Salat

@Salat
sealed trait Expression {
  def children: Seq[Expression]

  def allNamedChildrenFlattened: Seq[Expression] = children.flatMap(_.allNamedChildrenFlattened)
}

trait LeafExpression extends Expression {
  override final def children: Seq[Expression] = Nil
}

trait NamedExpression extends Expression {
  override final def allNamedChildrenFlattened: Seq[Expression] = this +: super.allNamedChildrenFlattened
}

case class Generic
(
  exprType: String,
  dataTypeId: UUID,
  override val children: Seq[Expression]
) extends Expression

case class GenericLeaf
(
  exprType: String,
  dataTypeId: UUID
) extends Expression
  with LeafExpression

case class Alias
(
  alias: String,
  child: Expression
) extends Expression
  with NamedExpression {
  override def children: Seq[Expression] = Seq(child)
}

case class Binary
(
  symbol: String,
  dataTypeId: UUID,
  override val children: Seq[Expression]
) extends Expression

case class AttributeRemoval(attrId: UUID) extends Expression with LeafExpression

case class AttrRef(refId: UUID) extends Expression with LeafExpression with NamedExpression

case class UDF
(
  name: String,
  dataTypeId: UUID,
  override val children: Seq[Expression]
) extends Expression
