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

package za.co.absa.spline.model.endpoint

/**
  * The trait represents an abstraction of an endpoint for structured streaming
  */
trait StreamEndpoint {}

/**
  * The object represents an endpoint non-referring to any source of data
  */
case object VirtualEndpoint extends StreamEndpoint

/**
  * The class represents a file-based endpoint for structured streaming
  * @param format An format of files keeping data
  * @param path A path to files keeping data
  */
case class FileEndpoint(format: String, path: String) extends StreamEndpoint

/**
  * The class represents a kafka endpoint for structured streaming
  * @param cluster A sequence of servers forming the cluster
  * @param topic A topic name
  */
case class KafkaEndpoint(cluster: Seq[String], topic: String) extends StreamEndpoint

/**
  * The class represents a socket endpoint for structured streaming
  * @param host A server address
  * @param port A port number
  */
case class SocketEndpoint(host: String, port: String) extends StreamEndpoint
