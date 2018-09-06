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

package za.co.absa.spline.model.endpoint

import java.net.{URI, URLEncoder}
import java.nio.file.Paths

import salat.annotations.Salat

/**
  * The trait represents an abstraction of an endpoint for structured streaming
  */
@Salat
trait StreamEndpoint {
  def paths: Seq[URI]
  def description: String = "Stream " + getClass.getSimpleName.replaceAll("Endpoint$", "")
}

/**
  * The object represents an endpoint non-referring to any source of data
  */
case class VirtualEndpoint() extends StreamEndpoint {
  override def paths: Seq[URI] = URI.create("virtual://virtual") :: Nil
}

/**
  * The class represents a file-based endpoint for structured streaming
  * @param format An format of files keeping data
  * @param filePath A path to files keeping data
  */
case class FileEndpoint(format: String, filePath: String) extends StreamEndpoint {
  override def paths: Seq[URI] = Paths.get(filePath).toUri :: Nil
  override def description: String = format + " " + super.description
}

/**
  * The class represents a kafka endpoint for structured streaming
  * @param cluster A sequence of servers forming the cluster
  * @param topics Topic name
  */
case class KafkaEndpoint(cluster: Seq[String], topics: Seq[String]) extends StreamEndpoint {
  override def paths: Seq[URI] =
    topics.map(topic => URI.create("kafka://" + URLEncoder.encode(cluster.mkString(","), "UTF-8") + "/" + topic))
}

/**
  * The class represents a socket endpoint for structured streaming
  * @param host A server address
  * @param port A port number
  */
case class SocketEndpoint(host: String, port: String) extends StreamEndpoint {
  override def paths: Seq[URI] = URI.create("socket://" + host + ":" + port) :: Nil
}

case class ConsoleEndpoint() extends StreamEndpoint {
  override def paths: Seq[URI] = URI.create("console://console") :: Nil
}
