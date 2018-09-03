package za.co.absa.spline.sample.streamingWithDependencies

import org.apache.spark.sql.functions._
import org.apache.spark.sql.types._
import za.co.absa.spline.sample.{KafkaProperties, SparkApp}

object KafkaMeteoDataReader extends SparkApp("KafkaMeteoDataReader") with KafkaProperties {

  override def kafkaTopic: String = throw new NotImplementedError("Kafka topic is not supported in this context.")

  val inputTopic: String = getRequiredString("kafka.topic.input")

  val outputTopic: String = getRequiredString("kafka.topic.output")

  val sourceDF = spark
    .readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", kafkaServers)
    .option("subscribe", inputTopic)
    .option("startingOffsets", "latest")
    .load()

  val schema = StructType(Seq(
    StructField("name", StringType, false),
    StructField("t", StringType, false),
    StructField("lon", DoubleType, false),
    StructField("lat", DoubleType, false),
    StructField("temp", DoubleType, false),
    StructField("pres", DoubleType, false),
    StructField("hum", DoubleType, false)))

  val resultDF = sourceDF
    .select(from_json('value.cast(StringType), schema) as "data")
    .select($"data.*")
    .select(struct(
      't as "time",
      struct('lon as "longitude", 'lat as "latitude") as "coordinates",
      'temp as "temperature",
      'pres as "pressure",
      'hum as "humidity") as "data")
    .select(to_json('data) as "value")

  resultDF
    .writeStream
    .format("kafka")
    .option("kafka.bootstrap.servers", kafkaServers)
    .option("checkpointLocation", "data/checkpoints/streamingWithDependencies/kafka")
    .option("topic", outputTopic)
    .start()
    .awaitTermination()
}
