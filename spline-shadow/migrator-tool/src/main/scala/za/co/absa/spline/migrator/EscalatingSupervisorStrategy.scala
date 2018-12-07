package za.co.absa.spline.migrator

import akka.actor.SupervisorStrategy.Escalate
import akka.actor.{OneForOneStrategy, SupervisorStrategy, SupervisorStrategyConfigurator}

class EscalatingSupervisorStrategy extends SupervisorStrategyConfigurator {
  override def create(): SupervisorStrategy = OneForOneStrategy()({
    case _ => Escalate
  })
}
