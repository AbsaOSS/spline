package za.co.absa.spline.sample.streamingWithDependencies

import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._
import za.co.absa.spline.sample.{KafkaProperties, SparkApp}

object AggregationJob extends SparkApp("AggregationJob", conf = ("spark.sql.shuffle.partitions" , "4") :: Nil) with KafkaProperties{

  val schema = StructType(Seq(
    StructField("id", StringType, false),
    StructField("time", StringType, false),
    StructField("coordinates", StructType(Seq(
      StructField("longitude", DoubleType, false),
      StructField("latitude", DoubleType, false))),
    false),
    StructField("temperature", DoubleType, false),
    StructField("pressure", DoubleType, false),
    StructField("humidity", DoubleType, false)))

  val sourceDF = spark
    .readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", kafkaServers)
    .option("subscribePattern", kafkaTopic)
    .option("startingOffsets", "latest")
    .load()

  val resultDF = sourceDF
    .select(from_json('value.cast(StringType), schema) as "data")
    .select($"data.*")
    .select(to_timestamp('time, "yyyy-MM-dd'T'HH:mm:ss.SSS") as "time", 'temperature)
    .withWatermark("time", "10 minutes")
    .groupBy(window('time, "1 hour", "1 hour", "30 minutes"))
    .agg(avg('temperature) as 'temperature)
    .select($"window.end".cast(DateType) as "date", hour($"window.end") as "hour", 'temperature)

  resultDF
    .writeStream
    .option("checkpointLocation", "data/checkpoints/streamingWithDependencies/aggregation")
    .option("path", "data/results/streamingWithDependencies/parquet")
    .option("header", "true")
    .partitionBy("date")
    .format("parquet")
    .start()
    .awaitTermination()
}
