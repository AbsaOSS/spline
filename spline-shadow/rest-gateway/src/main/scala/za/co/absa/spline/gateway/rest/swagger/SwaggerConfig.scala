package za.co.absa.spline.gateway.rest.swagger

import com.fasterxml.classmate.TypeResolver
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.{Bean, Configuration}
import springfox.documentation.builders.{PathSelectors, RequestHandlerSelectors}
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spring.web.plugins.Docket
import springfox.documentation.swagger2.annotations.EnableSwagger2

@Configuration
@EnableSwagger2
class SwaggerConfig @Autowired()(val typeResolver: TypeResolver)
  extends SwaggerJacksonScalaSupport
    with SwaggerScalaTypesRules
    with SwaggerUISupport {

  @Bean def api: Docket =
    new Docket(DocumentationType.SWAGGER_2).
      select.
      apis(RequestHandlerSelectors.any).
      paths(PathSelectors.any).
      build

  @Bean def aaa = new SwaggerRequiredPropertyBuilderPlugin
}
