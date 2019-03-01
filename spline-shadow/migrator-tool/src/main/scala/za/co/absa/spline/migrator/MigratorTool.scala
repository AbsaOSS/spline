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
import com.typesafe.config.ConfigFactory
import za.co.absa.spline.migrator.MigratorActor.Start

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

object MigratorTool {

  private val akkaConf = ConfigFactory.parseString(
    "akka {\n"
      + s"    actor.guardian-supervisor-strategy = ${classOf[EscalatingSupervisorStrategy].getName}" + "\n"
      + "    event-handlers = [\"akka.event.slf4j.Slf4jEventHandler\"]\n"
      + "    loglevel = INFO\n"
      + "}"
  )

  def migrate(migratorConf: MigratorConfig): Future[Stats] = {
    val actorSystem = ActorSystem("system", akkaConf)

    val migratorActor = actorSystem.actorOf(Props(classOf[MigratorActor], migratorConf), "migrator")

    implicit val timeout: Timeout = Timeout(42, TimeUnit.DAYS)

    val eventualResult =
      (migratorActor ? Start).
        map({ case MigratorActor.Result(stats) => stats })

    eventualResult.onComplete(_ => actorSystem.terminate())
    eventualResult
  }
}





