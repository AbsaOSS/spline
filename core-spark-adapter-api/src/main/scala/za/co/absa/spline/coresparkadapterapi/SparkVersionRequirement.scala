package za.co.absa.spline.coresparkadapterapi

import org.apache.spark

trait SparkVersionRequirement {

  protected val versionPrefix: String

  def requireSupportedVersion(): Unit = {
    require(spark.SPARK_VERSION.startsWith(versionPrefix), s"Unsupported Spark version: ${spark.SPARK_VERSION}. Required version $versionPrefix.*.")
  }

}

object SparkVersionRequirement extends AdapterFactory[SparkVersionRequirement]
