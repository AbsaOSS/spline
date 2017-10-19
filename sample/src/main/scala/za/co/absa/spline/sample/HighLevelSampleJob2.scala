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

object HighLevelSampleJob2 {
  def main(args: Array[String]) {
    val spark = SparkSession.builder()
      .appName("High-level Lineage Job 2")
      .config("spark.sql.shuffle.partitions", "4")
      .master("local[*]")
      .getOrCreate()

    import spark.implicits._

    // Initializing library to hook up to Apache Spark
    import za.co.absa.spline.core.SparkLineageInitializer._
    spark.enableLineageTracking()

    // A business logic of a spark job ...
    val renewable = spark.read.parquet("data/results/renewableEnergyPercent")
      .select($"*", ($"2013" - $"2012") as "1yrGrowthEnergy")
      .withColumnRenamed("country", "renew_country")

    val gdp = spark.read.parquet("data/results/gdpPerCapitalUSD")
      .select($"*", ($"2013" - $"2012") as "1yrGrowthGDP")

    val overall = renewable
      .join(gdp, $"renew_country" === $"country", "inner")
      .select($"country", $"1yrGrowthEnergy", $"1yrGrowthGDP")
      .orderBy($"1yrGrowthEnergy" desc)

    overall.write.mode("overwrite").parquet("data/results/greenestCountries")
  }
}
