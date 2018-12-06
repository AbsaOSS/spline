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

import java.util.UUID

import org.apache.spark.sql.{ForeachWriter, Row}
import org.apache.spark.sql.execution.streaming.StreamingQueryWrapper
import org.scalatest.{FunSpec, Matchers}
import za.co.absa.spline.harvester.TestSparkContext.sparkSession
import za.co.absa.spline.model.endpoint.{FileEndpoint, KafkaEndpoint, StreamEndpoint}
import za.co.absa.spline.model.op.{Generic, OperationProps, StreamWrite}
import za.co.absa.spline.model.{DataLineage, MetaDataset, Schema}

class StreamWriteBuilderSpec extends FunSpec with Matchers {

  describe("stream write builder should to parse correctly") {

    it("should parse Kafka StreamWrite correctly") {
      val cluster = Seq("127.0.0.1:1111", "127.0.0.1:2222")
      val topic = "targetTopic"
      val wrapper = createRateStream()
        .writeStream
        .format("kafka")
        .option("topic", topic)
        .option("kafka.bootstrap.servers", cluster.mkString(","))
        .option("checkpointLocation", "data/checkpoints/streaming/kafka")
        .start()
      val logicalPlanLineage: DataLineage = createLineage
      val se = wrapper.asInstanceOf[StreamingQueryWrapper].streamingQuery
      val (streamWrite, metaDataset) = StreamWriteBuilder.build(se, logicalPlanLineage)
      shouldEq(streamWrite, KafkaEndpoint(cluster, Seq(topic)))
    }

    it("should parse Foreach StreamWrite correctly") {
      val wrapper = createRateStream()
        .writeStream
        .foreach(new ForeachWriter[Row] {
          override def open(partitionId: Long, epochId: Long): Boolean = true
          override def process(value: Row): Unit = {}
          override def close(errorOrNull: Throwable): Unit = {}
        })
        .start()
      val logicalPlanLineage: DataLineage = createLineage
      val se = wrapper.asInstanceOf[StreamingQueryWrapper].streamingQuery
      val (streamWrite, metaDataset) = StreamWriteBuilder.build(se, logicalPlanLineage)
      streamWrite.destinationType shouldBe "Virtual"
      streamWrite.path.startsWith("virtual://") shouldBe true
      streamWrite.path.contains("Foreach") shouldBe true
    }

    it("should parse File StreamWrite correctly") {
      val format = "Parquet"
      val path = "data/results/streaming/streamwritebuilderspec"
      val wrapper = createRateStream()
        .writeStream
        .format(format)
        .option("checkpointLocation", "data/checkpoints/streaming/file")
        .option("path", path)
        .start()
      val logicalPlanLineage: DataLineage = createLineage
      val se = wrapper.asInstanceOf[StreamingQueryWrapper].streamingQuery
      val (streamWrite, metaDataset) = StreamWriteBuilder.build(se, logicalPlanLineage)
      shouldEq(streamWrite, FileEndpoint(format, path))
    }
  }

  private def createRateStream() = sparkSession
    .readStream
    .format("rate")
    .load()

  private def createLineage = {
    val rootDataset = MetaDataset(UUID.randomUUID, Schema(Seq()))
    val rootOperation = Generic(OperationProps(UUID.randomUUID, "LocalRelation", Seq.empty, rootDataset.id), "LocalRelation")
    val logicalPlanLineage = DataLineage("appId", "appName", System.currentTimeMillis(), "2.x", Seq(rootOperation), Seq(rootDataset), Seq(), Seq())
    logicalPlanLineage
  }

  private def shouldEq(node: StreamWrite, endpoint: StreamEndpoint): Unit = {
    node.destinationType shouldEqual endpoint.description
    node.path shouldEqual endpoint.paths.head.toString
  }
}
