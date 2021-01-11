/*
 * Copyright 2020 ABSA Group Limited
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

package za.co.absa.spline.producer.modelmapper.v1.spark

import za.co.absa.commons.lang.CachingConverter
import za.co.absa.commons.version.Version._
import za.co.absa.spline.producer.model.{RecursiveSchemaFinder, v1_1}
import za.co.absa.spline.producer.modelmapper.v1.TypesV1.AttrDef
import za.co.absa.spline.producer.modelmapper.v1._
import za.co.absa.spline.producer.{model => v1}

import scala.util.Try

class SparkSplineExecutionPlanComponentConverterFactory(agentVersion: String, plan1: v1.ExecutionPlan) extends ExecutionPlanComponentConverterFactory {

  override def expressionConverter: Option[CachingConverter {type To = v1_1.ExpressionLike}] = Some(_expressionConverter)

  override def attributeConverter: Option[CachingConverter {type To = v1_1.Attribute}] = Some(_attributeConverter)

  override def outputConverter: Option[OperationOutputConverter] = Some(_outputConverter)

  override def objectConverter: ObjectConverter = new SparkSplineObjectConverter(AttributeRefConverter, _expressionConverter)

  private val operationSchemaFinder = {
    val allOperations = plan1.operations.all
    new RecursiveSchemaFinder(
      allOperations.map(op => op.id -> op.schema.asInstanceOf[Option[Seq[String]]]).toMap,
      allOperations.map(op => op.id -> op.childIds).toMap
    ) with CachingConverter
  }

  private val _expressionConverter = new SparkSplineExpressionConverter(AttributeRefConverter) with CachingConverter

  private val _attributeConverter = new SparkSplineAttributeConverter with CachingConverter {
    override protected def keyOf(attrDef: AttrDef): Key = attrDef(FieldNamesV1.AttributeDef.Id)
  }

  private val _outputConverter = {
    val operationOutputById =
      plan1.operations.all
        .map(op => op.id -> operationSchemaFinder.findSchemaForOpId(op.id).getOrElse(Nil))
        .toMap
    new SparkSplineOperationOutputConverter(_attributeConverter, attrDefinitions, operationOutputById, maybeADR)
  }

  private def attrDefinitions = plan1.extraInfo(FieldNamesV1.PlanExtraInfo.Attributes).asInstanceOf[Seq[TypesV1.AttrDef]]

  private def maybeADR = if (isSplinePrior04) None else Some(SparkSpline04AttributeDependencyResolver)

  private def isSplinePrior04 = {
    val splineVersion = Try(semver"$agentVersion") getOrElse semver"0.3.0"
    splineVersion < semver"0.4.0"
  }
}
