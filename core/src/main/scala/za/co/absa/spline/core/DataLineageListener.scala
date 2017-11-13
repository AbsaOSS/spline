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

import org.apache.hadoop.conf.Configuration
import org.apache.spark.sql.execution.QueryExecution
import org.apache.spark.sql.util.QueryExecutionListener
import org.scalameter
import org.scalameter.Measurer.MemoryFootprint
import org.scalameter.Quantity
import za.co.absa.spline.common.transformations.TransformationPipeline
import za.co.absa.spline.core.transformations.{ForeignMetaDatasetInjector, LineageProjectionMerger}
import za.co.absa.spline.persistence.api.PersistenceFactory

import scala.concurrent.Await
import scala.concurrent.duration.DurationInt
import scala.language.postfixOps

/**
 * The class represents a handler listening on events that Spark triggers when an execution any action is performed. It can be considered as an entry point to Spline library.
 *
 * @param persistenceFactory  A factory of persistence readers and writers
 * @param hadoopConfiguration A hadoop configuration
 */
class DataLineageListener(persistenceFactory: PersistenceFactory, hadoopConfiguration: Configuration) extends QueryExecutionListener {

  import scala.concurrent.ExecutionContext.Implicits._

  private lazy val persistenceWriter = persistenceFactory.createDataLineageWriter()
  private lazy val persistenceReader = persistenceFactory.createDataLineageReader()
  private lazy val harvester = new DataLineageHarvester(hadoopConfiguration)
  private lazy val transformationPipeline = new TransformationPipeline(Seq(LineageProjectionMerger, new ForeignMetaDatasetInjector(persistenceReader)))

  private val skipMemoryMeasurement: Boolean = System.getProperty("spline.skipMemoryMeasurement") != null

  /**
   * The method is executed when an action execution is successful.
   *
   * @param funcName   A name of the executed action.
   * @param qe         A Spark object holding lineage information (logical, optimized, physical plan)
   * @param durationNs Duration of the action execution [nanoseconds]
   */
  def onSuccess(funcName: String, qe: QueryExecution, durationNs: Long): Unit = processQueryExecution(funcName, qe)


  /**
   * The method is executed when an error occurs during an action execution.
   *
   * @param funcName  A name of the executed action.
   * @param qe        A Spark object holding lineage information (logical, optimized, physical plan)
   * @param exception An exception describing the reason of the error
   */
  def onFailure(funcName: String, qe: QueryExecution, exception: Exception): Unit = processQueryExecution(funcName, qe)


  import DataLineageListener._

  private def processQueryExecution(funcName: String, qe: QueryExecution): Unit = {
    if (funcName == "save" || funcName == "count") {
      memMeasurements +=
        (if (skipMemoryMeasurement) {
          doWorkWithTimeMeasurement(qe)
          nullMemoryQuantity
        }
        else {
          scalameter.config() withMeasurer new MemoryFootprint measure doWorkWithTimeMeasurement(qe) copy (units = "")
        })
    }
  }

  private def doWorkWithTimeMeasurement(qe: QueryExecution) = {
    val t0 = System.nanoTime()
    val res = doActualWork(qe)
    val t1 = System.nanoTime()
    cpuMeasurements += Quantity((t1 - t0) / 1000000.0, "")
    res
  }

  private def doActualWork(qe: QueryExecution) = {
    val lineage = harvester harvestLineage qe
    val transformed = transformationPipeline(lineage)
    Await.result(persistenceWriter store transformed, 10 minutes)
    (lineage, transformed)
  }
}

object DataLineageListener {
  val cpuMeasurements = scala.collection.mutable.ListBuffer.empty[Quantity[_]]
  val memMeasurements = scala.collection.mutable.ListBuffer.empty[Quantity[_]]

  private val nullMemoryQuantity = new Quantity("", "")

  def clearMeasurements() = {
    cpuMeasurements.clear()
    memMeasurements.clear()
  }
}
