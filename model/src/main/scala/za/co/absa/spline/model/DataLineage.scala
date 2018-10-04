/*
 * Copyright 2017 ABSA Group Limited
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

import java.util.UUID

import salat.annotations.Persist
import za.co.absa.spline.model.dt.DataType
import za.co.absa.spline.model.op.Operation

/**
  * The case class represents a partial data lineage graph of a Spark dataset(s).
  *
  * @param appId      An unique identifier of the application run
  * @param appName    A name of the Spark application
  * @param timestamp  A timestamp describing when the application was executed
  * @param operations A sequence of nodes representing the data lineage graph
  * @param datasets   A sequence of data sets produced or consumed by operations
  * @param attributes A sequence of attributes contained in schemas of data sets
  */
case class DataLineage
(
  appId: String,
  appName: String,
  timestamp: Long,
  sparkVer: String,
  operations: Seq[Operation],
  datasets: Seq[MetaDataset],
  attributes: Seq[Attribute],
  dataTypes: Seq[DataType]
) {
  require(operations.nonEmpty, "list of operations cannot be empty")
  require(datasets.nonEmpty, "list of datasets cannot be empty")
  require(rootOperation.mainProps.output == rootDataset.id)

  /**
    * A unique identifier of the data lineage
    */
  @Persist
  lazy val id: String = DataLineageId.fromDatasetId(rootDataset.id)

  /**
    * A node representing the last operation performed within data lineage graph. Usually, it describes persistence of data set to some file, database, Kafka endpoint, etc.
    */
  @Persist
  lazy val rootOperation: Operation = operations.head

  /**
    * A descriptor of the data set produced by the computation.
    */
  @Persist
  lazy val rootDataset: MetaDataset = datasets.head
}

object DataLineageId {
  private val prefix = "ln_"

  def fromDatasetId(dsId: UUID): String = prefix + dsId

  def toDatasetId(lnId: String): UUID = UUID.fromString(lnId.substring(prefix.length))
}
