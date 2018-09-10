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

package za.co.absa.spline.linker.boundary

import org.apache.commons.configuration.Configuration
import org.apache.spark.sql._
import za.co.absa.spline.model.{DataLineage, LinkedLineage}
import ReaderProperties._
import org.apache.spark.sql.types.BinaryType

object LineageHarvestReader {

  implicit val LineageEncoder: Encoder[DataLineage] = Encoders.kryo[DataLineage]
  implicit val LinkedLineageEncoder: Encoder[LinkedLineage] = Encoders.kryo[LinkedLineage]

  val deserializer = new JavaKafkaDeserializer[DataLineage]

  def apply(configuration: Configuration, sparkSession: SparkSession): Dataset[DataLineage] = {
    // FIXME encode DataLineage as Product while Operation and others using Kryo to allow Catalyst optimizations.
    import sparkSession.implicits._
    val keyValue = sparkSession
      .readStream
      .format("kafka")
      .option("kafka.bootstrap.servers", configuration.getString(harvesterServersProperty))
      .option("subscribe", configuration.getString(lineageTopicProperty, defaultLineageTopic))
      .option("startingOffsets", configuration.getString(harvesterStartingOffsetsProperty, defaultStartingOffsets))
      .load()
    keyValue
      .select('value.cast(BinaryType)).as[Array[Byte]]
      .map(deserializer.deserialize)
  }
}
