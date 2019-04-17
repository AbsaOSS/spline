/*
 * Copyright 2019 ABSA Group Limited
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

package za.co.absa.spline.core.listener

import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.execution.QueryExecution
import org.apache.spark.sql.util.QueryExecutionListener
import za.co.absa.spline.core.SparkLineageInitializer.createEventHandler
import za.co.absa.spline.core.harvester.QueryExecutionEventHandler
import za.co.absa.spline.core.listener.SplineQueryExecutionListener._

class SplineQueryExecutionListener(maybeEventHandlerConstructor: => Option[QueryExecutionEventHandler]) extends QueryExecutionListener {

  private lazy val maybeEventHandler: Option[QueryExecutionEventHandler] = maybeEventHandlerConstructor

  /**
    * Listener delegate is lazily evaluated as Spline initialization requires completely initialized SparkSession
    * to be able to use sessionState for duplicate tracking prevention.
    */
  def this() = this(constructEventHandler())

  override def onSuccess(funcName: String, qe: QueryExecution, durationNs: Long): Unit =
      maybeEventHandler.foreach(_.onSuccess(funcName, qe, durationNs))

  override def onFailure(funcName: String, qe: QueryExecution, exception: Exception): Unit =
      maybeEventHandler.foreach(_.onFailure(funcName, qe, exception))

}

object SplineQueryExecutionListener {

  private def constructEventHandler(): Option[QueryExecutionEventHandler] = {
    val sparkSession = SparkSession.getActiveSession
      .orElse(SparkSession.getDefaultSession)
      .getOrElse(throw new IllegalStateException("Session is unexpectedly missing. Spline cannot be initialized."))
    createEventHandler(sparkSession)
  }

}
