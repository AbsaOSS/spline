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

package za.co.absa.spline.core.batch

import org.apache.spark.sql.execution.QueryExecution
import org.apache.spark.sql.util.QueryExecutionListener
import org.slf4s.Logging
import za.co.absa.spline.common.transformations.AsyncTransformation
import za.co.absa.spline.core.LogicalPlanLineageHarvester
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.{DataLineageReader, DataLineageWriter}

import scala.concurrent.Await
import scala.concurrent.duration.DurationInt
import scala.language.postfixOps
import scala.util.Success

/**
  * The class represents a handler listening on events that Spark triggers when a Dataset is matariealized by an action on a DataFrameWriter.
  *
  * @param persistenceReader  An instance reading data lineages from a persistence layer
  * @param persistenceWriter  An instance writing data lineages to a persistence layer
  * @param harvester An instance gathering lineage information from a Spark logical plan
  * @param lineageTransformation An instance performing modifications on harvested data lineage
  */
class BatchListener(
  persistenceReader: DataLineageReader,
  persistenceWriter: DataLineageWriter,
  harvester: LogicalPlanLineageHarvester,
  lineageTransformation: AsyncTransformation[DataLineage]
) extends QueryExecutionListener with Logging {

  import scala.concurrent.ExecutionContext.Implicits._

  /**
    * The method is executed when an action execution is successful.
    *
    * @param funcName   A name of the executed action.
    * @param qe         A Spark object holding lineage information (logical, optimized, physical plan)
    * @param durationNs Duration of the action execution [nanoseconds]
    */
  def onSuccess(funcName: String, qe: QueryExecution, durationNs: Long): Unit = {
    log debug s"Action '$funcName' execution succeeded"
    processQueryExecution(funcName, qe)
  }

  /**
    * The method is executed when an error occurs during an action execution.
    *
    * @param funcName  A name of the executed action.
    * @param qe        A Spark object holding lineage information (logical, optimized, physical plan)
    * @param exception An exception describing the reason of the error
    */
  def onFailure(funcName: String, qe: QueryExecution, exception: Exception): Unit = {
    log.error(s"Action '$funcName' execution failed", exception)
  }


  private def processQueryExecution(funcName: String, qe: QueryExecution): Unit = {
    log debug s"Action '$funcName' execution finished"
    if (funcName == "save") {
      log debug s"Start tracking lineage for action '$funcName'"
      log debug s"Extracting raw lineage"
      val lineage = harvester.harvestLineage(qe.sparkSession.sparkContext, qe.analyzed)
      log debug s"Preparing lineage"
      val eventuallyStored = for {
        transformedLineage <- lineageTransformation(lineage) andThen { case Success(_) => log debug s"Lineage is prepared" }
        storeEvidence <- persistenceWriter.store(transformedLineage) andThen { case Success(_) => log debug s"Lineage is persisted" }
      } yield storeEvidence

      Await.result(eventuallyStored, 10 minutes)
      log debug s"Lineage tracking for action '$funcName' is done."
    }
    else {
      log debug s"Skipping lineage tracking for action '$funcName'"
    }
  }
}
