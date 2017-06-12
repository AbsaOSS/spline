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

import salat.annotations.Salat

/**
  * The case class represents node properties that are common for all node types.
  */
case class NodeProps
(
  name: String,
  rawString: String,
  inputs: Seq[Attributes],
  output: Option[Attributes],
  parentRefs: Seq[Int],
  childRefs: Seq[Int]
)

/**
  * The trait represents one particular node within a lineage graph.
  */
@Salat
sealed trait OperationNode {

  /**
    * Common properties of all node types.
    */
  val mainProps: NodeProps
}

/**
  * The case class represents any Spark operation for which a dedicated node type hasn't been created yet.
  *
  * @param mainProps Common node properties
  */
case class GenericNode(mainProps: NodeProps) extends OperationNode

/**
  * The case class represents Spark join operation.
  *
  * @param mainProps Common node properties
  * @param condition An expression deciding how two data sets will be join together
  * @param joinType  A string description of a join type ("inner", "left_outer", right_outer", "outer")
  */
case class JoinNode(
                     mainProps: NodeProps,
                     condition: Option[Expression],
                     joinType: String
                   ) extends OperationNode

/**
  * The case class represents Spark filter (where) operation.
  *
  * @param mainProps Common node properties
  * @param condition An expression deciding what records will survive filtering
  */
case class FilterNode(
                       mainProps: NodeProps,
                       condition: Expression
                     ) extends OperationNode

/**
  * The case class represents Spark projective operations (select, drop, withColumn, etc.)
  *
  * @param mainProps       Common node properties
  * @param transformations Sequence of expressions defining how input set of attributes will be affected by the projection.
  *                        (Introduction of a new attribute, Removal of an unnecessary attribute)
  */
case class ProjectionNode(
                           mainProps: NodeProps,
                           transformations: Seq[Expression]
                         ) extends OperationNode

/**
  * The case class represents Spark alias (as) operation for assigning a label to data set.
  *
  * @param mainProps Common node properties
  * @param alias     An assigned label
  */
case class AliasNode(
                      mainProps: NodeProps,
                      alias: String
                    ) extends OperationNode

/**
  * The case class represents Spark operations for persisting data sets to HDFS, Hive, Kafka, etc. Operations are usually performed via DataFrameWriters.
  *
  * @param mainProps       Common node properties
  * @param destinationType A string description of a destination type (parquet files, csv file, avro file, Hive table, etc.)
  * @param path            A path to the place where data set will be stored (file, table, endpoint, ...)
  */
case class DestinationNode(
                            mainProps: NodeProps,
                            destinationType: String,
                            path: String
                          ) extends OperationNode

/**
  * The case class represents Spark operations for loading data from HDFS, Hive, Kafka, etc.
  *
  * @param mainProps  Common node properties
  * @param sourceType A string description of a source type (parquet files, csv file, avro file, Hive table, etc.)
  * @param paths      A sequence of paths to data location. Multiple paths can specified since since a data set can be spread across multiple parquet files.
  */
case class SourceNode(
                       mainProps: NodeProps,
                       sourceType: String,
                       paths: Seq[String]
                     ) extends OperationNode
