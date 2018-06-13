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

package za.co.absa.spline.linker.control

import java.util.UUID

import org.slf4s.Logging
import za.co.absa.spline.model.op.{Operation, Read}
import za.co.absa.spline.model.{DataLineage, MetaDataSource}
import za.co.absa.spline.persistence.api.DataLineageReader

import scala.concurrent.{ExecutionContext, Future}
import scala.language.postfixOps

/**
  * The class injects into a lineage graph root meta data sets from related lineage graphs.
  *
  * @param reader A reader reading lineage graphs from persistence layer
  */
class DataLineageLinker(reader: DataLineageReader) extends Logging {

  /**
    * The method transforms an input instance by a custom logic.
    *
    * @param lineage An input lineage graph
    * @return A transformed result
    */
  def apply(lineage: DataLineage)(implicit ec: ExecutionContext): Future[DataLineage] = {
    def castIfRead(op: Operation): Option[Read] = op match {
      case a@Read(_, _, _) => Some(a)
      case _ => None
    }

    def resolveMetaDataSources(mds: MetaDataSource): Future[MetaDataSource] = {
      log debug s"Resolving lineage of ${mds.path}"

      assume(mds.datasetsIds.isEmpty, s"a lineage of ${mds.path} is yet to be found")

      reader.findLatestDatasetIdsByPath(mds.path) map (dsIdCursor => {
        import za.co.absa.spline.common.ARMImplicits._
        for (_ <- dsIdCursor) yield {
          val dsIds = dsIdCursor.iterator.toList
          if (dsIds.isEmpty)
            log.debug(s"Lineage of ${mds.path} NOT FOUND")
          mds.copy(datasetsIds = dsIds)
        }
      })
    }

    val eventualReadsWithLineages: Future[Seq[Read]] = Future.sequence(
      for {
        op <- lineage.operations
        read <- castIfRead(op)
        eventualSources = Future.sequence(read.sources map resolveMetaDataSources)
      } yield
        eventualSources map (newSources => {
          val newProps = read.mainProps.copy(inputs = newSources.flatMap(_.datasetsIds).distinct)
          val newRead = read.copy(sources = newSources, mainProps = newProps)
          newRead
        }))

    eventualReadsWithLineages map (newReads => {
      val newReadsMap: Map[UUID, Read] = newReads.map(read => read.mainProps.id -> read).toMap

      lineage.copy(operations = lineage.operations.map(op => newReadsMap.getOrElse(op.mainProps.id, op)))

    })
  }
}
