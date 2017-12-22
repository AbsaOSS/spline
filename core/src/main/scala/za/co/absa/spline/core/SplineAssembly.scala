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

package za.co.absa.spline.core

import org.apache.spark.sql.SparkSession
import za.co.absa.spline.common.transformations.AsyncTransformationPipeline
import za.co.absa.spline.core.batch.{BatchLineageHarvester, BatchListener}
import za.co.absa.spline.core.conf.SplineConfigurer
import za.co.absa.spline.core.streaming.{StructuredStreamingLineageHarvester, StructuredStreamingListener}
import za.co.absa.spline.core.transformations.{ForeignMetaDatasetInjector, LineageProjectionMerger}
import scala.concurrent.ExecutionContext

/**
  * The class covers all dependencies required by Spline Core library
  * @param configurer external settings
  * @param sparkSession A spark session
  */
class SplineAssembly(configurer : SplineConfigurer, sparkSession: SparkSession) {

  private implicit val executionContext: ExecutionContext = ExecutionContext.global

  // commons
  val hadoopConfiguration = sparkSession.sparkContext.hadoopConfiguration

  val persistenceFactory = configurer.persistenceFactory

  val dataLineageReader = persistenceFactory.createDataLineageReader()

  val dataLineageWriter = persistenceFactory.createDataLineageWriter()

  val logicalPlanHarvester = new LogicalPlanLineageHarvester(hadoopConfiguration)

  val transformationPipeline =
    new AsyncTransformationPipeline(
      LineageProjectionMerger,
      new ForeignMetaDatasetInjector(dataLineageReader)
    )

  // batch
  val batchLineageHarvester = new BatchLineageHarvester(logicalPlanHarvester)

  val batchListener = new BatchListener(dataLineageReader, dataLineageWriter, batchLineageHarvester, transformationPipeline)

  // streaming
  val streamingQueryManager = sparkSession.streams

  val structuredStreamingHarvester = new StructuredStreamingLineageHarvester(logicalPlanHarvester)

  val structuredStreamingListener = new StructuredStreamingListener(streamingQueryManager, structuredStreamingHarvester, dataLineageWriter)

}
