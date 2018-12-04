package za.co.absa.spline.web.rest.service

import java.util.concurrent.ConcurrentHashMap
import java.util.{Collections, UUID}

import za.co.absa.spline.model.op.Write
import za.co.absa.spline.model.{DataLineage, MetaDataset, Schema, TypedMetaDataSource}
import za.co.absa.spline.persistence.api.{CloseableIterable, DataLineageReader}
import za.co.absa.spline.web.rest.service

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

class IntervalLineageSearch(reader: DataLineageReader) extends PrelinkedLineageSearch(reader) {

  import scala.collection.JavaConverters._

private var start: Long = _
  private var end: Long = _

  // If for given path exists destination dataset with schema and associated lineage or at least with an real id then it needs to be uniquely selected and stored.
  private var pathToDataset: collection.concurrent.Map[String, MetaDataset] = new ConcurrentHashMap[String, MetaDataset]().asScala
  private var nextPaths = Collections.newSetFromMap(new ConcurrentHashMap[String, java.lang.Boolean]()).asScala

  def apply(datasetId: UUID, start: Long, end: Long): Future[HigherLevelLineageOverview] = {
    this.start = start
    this.end = end
        reader.loadByDatasetId(datasetId, true)
        .map(_.get)
        .map(l => {
          // Ensures that path of selected dataset id resolved to that dataset id.
          val d = l.rootDataset
          val path = l.rootOperation.asInstanceOf[Write].path
          pathToDataset.put(path, d)
          path})
      .flatMap(relinkAndAccumulate)
      .map(_ => finalGather())
  }

  private def relinkAndAccumulate(path: String): Future[Unit] = {
    reader
      .getLineagesByPathAndInterval(path, start, end)
      .map(remapAndAccumulate)
      .flatMap(_ => {
        val originalNextPaths = nextPaths.clone()
        nextPaths.clear()
        Future.sequence(originalNextPaths.map(relinkAndAccumulate)).map(_ => Unit)
      })
  }

  private def remapAndAccumulate(lineages: CloseableIterable[DataLineage]): Unit = {
    lineages.iterator
        .map(lineageToCompositeWithDependencies)
        .map(remapDestinationsAndAccumulateComposite)
        .foreach(accumulateCompositeDependencies)
  }

  private def remapDestinationsAndAccumulateComposite(compositeWithDependencies: CompositeWithDependencies): CompositeWithDependencies = {
    val originalComposite = compositeWithDependencies.composite
    val originalDestinationDataset = compositeWithDependencies
      .datasets
      .find(m => m.id == originalComposite.destination.datasetsIds.head)
      .get
    val newDestinationId = getOrSetPathDataset(originalComposite.destination.path, originalDestinationDataset).id
    val destinationIds = Seq(newDestinationId)
    originalComposite.sources.foreach(s => {
      if (s.datasetsIds.nonEmpty) {
        val originalDatasetId: UUID = s.datasetsIds.head
        val currentDataset = compositeWithDependencies.datasets
          .find(_.id == originalDatasetId)
          .getOrElse(new PlaceholderMetaDataset(originalDatasetId))
        getOrSetPathDataset(s.path, currentDataset).id
      } else {
        getOrSetPathDataset(s.path, new GeneratedUUIDMetaDataset)
      }
    })
    val linkedComposite = originalComposite.copy(
      destination = originalComposite.destination.copy(datasetsIds = destinationIds),
      mainProps = originalComposite.mainProps.copy(output = newDestinationId))
    compositeWithDependencies.copy(composite = linkedComposite)
  }

  private def getOrSetPathDataset(path: String, dataset: MetaDataset): MetaDataset = {
    pathToDataset.putIfAbsent(path, dataset)
      .map {
        case _: PlaceholderMetaDataset if !dataset.isInstanceOf[PlaceholderMetaDataset] =>
          // PlaceholderMetaDataset have no schemas. While we would like any real schema available for given path.
          pathToDataset.put(path, dataset)
          dataset
        case _: GeneratedUUIDMetaDataset if !dataset.isInstanceOf[GeneratedUUIDMetaDataset] =>
          // Overwrite dataset with generated ids.
          pathToDataset.put(path, dataset)
          dataset
        case original =>
          original
      }.getOrElse({
        // Breath first loop to subtree of path result.path.
        nextPaths.add(path)
        dataset
    })
  }

  override def finalGather(): HigherLevelLineageOverview = {
    // While destinations where remapped to correct datasets the sources could be yet relinked.
    // That is due no guarantee of existence of dataset with full schema when resolving a source.
    val operationsWithRelinkedSources = operations
      .map(op => {
        val newSources = op.sources.map(s => s.copy(datasetsIds = Seq(pathToDataset(s.path).id)))
        val newInputs = newSources.map(_.datasetsIds.head).distinct
        op.copy(
          mainProps = op.mainProps.copy(inputs = newInputs),
          sources = newSources)
      })
    val resolvedDatasetsWithTransformedPlaceholders = pathToDataset
      .values
      .map(_.copy())
    HigherLevelLineageOverview(
      System.currentTimeMillis(),
      operationsWithRelinkedSources.toSeq.sortBy(_.mainProps.id),
      (datasets ++ resolvedDatasetsWithTransformedPlaceholders).toSeq.sortBy(_.id),
      attributes.toSeq.sortBy(_.id),
      dataTypes.toSeq.sortBy(_.id))
  }

}

class PlaceholderMetaDataset(realId: UUID) extends MetaDataset(realId, Schema(Seq()))
class GeneratedUUIDMetaDataset extends PlaceholderMetaDataset(UUID.randomUUID())

class IntervalLineageService(reader: DataLineageReader) {

  def apply(datasetId: UUID, from: Long, to: Long): Future[HigherLevelLineageOverview] = {
    new IntervalLineageSearch(reader)(datasetId, from, to)
  }
}