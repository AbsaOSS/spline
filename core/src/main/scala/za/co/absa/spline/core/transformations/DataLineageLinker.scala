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

package za.co.absa.spline.core.transformations

import java.util.UUID

import org.slf4s.Logging
import za.co.absa.spline.common.transformations.AsyncTransformation
import za.co.absa.spline.model.op.{Operation, Read}
import za.co.absa.spline.model.{Attribute, DataLineage, MetaDataSource, MetaDataset}
import za.co.absa.spline.persistence.api.DataLineageReader

import scala.concurrent.{ExecutionContext, Future}
import scala.language.postfixOps

/**
  * The class injects into a lineage graph root meta data sets from related lineage graphs.
  *
  * @param reader A reader reading lineage graphs from persistence layer
  */
class DataLineageLinker(reader: DataLineageReader) extends AsyncTransformation[DataLineage] with Logging {

  /**
    * The method transforms an input instance by a custom logic.
    *
    * @param lineage An input lineage graph
    * @return A transformed result
    */
  override def apply(lineage: DataLineage)(implicit ec: ExecutionContext): Future[DataLineage] = {
    def castIfRead(op: Operation): Option[Read] = op match {
      case a@Read(_, _, _) => Some(a)
      case _ => None
    }

    def selectAttributesForDataset(ds: MetaDataset, attributes: Seq[Attribute]) =
      attributes.filter(attr => ds.schema.attrs contains attr.id)

    // collect data

    def resolveMetaDataSources(mds: MetaDataSource): Future[(MetaDataSource, Seq[DataLineage])] = {
      log debug s"Resolving lineage of ${mds.path}"

      assume(mds.datasetsIds.isEmpty, s"a lineage of ${mds.path} is yet to be found")

      reader.findLatestLineagesByPath(mds.path) map (lineagesCursor => {
        import za.co.absa.spline.common.ARMImplicits._
        for (_ <- lineagesCursor) yield {
          val lineages = lineagesCursor.iterator.toList
          if (lineages.isEmpty)
            log.debug(s"Lineage of ${mds.path} NOT FOUND")
          val updatedMds = mds.copy(datasetsIds = lineages.map(_.rootDataset.id))
          (updatedMds, lineages)
        }
      })
    }

    val eventualReadsWithLineages: Future[Seq[(Read, Seq[DataLineage])]] = Future.sequence(
      for {
        op <- lineage.operations
        read <- castIfRead(op)
        eventualTuples = Future.sequence(read.sources map resolveMetaDataSources)
      } yield
        eventualTuples map (sourcesWithLineages => {
          val (newSources: Seq[MetaDataSource], sourceLineages: Seq[Seq[DataLineage]]) = sourcesWithLineages.unzip
          val newProps = read.mainProps.copy(inputs = newSources.flatMap(_.datasetsIds).distinct)
          val newRead = read.copy(sources = newSources, mainProps = newProps)
          newRead -> sourceLineages.flatten.distinct
        }))

    eventualReadsWithLineages map (readsWithLineages => {
      val (newReads, otherLineagesSeqs) = readsWithLineages.unzip

      val newDatasetsWithAttributes: Seq[(MetaDataset, Seq[Attribute])] =
        for {
          lineageSeq <- otherLineagesSeqs
          lineage <- lineageSeq
          ds = lineage.rootDataset
          dsAttrs = selectAttributesForDataset(ds, lineage.attributes)
        } yield ds -> dsAttrs

      // results

      val newDatasets: Seq[MetaDataset] = newDatasetsWithAttributes.map(_._1)
      val newAttributes: Seq[Attribute] = newDatasetsWithAttributes.flatMap(_._2)
      val newReadsMap: Map[UUID, Read] = newReads.map(read => read.mainProps.id -> read).toMap

      lineage.copy(
        operations = lineage.operations.map(i => newReadsMap.getOrElse(i.mainProps.id, i)),
        datasets = lineage.datasets ++ newDatasets,
        attributes = lineage.attributes ++ newAttributes
      )

    })
  }
}
