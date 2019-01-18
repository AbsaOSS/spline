package za.co.absa.spline.gateway.rest

import java.util.Arrays.asList

import org.apache.commons.configuration.{CompositeConfiguration, EnvironmentConfiguration, SystemConfiguration}
import org.springframework.context.annotation.Configuration
import za.co.absa.spline.common.config.ConfTyped

import scala.concurrent.duration._

@Configuration
class AppConfig {
  //todo: define services and other components here
}

object AppConfig
  extends CompositeConfiguration(asList(
    new SystemConfiguration,
    new EnvironmentConfiguration))
    with ConfTyped {

  override val rootPrefix: String = "spline"

  object AdaptiveTimeout extends Conf("adaptive_timeout") {

    val min: Long = getLong(Prop("min"), 3.seconds.toMillis)
    val durationFactor: Double = getDouble(Prop("duration_factor"), 1.5)
  }

}


