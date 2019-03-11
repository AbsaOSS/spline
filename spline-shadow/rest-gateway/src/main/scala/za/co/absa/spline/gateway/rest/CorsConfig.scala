package za.co.absa.spline.gateway.rest

import java.util.Arrays.asList

import org.apache.commons.configuration.{CompositeConfiguration, EnvironmentConfiguration, SystemConfiguration}
import za.co.absa.spline.common.config.ConfTyped

object CorsConfig extends CompositeConfiguration(asList(
  new SystemConfiguration,
  new EnvironmentConfiguration))
  with ConfTyped {
  override val rootPrefix: String = "spline"
  object CorsFilterConf extends Conf("corsFilter") {
    val allowedOrigin: String = getString(Prop("allowedOrigin"))
    val allowedHeader: Array[String] = getStringArray(Prop("allowedHeader"))
  }
}

