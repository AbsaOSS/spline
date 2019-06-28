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

import java.util.concurrent.TimeUnit

import akka.actor.{ActorSystem, Props}
import akka.pattern.ask
import akka.util.Timeout
import ch.qos.logback.classic.Logger
import com.typesafe.config.ConfigFactory
import org.slf4j.Logger.ROOT_LOGGER_NAME
import org.slf4j.LoggerFactory
import za.co.absa.spline.migrator.rest.RestClientPlayWsImpl

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

object MigratorTool {

  private val conf =
    s"""akka {
       |  actor.guardian-supervisor-strategy = "${classOf[EscalatingSupervisorStrategy].getName}"
       |  event-handlers = ["akka.event.slf4j.Slf4jEventHandler"]
       |}""".stripMargin

  private val akkaConf = ConfigFactory.parseString(conf)

  def migrate(migratorConf: MigratorConfig): Future[Stats] = {
    LoggerFactory
      .getLogger(ROOT_LOGGER_NAME)
      .asInstanceOf[Logger]
      .setLevel(migratorConf.logLevel)

    implicit val actorSystem = ActorSystem("system", akkaConf)

    val restClient = new RestClientPlayWsImpl(migratorConf.producerRESTEndpointUrl) {
      actorSystem.registerOnTermination(this.close())
    }

    val monitorActor = actorSystem.actorOf(Props(classOf[MonitorActor], migratorConf), "monitor")
    val batchMigratorActor = actorSystem.actorOf(Props(classOf[BatchMigratorActor], migratorConf, monitorActor, restClient), "batch-migrator")
    lazy val continuousMigratorActor = actorSystem.actorOf(Props(classOf[ContinuousMigratorActor], migratorConf, restClient), "continuous-migrator")

    implicit val timeout: Timeout = Timeout(42, TimeUnit.DAYS)

    val eventualBatchMigrationResult =
      (batchMigratorActor ? BatchMigratorActor.Start).
        map({ case BatchMigratorActor.Result(stats) => stats })

    if (migratorConf.continuousMode)
      continuousMigratorActor ! ContinuousMigratorActor.Start
    else
      eventualBatchMigrationResult.onComplete(_ => actorSystem.terminate())

    eventualBatchMigrationResult
  }

}





