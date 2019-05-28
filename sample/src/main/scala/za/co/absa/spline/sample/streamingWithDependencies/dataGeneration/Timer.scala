/*
 * Copyright 2017 Barclays Africa Group Limited
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

package za.co.absa.spline.sample.streamingWithDependencies.dataGeneration

import akka.actor.ActorSystem

import scala.concurrent.duration._

trait Timer {
  private val actorSystem = ActorSystem("meteo")

  protected def doJob : Unit

  protected def cleanup: Unit

  def run() {
    import actorSystem.dispatcher
    actorSystem.scheduler.schedule(1 second, 1 second) {
      doJob
    }

    println("Press a key for exit")
    Console.in.read
    actorSystem.terminate().andThen { case _ => cleanup }
  }
}
