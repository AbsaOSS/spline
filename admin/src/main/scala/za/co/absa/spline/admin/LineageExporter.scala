package za.co.absa.spline.admin

import org.slf4s.Logging
import za.co.absa.spline.admin.LineageExporter.executionPlanJsonFileName
import za.co.absa.spline.common.ConsoleUtils._
import za.co.absa.spline.common.rest.RESTClientApacheHttpImpl
import za.co.absa.spline.persistence.DefaultJsonSerDe._

import java.io.File
import java.nio.charset.StandardCharsets
import java.nio.file.{Files, Path}
import java.util.concurrent.ExecutorService
import scala.concurrent.Future

object LineageExporter {
  private def executionPlanJsonFileName(planId: String) = {
    s"plan-$planId.json"
  }
}

class LineageExporter(restClient: RESTClientApacheHttpImpl)
                     (implicit ec: scala.concurrent.ExecutionContext, es: ExecutorService)
  extends Logging {

  def exportTo(dir: File): Future[(Int, Int)] = {
    val dirPath = dir.toPath
    dir.mkdirs()
    restClient
      .get("execution-plans")
      .map(_.fromJson[Array[String]])
      .flatMap(ids => {
        val idsToExport = ids.filterNot(planId =>
          Files.exists(dirPath.resolve(executionPlanJsonFileName(planId)))
        )
        (ids, idsToExport) match {
          case (Array(), _) =>
            println(ansi"%yellow{No execution plans found. Nothing to export.}")
            Future.successful((0, 0))
          case (_, Array()) =>
            println(ansi"%yellow{No new lineage data to export. All plans already exported.}")
            Future.successful((0, 0))
          case _ =>
            if (idsToExport.length != ids.length) {
              val skipped = ids.length - idsToExport.length
              println(ansi"%yellow{Skipped %bold{$skipped} execution plans that already exist in the target directory.}")
            }
            println(ansi"Found %bold{${idsToExport.length}} execution plans to export.")
            doExport(idsToExport, dirPath)
        }
      })
  }

  private def doExport(ids: Array[String], dir: Path): Future[(Int, Int)] = {
    println(ansi"Exporting to %bold{$dir}/")

    val totalDocs = ids.length
    val statsTracker = new LineageProcessingStatsTracker(totalDocs)

    val eventualProcessedPlanAndEventCounts: Future[Seq[(Int, Int)]] =
      Future.traverse(ids.toSeq) { planId =>
        log.debug(s"Exporting execution plan with id: $planId")
        val eventualPlanJson = restClient.get(s"execution-plans/$planId")
        val eventualEventJsons = restClient.get(s"execution-plans/$planId/events")
        for {
          planJson <- eventualPlanJson
          events <- eventualEventJsons.map(_.fromJson[Seq[Map[String, Any]]])
        } yield {
          log.debug(s"Writing execution events for plan with id: $planId")
          events.foreach(event => Files.writeString(
            dir.resolve(s"event-$planId-${event("timestamp")}.json"),
            event.toJson,
            StandardCharsets.UTF_8
          ))
          // we write the plan file to disk the last, so that the existence of
          // the plan file indicates that all related events have also been saved.
          log.debug(s"Writing execution plan with id: $planId")
          Files.writeString(
            dir.resolve(executionPlanJsonFileName(planId)),
            planJson,
            StandardCharsets.UTF_8
          )

          statsTracker.incrementPlans()
          if (statsTracker.shouldReport) {
            println(statsTracker.progressMessage)
          }

          (1, events.length)
        }
      }

    eventualProcessedPlanAndEventCounts map { results: Seq[(Int, Int)] =>
      val totalPlans = results.map(_._1).sum
      val totalEvents = results.map(_._2).sum
      (totalPlans, totalEvents)
    }
  }
}
