package za.co.absa.spline.gateway.rest.swagger

import com.fasterxml.jackson.module.scala.DefaultScalaModule
import org.springframework.context.ApplicationListener
import springfox.documentation.schema.configuration.ObjectMapperConfigured

trait SwaggerJacksonScalaSupport extends ApplicationListener[ObjectMapperConfigured] {
  override def onApplicationEvent(event: ObjectMapperConfigured): Unit =
    event.getObjectMapper.registerModule(DefaultScalaModule)
}
