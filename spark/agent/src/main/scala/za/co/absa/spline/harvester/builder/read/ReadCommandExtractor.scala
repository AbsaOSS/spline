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

package za.co.absa.spline.harvester.builder.read

import java.util.Properties

import com.databricks.spark.xml.XmlRelation
import org.apache.kafka.clients.consumer.KafkaConsumer
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.catalyst.catalog.HiveTableRelation
import org.apache.spark.sql.catalyst.plans.logical.LogicalPlan
import org.apache.spark.sql.execution.datasources.jdbc.JDBCOptions
import org.apache.spark.sql.execution.datasources.{HadoopFsRelation, LogicalRelation}
import org.apache.spark.sql.kafka010.{AssignStrategy, ConsumerStrategy, SubscribePatternStrategy, SubscribeStrategy}
import org.apache.spark.sql.sources.BaseRelation
import za.co.absa.spline.common.ReflectionUtils.extractFieldValue
import za.co.absa.spline.common.extractors.{AccessorMethodValueExtractor, SafeTypeMatchingExtractor}
import za.co.absa.spline.harvester.builder.SourceIdentifier
import za.co.absa.spline.harvester.builder.read.ReadCommandExtractor._
import za.co.absa.spline.harvester.qualifier.PathQualifier

import scala.PartialFunction.condOpt
import scala.collection.JavaConverters._


class ReadCommandExtractor(pathQualifier: PathQualifier, session: SparkSession) {
  def asReadCommand(operation: LogicalPlan): Option[ReadCommand] =
    condOpt(operation) {
      case lr: LogicalRelation => lr.relation match {
        case hr: HadoopFsRelation =>
          val uris = hr.location.rootPaths.map(path => pathQualifier.qualify(path.toString))
          val format = hr.fileFormat.toString
          ReadCommand(SourceIdentifier(Some(format), uris: _*), operation, hr.options)

        case xr: XmlRelation =>
          val uris = xr.location.toSeq.map(pathQualifier.qualify)
          ReadCommand(SourceIdentifier(Some("XML"), uris: _*), operation, xr.parameters)

        case `_: JDBCRelation`(jr) =>
          val jdbcOptions = extractFieldValue[JDBCOptions](jr, "jdbcOptions")
          val url = extractFieldValue[String](jdbcOptions, "url")
          val params = extractFieldValue[Map[String, String]](jdbcOptions, "parameters")
          val TableOrQueryFromJDBCOptionsExtractor(toq) = jdbcOptions
          ReadCommand(SourceIdentifier.forJDBC(url, toq), operation, params)

        case `_: KafkaRelation`(kr) =>
          val options = extractFieldValue[Map[String, String]](kr, "sourceOptions")
          val topics: Seq[String] = extractFieldValue[ConsumerStrategy](kr, "strategy") match {
            case AssignStrategy(partitions) => partitions.map(_.topic)
            case SubscribeStrategy(topics) => topics
            case SubscribePatternStrategy(pattern) => kafkaTopics(options("kafka.bootstrap.servers")).filter(_.matches(pattern))
          }
          ReadCommand(SourceIdentifier.forKafka(topics: _*), operation, options ++ Map(
            "startingOffsets" -> extractFieldValue[AnyRef](kr, "startingOffsets"),
            "endingOffsets" -> extractFieldValue[AnyRef](kr, "endingOffsets")
          ))

        case br: BaseRelation =>
          sys.error(s"Relation is not supported: $br")
      }

      case htr: HiveTableRelation =>
        val catalogTable = htr.tableMeta
        ReadCommand(SourceIdentifier.forTable(catalogTable)(pathQualifier, session), operation)
    }

}

object ReadCommandExtractor {

  object `_: JDBCRelation` extends SafeTypeMatchingExtractor[AnyRef]("org.apache.spark.sql.execution.datasources.jdbc.JDBCRelation")

  object `_: KafkaRelation` extends SafeTypeMatchingExtractor[AnyRef]("org.apache.spark.sql.kafka010.KafkaRelation")

  object TableOrQueryFromJDBCOptionsExtractor extends AccessorMethodValueExtractor[String]("table", "tableOrQuery")

  private def kafkaTopics(bootstrapServers: String): Seq[String] = {
    val kc = new KafkaConsumer(new Properties {
      put("bootstrap.servers", bootstrapServers)
      put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer")
      put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer")
    })
    try kc.listTopics.keySet.asScala.toSeq
    finally kc.close()
  }
}

