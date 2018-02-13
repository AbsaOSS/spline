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

package za.co.absa.spline.core

import org.apache.hadoop.conf.Configuration
import org.apache.spark.sql.execution.QueryExecution
import org.apache.spark.sql.util.QueryExecutionListener
import org.slf4s.Logging
import za.co.absa.spline.common.transformations.AsyncTransformationPipeline
import za.co.absa.spline.core.transformations.{ForeignMetaDatasetInjector, LineageProjectionMerger}
import za.co.absa.spline.persistence.api.{NopDataLineageReader, PersistenceFactory}

import scala.concurrent.Await
import scala.concurrent.duration.DurationInt
import scala.language.postfixOps
import scala.util.Success

/**
  * The class represents a handler listening on events that Spark triggers when an execution any action is performed. It can be considered as an entry point to Spline library.
  *
  * @param persistenceFactory  A factory of persistence readers and writers
  * @param hadoopConfiguration A hadoop configuration
  */
class DataLineageListener(persistenceFactory: PersistenceFactory, hadoopConfiguration: Configuration) extends QueryExecutionListener with Logging {

  import scala.concurrent.ExecutionContext.Implicits._

  private val persistenceWriter = persistenceFactory.createDataLineageWriter()
  private val persistenceReader = persistenceFactory.createDataLineageReaderOrGetDefault(new NopDataLineageReader)
  private val harvester = new DataLineageHarvester(hadoopConfiguration)
  private val transformationPipeline =
    new AsyncTransformationPipeline(
      LineageProjectionMerger,
      new ForeignMetaDatasetInjector(persistenceReader)
    )

  /**
    * The method is executed when an action execution is successful.
    *
    * @param funcName   A name of the executed action.
    * @param qe         A Spark object holding lineage information (logical, optimized, physical plan)
    * @param durationNs Duration of the action execution [nanoseconds]
    */
  def onSuccess(funcName: String, qe: QueryExecution, durationNs: Long): Unit = processQueryExecution(funcName, qe)


  /**
    * The method is executed when an error occurs during an action execution.
    *
    * @param funcName  A name of the executed action.
    * @param qe        A Spark object holding lineage information (logical, optimized, physical plan)
    * @param exception An exception describing the reason of the error
    */
  def onFailure(funcName: String, qe: QueryExecution, exception: Exception): Unit = processQueryExecution(funcName, qe)


  private def processQueryExecution(funcName: String, qe: QueryExecution): Unit = {
    log debug s"Action '$funcName' execution finished"
    if (funcName == "save") {
      log debug s"Start tracking lineage for action '$funcName'"
      log debug s"Extracting raw lineage"
      val lineage = harvester harvestLineage qe
      log debug s"Preparing lineage"
      val eventuallyStored = for {
        transformedLineage <- transformationPipeline(lineage) andThen { case Success(_) => log debug s"Lineage is prepared" }
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
