package za.co.absa.spline.web.rest.service

import java.util.concurrent.ConcurrentHashMap
import java.util.{Collections, UUID}

import za.co.absa.spline.model.{DataLineage, MetaDataset, Schema, TypedMetaDataSource}
import za.co.absa.spline.persistence.api.{CloseableIterable, DataLineageReader}

import scala.collection.{GenTraversableOnce, mutable}
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

  private var pathToDataset: collection.concurrent.Map[String, MetaDataset] = new ConcurrentHashMap[String, MetaDataset]().asScala
  private var nextPaths = Collections.newSetFromMap(new ConcurrentHashMap[String, java.lang.Boolean]()).asScala

  def apply(datasetId: UUID, start: Long, end: Long): Future[DataLineage] = {
    this.start = start
    this.end = end
    val descriptor = reader.getDatasetDescriptor(datasetId)
    descriptor
      .map(d => {
        pathToDataset.put(d.path.toString, new PlaceholderMetaDataset(d.datasetId))
        d.path.toString})
      .flatMap(relinkAndAccumulate)
      .map(_ => finalGather())
  }

  private def relinkAndAccumulate(path: String): Future[Unit] = {
    reader
      .getByDatasetIdsByPathAndInterval(path, start, end)
      .map(relinkAndAccumulate)
      .flatMap(_ => {
        val originalNextPaths = nextPaths.clone()
        nextPaths.clear()
        Future.sequence(originalNextPaths.map(relinkAndAccumulate)).map(_ => Unit)
      })
  }

  private def relinkAndAccumulate(lineages: CloseableIterable[DataLineage]): Unit = {
    lineages.iterator
        .map(lineageToCompositeWithDependencies)
        .map(relinkComposite)
        .foreach(accumulateCompositeDependencies)
  }

  private def relinkComposite(compositeWithDependencies: CompositeWithDependencies): CompositeWithDependencies = {
    val originalComposite = compositeWithDependencies.composite
    val originalDestinationDataset = compositeWithDependencies
      .datasets
      .find(m => m.id == originalComposite.destination.datasetsIds.head)
      .get
    val newDestinationId = getOrSetPathDataset(originalComposite.destination.path, originalDestinationDataset).id
    val destinationIds = Seq(newDestinationId)
    val newSources: Seq[TypedMetaDataSource] = originalComposite.sources.map(s => {
      if (s.datasetsIds.nonEmpty) {
        val originalDatasetId: UUID = s.datasetsIds.head
        val currentDataset = compositeWithDependencies.datasets
          .find(_.id == originalDatasetId)
          .getOrElse(new PlaceholderMetaDataset(originalDatasetId))
        val dtId = getOrSetPathDataset(s.path, currentDataset).id
        s.copy(datasetsIds = Seq(dtId))
      } else {
        // leads to empty schema in datasets
        s.copy(datasetsIds = Seq(getOrSetPathDataset(s.path, new PlaceholderMetaDataset()).id))
      }})
    val newInputs = newSources.flatMap(_.datasetsIds.headOption.toList)
    val linkedComposite = originalComposite.copy(
      destination = originalComposite.destination.copy(datasetsIds = destinationIds),
      sources = newSources,
      mainProps = originalComposite.mainProps.copy(output = newDestinationId, inputs = newInputs))
    compositeWithDependencies.copy(composite = linkedComposite)
  }

  private def getOrSetPathDataset(path: String, dataset: MetaDataset): MetaDataset = {
    pathToDataset.putIfAbsent(path, dataset)
      .map(original => {
        if (original.isInstanceOf[PlaceholderMetaDataset]
          && !dataset.isInstanceOf[PlaceholderMetaDataset]) {
          // PlaceholderMetaDataset have no schemas. While we would like any schema available for given path.
          val datasetWithOriginalIdAndRealSchema = dataset.copy(id = original.id)
          pathToDataset.put(path, datasetWithOriginalIdAndRealSchema)
          datasetWithOriginalIdAndRealSchema
        } else {
          original
        }
      }).getOrElse({
       // Breath first loop to subtree of path result.path.
        nextPaths.add(path)
        dataset
    })
  }

  override def finalGather(): DataLineage = {
    val resolvedDatasetsWithTransformedPlaceholders = pathToDataset
      .values
      .map(_.copy())
    DataLineage(
      "appId",
      "appName",
      System.currentTimeMillis(),
      operations.toSeq.sortBy(_.mainProps.id),
      (datasets ++ resolvedDatasetsWithTransformedPlaceholders).toSeq.sortBy(_.id),
      attributes.toSeq.sortBy(_.id))
  }

}

class PlaceholderMetaDataset(id: UUID = UUID.randomUUID()) extends MetaDataset(id, Schema(Seq()))

class IntervalLineageService(reader: DataLineageReader) {

  def apply(datasetId: UUID, from: Long, to: Long): Future[DataLineage] = {
    new IntervalLineageSearch(reader)(datasetId, from, to)
  }
}