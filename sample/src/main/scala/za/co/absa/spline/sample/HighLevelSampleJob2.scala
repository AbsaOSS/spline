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
