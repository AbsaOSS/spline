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

import salat.annotations.{Persist, Salat}
import za.co.absa.spline.model.Attribute
import za.co.absa.spline.model.dt.DataType

/**
  * The trait represents a node of recursive structure that can play role of a join condition, a projection rule, etc.
  */
@Salat
sealed trait Expression {
  /**
    * A string describing type of an expression node
    */
  val exprType: String

  /**
    * A textual representation of an expression node including sub-expressions
    */
  val text: String

  /**
    * A data type of an expression node
    */
  val dataType: DataType

  /**
    * A sequence of sub-expressions
    */
  val children: Seq[Expression]

  def inputAttributeNames: Seq[String] = children.flatMap(_.inputAttributeNames)

  def outputAttributeNames: Seq[String] = children.flatMap(_.outputAttributeNames)
}

/**
  * The case class represents Spark expressions for which a dedicated expression node type hasn't been created yet.
  *
  * @param exprType see [[za.co.absa.spline.model.expr.Expression#exprType Expression.exprType]]
  * @param text     see [[za.co.absa.spline.model.expr.Expression#textualRepresentation Expression.textualRepresentation]]
  * @param dataType see [[za.co.absa.spline.model.expr.Expression#dataType Expression.dataType]]
  * @param children see [[za.co.absa.spline.model.expr.Expression#children Expression.children]]
  */
case class Generic
(
  exprType: String,
  text: String,
  dataType: DataType,
  children: Seq[Expression]
) extends Expression

/**
  * The case class represents renaming of an underlying expression to a specific alias.
  *
  * @param alias    A final name of the expression
  * @param text     see [[za.co.absa.spline.model.expr.Expression#textualRepresentation Expression.textualRepresentation]]
  * @param dataType see [[za.co.absa.spline.model.expr.Expression#dataType Expression.dataType]]
  * @param children see [[za.co.absa.spline.model.expr.Expression#children Expression.children]]
  */
case class Alias
(
  alias: String,
  text: String,
  dataType: DataType,
  children: Seq[Expression]
) extends Expression {
  @Persist
  val exprType: String = "Alias"

  override def outputAttributeNames: Seq[String] = Seq(alias)
}

/**
  * The case class represents binary operators like addition, multiplication, string concatenation, etc.
  *
  * @param exprType see [[za.co.absa.spline.model.expr.Expression#exprType Expression.exprType]]
  * @param symbol   A symbol expressing the operation (+, -, *, /, etc. )
  * @param text     see [[za.co.absa.spline.model.expr.Expression#textualRepresentation Expression.textualRepresentation]]
  * @param dataType see [[za.co.absa.spline.model.expr.Expression#dataType Expression.dataType]]
  * @param children see [[za.co.absa.spline.model.expr.Expression#children Expression.children]]
  */
case class Binary
(
  exprType: String,
  symbol: String,
  text: String,
  dataType: DataType,
  children: Seq[Expression]
) extends Expression

/**
  * The case class represents a special expression for removing an attribute from a data set.
  *
  * @param text     see [[za.co.absa.spline.model.expr.Expression#textualRepresentation Expression.textualRepresentation]]
  * @param dataType see [[za.co.absa.spline.model.expr.Expression#dataType Expression.dataType]]
  * @param children see [[za.co.absa.spline.model.expr.Expression#children Expression.children]]
  */
case class AttributeRemoval
(
  text: String,
  dataType: DataType,
  children: Seq[Expression]
) extends Expression {

  @Persist
  val exprType: String = "AttributeRemoval"
}

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
  def apply(attribute: AttributeReference): AttributeRemoval =
    new AttributeRemoval("- " + attribute.text, attribute.dataType, Seq(attribute))
}

/**
  * The case class represents a special expression for referencing an attribute from a data set.
  *
  * @param refId    An unique of a referenced attribute
  * @param name     A name of a referenced attribute
  * @param text     see [[za.co.absa.spline.model.expr.Expression#textualRepresentation Expression.textualRepresentation]]
  * @param dataType see [[za.co.absa.spline.model.expr.Expression#dataType Expression.dataType]]
  */
case class AttributeReference
(
  refId: UUID,
  name: String,
  text: String,
  dataType: DataType
) extends Expression {

  @Persist
  val exprType: String = "AttributeReference"

  @Persist
  val children: Seq[Expression] = Seq.empty

  override def inputAttributeNames: Seq[String] = Seq(name)
}

/**
  * A companion object for the case class [[za.co.absa.spline.model.expr.AttributeReference AttributeReference]].
  */
object AttributeReference {

  /**
    * The method constructs an instance of the case class [[za.co.absa.spline.model.expr.AttributeReference AttributeReference]].
    *
    * @param attributeId   see [[za.co.absa.spline.model.expr.AttributeReference#attributeId AttributeReference.attributeId]]
    * @param attributeName see [[za.co.absa.spline.model.expr.AttributeReference#attributeName AttributeReference.attributeName]]
    * @param dataType      see [[za.co.absa.spline.model.expr.Expression#dataType Expression.dataType]]
    * @return An instance of the case class [[za.co.absa.spline.model.expr.AttributeReference AttributeReference]].
    */
  def apply(attributeId: UUID, attributeName: String, dataType: DataType): AttributeReference =
    new AttributeReference(attributeId, attributeName, attributeName, dataType)

  /**
    * The method constructs an instance of the case class [[za.co.absa.spline.model.expr.AttributeReference AttributeReference]].
    *
    * @param attribute An attribute object that will be referenced
    * @return An instance of the case class [[za.co.absa.spline.model.expr.AttributeReference AttributeReference]].
    */
  def apply(attribute: Attribute): AttributeReference = apply(attribute.id, attribute.name, attribute.dataType)
}

/**
  * The case class represents a special expression describing an user-defined function of Spark.
  *
  * @param name     A name assigned to an user-defined function
  * @param text     see [[za.co.absa.spline.model.expr.Expression#textualRepresentation Expression.textualRepresentation]]
  * @param dataType see [[za.co.absa.spline.model.expr.Expression#dataType Expression.dataType]]
  * @param children see [[za.co.absa.spline.model.expr.Expression#children Expression.children]]
  */
case class UserDefinedFunction
(
  name: String,
  text: String,
  dataType: DataType,
  children: Seq[Expression]
) extends Expression {

  @Persist
  val exprType: String = "UserDefinedFunction"
}
