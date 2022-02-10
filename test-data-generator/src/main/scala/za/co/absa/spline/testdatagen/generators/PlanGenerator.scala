package za.co.absa.spline.testdatagen.generators

import java.util.UUID

import za.co.absa.spline.common.SplineBuildInfo
import za.co.absa.spline.producer.model.v1_2.{ExecutionPlan, NameAndVersion}
import za.co.absa.spline.testdatagen.Config
import za.co.absa.spline.testdatagen.generators.AttributesGenerator.generateSchema
import za.co.absa.spline.testdatagen.generators.ExpressionGenerator.generateExpressions
import za.co.absa.spline.testdatagen.generators.OperationsGenerator.generateOperations

object PlanGenerator {

  def generate(config: Config): ExecutionPlan = {
    val planId = UUID.randomUUID()
    ExecutionPlan(
      id = planId,
      name = Some(s"generated plan $planId"),
      operations = generateOperations(config.operations.toLong),
      attributes = generateSchema(config.attributes),
      expressions = Some(generateExpressions(config.expressions)),
      systemInfo = NameAndVersion("spline-data-gen", SplineBuildInfo.Version),
      agentInfo = None,
      extraInfo = Map.empty
    )
  }

}
