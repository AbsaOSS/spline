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

package za.co.absa.spline.model.op

import java.util.UUID

import salat.annotations.Salat
import za.co.absa.spline.model.{Attribute, MetaDataset}
import za.co.absa.spline.model.expr.Expression

/**
  * The case class represents node properties that are common for all node types.
  *
  * @param id     An unique identifier of the operation
  * @param name   A operation name
  * @param inputs Input datasets' IDs
  * @param output Output dataset ID
  */
case class OperationProps
(
  id: UUID,
  name: String,
  inputs: Seq[UUID],
  output: UUID
)

/**
  * The trait represents one particular node within a lineage graph.
  */
@Salat
sealed trait Operation {
  /**
    * Common properties of all node types.
    */
  val mainProps: OperationProps
}

object Operation {

  implicit class OperationMutator[T <: Operation](op: T) {
    /**
      * The method creates a copy of the operation with modified mainProps
      *
      * @param fn New main properties
      * @return A copy with new main properties
      */
    def updated(fn: OperationProps => OperationProps): T = (op.asInstanceOf[Operation] match {
      case op@Alias(mp, _) => op.copy(mainProps = fn(mp))
      case op@Write(mp, _, _) => op.copy(mainProps = fn(mp))
      case op@Filter(mp, _) => op.copy(mainProps = fn(mp))
      case op@Generic(mp, _) => op.copy(mainProps = fn(mp))
      case op@Join(mp, _, _) => op.copy(mainProps = fn(mp))
      case op@Projection(mp, _) => op.copy(mainProps = fn(mp))
      case op@Read(mp, _, _) => op.copy(mainProps = fn(mp))
      case op@Composite(mp, _, _, _, _, _) => op.copy(mainProps = fn(mp))
    }).asInstanceOf[T]
  }

}

/**
  * The case class represents any Spark operation for which a dedicated node type hasn't been created yet.
  *
  * @param mainProps Common node properties
  * @param rawString String representation of the node
  */
case class Generic(mainProps: OperationProps, rawString: String) extends Operation

/**
  * The case class represents Spark join operation.
  *
  * @param mainProps Common node properties
  * @param condition An expression deciding how two data sets will be join together
  * @param joinType  A string description of a join type ("inner", "left_outer", right_outer", "outer")
  */
case class Join(
                 mainProps: OperationProps,
                 condition: Option[Expression],
                 joinType: String
               ) extends Operation

/**
  * The case class represents Spark filter (where) operation.
  *
  * @param mainProps Common node properties
  * @param condition An expression deciding what records will survive filtering
  */
case class Filter(
                   mainProps: OperationProps,
                   condition: Expression
                 ) extends Operation

/**
  * The case class represents Spark projective operations (select, drop, withColumn, etc.)
  *
  * @param mainProps       Common node properties
  * @param transformations Sequence of expressions defining how input set of attributes will be affected by the projection.
  *                        (Introduction of a new attribute, Removal of an unnecessary attribute)
  */
case class Projection(
                       mainProps: OperationProps,
                       transformations: Seq[Expression]
                     ) extends Operation

/**
  * The case class represents Spark alias (as) operation for assigning a label to data set.
  *
  * @param mainProps Common node properties
  * @param alias     An assigned label
  */
case class Alias(
                  mainProps: OperationProps,
                  alias: String
                ) extends Operation

/**
  * The case class represents Spark operations for persisting data sets to HDFS, Hive, Kafka, etc. Operations are usually performed via DataFrameWriters.
  *
  * @param mainProps       Common node properties
  * @param destinationType A string description of a destination type (parquet files, csv file, avro file, Hive table, etc.)
  * @param path            A path to the place where data set will be stored (file, table, endpoint, ...)
  */
case class Write(
                  mainProps: OperationProps,
                  destinationType: String,
                  path: String
                ) extends Operation

/**
  * The case class represents Spark operations for loading data from HDFS, Hive, Kafka, etc.
  *
  * @param mainProps  Common node properties
  * @param sourceType A string description of a source type (parquet files, csv file, avro file, Hive table, etc.)
  * @param sources    A sequence of meta data sources for the operation. When the data is read from multiple files by one "read" operation,
  *                   every file will be represented by one meta data source instance
  */
case class Read(
                 mainProps: OperationProps,
                 sourceType: String,
                 sources: Seq[MetaDataSource]
               ) extends Operation {

  private val knownSourceLineagesCount = sources.count(_.datasetId.isDefined)
  private val inputDatasetsCount = mainProps.inputs.size

  require(
    inputDatasetsCount == knownSourceLineagesCount,
    "Inputs for 'Read' operation are datasets associated with the data sources that we know lineage of. " +
      s"Hence the size 'inputs' collection should be the same as the count of known datasets for 'sources' field. " +
      s"But was $inputDatasetsCount and $knownSourceLineagesCount respectively")
}

/**
  * Represents a persisted source data (e.g. file)
  *
  * @param path      file location
  * @param datasetId ID of an associated dataset that was read/written from/to the given data source
  */
case class MetaDataSource(path: String, datasetId: Option[UUID])

/**
  * Represents a persisted source data (e.g. file).
  * Same as [[MetaDataSource]] but with type
  *
  * @param `type`    source type
  * @param path      file location
  * @param datasetId ID of an associated dataset that was read/written from/to the given data source
  */
case class TypedMetaDataSource(`type`: String, path: String, datasetId: Option[UUID])

/**
  * The case class represents a partial data lineage at its boundary level.
  * I.e. only focusing on its inputs, output and related Spark application meta data, omitting all the transformations in between.
  *
  * @param mainProps   Common node properties
  * @param sources     represents the embedded [[Read]] operations
  * @param destination represents the embedded [[Write]] operation
  * @param timestamp   output dataset lineage created timestamp
  * @param appId       related Spark application ID
  * @param appName     related Spark application name
  */
case class Composite(
                      mainProps: OperationProps,
                      sources: Seq[TypedMetaDataSource],
                      destination: TypedMetaDataSource,
                      timestamp: Long,
                      appId: String,
                      appName: String
                    ) extends Operation {
  private val knownSourceLineagesCount = sources.count(_.datasetId.isDefined)
  private val inputDatasetsCount = mainProps.inputs.size

  require(
    inputDatasetsCount == knownSourceLineagesCount,
    "Inputs for 'Composite' operation are datasets associated with the data sources that we know lineage of. " +
      s"Hence the size 'inputs' collection should be the same as the count of known datasets for 'sources' field. " +
      s"But was $inputDatasetsCount and $knownSourceLineagesCount respectively")
}

/**
  * The case class serves for associating a composite operation with its dependencies
  *
  * @param composite  A composite operation
  * @param datasets   Referenced meta data sets
  * @param attributes Referenced attributes
  */
case class CompositeWithDependencies(composite: Composite, datasets: Seq[MetaDataset], attributes: Seq[Attribute])
