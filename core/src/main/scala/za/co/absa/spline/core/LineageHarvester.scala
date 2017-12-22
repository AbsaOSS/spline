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

package za.co.absa.spline.core

import za.co.absa.spline.model.DataLineage

/**
  * The traits represents a logic extracting lineage information from source.
  * @tparam TSource A type of the source
  */
trait LineageHarvester[TSource] {

  /**
    * The method extracts lineage information from source
    * @param source An instance containing lineage information
    * @return Lineage information
    */
  def harvestLineage(source: TSource): DataLineage
}
