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


  object Stats {
    def empty: Stats = Stats(0, 0, Some(Stats(0, 0, None)))
  }

  case class Stats private(success: Int, failures: Int, totals: Option[Stats]) {

    def processed: Int = success + failures

    def incSuccess: Stats = inc(1, 0)

    def incFailure: Stats = inc(0, 1)

    private def inc(successInc: Int, failureInc: Int): Stats =
      Stats(success + successInc, failures + failureInc, totals.map(_.inc(successInc, failureInc)))
  }

}

class MigratorActor(mongoConnectionUrl: String, arangoConnectionUrl: String, batchSize: Int)
  extends Actor
    with ActorLogging {

  require(batchSize > 0)

  private val mongoActor = context.actorOf(Props(new MongoActor(mongoConnectionUrl)), "mongo")
  private val arangoActor = context.actorOf(Props(new ArangoActor(arangoConnectionUrl)), "arango")

  override def supervisorStrategy: SupervisorStrategy = OneForOneStrategy()({ case _ => Escalate })

  override def receive: Receive = {
    case Start => pumpAllLineagesAndReportTo(sender)
  }

  private def pumpAllLineagesAndReportTo(watcher: ActorRef): Unit = {
    processPage(PageRequest(System.currentTimeMillis, 0, batchSize), Some(Stats.empty))

    def processPage(page: PageRequest, prevTotals: Option[Stats]): Unit = {
      context become processingPage(Stats.empty.copy(totals = prevTotals), None)
      mongoActor ! MongoActor.GetLineages(page)

      def processingPage(pageStats: Stats, pageActualSize: Option[Int]): Receive = {
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

      def onCountsUpdate(pageStats: Stats, pageActualSize: Option[Int]): Unit = pageActualSize match {
        case Some(pageSize) if pageSize == pageStats.processed =>
          onPageComplete(pageStats)
        case _ =>
          context become processingPage(pageStats, pageActualSize)
      }

      def onPageComplete(pageStats: Stats): Unit = {
        if (pageStats.processed == page.size) {
          val nextPage = page.copy(offset = page.offset + pageStats.processed)
          processPage(nextPage, pageStats.totals)
        } else {
          watcher ! Result(pageStats.totals.get)
        }
      }
    }
  }
}