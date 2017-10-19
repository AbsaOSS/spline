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

package za.co.absa.spline.sample

import org.apache.spark.sql.SparkSession

object HighLevelSampleJob1 {
  def main(args: Array[String]) {
    val spark = SparkSession.builder()
      .appName("High-level Lineage Job 1")
      .config("spark.sql.shuffle.partitions", "4")
      .master("local[*]")
      .getOrCreate()

    import spark.implicits._

    // Initializing library to hook up to Apache Spark
    import za.co.absa.spline.core.SparkLineageInitializer._
    spark.enableLineageTracking()

    // A business logic of a spark job ...
    val input = spark.read.option("header", "true").csv("data/input/highLevelLineageData.csv")

    val cleaned = input.select(
      $"Country Name" as "country",
      $"Series Name" as "metric",
      $"2012 [YR2012]" as "2012",
      $"2013 [YR2013]" as "2013",
      $"2014 [YR2014]" as "2014",
      $"2015 [YR2015]" as "2015",
      $"2016 [YR2016]" as "2016"
    ).cache

    val renewableEnergyPercent = cleaned.filter($"metric" === "Renewable electricity output (% of total electricity output)")

    renewableEnergyPercent.write.mode("overwrite").parquet("data/results/renewableEnergyPercent")

    val gdpPerCapitalUSD = cleaned.filter($"metric" === "GDP per capita (current US$)")

    gdpPerCapitalUSD.write.mode("overwrite").parquet("data/results/gdpPerCapitalUSD")
  }
}
