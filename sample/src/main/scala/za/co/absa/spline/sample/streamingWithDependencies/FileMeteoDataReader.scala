package za.co.absa.spline.sample.streamingWithDependencies

import org.apache.spark.sql.functions._
import org.apache.spark.sql.types.{DoubleType, StringType, StructField, StructType}
import za.co.absa.spline.sample.{KafkaProperties, SparkApp}

object FileMeteoDataReader extends SparkApp("FileMeteoDataReader") with KafkaProperties{

  val schema = StructType(Seq(
    StructField("ID", StringType, false),
    StructField("TIME", StringType, false),
    StructField("LONG", DoubleType, false),
    StructField("LAT", DoubleType, false),
    StructField("TEMPERATURE", DoubleType, false),
    StructField("PRESSURE", DoubleType, false),
    StructField("HUMIDITY", DoubleType, false)))

  val sourceDF = spark
    .readStream
    .option("header", "true")
    .schema(schema)
    .csv("data/input/streamingWithDependencies/fileMeteoStation")

  val resultDF = sourceDF
    .select(struct(
      'ID as "id",
      'TIME as "time",
      struct('LONG as "longitude", 'LAT as "latitude") as "coordinates",
      'TEMPERATURE as "temperature",
      'PRESSURE as "pressure",
      'HUMIDITY as "humidity") as "data")
    .select(to_json('data) as "value")

  resultDF
    .writeStream
    .format("kafka")
    .option("kafka.bootstrap.servers", kafkaServers)
    .option("checkpointLocation", "data/checkpoints/streamingWithDependencies/file")
    .option("topic", kafkaTopic)
    .start()
    .awaitTermination()
}
