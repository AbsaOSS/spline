package za.co.absa.spline.gateway.rest.swagger

import java.util

import com.fasterxml.classmate.TypeResolver
import org.springframework.core.Ordered.HIGHEST_PRECEDENCE
import springfox.documentation.schema.AlternateTypeRules.{GENERIC_SUBSTITUTION_RULE_ORDER, newRule}
import springfox.documentation.schema.{AlternateTypeRule, AlternateTypeRuleConvention, WildcardType}
import za.co.absa.spline.common.TypeConstraints.not

import scala.concurrent.Future

trait SwaggerScalaTypesRules extends AlternateTypeRuleConvention {
  val typeResolver: TypeResolver

  import typeResolver._

  override def getOrder: Int = HIGHEST_PRECEDENCE

  private def newListCoercionRule[C <: Iterable[_] : not[Map[_, _]]#λ : Manifest] =
    newRule(
      resolve(manifest[C].runtimeClass, classOf[WildcardType]),
      resolve(classOf[util.List[_]], classOf[WildcardType]))

  private def newMapCoercionRule[C <: Map[_, _] : Manifest] =
    newRule(
      resolve(manifest[C].runtimeClass, classOf[WildcardType], classOf[WildcardType]),
      resolve(classOf[util.Map[_, _]], classOf[WildcardType], classOf[WildcardType]))

  private def newUnboxingRule[T: Manifest] =
    newRule(
      resolve(manifest[T].runtimeClass, classOf[WildcardType]),
      resolve(classOf[WildcardType]),
      GENERIC_SUBSTITUTION_RULE_ORDER)

  override def rules(): util.List[AlternateTypeRule] = util.Arrays.asList(
    newUnboxingRule[Option[_]],
    newUnboxingRule[Future[_]],

    newListCoercionRule[Set[_]],
    newListCoercionRule[Seq[_]],
    newListCoercionRule[List[_]],
    newListCoercionRule[Vector[_]],

    newMapCoercionRule[Map[_, _]]
  )
}
