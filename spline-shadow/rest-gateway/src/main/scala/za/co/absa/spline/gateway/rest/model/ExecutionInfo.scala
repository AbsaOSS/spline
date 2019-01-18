package za.co.absa.spline.gateway.rest.model

import java.util.{Date, UUID}

import za.co.absa.spline.gateway.rest.model.ExecutionInfo.Id

case class ExecutionInfo
(
  _id: Id,
  nativeId: Option[String],
  startTime: Option[Date],
  finishTime: Option[Date]
) {
  require(Seq(startTime, finishTime).exists(_.isDefined), "at least one of 'start' or 'finish' time should be defined")
}

object ExecutionInfo {
  type Id = UUID
}
