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

package za.co.absa.spline.core

import org.slf4s.Logging
import za.co.absa.spline.common.transformations.AsyncTransformation
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.{DataLineageReader, DataLineageWriter}

import scala.concurrent.Await
import scala.concurrent.duration.DurationInt
import scala.language.postfixOps
import scala.util.Success

/**
  * The class represents a handler listening on events that Spark triggers when a Dataset is matariealized by an action on a DataFrameWriter.
  *
  * @param persistenceReader     An instance reading data lineages from a persistence layer
  * @param persistenceWriter     An instance writing data lineages to a persistence layer
  * @param lineageTransformation An instance performing modifications on harvested data lineage
  */
class SparkLineageProcessor
(
  persistenceReader: DataLineageReader,
  persistenceWriter: DataLineageWriter,
  lineageTransformation: AsyncTransformation[DataLineage]
) extends Logging {

  import scala.concurrent.ExecutionContext.Implicits._

  def process(rawLineage: DataLineage): Unit = {
    log debug s"Processing raw lineage"

    val eventuallyStored = for {
      transformedLineage <- lineageTransformation(rawLineage) andThen { case Success(_) => log debug s"Lineage is processed" }
      storeEvidence <- persistenceWriter.store(transformedLineage) andThen { case Success(_) => log debug s"Lineage is processed" }
    } yield storeEvidence

    Await.result(eventuallyStored, 10 minutes)
  }
}
