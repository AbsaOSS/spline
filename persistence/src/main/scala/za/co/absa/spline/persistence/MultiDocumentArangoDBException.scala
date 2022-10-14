/*
 * Copyright 2022 ABSA Group Limited
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

package za.co.absa.spline.persistence

import com.arangodb.ArangoDBException
import com.arangodb.entity.ErrorEntity

class MultiDocumentArangoDBException(errorEntities: ErrorEntity*)
  extends ArangoDBException(errorEntities.head) {

  private lazy val errorEntitiesByCode: Map[Int, Seq[ErrorEntity]] = errorEntities.groupBy(_.getErrorNum)

  def getErrorNumsWithCounts: Seq[(Int, Int)] = {
    errorEntitiesByCode.mapValues(_.length).toSeq
  }

  def getErrorNums: Seq[Int] = {
    errorEntitiesByCode.keys.toSeq
  }
}
