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

package za.co.absa.spline.producer.modelmapper.v1_0

import za.co.absa.commons.lang.CachingConverter
import za.co.absa.spline.producer.model.v1_2
import za.co.absa.spline.producer.modelmapper.v1_0.spark.SparkSplineExecutionPlanComponentConverterFactory
import za.co.absa.spline.producer.{model => v1}

import scala.PartialFunction.condOpt

trait ExecutionPlanComponentConverterFactory {
  def execPlanNameExtractor: v1.ExecutionPlan => Option[v1_2.ExecutionPlan.Name]
  def operationNameExtractor: v1.OperationLike => Option[v1_2.OperationLike.Name]
  def attributeConverter: Option[CachingConverter {type To = v1_2.Attribute}]
  def expressionConverter: Option[CachingConverter {type To = v1_2.ExpressionLike}]
  def outputConverter: Option[OperationOutputConverter]
  def objectConverter: ObjectConverter
}

object ExecutionPlanComponentConverterFactory {

  object EmptyFactory extends ExecutionPlanComponentConverterFactory {
    override def execPlanNameExtractor: v1.ExecutionPlan => Option[v1_2.ExecutionPlan.Name] = _ => None

    override def operationNameExtractor: v1.OperationLike => Option[v1_2.OperationLike.Name] = _ => None

    override def attributeConverter: Option[AttributeConverter with CachingConverter] = None

    override def expressionConverter: Option[ExpressionConverter with CachingConverter] = None

    override def outputConverter: Option[OperationOutputConverter] = None

    override def objectConverter: ObjectConverter = identity
  }

  def forPlan(plan1: v1.ExecutionPlan): ExecutionPlanComponentConverterFactory = {
    def forSystemAndAgent(systemInfo: v1.SystemInfo, agentInfo: v1.AgentInfo) = condOpt((systemInfo, agentInfo)) {
      case (v1.SystemInfo("spark", _), v1.AgentInfo("spline", agentVer)) =>
        new SparkSplineExecutionPlanComponentConverterFactory(agentVer, plan1)
    }

    plan1.agentInfo
      .flatMap(forSystemAndAgent(plan1.systemInfo, _))
      .getOrElse(EmptyFactory)
  }
}
