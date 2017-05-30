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

package za.co.absa.spline.core.model

import salat.annotations.Salat

/**
  * The trait describes a data type of an attribute, expression, etc.
  */
@Salat
sealed trait DataType {
  /**
    * A flag describing whether the type is nullable or not
    */
  val nullable: Boolean
}

/**
  * The case class represents atomic types such as boolean, integer, string, etc.
  *
  * @param name     A name of an atomic type ("integer", "string", ...)
  * @param nullable A flag describing whether the type is nullable or not
  */
case class SimpleType(name: String, nullable: Boolean) extends DataType

/**
  * The case class represents custom structured types.
  *
  * @param fields   A sequence of fields that the type is compound from
  * @param nullable A flag describing whether the type is nullable or not
  */
case class StructType(fields: Seq[StructField], nullable: Boolean) extends DataType

/**
  * The case class represents one attribute (element) of a [[za.co.absa.spline.core.model.StructType StructType]]
  *
  * @param name     A name of the attribute (element)
  * @param dataType A data type of the attribute (element)
  */
case class StructField(name: String, dataType: DataType)

/**
  * The case class represents a spacial data type for arrays.
  *
  * @param elementDataType A data type of any element from the array
  * @param nullable        A flag describing whether the type is nullable or not
  */
case class ArrayType(elementDataType: DataType, nullable: Boolean) extends DataType

