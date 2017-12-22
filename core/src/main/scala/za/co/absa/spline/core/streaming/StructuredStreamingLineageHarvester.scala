/*
 * Copyright 2017 Barclays Africa Group Limited
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

package za.co.absa.spline.core.streaming

import org.apache.spark.SparkContext
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.streaming.StreamExecution
import za.co.absa.spline.core.LineageHarvester
import za.co.absa.spline.model.DataLineage

/**
  * The class is responsible for harvesting lineage information from the [[org.apache.spark.sql.execution.streaming.StreamExecution StreamExecution]] instance holding execution plans of stream processing.
  * @param coreHarvester An harvester capturing lineage information from logical plans.
  */
class StructuredStreamingLineageHarvester(coreHarvester : LineageHarvester[(SparkContext, LogicalPlan)]) extends LineageHarvester[StreamExecution] {

  /**
    * The method harvests lineage information form an instance holding execution plans of stream processing.
    * @param streamExecution An instance execution plans of stream processing.
    * @return Lineage information
    */
  override def harvestLineage(streamExecution: StreamExecution): DataLineage = {
    val source = streamExecution.logicalPlan
    val sparkContext = streamExecution.sparkSession.sparkContext
    coreHarvester.harvestLineage((sparkContext, source))
  }
}
