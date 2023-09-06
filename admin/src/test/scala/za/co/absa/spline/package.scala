/*
 * Copyright 2023 ABSA Group Limited
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

package za.co.absa

import org.scalatestplus.mockito.MockitoSugar.mock

import scala.reflect.ClassTag

package object spline {
  /**
   * This is just to add another word for `Mockito.mock` method, for better test readability.
   *
   * @tparam A type of the dummy
   * @return a dummy instance of the given type
   */
  def dummy[A <: AnyRef : ClassTag]: A = mock[A]
}
