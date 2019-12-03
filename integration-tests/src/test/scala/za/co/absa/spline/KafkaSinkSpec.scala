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

package za.co.absa.spline

import net.manub.embeddedkafka.{EmbeddedKafka, EmbeddedKafkaConfig}
import org.apache.spark.sql.SaveMode.Overwrite
import org.apache.spark.sql.types.{IntegerType, StringType, StructField, StructType}
import org.apache.spark.sql.{DataFrame, Row}
import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.test.fixture.SparkFixture
import za.co.absa.spline.test.fixture.spline.SplineFixture

class KafkaSinkSpec
  extends FlatSpec
    with Matchers
    with SparkFixture
    with SplineFixture
    with EmbeddedKafka {

  it should "support Kafka as a write source" in {
    withRunningKafkaOnFoundPort(EmbeddedKafkaConfig(0, 0)) { kafkaConfig =>
      val topicName = "bananas"
      val kafkaUrl = s"localhost:${kafkaConfig.kafkaPort}"

      withNewSparkSession(spark => {
        withLineageTracking(spark)(lineageCaptor => {
          val testData: DataFrame = {
            val schema = StructType(StructField("ID", IntegerType, nullable = false) :: StructField("NAME", StringType, nullable = false) :: Nil)
            val rdd = spark.sparkContext.parallelize(Row(1014, "Warsaw") :: Row(1002, "Corte") :: Nil)
            spark.sqlContext.createDataFrame(rdd, schema)
          }

          val (plan1, _) = lineageCaptor.lineageOf(testData
            .selectExpr("CAST (NAME as STRING) as value")
            .write
            .format("kafka")
            .option("kafka.bootstrap.servers", kafkaUrl)
            .option("topic", topicName)
            .save())

          def reader = spark
            .read
            .format("kafka")
            .option("kafka.bootstrap.servers", kafkaUrl)

          val (plan2, _) = lineageCaptor.lineageOf(reader
            .option("subscribe", s"$topicName,anotherTopic")
            .load()
            .write.mode(Overwrite).saveAsTable("somewhere"))

          val (plan3, _) = lineageCaptor.lineageOf(reader
            .option("subscribePattern", ".*")
            .load()
            .write.mode(Overwrite).saveAsTable("somewhere"))

          val (plan4, _) = lineageCaptor.lineageOf(reader
            .option("assign", s"""{"$topicName":[0]}""")
            .load()
            .write.mode(Overwrite).saveAsTable("somewhere"))

          plan1.operations.write.append shouldBe false
          plan1.operations.write.extra("destinationType") shouldBe Some("kafka")
          plan1.operations.write.outputSource shouldBe s"kafka:$topicName"

          plan2.operations.reads.head.extra("sourceType") shouldBe Some("kafka")
          plan2.operations.reads.head.inputSources should contain(s"kafka:$topicName")
          plan2.operations.reads.head.params should contain key "subscribe"

          plan3.operations.reads.head.extra("sourceType") shouldBe Some("kafka")
          plan3.operations.reads.head.inputSources should contain(s"kafka:$topicName")
          plan3.operations.reads.head.params should contain key "subscribepattern"

          plan4.operations.reads.head.extra("sourceType") shouldBe Some("kafka")
          plan4.operations.reads.head.inputSources should contain(s"kafka:$topicName")
          plan4.operations.reads.head.params should contain key "assign"
        })
      })
    }
  }
}
