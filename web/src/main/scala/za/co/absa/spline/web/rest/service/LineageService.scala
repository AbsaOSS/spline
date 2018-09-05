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

package za.co.absa.spline.web.rest.service

import java.util.UUID

import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.DataLineageReader
import za.co.absa.spline.web.ExecutionContextImplicit

import scala.concurrent.Future

class LineageService
(
  val reader: DataLineageReader
) extends ExecutionContextImplicit {

  private val prelinkedLineageService = new PrelinkedLineageService(reader)
  private val intervalLineageService = new IntervalLineageService(reader)

  /**
    * This is non-blocking version of getting High Order Lineage by a dataset Id
    *
    * The algorithm launches requests to the DB in parallel and accumulates all
    * lineage data in shared memory. This avoids a lot of copies and merges of
    * partial data lineages.
    *
    * @param datasetId An output dataset Id of a Lineage
    * @return A high order lineage of Composite operations packed in a future
    */

  def getPrelinked(datasetId: UUID): Future[DataLineage] = {
    prelinkedLineageService(datasetId)
  }

  def getInterval(datasetId: UUID, from: Long, to: Long): Future[DataLineage] = {
//    new IntervalLineageService(reader).get(datasetId, )
    // FIXME use interval service
    intervalLineageService(datasetId, from, to)
  }

}
