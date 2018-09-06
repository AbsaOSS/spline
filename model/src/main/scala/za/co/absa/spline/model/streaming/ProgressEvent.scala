package za.co.absa.spline.model.streaming

import java.util.UUID

/**
  * The class contains details about a streaming micro batch.
  * @param id An unique id of the micro-batch
  * @param lineageId An identifier of the lineage that the micro batch is related to
  * @param timestamp A time when the micro-batch was created.
  * @param readCount A number of records read within the micro batch
  * @param readPaths Paths of the sources of the data
  * @param writePath A path of the target where data are written
  */
case class ProgressEvent(
  id: UUID,
  lineageId: String,
  timestamp: Long,
  readCount: Long,
  readPaths: Seq[String],
  writePath: String
)