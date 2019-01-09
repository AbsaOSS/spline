package za.co.absa.spline.gateway.rest

import java.util.Arrays.asList

import org.apache.commons.configuration.{CompositeConfiguration, EnvironmentConfiguration, SystemConfiguration}
import org.springframework.context.annotation.Configuration

@Configuration
class AppConfig {
  //todo: define services and other components here
}

object AppConfig extends CompositeConfiguration(asList(
  new SystemConfiguration,
  new EnvironmentConfiguration
))
