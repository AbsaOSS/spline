package za.co.absa.spline.gateway.rest.swagger

import org.springframework.web.servlet.config.annotation.{ResourceHandlerRegistry, WebMvcConfigurer}

trait SwaggerUISupport extends WebMvcConfigurer {

  override def addResourceHandlers(registry: ResourceHandlerRegistry): Unit = {
    registry.
      addResourceHandler("swagger-ui.html").
      addResourceLocations("classpath:/META-INF/resources/")
    registry.
      addResourceHandler("/webjars/**").
      addResourceLocations("classpath:/META-INF/resources/webjars/")
  }
}
