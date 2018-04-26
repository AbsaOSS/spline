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

package za.co.absa.spline.harvester.conversion

import java.nio.file.Files

import org.apache.hadoop.conf.Configuration
import org.apache.spark.sql.types.StructType
import org.scalatest.{FlatSpec, Matchers}
import za.co.absa.spline.harvester.TestSparkContext.sparkSession
import za.co.absa.spline.model.endpoint.{FileEndpoint, KafkaEndpoint, SocketEndpoint, VirtualEndpoint}

class StreamReadNodeSpec extends FlatSpec with Matchers {
  implicit val hadoopConfiguration: Configuration = sparkSession.sparkContext.hadoopConfiguration
  implicit val metaDatasetFactory: MetaDatasetFactory = new MetaDatasetFactory(new AttributeFactory)
  import za.co.absa.spline.sparkadapterapi.StreamingRelationAdapter.instance._

  behavior of "The build method"

  it should "return StreamRead node with a virtual endpoint when reading data from the rate data source" in {
    val df = sparkSession
      .readStream
      .format("rate")
      .load()

    val builder = new StreamReadNodeBuilder(toStreamingRelation(df.queryExecution.analyzed))
    val node = builder.build()

    node.source shouldEqual VirtualEndpoint
  }

  it should "return StreamRead node with a socket endpoint when reading data from the socket data source" in {
    val host = "somehost"
    val port = 9999

    val df = sparkSession
      .readStream
      .format("socket")
      .option("host", host)
      .option("port", port)
      .load()

    val builder = new StreamReadNodeBuilder(toStreamingRelation(df.queryExecution.analyzed))
    val node = builder.build()

    node.source shouldEqual SocketEndpoint(host, port.toString)
  }

  it should "return StreamRead node with a kafka endpoint when reading data from a kafka topic." in {
    val cluster = Seq("server1:1111", "server2:2222")
    val topic = "someTopic"

    val df = sparkSession
      .readStream
      .format("kafka")
      .option("subscribe", topic)
      .option("kafka.bootstrap.servers", cluster.mkString(","))
      .load()

    val builder = new StreamReadNodeBuilder(toStreamingRelation(df.queryExecution.analyzed))
    val node = builder.build()

    node.source shouldEqual KafkaEndpoint(cluster, topic)
  }

  it should "return StreamRead node with a file endpoint when reading data from a csv file" in {
    val format = "csv"

    val tempDir = Files.createTempDirectory("StreamReadNodeSpec.file").toFile
    val schema = new StructType().add("value", "string")
    tempDir.deleteOnExit()

    val df = sparkSession
      .readStream
      .format(format)
      .schema(schema)
      .load(tempDir.getPath)

    val builder = new StreamReadNodeBuilder(toStreamingRelation(df.queryExecution.logical))
    val node = builder.build()

    node.source shouldEqual FileEndpoint(format, tempDir.getPath)
  }

}
