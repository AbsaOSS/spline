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
    import za.co.absa.spline.core.SparkLineageInitializer._
    spark.enableLineageTracking()

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
