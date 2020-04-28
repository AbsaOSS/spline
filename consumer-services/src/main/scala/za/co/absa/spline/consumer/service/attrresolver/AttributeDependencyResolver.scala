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

package za.co.absa.spline.consumer.service.attrresolver

import za.co.absa.commons.version.Version._
import za.co.absa.spline.consumer.service.attrresolver.AttributeDependencyResolver.AttributeId
import za.co.absa.spline.consumer.service.internal.model.VersionInfo
import za.co.absa.spline.persistence.model.Operation

import scala.PartialFunction.condOpt
import scala.util.Try

trait AttributeDependencyResolver {
  def resolve(
    op: Operation,
    inputSchema: => Seq[AttributeId],
    outputSchema: => Seq[AttributeId]
  ): Map[AttributeId, Set[AttributeId]]
}

object AttributeDependencyResolver {
  type AttributeId = String

  def forSystemAndAgent(system: VersionInfo, agent: VersionInfo): Option[AttributeDependencyResolver] = condOpt(system) {
    case VersionInfo("spark", _) if !isSplinePrior04(agent) => SparkAttributeDependencyResolverImpl
  }

  private def isSplinePrior04(agent: VersionInfo) = {
    (agent.name equalsIgnoreCase "spline") && {
      val splineVersion = Try(semver"${agent.version}") getOrElse semver"0.3.0"
      splineVersion < semver"0.4.0"
    }
  }
}
