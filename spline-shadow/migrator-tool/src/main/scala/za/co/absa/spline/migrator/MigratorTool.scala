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
    s"akka.actor.guardian-supervisor-strategy = ${classOf[EscalatingSupervisorStrategy].getName}")

  def migrate(migratorConf: MigratorConfig): Future[MigratorActor.Stats] = {
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





