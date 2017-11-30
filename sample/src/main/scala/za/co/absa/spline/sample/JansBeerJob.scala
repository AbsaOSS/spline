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

import org.apache.spark.sql.functions.col

object JansBeerJob extends SparkApp("Jan's Beer Job", conf = Seq("spark.sql.shuffle.partitions" -> "4")) {

  // Initializing library to hook up to Apache Spark
  import za.co.absa.spline.core.SparkLineageInitializer._

  spark.enableLineageTracking()

  val beerConsumption = spark.read.option("header", "true").csv("data/input/beerConsum.csv")

  val population = spark.read.option("header", "true").csv("data/input/population.csv")

  def calculateConsumptionPerCapita(year: String) =
    (col(year) * 100) / col("y" + year) as "Year" + year


  val result = beerConsumption
    .join(population, $"Code" === $"Country Code", "inner")
    .select(
      $"Country",
      $"Code",
      calculateConsumptionPerCapita("2003"),
      calculateConsumptionPerCapita("2004"),
      calculateConsumptionPerCapita("2005"),
      calculateConsumptionPerCapita("2006"),
      calculateConsumptionPerCapita("2007"),
      calculateConsumptionPerCapita("2008"),
      calculateConsumptionPerCapita("2009"),
      calculateConsumptionPerCapita("2010"),
      calculateConsumptionPerCapita("2011")
    )

  result.write.mode("overwrite").parquet("data/results/beerConsCtl")

}
