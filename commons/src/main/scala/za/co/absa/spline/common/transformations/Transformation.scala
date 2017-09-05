package za.co.absa.spline.common.transformations

/**
  * The trait represents a transformation performed on an input instance.
  * @tparam T A type of a transformed instance.
  */
trait Transformation[T] {

  /**
    * The method transforms an input instance by a custom logic.
    * @param input An input instance
    * @return A transformed result
    */
  def transform(input : T) : T
}
