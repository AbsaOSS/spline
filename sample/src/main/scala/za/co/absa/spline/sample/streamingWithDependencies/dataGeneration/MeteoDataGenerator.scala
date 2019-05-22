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

import java.time.LocalDateTime

import scala.collection.immutable.ListMap
import scala.math._
import scala.util.Random

trait MeteoDataGenerator {

  def name: (String, String)

  def coordinates: ((String, Double),(String, Double)) // (longitude, latitude)

  def temperatureDetails: MetricDetails

  def pressureDetails: MetricDetails

  def humidityDetails: MetricDetails

  def timeMetricName: String

  private def calculateMetricValue(x: Double, details: MetricDetails, changeFunction: Double => Double): (String, Double) = {
    val randomValue = (Random.nextDouble() - 0.5) * 2 * details.randomness
    val changedFunctionValue = changeFunction(x) * details.mutability
    val resultValue = details.average + changedFunctionValue + randomValue
    (details.metricName, resultValue)
  }

  def getCurrentData(dateTime: LocalDateTime = LocalDateTime.now()): Map[String, Any] = {
    val timeInRadians = dateTime.toLocalTime.toSecondOfDay.toDouble * 2 * Pi / 86400
    val timeStartingFrom8am = timeInRadians - 2 * Pi / 3

    val result = ListMap[String, Any](
      name,
      timeMetricName -> dateTime.toString,
      coordinates._1,
      coordinates._2,
      calculateMetricValue(timeStartingFrom8am, temperatureDetails, sin),
      calculateMetricValue(timeStartingFrom8am, pressureDetails, identity),
      calculateMetricValue(timeStartingFrom8am, humidityDetails, identity))

    result
  }

}
