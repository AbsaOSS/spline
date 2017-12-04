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
import za.co.absa.spline.model.op.{MetaDataSource, Operation, Read}
import za.co.absa.spline.model.{Attribute, DataLineage, MetaDataset}
import za.co.absa.spline.persistence.api.DataLineageReader

import scala.concurrent.{ExecutionContext, Future}
import scala.language.postfixOps

/**
  * The class injects into a lineage graph root meta data sets from related lineage graphs.
  *
  * @param reader A reader reading lineage graphs from persistence layer
  */
class ForeignMetaDatasetInjector(reader: DataLineageReader) extends AsyncTransformation[DataLineage] with Logging {

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

    def resolveMetaDataSources(mds: MetaDataSource): Future[(MetaDataSource, Option[DataLineage])] = {
      log debug s"Resolving lineage of ${mds.path}"
      reader.loadLatest(mds.path) map {
        case None =>
          log debug s"Lineage of ${mds.path} NOT FOUND"
          (mds, None)
        case mdsLineageOpt@Some(mdsLineage) =>
          log debug s"Lineage of ${mds.path} FOUND: ${mdsLineage.id}"
          val updatedMds = mds.copy(datasetId = Some(mdsLineage.rootDataset.id))
          (updatedMds, mdsLineageOpt)
      }
    }

    val eventualReadsWithLineages: Future[Seq[(Read, Seq[DataLineage])]] = Future.sequence(
      for {
        op <- lineage.operations
        read <- castIfRead(op)
        eventualTuples = Future.sequence(read.sources map resolveMetaDataSources)
      } yield
        eventualTuples map (sourcesWithLineages => {
          val (newSources: Seq[MetaDataSource], sourceLineages: Seq[Option[DataLineage]]) = sourcesWithLineages.unzip
          val newProps = read.mainProps.copy(inputs = newSources.flatten(s => s.datasetId))
          val newRead = read.copy(sources = newSources, mainProps = newProps)
          newRead -> sourceLineages.flatten
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
