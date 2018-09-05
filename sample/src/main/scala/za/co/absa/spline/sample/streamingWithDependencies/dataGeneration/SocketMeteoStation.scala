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

package za.co.absa.spline.sample.streamingWithDependencies.dataGeneration

import java.io.PrintStream
import java.net.ServerSocket

import org.json4s.DefaultFormats
import org.json4s.native.Json

object SocketMeteoStation extends App with MeteoDataGenerator with Timer {
  override def name = "Name" -> "Prague-Libus"

  override def coordinates = ("Longitude" -> 14.4467, "Latitude" -> 50.0077)

  override def temperatureDetails = MetricDetails("Temperature", 25.5, 4, 0.3)

  override def pressureDetails = MetricDetails("Pressure", 1005, 0, 4)

  override def humidityDetails = MetricDetails("Humidity", 64.5, 0, 2)

  override def timeMetricName = "Time"

  val server = new ServerSocket(9999)
  println("Waiting for a client.")
  val socket = server.accept()
  println("A connection with a client has been established.")
  val outputStream = new PrintStream(socket.getOutputStream())

  override def doJob(){
    val data = getCurrentData()
    val json = Json(DefaultFormats).write(data)
    println("Writing a message with payload:")
    println(json)
    outputStream.println(json)
  }

  override protected def cleanup: Unit = {
    outputStream.flush()
    socket.close()
  }

  run
}
