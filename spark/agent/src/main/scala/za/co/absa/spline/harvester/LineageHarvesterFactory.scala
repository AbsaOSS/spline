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

package za.co.absa.spline.harvester

import org.apache.hadoop.conf.Configuration
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.SparkPlan
import za.co.absa.spline.harvester.conf.SplineConfigurer.SplineMode.SplineMode
import za.co.absa.spline.harvester.converter.AbstractAttributeLineageExtractor

import scala.language.postfixOps

/** The class is responsible for gathering lineage information from Spark logical plan
 *
 * @param hadoopConfiguration A hadoop configuration
 */
class LineageHarvesterFactory(hadoopConfiguration: Configuration, splineMode: SplineMode, splineAttrLineageExtractor: AbstractAttributeLineageExtractor) {

  /** A main method of the object that performs transformation of Spark internal structures to library lineage representation.
   *
   * @return A lineage representation
   */
  def harvester(logicalPlan: LogicalPlan, executedPlan: Option[SparkPlan], session: SparkSession): LineageHarvester =
    new LineageHarvester(logicalPlan, executedPlan, session)(hadoopConfiguration, splineMode, splineAttrLineageExtractor)
}
