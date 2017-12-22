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

package za.co.absa.spline.core.batch

import org.apache.spark.SparkContext
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.QueryExecution
import za.co.absa.spline.core.LineageHarvester
import za.co.absa.spline.model.DataLineage

/**
  * The class is responsible for harvesting lineage information from the [[org.apache.spark.sql.execution.QueryExecution QueryExecution]] instance holding execution plans of batch processing.
  * @param coreHarvester A harvester capturing lineage information from logical plans
  */
class BatchLineageHarvester(coreHarvester : LineageHarvester[(SparkContext, LogicalPlan)]) extends LineageHarvester[QueryExecution] {

  /**
    * The method harvests lineage information from the query execution
    * @param qe An instance holding execution plans of batch processing
    * @return Lineage information
    */
  override def harvestLineage(qe: QueryExecution): DataLineage = coreHarvester.harvestLineage((qe.sparkSession.sparkContext, qe.analyzed))
}
