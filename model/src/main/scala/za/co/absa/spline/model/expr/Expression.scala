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
import za.co.absa.spline.model.Attribute

/**
 * The trait represents a node of recursive structure that can play role of a join condition, a projection rule, etc.
 */
@Salat
sealed trait Expression {
  /**
   * A data type of an expression node
   */
  val dataTypeId: UUID

  /**
   * A sequence of sub-expressions
   */
  def children: Seq[Expression]

  def inputAttributeNames: Seq[String] = children.flatMap(_.inputAttributeNames)

  def outputAttributeNames: Seq[String] = children.flatMap(_.outputAttributeNames)
}

trait Leaf {
  this: Expression =>

  override final def children: Seq[Expression] = Nil
}

case class Generic
(
  exprType: String,
  override val dataTypeId: UUID,
  override val children: Seq[Expression]
) extends Expression

case class GenericLeaf
(
  exprType: String,
  override val dataTypeId: UUID
) extends Expression with Leaf

/**
 * The case class represents renaming of an underlying expression to a specific alias.
 *
 * @param alias      A final name of the expression
 * @param dataTypeId see [[za.co.absa.spline.model.expr.Expression#dataType Expression.dataType]]
 * @param children   see [[za.co.absa.spline.model.expr.Expression#children Expression.children]]
 */
case class Alias
(
  alias: String,
  override val dataTypeId: UUID,
  override val children: Seq[Expression]
) extends Expression {

  override def outputAttributeNames: Seq[String] = Seq(alias)
}

/**
 * The case class represents binary operators like addition, multiplication, string concatenation, etc.
 *
 * @param symbol     A symbol expressing the operation (+, -, *, /, etc. )
 * @param dataTypeId see [[za.co.absa.spline.model.expr.Expression#dataType Expression.dataType]]
 * @param children   see [[za.co.absa.spline.model.expr.Expression#children Expression.children]]
 */
case class Binary
(
  symbol: String,
  override val dataTypeId: UUID,
  override val children: Seq[Expression]
) extends Expression

/**
 * The case class represents a special expression for removing an attribute from a data set.
 *
 * @param dataTypeId see [[za.co.absa.spline.model.expr.Expression#dataType Expression.dataType]]
 * @param children   see [[za.co.absa.spline.model.expr.Expression#children Expression.children]]
 */
case class AttributeRemoval
(
  override val dataTypeId: UUID,
  override val children: Seq[Expression]
) extends Expression

/**
 * A companion object for the case class [[za.co.absa.spline.model.expr.AttributeRemoval AttributeRemoval]].
 */
object AttributeRemoval {

  /**
   * The method constructs new instance of the case class [[za.co.absa.spline.model.expr.AttributeRemoval AttributeRemoval]].
   *
   * @param attribute A reference to an attribute that will be removed.
   * @return An instance of the case class [[za.co.absa.spline.model.expr.AttributeRemoval AttributeRemoval]].
   */
  def apply(attribute: AttrRef): AttributeRemoval =
    new AttributeRemoval(attribute.dataTypeId, Seq(attribute))
}

/**
 * The case class represents a special expression for referencing an attribute from a data set.
 *
 * @param refId      An unique of a referenced attribute
 * @param name       A name of a referenced attribute
 * @param dataTypeId see [[za.co.absa.spline.model.expr.Expression#dataType Expression.dataType]]
 */
case class AttrRef
(
  refId: UUID,
  name: String,
  override val dataTypeId: UUID
) extends Expression with Leaf {
  override def inputAttributeNames: Seq[String] = Seq(name)
}

/**
 * A companion object for the case class [[za.co.absa.spline.model.expr.AttrRef AttributeReference]].
 */
object AttrRef {

  /**
   * The method constructs an instance of the case class [[za.co.absa.spline.model.expr.AttrRef AttributeReference]].
   *
   * @param attribute An attribute object that will be referenced
   * @return An instance of the case class [[za.co.absa.spline.model.expr.AttrRef AttributeReference]].
   */
  def apply(attribute: Attribute): AttrRef =
    AttrRef(attribute.id, attribute.name, attribute.dataTypeId)
}

/**
 * The case class represents a special expression describing an user-defined function of Spark.
 *
 * @param name       A name assigned to an user-defined function
 * @param dataTypeId see [[za.co.absa.spline.model.expr.Expression#dataType Expression.dataType]]
 * @param children   see [[za.co.absa.spline.model.expr.Expression#children Expression.children]]
 */
case class UDF
(
  name: String,
  override val dataTypeId: UUID,
  override val children: Seq[Expression]
) extends Expression
