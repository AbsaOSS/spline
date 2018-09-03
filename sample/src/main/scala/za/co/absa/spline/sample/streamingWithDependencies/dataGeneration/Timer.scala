package za.co.absa.spline.sample.streamingWithDependencies.dataGeneration

import scala.concurrent.duration._
import akka.actor.ActorSystem
import za.co.absa.spline.sample.streamingWithDependencies.dataGeneration.KafkaMeteoStation.kafkaProducer

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
