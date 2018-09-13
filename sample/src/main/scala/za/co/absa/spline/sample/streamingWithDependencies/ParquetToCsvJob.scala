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

package za.co.absa.spline.sample.streamingWithDependencies

import org.apache.commons.configuration.SystemConfiguration
import org.apache.commons.lang.StringUtils.isNotBlank
import za.co.absa.spline.sample.SparkApp

object ParquetToCsvJob extends SparkApp("Parquet to CSV Job", conf = Seq("spark.sql.shuffle.partitions" -> "1")) {

  private val configuration = new SystemConfiguration

  protected def getRequiredString(key: String): String = {
    val value = configuration.getString(key)
    require(isNotBlank(value), s"Missing configuration property $key in JVM parameters.")
    value
  }

  def date = getRequiredString("date")

  spark
    .read.parquet(s"data/results/streamingWithDependencies/parquet/date=$date")
    .repartition(1)
    .sort('hour)
    .write.mode("overwrite")
    .option("header", "true")
    .csv(s"data/results/streamingWithDependencies/csv/$date")

}
