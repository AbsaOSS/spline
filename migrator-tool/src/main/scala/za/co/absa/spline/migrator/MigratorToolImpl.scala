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

import java.util.concurrent.TimeUnit

import akka.actor.{ActorRefFactory, Props}
import akka.pattern.ask
import akka.util.Timeout
import ch.qos.logback.classic.Logger
import org.slf4j.Logger.ROOT_LOGGER_NAME
import org.slf4j.LoggerFactory
import scalaz.std.boolean
import za.co.absa.spline.migrator.rest.RestClientFactory

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, Future}
import scala.util.control.NonFatal

class MigratorToolImpl(rcf: RestClientFactory) extends MigratorTool {

  override def migrate(migratorConf: MigratorConfig): Stats = {
    LoggerFactory
      .getLogger(ROOT_LOGGER_NAME)
      .asInstanceOf[Logger]
      .setLevel(migratorConf.logLevel)

    import scala.concurrent.ExecutionContext.Implicits.global
    implicit val actorFactory: ActorRefFactory = ActorSystemFacade.actorFactory

    val restClient = rcf.createRestClient(migratorConf.producerRESTEndpointUrl)

    val monitorActor = actorFactory.actorOf(Props(classOf[MonitorActor], migratorConf), "monitor")
    val batchMigratorActor = actorFactory.actorOf(Props(classOf[BatchMigratorActor], migratorConf, monitorActor, restClient), "batch-migrator")
    val maybeContMigratorActor = boolean.option(
      migratorConf.continuousMode,
      actorFactory.actorOf(Props(classOf[ContinuousMigratorActor], migratorConf, restClient), "continuous-migrator")
    )

    val eventualBatchMigrationResult = restClient
      .createEndpoint(RESTResource.Status).head()
      .recoverWith({
        case NonFatal(e) => Future.failed(new Exception("Spline Producer is not ready", e))
      })
      .flatMap(_ => {
        implicit val timeout: Timeout = Timeout(42, TimeUnit.DAYS)
        maybeContMigratorActor.foreach(_ ! ContinuousMigratorActor.Start)
        batchMigratorActor ? BatchMigratorActor.Start
      })
      .map({
        case BatchMigratorActor.Result(stats) => stats
      })

    eventualBatchMigrationResult.onComplete(_ => ActorSystemFacade.terminate())

    Await.result(eventualBatchMigrationResult, Duration.Inf)
  }

}
