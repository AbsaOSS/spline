package za.co.absa.spline.consumer.service.model

object AccessValue extends Enumeration {
  type AccessValue = Value

  val read = Value("read")
  val write = Value("write")
  val default = Value("default")
}
