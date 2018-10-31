/*
 * Copyright 2017 ABSA Group Limited
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

package za.co.absa.spline.linker

import org.apache.spark.sql.SparkSession
import org.slf4s.Logging
import za.co.absa.spline.common.WithResources._
import za.co.absa.spline.linker.boundary.{DefaultSplineConfig, HarvestReader}
import za.co.absa.spline.linker.control.SparkLineageProcessor
import za.co.absa.spline.sparkadapterapi.SparkVersionRequirement

import scala.concurrent.ExecutionContext

object LinkerApp extends Logging with App {

  private implicit val executionContext: ExecutionContext = ExecutionContext.global

  val sparkSession: SparkSession = createSession()
  private val configuration = DefaultSplineConfig(sparkSession)
  val harvestReader = HarvestReader(configuration, sparkSession)

  {
    SparkVersionRequirement.instance.requireSupportedVersion()
    withResources(createProcessor)(_.start().awaitTermination())
  }

  private def createProcessor = {
    new SparkLineageProcessor(harvestReader, configuration, sparkSession)
  }

  def createSession(): SparkSession = {
    val sparkBuilder = SparkSession.builder()
    sparkBuilder.appName("SplineLinker")
    sparkBuilder.getOrCreate()
  }

}
