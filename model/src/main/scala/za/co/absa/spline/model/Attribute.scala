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

/**
  * The case class represents an attribute of a Spark data set.
  *
  * @param id       An unique identifier of the attribute
  * @param name     A name of the attribute
  * @param dataType A data type of the attribute
  */
case class Attribute(id: Long, name: String, dataType: DataType)

/**
  * The case class represents a collection of attributes. See [[za.co.absa.spline.model.Attribute Attribute]]
  *
  * @param seq An internal sequence of attributes
  */
case class Attributes(seq: Seq[Attribute])
