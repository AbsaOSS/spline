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

import java.io.{File, PrintWriter}

import scala.collection.immutable.ListMap
import scala.collection.mutable.ArrayBuffer

object FileMeteoStation extends App with MeteoDataGenerator with Timer {

  override def name = "ID" -> "Prague-Kbely"

  override def coordinates = ("LONG" -> 14.538, "LAT" -> 50.1232)

  override def temperatureDetails = MetricDetails("TEMPERATURE", 24, 6, 0.1)

  override def pressureDetails = MetricDetails("PRESSURE", 1015, 0, 4)

  override def humidityDetails = MetricDetails("HUMIDITY", 65, 0, 1.2)

  override def timeMetricName = "TIME"

  val records = ListMap[String, ArrayBuffer[Any]](
    "ID" -> new ArrayBuffer[Any],
    "TIME" ->  new ArrayBuffer[Any],
    "LONG" -> new ArrayBuffer[Any],
    "LAT" -> new ArrayBuffer[Any],
    "TEMPERATURE" ->  new ArrayBuffer[Any],
    "PRESSURE" ->  new ArrayBuffer[Any],
    "HUMIDITY" ->  new ArrayBuffer[Any]
  )

  val lock = new Object()
  val minRecordsInFile = 50
  val dir = new File(FileMeteoStationConstants.outputPath)

  override def doJob = lock.synchronized {
    val currentData = getCurrentData()
    println(s"Generated data: $currentData")
    for((k, v) <- currentData) {
      records(k) += v
    }
    if(records("ID").size >= minRecordsInFile){
      createDataFile()
      records.foreach{case (_, v) => v.clear()}
    }
  }

  protected def createDataFile() = {
    val file = new File(dir, java.util.UUID.randomUUID.toString + ".csv")
    file.createNewFile()
    val pw = new PrintWriter(file)
    pw.println(records.keys.mkString(","))
    for(rowId <- 0 until records("ID").size) {
      pw.println(records.values.map(_(rowId)).mkString(","))
    }
    pw.close()
    println(s"Persisted ${records("ID").size} records to the file '${file.getPath}'.")
  }

  override protected def cleanup: Unit = createDataFile()

  run
}


object FileMeteoStationConstants {
  val outputPath = "data/input/streamingWithDependencies/stationPragueKbely"
}
