package za.co.absa.spline.admin

import org.apache.http.Consts
import org.apache.http.entity.ContentType
import org.slf4s.Logging
import za.co.absa.commons.lang.ARM
import za.co.absa.spline.admin.LineageImporter.{EventFilePattern, PlanFilePattern}
import za.co.absa.spline.common.rest.RESTClientApacheHttpImpl
import za.co.absa.spline.producer.rest.ProducerAPI

import java.io.File
import java.nio.file.Files
import scala.concurrent.Future
import scala.jdk.CollectionConverters._

object LineageImporter {
  val EventFilePattern = "event-*.json"
  val PlanFilePattern = "plan-*.json"
}

class LineageImporter(restClient: RESTClientApacheHttpImpl)
                     (implicit ec: scala.concurrent.ExecutionContext)
  extends Logging {

  def importFrom(dir: File): Future[Int] = {
    val planFiles = Files.newDirectoryStream(dir.toPath, PlanFilePattern).asScala.toSeq
    val totalDocs = planFiles.size
    val statsTracker = new LineageProcessingStatsTracker(totalDocs)

    def process(pattern: String, url: String, fileContentToBodyFn: String => String): Future[Int] = {
      ARM.using(Files.newDirectoryStream(dir.toPath, pattern)) { dirStream =>
        dirStream.asScala
          .map(_.toFile)
          .filter(_.isFile)
          .foldLeft(Future.successful(0)) { (prevFut, file) =>
            prevFut.flatMap { n =>
              val rawJsonStr = Files.readString(file.toPath).trim
              restClient.post(
                path = url,
                body = fileContentToBodyFn(rawJsonStr),
                contentType = ContentType.create(ProducerAPI.MimeTypeV1_1, Consts.UTF_8)
              ) map { _ =>
                if (pattern == PlanFilePattern) {
                  statsTracker.incrementPlans()
                  if (statsTracker.shouldReport) {
                    println(statsTracker.progressMessage)
                  }
                }
                n + 1
              }
            }
          }
      }
    }

    for {
      nPlans <- process(PlanFilePattern, "execution-plans", identity)
      _ <- process(EventFilePattern, "execution-events", s => if (s startsWith "[") s else s"[$s]")
    } yield nPlans
  }
}
