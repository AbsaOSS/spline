package za.co.absa.spline.web.rest.service

import java.util.UUID

import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.DataLineageReader

import scala.concurrent.Future

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

class PrelinkedLineageService(reader: DataLineageReader) extends DatasetOverviewLineageAsync {

  def getPrelinked(datasetId: UUID): Future[DataLineage] = {
    // Now, just enqueue the datasetId and process it recursively
    enqueueOutput(Seq(datasetId))
    processQueueAsync().map { _ => finalGather() }
    // Alternatively, for comprehension may be used:
    // for ( _ <- processQueueAsync() ) yield finalGather()
  }

  // Traverse lineage tree from an dataset Id in the direction from destination to source
  override def traverseUp(dsId: UUID): Future[Unit] =
    reader.loadByDatasetId(dsId).flatMap { a =>
      val maybeLineageToEventualUnit = processAndEnqueue(a)
      maybeLineageToEventualUnit
    }

  // Traverse lineage tree from an dataset Id in the direction from source to destination
  override def traverseDown(dsId: UUID): Future[Unit] = {
    import za.co.absa.spline.common.ARMImplicits._
    reader.findByInputId(dsId).flatMap {
      for (compositeList <- _) yield
        processAndEnqueue(compositeList.iterator)
    }
  }

}
