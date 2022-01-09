/*
 * Copyright 2020 ABSA Group Limited
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

package za.co.absa.spline.producer.modelmapper.v1_1

import io.bfil.automapper._
import za.co.absa.spline.producer.model.{v1_1, v1_2}
import za.co.absa.spline.producer.modelmapper.ModelMapper

object ModelMapperV11 extends ModelMapper[v1_1.ExecutionPlan, v1_1.ExecutionEvent] {

  override def fromDTO(plan: v1_1.ExecutionPlan): v1_2.ExecutionPlan = automap(plan).to[v1_2.ExecutionPlan]

  override def fromDTO(event: v1_1.ExecutionEvent): v1_2.ExecutionEvent = automap(event).to[v1_2.ExecutionEvent]
}