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

import java.util.UUID

import za.co.absa.spline.model.op.Operation

/**
  * The case class represents a partial data lineage graph of a Spark dataset(s).
  *
  * @param id         An unique identifier of the data lineage
  * @param appName    A name of the Spark application
  * @param operations - A sequence of nodes representing the data lineage graph
  */
case class DataLineage
(
  id: UUID,
  appName: String,
  operations: Seq[Operation],
  datasets: Seq[MetaDataset],
  attributes: Seq[Attribute]
) {

  require(operations.nonEmpty, "list of operations cannot be empty")
  require(datasets.nonEmpty, "list of datasets cannot be empty")

  /**
    * A method returning the root node of a DAG.
    *
    * @return A node representing the last operation performed within data lineage graph. Usually, it describes persistence of data set to some file, database, Kafka endpoint, etc.
    */
  def rootNode: Operation = operations.head

  def rootDataset: MetaDataset = datasets.head
}
