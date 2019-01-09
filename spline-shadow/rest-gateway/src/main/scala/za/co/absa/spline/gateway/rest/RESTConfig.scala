package za.co.absa.spline.gateway.rest

import org.springframework.context.annotation.{ComponentScan, Configuration}
import org.springframework.web.method.support.HandlerMethodReturnValueHandler
import org.springframework.web.servlet.config.annotation.{EnableWebMvc, WebMvcConfigurer}
import za.co.absa.spline.common.webmvc.{ScalaFutureMethodReturnValueHandler, UnitMethodReturnValueHandler}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._

@Configuration
@EnableWebMvc
@ComponentScan(basePackageClasses = Array(classOf[controller._package]))
class RESTConfig extends WebMvcConfigurer {

  override def addReturnValueHandlers(returnValueHandlers: java.util.List[HandlerMethodReturnValueHandler]): Unit = {
    returnValueHandlers.add(new UnitMethodReturnValueHandler)
    returnValueHandlers.add(new ScalaFutureMethodReturnValueHandler(
      minEstimatedTimeout = AppConfig.getLong("spline.adaptive_timeout.min", 3.seconds.toMillis),
      durationToleranceFactor = AppConfig.getDouble("spline.adaptive_timeout.duration_factor", 1.5)
    ))
  }


}
