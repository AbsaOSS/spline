package za.co.absa.spline.gateway.rest.swagger

import io.swagger.annotations.ApiModelProperty
import org.springframework.core.annotation.Order
import springfox.documentation.schema.Annotations._
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spi.schema.ModelPropertyBuilderPlugin
import springfox.documentation.spi.schema.contexts.ModelPropertyContext
import springfox.documentation.swagger.common.SwaggerPluginSupport.{SWAGGER_PLUGIN_ORDER, pluginDoesApply}
import springfox.documentation.swagger.schema.ApiModelProperties._

import scala.language.implicitConversions

@Order(SWAGGER_PLUGIN_ORDER + 1)
class SwaggerRequiredPropertyBuilderPlugin extends ModelPropertyBuilderPlugin {

  import SwaggerRequiredPropertyBuilderPlugin._

  override def supports(delimiter: DocumentationType): Boolean = pluginDoesApply(delimiter)

  override def apply(context: ModelPropertyContext): Unit = {
    def maybeRequiredByPropertyAnnotation =
      context.getAnnotatedElement.
        flatMap(findApiModePropertyAnnotation).
        map(_.required())

    def maybeRequiredByBeanAnnotation =
      context.getBeanPropertyDefinition.
        flatMap(findPropertyAnnotation(_, classOf[ApiModelProperty])).
        map(_.required())

    def maybeRequiredByType =
      context.getBeanPropertyDefinition.map(d => !classOf[Option[_]].isAssignableFrom(d.getRawPrimaryType))

    context.getBuilder.required(
      maybeRequiredByPropertyAnnotation.
        orElse(maybeRequiredByBeanAnnotation).
        orElse(maybeRequiredByType).
        getOrElse(true): Boolean)
  }
}

object SwaggerRequiredPropertyBuilderPlugin {
  implicit def googleOptionalToScalaOption[T](gopt: com.google.common.base.Optional[T]): Option[T] =
    if (gopt.isPresent) Some(gopt.get) else None
}
