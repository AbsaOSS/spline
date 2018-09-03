package za.co.absa.spline.sample.streamingWithDependencies

import org.apache.commons.configuration.SystemConfiguration
import org.apache.commons.lang.StringUtils.isNotBlank
import za.co.absa.spline.sample.SparkApp

object ParquetToCsvJob extends SparkApp("Parquet to CSV Job", conf = Seq("spark.sql.shuffle.partitions" -> "4")) {

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
    .write.mode("overwrite").parquet(s"data/results/streamingWithDependencies/csv/$date")

}
