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
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.DataLineageReader.PageRequest
import za.co.absa.spline.migrator.MongoActor.PageSize
import za.co.absa.spline.migrator.MigratorActor._

import scala.util.{Failure, Success}

object MigratorActor {

  trait RequestMessage

  case object Start extends RequestMessage


  trait ResponseMessage

  case class Result(stats: Stats)

}

class MigratorActor(conf: MigratorConfig)
  extends Actor
    with ActorLogging {

  private val mongoActor = context.actorOf(Props(new MongoActor(conf.mongoConnectionUrl)), "mongo")
  private val arangoActor = context.actorOf(Props(new ArangoActor(conf.arangoConnectionUrl)), "arango")

  override def supervisorStrategy: SupervisorStrategy = OneForOneStrategy()({ case _ => Escalate })

  override def receive: Receive = {
    case Start => pumpAllLineagesAndReportTo(sender)
  }

  private def pumpAllLineagesAndReportTo(watcher: ActorRef): Unit = {
    processPage(PageRequest(System.currentTimeMillis, 0, conf.batchSize), Stats.empty)

    def processPage(page: PageRequest, prevTotals: Stats): Unit = {
      context become processingPage(Stats.emptyTree.copy(parentStats = prevTotals), None)
      mongoActor ! MongoActor.GetLineages(page)

      def processingPage(pageStats: TreeStats, pageActualSize: Option[Int]): Receive = {
        case lineage: DataLineage =>
          arangoActor ! ArangoActor.LineagePersistRequest(lineage)

        case PageSize(pageSize) =>
          onCountsUpdate(pageStats, Some(pageSize)) ensuring pageActualSize.isEmpty

        case resp: ArangoActor.LineagePersistResponse =>
          resp.result match {
            case Success(_) =>
              onCountsUpdate(pageStats.incSuccess, pageActualSize)
            case Failure(e: Throwable) =>
              onCountsUpdate(pageStats.incFailure, pageActualSize)
              log.error(e, e.getMessage)
          }
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