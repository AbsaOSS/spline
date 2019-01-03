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

package za.co.absa.spline.harvester.listener

import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.execution.QueryExecution
import org.apache.spark.sql.util.QueryExecutionListener
import org.slf4s.Logging
import za.co.absa.spline.harvester.DataLineageBuilderFactory
import za.co.absa.spline.harvester.conf.LineageDispatcher
import za.co.absa.spline.model.{DataLineage, _}

import scala.language.postfixOps

class SplineQueryExecutionListener(
  harvesterFactory: DataLineageBuilderFactory,
  lineageDispatcher: LineageDispatcher,
  sparkSession: SparkSession) extends QueryExecutionListener with Logging {

  /**
    * The method is executed when an action execution is successful.
    *
    * @param funcName   A name of the executed action.
    * @param qe         A Spark object holding lineage information (logical, optimized, physical plan)
    * @param durationNs Duration of the action execution [nanoseconds]
    */
  def onSuccess(funcName: String, qe: QueryExecution, durationNs: Long): Unit = {
    log debug s"Action '$funcName' execution succeeded"

    if (funcName == "save") {
      log debug s"Start tracking lineage for action '$funcName'"

      val rawLineage =
        harvesterFactory.
          createBuilder(qe.analyzed, Some(qe.executedPlan), qe.sparkSession.sparkContext).
          buildLineage()

      if (wasResultIgnored(rawLineage)) {
        log debug s"The write result was ignored. Skipping lineage."
      } else {
        send(rawLineage)
      }

      log debug s"Lineage tracking for action '$funcName' is done."
    } else {
      log debug s"Skipping lineage tracking for action '$funcName'"
    }
  }

  private def wasResultIgnored(lineage: DataLineage): Boolean =
    lineage.rootOperation match {
      case op.BatchWrite(_, _, _, _, writeMetrics, _) =>
        writeMetrics get "numFiles" exists 0.==
      case _ =>
        sys.error(s"Unexpected root operation: ${lineage.rootOperation.getClass}")
    }

  private def send(dataLineage: DataLineage): Unit = {
    lineageDispatcher.send(dataLineage)
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
}

