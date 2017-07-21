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

package za.co.absa.spline.persistence.atlas.model

import org.apache.atlas.AtlasClient
import org.apache.atlas.typesystem.Referenceable
import org.apache.atlas.typesystem.persistence.Id

import scala.collection.JavaConverters._

/**
  * The case class represents operation properties that are common for all operation types.
  * @param order A position of the operation in a particular sequence
  * @param name A name
  * @param qualifiedName An unique identifier
  * @param rawString An original string representation
  * @param input A sequence of positions of input datasets
  */
case class OperationCommonProperties
(
  order: Integer,
  name : String,
  qualifiedName: String,
  rawString: String,
  input: Seq[Int]
)

/**
  * The class represents any Spark operation for which a dedicated class hasn't been created yet.
  * @param commonProperties Common properties of all operation types
  * @param operationType An Atlas entity type name
  * @param childProperties Properties that are specific for derived classes.
  */
class Operation(
  commonProperties: OperationCommonProperties,
  operationType: String = SparkDataTypes.GenericOperation,
  childProperties : Map[String, Object] = Map.empty
) extends Referenceable(
  operationType,
  new java.util.HashMap[String, Object]() {
    put(AtlasClient.NAME, commonProperties.name)
    put(AtlasClient.REFERENCEABLE_ATTRIBUTE_NAME, commonProperties.qualifiedName)
    put("rawString", commonProperties.rawString)
    childProperties.foreach(i => put(i._1, i._2))
  }
){

  /**
    * The method selects input datasets from a sequence passed as parameter and stores them into internal dictionary.
    * @param datasets A sequence of datasets that the method can choose from.
    */
  def resolveInputDatasets(datasets: Seq[Id]) : Unit = this.set("inputs", commonProperties.input.map(i => datasets(i)).asJava)

  /**
    * The method selects output data sets from a sequence passed as parameter and stores them into internal dictionary.
    * @param datasets A sequence of data sets that the method can choose from.
    */
  def resolveOutputDatasets(datasets: Seq[Id]) : Unit = this.set("outputs", Seq(datasets(commonProperties.order)).asJava)
}

/**
  * The class represents Spark join operation.
  * @param commonProperties Common properties of all operation types
  * @param joinType A string description of a join type ("inner", "left_outer", right_outer", "outer")
  * @param condition An expression deciding how two data sets will be join together
  */
class JoinOperation(
  commonProperties: OperationCommonProperties,
  joinType: String,
  condition : Expression
) extends Operation(
  commonProperties,
  SparkDataTypes.JoinOperation,
  Map("joinType" -> joinType, "condition" -> condition)
)

/**
  * The class represents Spark filter (where) operation.
  * @param commonProperties Common properties of all operation types
  * @param condition An expression deciding what records will survive filtering
  */
class FilterOperation(
  commonProperties: OperationCommonProperties,
  condition : Expression
) extends Operation(
  commonProperties,
  SparkDataTypes.FilterOperation,
  Map("condition" -> condition)
)

/**
  * The class represents Spark projective operations (select, drop, withColumn, etc.)
  * @param commonProperties Common properties of all operation types
  * @param transformations Sequence of expressions defining how input set of attributes will be affected by the projection.
  *                        (Introduction of a new attribute, Removal of an unnecessary attribute)
  */
class ProjectOperation(
  commonProperties: OperationCommonProperties,
  transformations : Seq[Expression]
) extends Operation(
  commonProperties,
  SparkDataTypes.ProjectOperation,
  Map("transformations" -> transformations.asJava)
)

/**
  * The represents Spark alias (as) operation for assigning a label to data set.
  * @param commonProperties Common properties of all operation types
  * @param alias An assigned label
  */
class AliasOperation(
  commonProperties: OperationCommonProperties,
  alias : String
) extends Operation(
  commonProperties,
  SparkDataTypes.AliasOperation,
  Map("alias" -> alias)
)
