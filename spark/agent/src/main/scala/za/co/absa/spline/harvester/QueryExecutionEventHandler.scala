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

import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.execution.QueryExecution
import za.co.absa.spline.harvester.dispatcher.LineageDispatcher
import za.co.absa.spline.harvester.json.HarvesterJsonSerDe._

import scala.language.postfixOps

class QueryExecutionEventHandler(
  harvesterFactory: LineageHarvesterFactory,
  lineageDispatcher: LineageDispatcher,
  sparkSession: SparkSession) {

  /**
    * The method is executed when an action execution is successful.
    *
    * @param funcName   A name of the executed action.
    * @param qe         A Spark object holding lineage information (logical, optimized, physical plan)
    * @param durationNs Duration of the action execution [nanoseconds]
    */
  def onSuccess(funcName: String, qe: QueryExecution, durationNs: Long): Unit = {
    harvesterFactory
      .harvester(qe.analyzed, Some(qe.executedPlan), qe.sparkSession)
      .harvest()
      .foreach({
        case (plan, event) =>
          val idAsJson = lineageDispatcher.send(plan)
          val savedPlanId = UUID.fromString(idAsJson.fromJson[String])
          lineageDispatcher.send(event.copy(planId = savedPlanId))
      })
  }

  /**
    * The method is executed when an error occurs during an action execution.
    *
    * @param funcName  A name of the executed action.
    * @param qe        A Spark object holding lineage information (logical, optimized, physical plan)
    * @param exception An exception describing the reason of the error
    */
  def onFailure(funcName: String, qe: QueryExecution, exception: Exception): Unit = {
    //TODO: send exec plan and an event with the error. See: https://github.com/AbsaOSS/spline/issues/310
  }
}
