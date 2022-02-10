/*
 * Copyright 2019 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
