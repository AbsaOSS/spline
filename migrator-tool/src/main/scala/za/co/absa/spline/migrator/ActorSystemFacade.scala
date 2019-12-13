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

import akka.actor.{ActorRefFactory, ActorSystem, Terminated}
import com.typesafe.config.ConfigFactory

import scala.concurrent.Future

object ActorSystemFacade {

  private val akkaConf =
    s"""akka {
       |  actor.guardian-supervisor-strategy = "${classOf[EscalatingSupervisorStrategy].getName}"
       |  event-handlers = ["akka.event.slf4j.Slf4jEventHandler"]
       |}
       |""".stripMargin

  private val actorSystem = ActorSystem("system", ConfigFactory.parseString(akkaConf))

  def actorFactory: ActorRefFactory = actorSystem

  def registerOnTermination[T](code: => T): Unit = actorSystem.registerOnTermination(code)

  def terminate(): Future[Terminated] = actorSystem.terminate()
}
