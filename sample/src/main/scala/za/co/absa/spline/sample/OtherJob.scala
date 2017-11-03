package za.co.absa.spline.sample

import org.apache.spark.sql.SparkSession

object OtherJob {
  def main(args: Array[String]) {
    val spark = SparkSession.builder()
      .appName("Other Job")
      .config("spark.sql.shuffle.partitions", "4")
      .master("local[*]")
      .getOrCreate()

    import spark.implicits._

    // Initializing library to hook up to Apache Spark
    import za.co.absa.spline.core.SparkLineageInitializer._
    spark.enableLineageTracking()

    // A business logic of a spark job ...
    val beerConsumtion = spark.read.parquet("data/results/beerConsCtl")

    val result = beerConsumtion.select($"Country", $"Code", $"Year2011" as "BeerConsumption2011")

    result.write.mode("overwrite").parquet("data/results/otherJobResults")
  }
}
