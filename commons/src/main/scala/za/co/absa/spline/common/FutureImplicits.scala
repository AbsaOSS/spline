package za.co.absa.spline.common

import java.util.concurrent.Executors

import scala.concurrent.ExecutionContext

/**
  * The object contains implicit values and methods for [[scala.concurrent.Future Futures]].
  */
object FutureImplicits {

  /**
    * An execution context using a dedicated cached thread pool.
    */
  implicit val executionContext = ExecutionContext.fromExecutor(Executors.newCachedThreadPool())
}
