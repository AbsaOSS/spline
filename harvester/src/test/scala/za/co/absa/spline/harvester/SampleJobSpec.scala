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

import java.util.concurrent.TimeUnit

import org.apache.commons.configuration.BaseConfiguration
import org.apache.spark.sql.{SaveMode, SparkSession}
import org.scalatest.{FunSpec, Matchers}
import za.co.absa.spline.harvester.SparkLineageInitializer._
import za.co.absa.spline.harvester.conf.SplineConfigurer.SplineMode
import za.co.absa.spline.harvester.conf.{DefaultSplineConfigurer, LineageDispatcher}
import za.co.absa.spline.model.op.{Generic, OperationProps}
import za.co.absa.spline.model.{DataLineage, MetaDataset, Schema}
import za.co.absa.spline.persistence.api.Logging

import scala.collection.mutable.ArrayBuffer
import scala.concurrent._
import scala.concurrent.duration.Duration

class SampleJobSpec extends FunSpec with Matchers with Logging {

  describe("sampleJobRun") {
    it("run") {

      val sparkBuilder = SparkSession.builder()

      sparkBuilder.appName("name")
      sparkBuilder.master("local")
      val conf: Seq[(String, String)] = Seq((DefaultSplineConfigurer.ConfProperty.MODE, SplineMode.REQUIRED.toString))

      for ((k, v) <- conf) sparkBuilder.config(k, v)

      val sparkSession: SparkSession = sparkBuilder.getOrCreate()
      val dispatchedLineages = new ArrayBuffer[DataLineage]()
      sparkSession.enableLineageTracking(createConfigurerWithMockedDispatcher(sparkSession, dispatchedLineages))

      // A business logic of a sparkSession job ...

      import java.util.UUID.randomUUID

      val expectedDatasets = Seq(
        MetaDataset(randomUUID, Schema(Seq.empty))
      )

      val expectedOperations: Seq[Generic] = Seq(
        Generic(
          OperationProps(
            randomUUID,
            "LogicalRDD",
            Seq.empty,
            expectedDatasets.head.id
          ),
          "LogicalRDD"
        )
      )

      import sparkSession.implicits._
      val path = this.getClass.getResource("/data/data.csv").getPath
      val sourceDS = sparkSession.read
        .option("header", "true")
        .option("inferSchema", "true")
        .csv(path)
        .as("source")
        .filter($"total_response_size" > 1000)
        .filter($"count_views" > 10)

      sourceDS.write.mode(SaveMode.Overwrite).parquet("target/tmp/result.tmp.parquet")

      implicit val executionContext: ExecutionContext = ExecutionContext.global
      val eventualLineage: Awaitable[DataLineage] =
        Future {
          while (dispatchedLineages.size != 1) {
            log info "Number of lineages is " + dispatchedLineages.size + ". Waiting for 1."
            Thread.sleep(1)
          }
          log info "Returning found lineage"
          dispatchedLineages.head
        }

      val lineage: DataLineage = Await.result(eventualLineage, Duration.create(20, TimeUnit.SECONDS))

    }

    def createConfigurerWithMockedDispatcher(sparkSession: SparkSession, dispatchedLineages: ArrayBuffer[DataLineage]): DefaultSplineConfigurer = {
      val configuration = new BaseConfiguration
      configuration.setProperty(LineageDispatcher.kafkaServersProperty, "dummy")
      new DefaultSplineConfigurer(configuration, sparkSession) {
        override lazy val lineageDispatcher: LineageDispatcher = new LineageDispatcher(sparkSession, configuration) {
          override def send(dataLineage: DataLineage): Unit = {
            log info "Adding new Lineage " + dataLineage
            dispatchedLineages += dataLineage
          }
        }
      }
    }
  }
}
