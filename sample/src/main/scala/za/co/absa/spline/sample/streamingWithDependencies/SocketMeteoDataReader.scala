package za.co.absa.spline.sample.streamingWithDependencies

import java.util.UUID

import org.apache.spark.sql.functions.{from_json, struct, to_json}
import org.apache.spark.sql.types.{DoubleType, StringType, StructField, StructType}
import za.co.absa.spline.sample.{KafkaProperties, SparkApp}

object SocketMeteoDataReader  extends SparkApp("SocketMeteoDataReader") with KafkaProperties{

  val schema = StructType(Seq(
    StructField("Name", StringType, false),
    StructField("Time", StringType, false),
    StructField("Longitude", DoubleType, false),
    StructField("Latitude", DoubleType, false),
    StructField("Temperature", DoubleType, false),
    StructField("Pressure", DoubleType, false),
    StructField("Humidity", DoubleType, false)))

  val sourceDF = spark.readStream
    .format("socket")
    .option("host", "localhost")
    .option("port", 9999)
    .load()

  val resultDF = sourceDF
    .select(from_json('value, schema) as "data")
    .select($"data.*")
    .select(struct(
      'Name as "id",
      'Time as "time",
      struct('Longitude as "longitude", 'Longitude as "latitude") as "coordinates",
      'Temperature as "temperature",
      'Pressure as "pressure",
      'Humidity as "humidity") as "data")
    .select(to_json('data) as "value")

  resultDF
    .writeStream
    .format("kafka")
    .option("kafka.bootstrap.servers", kafkaServers)
    .option("checkpointLocation", s"data/checkpoints/streamingWithDependencies/socket/${UUID.randomUUID}")
    .option("topic", kafkaTopic)
    .start()
    .awaitTermination()
}

