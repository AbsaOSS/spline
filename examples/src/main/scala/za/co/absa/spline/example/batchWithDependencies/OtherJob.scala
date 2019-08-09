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

package za.co.absa.spline.example.batchWithDependencies

import za.co.absa.spline.example.SparkApp

object OtherJob extends SparkApp("Other Job", conf = Seq("spark.sql.shuffle.partitions" -> "4")) {

  // Initializing library to hook up to Apache Spark
  import za.co.absa.spline.harvester.SparkLineageInitializer._

  spark.enableLineageTracking()

  // A business logic of a spark job ...
  val beerConsumption = spark.read.parquet("data/results/batchWithDependencies/beerConsCtl")

  val result = beerConsumption.select($"Country", $"Code", $"Year2011" as "BeerConsumption2011")

  result.write.mode("overwrite").parquet("data/results/batchWithDependencies/otherJobResults")
}
