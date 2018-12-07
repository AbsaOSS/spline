package za.co.absa.spline.migrator

import java.util.concurrent.TimeUnit

import akka.actor.{ActorSystem, Props}
import akka.pattern.ask
import akka.util.Timeout
import com.typesafe.config.ConfigFactory
import za.co.absa.spline.migrator.MigratorActor.Start

import scala.concurrent.ExecutionContext.Implicits.global

object MigratorTool extends App {

  private val conf = ConfigFactory.parseString(
    s"akka.actor.guardian-supervisor-strategy = ${classOf[EscalatingSupervisorStrategy].getName}")

  val actorSystem = ActorSystem("system", conf)

  val migratorActor = actorSystem.actorOf(
    Props(new MigratorActor(
      batchSize = 100,
      mongoConnectionUrl = "mongodb://localhost/spline-dev",
      arangoConnectionUrl = "arangodb://localhost/spline-dev"
    )),
    "migrator")

  implicit val timeout: Timeout = Timeout(42, TimeUnit.DAYS)

  migratorActor ? Start onSuccess {
    case MigratorActor.Result(stats: MigratorActor.Stats) =>
      actorSystem.terminate()
      println(s"DONE. Processed total: ${stats.processed} (of which failures: ${stats.failures})")
  }
}





