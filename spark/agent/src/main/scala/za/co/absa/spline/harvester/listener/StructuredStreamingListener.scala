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

import java.util.UUID
import java.util.UUID.randomUUID
import java.util.concurrent.ConcurrentHashMap

import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.streaming._
import org.apache.spark.sql.streaming.{StreamingQuery, StreamingQueryListener, StreamingQueryManager}
import org.slf4s.Logging
import za.co.absa.spline.common.ReflectionUtils
import za.co.absa.spline.harvester.{DataLineageBuilderFactory, LineageDispatcher, StreamWriteBuilder}
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.model.op.{StreamRead, StreamWrite}
import za.co.absa.spline.model.streaming.ProgressEvent

import scala.language.postfixOps

/**
  * Not finished. Please ignore.
  */
class StructuredStreamingListener(
                                   queryManager: StreamingQueryManager,
                                   lineageBuilderFactory: DataLineageBuilderFactory,
                                   lineageDispatcher: LineageDispatcher)
  extends StreamingQueryListener with Logging {

  val runIdToLineages = new ConcurrentHashMap[UUID, DataLineage]()

  override def onQueryStarted(event: StreamingQueryListener.QueryStartedEvent): Unit = {
    log debug s"Structured streaming query(id: ${event.id}, runId: ${event.runId}) has started."
    log.info(s"(id: ${event.id}, runId: ${event.runId})")
    processQuery(queryManager.get(event.id))
  }

  override def onQueryProgress(event: StreamingQueryListener.QueryProgressEvent): Unit = {
    val progress = event.progress
    val lineage = runIdToLineages.get(progress.runId)
    val progressEvent = lineageToEvent(lineage, progress.numInputRows)
    lineageDispatcher.send(progressEvent)
  }

  private def lineageToEvent(lineage: DataLineage, numberOfRecords: Long): ProgressEvent = {
    val writePath = lineage.rootOperation.asInstanceOf[StreamWrite].path
    val readPaths = for (
      op <- lineage.operations if op.isInstanceOf[StreamRead];
      ds <- op.asInstanceOf[StreamRead].sources
    ) yield ds.path

    ProgressEvent(
      randomUUID,
      lineage.id,
      lineage.appId,
      lineage.appName,
      System.currentTimeMillis(),
      numberOfRecords,
      readPaths,
      writePath
    )
  }

  override def onQueryTerminated(event: StreamingQueryListener.QueryTerminatedEvent): Unit = {
    val queryStringRep = s"Structured streaming query(id: ${event.id}, runId: ${event.runId})"

    event.exception match {
      case None => log debug s"'$queryStringRep' successfully terminated."
      case Some(err) => log debug s"'$queryStringRep' terminated with the exception '$err'"
    }
  }

  private def processQuery(query: StreamingQuery): Unit = query match {
    case se: StreamExecution => processExecution(se)
    case sw: StreamingQueryWrapper => processQuery(sw.streamingQuery)
    case x => log error s"Trying to process unknown query '$x'."
  }

  private def processExecution(se: StreamExecution): Unit = {
    assume(se.logicalPlan.resolved, "we harvest lineage from analyzed logic plans")
    val logicalPlan = ReflectionUtils.getFieldValue[LogicalPlan](se, "analyzedPlan")
    val logicalPlanLineage = lineageBuilderFactory.createBuilder(logicalPlan, None, se.sparkSession.sparkContext).buildLineage()

    logicalPlanLineage match {
      case Some(lineage) => {
        val (streamWrite, metaDataset) = StreamWriteBuilder.build(se, lineage)
        val streamingLineage = lineage.copy(
          operations = streamWrite +: lineage.operations,
          datasets = metaDataset +: lineage.datasets)
        runIdToLineages.put(se.runId, streamingLineage)
        lineageDispatcher.send(streamingLineage)
      }
    case None =>
    }
  }
}
