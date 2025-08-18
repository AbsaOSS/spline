package za.co.absa.spline.admin

import org.apache.http.Consts
import org.apache.http.entity.ContentType
import org.slf4s.Logging
import za.co.absa.commons.lang.ARM
import za.co.absa.spline.admin.LineageImporter._
import za.co.absa.spline.common.ConsoleUtils._
import za.co.absa.spline.common.rest.RESTClientApacheHttpImpl
import za.co.absa.spline.producer.rest.ProducerAPI

import java.io.File
import java.nio.file.{DirectoryStream, Files, Path}
import java.util.concurrent.ExecutorService
import scala.concurrent.Future
import scala.jdk.CollectionConverters._
import scala.util.Success

object LineageImporter {

  private val EventFilePattern = "event-*.json"
  private val PlanFilePattern = "plan-*.json"

  private val ExecutionPlansRestEndpoint = "execution-plans"
  private val ExecutionEventsRestEndpoint = "execution-events"

  private val ProducerAPIContentType: ContentType = ContentType.create(ProducerAPI.MimeTypeV1_1, Consts.UTF_8)
}

class LineageImporter(restClient: RESTClientApacheHttpImpl, failOnErrors: Boolean)
                     (implicit ec: scala.concurrent.ExecutionContext, es: ExecutorService)
  extends Logging {

  def importFrom(dir: File): Future[(Int, Int)] = {
    println(ansi"Reading %bold{$dir/}...")

    val totalPlans = for (dirStream <- ARM.managed(Files.newDirectoryStream(dir.toPath, PlanFilePattern))) yield dirStream.asScala.size
    val totalEvents = for (dirStream <- ARM.managed(Files.newDirectoryStream(dir.toPath, EventFilePattern))) yield dirStream.asScala.size

    println(ansi"Found %bold{$totalPlans} plans and %bold{$totalEvents} event files to import.")

    val plansImportProgress = new ProgressTracker(totalPlans)
    val eventsImportProgress = new ProgressTracker(totalEvents)

    for {
      plansDirectoryStream <- ARM.managed(Files.newDirectoryStream(dir.toPath, PlanFilePattern))
      nPlans <- {
        println(ansi"%bold{Importing execution plans...}")
        processAll(plansDirectoryStream, plansImportProgress, ExecutionPlansRestEndpoint, s => s)
      }
      eventsDirectoryStream <- ARM.managed(Files.newDirectoryStream(dir.toPath, EventFilePattern))
      nEvents <- {
        println(ansi"%bold{Importing execution events...}")
        processAll(eventsDirectoryStream, eventsImportProgress, ExecutionEventsRestEndpoint, s => if (s startsWith "[") s else s"[$s]")
      }
    }
    yield (nPlans, nEvents)
  }

  private def processAll(
    dirStream: DirectoryStream[Path],
    progressTracker: ProgressTracker,
    endpoint: String,
    contentPreprocessingFn: String => String
  ): Future[Int] = {
    val filesIterable = dirStream.asScala
      .map(_.toFile)
      .filter(_.isFile)

    val eventualCounts = Future.traverse(filesIterable) { file =>
      log.debug(s"Processing file: ${file.getName}")
      val rawFileContent = Files.readString(file.toPath).trim
      val jsonContent = contentPreprocessingFn(rawFileContent)
      val eventualRes = doImport(jsonContent, endpoint)
        .andThen({ case Success(_) => progressTracker.tap(Console.out) })
        .map(_ => 1)
      withErrorHandling(eventualRes, 0, file.getName)
    }

    eventualCounts.map(_.sum)
  }

  private def doImport(rawFileContent: String, endpoint: String) = {
    restClient.post(
      path = endpoint,
      body = rawFileContent,
      contentType = ProducerAPIContentType
    )
  }

  //noinspection SameParameterValue
  private def withErrorHandling[A](fut: Future[A], fallbackValue: A, filename: => String): Future[A] = {
    if (failOnErrors) fut
    else fut.recover {
      case e: Throwable =>
        Console.err.println(ansi"%yellow{File %bold{$filename} skipped due to error: ${e.getMessage}}")
        fallbackValue
    }
  }
}
