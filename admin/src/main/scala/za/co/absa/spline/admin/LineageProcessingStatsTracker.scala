package za.co.absa.spline.admin

import za.co.absa.spline.admin.LineageProcessingStatsTracker.{ReportIntervalDocs, formatHMS}

import java.util.concurrent.atomic.AtomicInteger
import java.util.concurrent.{ExecutorService, ForkJoinPool, ThreadPoolExecutor}

object LineageProcessingStatsTracker {
  private val ReportIntervalDocs = 100

  private def formatHMS(totalSec: Int): String = {
    val h = totalSec / 3600
    val m = (totalSec % 3600) / 60
    val s = totalSec % 60
    f"$h%02d:$m%02d:$s%02d"
  }
}

class LineageProcessingStatsTracker(val totalDocs: Int)
                                   (implicit es: ExecutorService) {
  private val processedDocs = new AtomicInteger(0)
  private val startTime = System.nanoTime()

  def incrementPlans(): Int = {
    processedDocs.incrementAndGet()
  }

  def shouldReport: Boolean = {
    val docs = processedDocs.get()
    docs % ReportIntervalDocs == 0 || docs == totalDocs
  }

  def progressMessage: String = {
    val docs: Int = processedDocs.get()
    val percent: Int = ((processedDocs.get().toDouble / totalDocs) * 100).toInt
    val elapsedSeconds: Int = ((System.nanoTime() - startTime) / 1e9).toInt
    val speedDocsPerSec: Double = if (elapsedSeconds > 0) docs / elapsedSeconds else 0
    val etaSeconds: Int = if (speedDocsPerSec > 0) ((totalDocs - docs) / speedDocsPerSec).toInt else 0

    val threads: Int = es match {
      case fjp: ForkJoinPool => fjp.getRunningThreadCount
      case es: ThreadPoolExecutor => es.getActiveCount
      case _ => Thread.activeCount
    }

    val msg = "" +
      f"| Progress: $percent%3d%% " +
      f"| Plans: $docs%5d/$totalDocs%-5d " +
      f"| Threads: $threads%4d " +
      f"| Speed: $speedDocsPerSec%8.2f plans/sec " +
      f"| Elapsed: ${formatHMS(elapsedSeconds)}%8s " +
      f"| ETA: ${formatHMS(etaSeconds)}%8s " +
      f"|"
    msg
  }
}
