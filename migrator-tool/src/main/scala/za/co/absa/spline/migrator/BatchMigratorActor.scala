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

package za.co.absa.spline.migrator

import akka.actor.SupervisorStrategy.Escalate
import akka.actor.{Actor, ActorLogging, ActorRef, OneForOneStrategy, Props, SupervisorStrategy}
import za.co.absa.spline.migrator.BatchMigratorActor._
import za.co.absa.spline.migrator.Spline03Actor.{DataLineageLoadFailure, DataLineageLoaded, PageSize}
import za.co.absa.spline.migrator.Spline04Actor.{Save, SaveFailure, SaveSuccess}
import za.co.absa.spline.migrator.rest.ScalajRestClientImpl
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.DataLineageReader.PageRequest

object BatchMigratorActor {

  trait RequestMessage

  case object Start extends RequestMessage


  trait ResponseMessage

  case class Result(stats: Stats)

}

class BatchMigratorActor(conf: MigratorConfig)
  extends Actor
    with ActorLogging {

  private val spline03Actor = context.actorOf(Props(new Spline03Actor(conf.mongoConnectionUrl)))
  private val spline04Actor = context.actorOf(Props(new Spline04Actor(new ScalajRestClientImpl(conf.producerRESTEndpointUrl))))

  override def supervisorStrategy: SupervisorStrategy = OneForOneStrategy()({ case _ => Escalate })

  override def receive: Receive = {
    case Start => pumpAllLineagesAndReportTo(sender)
  }

  private def pumpAllLineagesAndReportTo(watcher: ActorRef): Unit = {
    processPage(PageRequest(System.currentTimeMillis, 0, conf.batchSize), Stats.empty)

    def processPage(page: PageRequest, prevTotals: Stats): Unit = {
      context become processingPage(Stats.emptyTree.copy(parentStats = prevTotals), None)
      spline03Actor ! Spline03Actor.GetExistingLineages(page)

      def processingPage(pageStats: TreeStats, pageActualSize: Option[Int]): Receive = {
        case PageSize(pageSize) =>
          onCountsUpdate(pageStats, Some(pageSize)) ensuring pageActualSize.isEmpty

        case DataLineageLoaded(lineage: DataLineage) =>
          val (executionPlan, maybeExecutionEvent) = new DataLineageToExecPlanWithEventConverter(lineage).convert()
          spline04Actor ! Save(executionPlan, maybeExecutionEvent)

        case SaveSuccess(_) =>
          onCountsUpdate(pageStats.incSuccess, pageActualSize)

        case DataLineageLoadFailure(_, e) =>
          onCountsUpdate(pageStats.incFailure, pageActualSize)
          log.error(e, e.getMessage)

        case SaveFailure(_, e) =>
          onCountsUpdate(pageStats.incFailure, pageActualSize)
          log.error(e, e.getMessage)
      }

      def onCountsUpdate(pageStats: TreeStats, pageActualSize: Option[Int]): Unit = pageActualSize match {
        case Some(pageSize) if pageSize == pageStats.processed =>
          onPageComplete(pageStats)
        case _ =>
          context become processingPage(pageStats, pageActualSize)
      }

      def onPageComplete(pageStats: TreeStats): Unit =
        if (isLastPage(page, pageStats)) {
          watcher ! Result(pageStats.parentStats)
        } else {
          val nextPage = page.copy(offset = page.offset + pageStats.processed)
          processPage(nextPage, pageStats.parentStats)
        }
    }
  }

  private def isLastPage(page: PageRequest, pageStats: TreeStats): Boolean = {
    pageStats.processed != page.size ||
      conf.batchesMax > -1 && (pageStats.parentStats.processed / page.size) >= conf.batchesMax
  }
}