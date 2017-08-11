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

package za.co.absa.spline.model

import salat.annotations.{Persist, Salat}

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
  val textualRepresentation: String

  /**
    * A data type of an expression node
    */
  val dataType: DataType

  /**
    * A sequence of sub-expressions
    */
  val children: Seq[Expression]
}

/**
  * The case class represents Spark expressions for which a dedicated expression node type hasn't been created yet.
  *
  * @param exprType              see [[za.co.absa.spline.model.Expression#exprType Expression.exprType]]
  * @param textualRepresentation see [[za.co.absa.spline.model.Expression#textualRepresentation Expression.textualRepresentation]]
  * @param dataType              see [[za.co.absa.spline.model.Expression#dataType Expression.dataType]]
  * @param children              see [[za.co.absa.spline.model.Expression#children Expression.children]]
  */
case class GenericExpression
(
  exprType: String,
  textualRepresentation: String,
  dataType: DataType,
  children: Seq[Expression]
) extends Expression

/**
  * The case class represents binary operators like addition, multiplication, string concatenation, etc.
  *
  * @param exprType              see [[za.co.absa.spline.model.Expression#exprType Expression.exprType]]
  * @param symbol                A symbol expressing the operation (+, -, *, /, etc. )
  * @param textualRepresentation see [[za.co.absa.spline.model.Expression#textualRepresentation Expression.textualRepresentation]]
  * @param dataType              see [[za.co.absa.spline.model.Expression#dataType Expression.dataType]]
  * @param children              see [[za.co.absa.spline.model.Expression#children Expression.children]]
  */
case class BinaryOperator
(
  exprType: String,
  symbol: String,
  textualRepresentation: String,
  dataType: DataType,
  children: Seq[Expression]
) extends Expression

/**
  * The case class represents a special expression for removing an attribute from a data set.
  *
  * @param textualRepresentation see [[za.co.absa.spline.model.Expression#textualRepresentation Expression.textualRepresentation]]
  * @param dataType              see [[za.co.absa.spline.model.Expression#dataType Expression.dataType]]
  * @param children              see [[za.co.absa.spline.model.Expression#children Expression.children]]
  */
case class AttributeRemoval
(
  textualRepresentation: String,
  dataType: DataType,
  children: Seq[Expression]
) extends Expression {

  @Persist
  val exprType: String = "AttributeRemoval"
}

/**
  * A companion object for the case class [[za.co.absa.spline.model.AttributeRemoval AttributeRemoval]].
  */
object AttributeRemoval {

  /**
    * The method constructs new instance of the case class [[za.co.absa.spline.model.AttributeRemoval AttributeRemoval]].
    *
    * @param attribute A reference to an attribute that will be removed.
    * @return An instance of the case class [[za.co.absa.spline.model.AttributeRemoval AttributeRemoval]].
    */
  def apply(attribute: AttributeReference): AttributeRemoval =
    new AttributeRemoval("- " + attribute.textualRepresentation, attribute.dataType, Seq(attribute))
}

/**
  * The case class represents a special expression for referencing an attribute from a data set.
  *
  * @param attributeId           An unique of a referenced attribute
  * @param attributeName         A name of a referenced attribute
  * @param textualRepresentation see [[za.co.absa.spline.model.Expression#textualRepresentation Expression.textualRepresentation]]
  * @param dataType              see [[za.co.absa.spline.model.Expression#dataType Expression.dataType]]
  */
case class AttributeReference
(
  attributeId: Long,
  attributeName: String,
  textualRepresentation: String,
  dataType: DataType
) extends Expression {

  @Persist
  val exprType: String = "AttributeReference"

  @Persist
  val children: Seq[Expression] = Seq.empty
}

/**
  * A companion object for the case class [[za.co.absa.spline.model.AttributeReference AttributeReference]].
  */
object AttributeReference {

  /**
    * The method constructs an instance of the case class [[za.co.absa.spline.model.AttributeReference AttributeReference]].
    *
    * @param attributeId   see [[za.co.absa.spline.model.AttributeReference#attributeId AttributeReference.attributeId]]
    * @param attributeName see [[za.co.absa.spline.model.AttributeReference#attributeName AttributeReference.attributeName]]
    * @param dataType      see [[za.co.absa.spline.model.Expression#dataType Expression.dataType]]
    * @return An instance of the case class [[za.co.absa.spline.model.AttributeReference AttributeReference]].
    */
  def apply(attributeId: Long, attributeName: String, dataType: DataType): AttributeReference =
    new AttributeReference(attributeId, attributeName, attributeName, dataType)

  /**
    * The method constructs an instance of the case class [[za.co.absa.spline.model.AttributeReference AttributeReference]].
    *
    * @param attribute An attribute object that will be referenced
    * @return An instance of the case class [[za.co.absa.spline.model.AttributeReference AttributeReference]].
    */
  def apply(attribute: Attribute): AttributeReference = apply(attribute.id, attribute.name, attribute.dataType)
}

/**
  * The case class represents a special expression describing an user-defined function of Spark.
  *
  * @param name                  A name assigned to an user-defined function
  * @param textualRepresentation see [[za.co.absa.spline.model.Expression#textualRepresentation Expression.textualRepresentation]]
  * @param dataType              see [[za.co.absa.spline.model.Expression#dataType Expression.dataType]]
  * @param children              see [[za.co.absa.spline.model.Expression#children Expression.children]]
  */
case class UserDefinedFunction
(
  name: String,
  textualRepresentation: String,
  dataType: DataType,
  children: Seq[Expression]
) extends Expression {

  @Persist
  val exprType: String = "UserDefinedFunction"
}

