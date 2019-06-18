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

import akka.actor.SupervisorStrategy.Escalate
import akka.actor.{Actor, ActorLogging, OneForOneStrategy, Props, SupervisorStrategy}
import za.co.absa.spline.migrator.ContinuousMigratorActor.Start
import za.co.absa.spline.migrator.Spline03Actor.{DataLineageLoadFailure, DataLineageLoaded, GetFutureLineages}
import za.co.absa.spline.migrator.Spline04Actor.Save
import za.co.absa.spline.migrator.rest.ScalajRestClientImpl
import za.co.absa.spline.model.DataLineage

object ContinuousMigratorActor {

  trait RequestMessage

  case object Start extends RequestMessage

}

class ContinuousMigratorActor(conf: MigratorConfig)
  extends Actor
    with ActorLogging {

  private val spline03Actor = context.actorOf(Props(new Spline03Actor(conf.mongoConnectionUrl)))
  private val spline04Actor = context.actorOf(Props(new Spline04Actor(new ScalajRestClientImpl(conf.producerRESTEndpointUrl))))

  override def supervisorStrategy: SupervisorStrategy = OneForOneStrategy()({ case _ => Escalate })

  override def receive: Receive = {
    case Start => spline03Actor ! GetFutureLineages

    case DataLineageLoaded(lineage: DataLineage) =>
      val (executionPlan, executionEvent) = new DataLineageToExecPlanWithEventConverter(lineage).convert()
      spline04Actor ! Save(executionPlan, executionEvent)

    case DataLineageLoadFailure(_, e) =>
      log.error(e, e.getMessage)
  }
}
