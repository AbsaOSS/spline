package za.co.absa.spline.testdatagen

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers.convertToAnyShouldWrapper
import za.co.absa.spline.testdatagen.generators.ExpressionGenerator

class ExpressionGeneratorSpec extends AnyFlatSpec {
  behavior of "PlanGenerator with EventGenerator"

  it should "generate expressions and event" in {
    val expressions = ExpressionGenerator.generateExpressions(4)
    expressions.functions.size shouldEqual 5
    expressions.constants.size shouldEqual 4
  }

}
