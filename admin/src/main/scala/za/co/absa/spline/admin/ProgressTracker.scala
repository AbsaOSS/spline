/*
 * Copyright 2025 ABSA Group Limited
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

package za.co.absa.spline.admin

import za.co.absa.spline.admin.ProgressTracker.{ReportIntervalDocs, formatHMS}

import java.io.PrintStream
import java.util.concurrent.atomic.AtomicInteger
import java.util.concurrent.{ExecutorService, ForkJoinPool, ThreadPoolExecutor}

object ProgressTracker {
  private val ReportIntervalDocs = 100

  private def formatHMS(totalSec: Int): String = {
    val h = totalSec / 3600
    val m = (totalSec % 3600) / 60
    val s = totalSec % 60
    f"$h%02d:$m%02d:$s%02d"
  }
}

class ProgressTracker(val totalDocs: Int)
                     (implicit es: ExecutorService) {

  private val processedDocs = new AtomicInteger(0)
  private val startTime = System.nanoTime()

  def tap(printStream: PrintStream): Unit = {
    val docs = processedDocs.incrementAndGet()
    val shouldPrintMessage = docs % ReportIntervalDocs == 0 || docs == totalDocs
    if (shouldPrintMessage) {
      val message = progressMessage(docs)
      printStream.println(message)
    }
  }

  private def progressMessage(docs: Int): String = {
    val percent: Int = ((docs.toDouble / totalDocs) * 100).toInt
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
      f"| Docs: $docs%5d/$totalDocs%-5d " +
      f"| Threads: $threads%4d " +
      f"| Speed: $speedDocsPerSec%8.2f docs/sec " +
      f"| Elapsed: ${formatHMS(elapsedSeconds)}%8s " +
      f"| ETA: ${formatHMS(etaSeconds)}%8s " +
      f"|"
    msg
  }
}
