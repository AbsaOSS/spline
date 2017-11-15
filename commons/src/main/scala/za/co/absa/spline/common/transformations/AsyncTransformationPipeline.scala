/*
 * Copyright 2017 Barclays Africa Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package za.co.absa.spline.common.transformations

import scala.concurrent.{ExecutionContext, Future}
import scala.concurrent.Future.successful

/**
  * The class represents a pipeline that gradually applies transformations onto a input instance.
  *
  * @param transformations A sequence of transformations
  * @tparam T A type of a transformed instance
  */
class AsyncTransformationPipeline[T](transformations: AsyncTransformation[T]*) extends AsyncTransformation[T] {

  /**
    * The method transforms a input instance by a logic of inner transformations.
    *
    * @param input An input instance
    * @return A transformed result
    */
  def apply(input: T)(implicit ec: ExecutionContext): Future[T] = (successful(input) /: transformations) (_ flatMap _.apply)
}
