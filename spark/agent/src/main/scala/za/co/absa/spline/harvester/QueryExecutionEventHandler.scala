/*
 * Copyright 2019 ABSA Group Limited
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

package za.co.absa.spline.harvester

import java.util.UUID

import org.apache.commons.lang3.exception.ExceptionUtils
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.execution.QueryExecution
import org.slf4s.Logging
import za.co.absa.spline.producer.rest.model.ExecutionEvent

import scala.language.postfixOps

class QueryExecutionEventHandler(
                                  harvesterFactory: ExecutionPlanBuilderFactory,
                                  lineageDispatcher: LineageDispatcher,
                                  sparkSession: SparkSession) extends Logging {

  /**
    * The method is executed when an action execution is successful.
    *
    * @param funcName   A name of the executed action.
    * @param qe         A Spark object holding lineage information (logical, optimized, physical plan)
    * @param durationNs Duration of the action execution [nanoseconds]
    */
  def onSuccess(funcName: String, qe: QueryExecution, durationNs: Long): Unit = {
    log debug s"Action '$funcName' execution succeeded"

    if (matchFunction(funcName)) {
      log debug s"Start tracking lineage for action '$funcName'"

      processComputation(qe, None)

      log debug s"Lineage tracking for action '$funcName' is done."
    }
    else {
      log debug s"Skipping lineage tracking for action '$funcName'"
    }
  }

  private def matchFunction(funcName: String) = {
    funcName == "save" || funcName == "saveAsTable" || funcName == "insertInto"
  }

  private def processComputation(qe: QueryExecution, exception: Option[Exception]) = {
    val maybeExecutionPlan =
      harvesterFactory.
        createBuilder(qe.analyzed, Some(qe.executedPlan), qe.sparkSession.sparkContext).
        buildExecutionPlan()

    maybeExecutionPlan match {
      case None => log debug s"The write result was ignored. Skipping lineage."
      case Some(executionPlan) => {
        lineageDispatcher.send(executionPlan)

        val errorMessage : Option[String] = exception match {
          case Some(e) => Some(ExceptionUtils.getStackTrace(e))
          case _ => None
        }

        val event = ExecutionEvent(
          planId = UUID.randomUUID(),
          timestamp = System.currentTimeMillis(),
          error = errorMessage,
          extra = Map.empty
        )

        lineageDispatcher.send(Seq(event))
      }
    }
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

    if (matchFunction(funcName) ) {
      processComputation(qe, Some(exception))
    }
  }
}
