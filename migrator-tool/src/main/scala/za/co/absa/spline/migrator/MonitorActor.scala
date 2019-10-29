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

package za.co.absa.spline.migrator

import akka.actor.Actor
import org.backuity.ansi.AnsiFormatter.FormattedHelper
import za.co.absa.spline.migrator.MonitorActor._

import scala.math.BigDecimal.RoundingMode

class MonitorActor(conf: MigratorConfig) extends Actor {
  private val t0: Long = System.currentTimeMillis

  override def receive: Receive = {
    case stats: Stats =>
      val total = stats.success + stats.failures
      val failures = stats.failures
      val speed = BigDecimal(total.toDouble / (System.currentTimeMillis - t0) * 1000).setScale(2, RoundingMode.HALF_UP)
      val loadBar = {
        val barLength = math.round(BufferBarMaxLength.toFloat * stats.queued / conf.batchSize)
        val barStr = ("#" * barLength).padTo(BufferBarMaxLength, '.')
        if (barLength.toDouble / BufferBarMaxLength >= OverloadThreashold)
          ansi"%red{$barStr}"
        else
          ansi"%blue{$barStr}"
      }


      val statusStr = Seq(
        f"Processed: $total%1$$-10s",
        f"Failures: $failures%1$$-10s",
        f"Speed [doc/sec]: $speed%1$$-10s",
        s"Queue: [$loadBar]"
      ).mkString

      Console.print(s"\r$statusStr")
  }
}

object MonitorActor {
  private val BufferBarMaxLength = 10
  private val OverloadThreashold = 0.8
}
