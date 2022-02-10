package za.co.absa.spline.testdatagen

import org.scalatest.flatspec.AnyFlatSpec
import org.scalatest.matchers.should.Matchers.convertToAnyShouldWrapper
import za.co.absa.spline.testdatagen.generators.OperationsGenerator

class OperationsGeneratorSpec extends AnyFlatSpec {

  behavior of "PlanGenerator with EventGenerator"

  it should "generate expressions and event" in {
    val expressions = OperationsGenerator.generateOperations(5,2)
    expressions.reads.size shouldEqual 2
    expressions.other.size shouldEqual 10
  }

}
