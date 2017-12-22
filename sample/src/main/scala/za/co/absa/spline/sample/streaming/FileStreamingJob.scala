package za.co.absa.spline.sample.streaming

import za.co.absa.spline.sample.SparkApp

object FileStreamingJob extends SparkApp("File Streaming Job"){

  // Initializing library to hook up to Apache Spark
  import za.co.absa.spline.core.SparkLineageInitializer._
  spark.enableLineageTracking()

  // A business logic of a spark job ...
  import spark.implicits._

  val schemaImp = spark.read
    .format("csv")
    .option("header", true)
    .option("inferSchema", true)
    .load("data/input/streaming")
    .schema

  val sourceDS = spark.readStream
    .option("header", "true")
    .schema(schemaImp)
    .csv("data/input/streaming")
    .as("source")
    .filter($"total_response_size" > 1000)
    .filter($"count_views" > 10)
    .select($"page_title" as "value")

  val sink = sourceDS
    .writeStream
    .format("parquet")
    .option("checkpointLocation", "data/checkpoint")
    .option("path", "data/results/streaming/wikidataResult")

  val q = sink.start()

  q.awaitTermination()
}
