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

package za.co.absa.spline.persistence.api.composition

import org.slf4s.Logging
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.DataLineageWriter

import scala.concurrent.{ExecutionContext, Future}

/**
  * The class represents a parallel composite writer to various persistence layers for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
  *
  * @param writers a set of internal writers specific to particular  persistence layers
  */
class ParallelCompositeDataLineageWriter(writers: Seq[DataLineageWriter]) extends DataLineageWriter with Logging {

  /**
    * The method stores a particular data lineage to the underlying persistence layers.
    *
    * @param lineage A data lineage that will be stored
    */
  override def store(lineage: DataLineage)(implicit ec: ExecutionContext): Future[Unit] = {
    log debug s"Calling underlying writers (${writers.length})"
    val futures = for (w <- writers) yield w.store(lineage)
    Future.sequence(futures).map(_ => Unit)
  }

}
