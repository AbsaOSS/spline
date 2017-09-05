package za.co.absa.spline.common.transformations

/**
  * The class represents a pipeline that gradually applies transformations onto a input instance.
  * @param tranformations A sequence of transformations (see [[za.co.absa.spline.common.transformations.Transformation Transformation]]
  * @tparam T A type of a transformed instance
  */
class TransformationPipeline[T](tranformations : Seq[Transformation[T]]) {

  /**
    * The method transforms a input instance by a logic of inner transformations.
    * @param input An input instance
    * @return A transformed result
    */
  def transform(input: T): T =
    tranformations.foldLeft(input)((value, transformation) => transformation.transform(value))
}
