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

package za.co.absa.spline.harvester.converter

import org.apache.hadoop.conf.Configuration
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.SparkPlan
import za.co.absa.spline.common.transformations.AbstractConverter
import za.co.absa.spline.harvester.qualifier.PathQualifier


case class LineageExtractionContext(
                                 logicalPlan: LogicalPlan,
                                 executedPlanOpt: Option[SparkPlan],
                                 session: SparkSession,
                                 pathQualifier: PathQualifier,
                                 hadoopConfiguration: Configuration
                               )

abstract class AbstractAttributeLineageExtractor extends AbstractConverter {
  override type From = LineageExtractionContext
  override type To = Option[Any]
}

class DisabledAttributeLineageExtractor extends AbstractAttributeLineageExtractor {
  def convert(arg: LineageExtractionContext): Option[Any] = None
}
