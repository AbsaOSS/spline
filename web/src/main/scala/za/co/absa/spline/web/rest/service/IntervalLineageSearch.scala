package za.co.absa.spline.web.rest.service

import java.util.concurrent.ConcurrentHashMap
import java.util.{Collections, UUID}

import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.{CloseableIterable, DataLineageReader}

import scala.collection.GenTraversableOnce
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

class IntervalLineageSearch(reader: DataLineageReader) extends DatasetOverviewLineageAsync {

  import scala.collection.JavaConverters._

  private var start: Long = _
  private var end: Long = _
  private var isTraverseDirectionUp: Boolean = _

  private var pathToDatasetId: collection.concurrent.Map[String, UUID] = new ConcurrentHashMap[String, UUID]().asScala
  private var nextPaths = Collections.newSetFromMap(new ConcurrentHashMap[String, java.lang.Boolean]()).asScala

  def apply(datasetId: UUID, start: Long, end: Long, isTraverseDirectionUp: Boolean): Future[DataLineage] = {
    this.start = start
    this.end = end
    this.isTraverseDirectionUp = isTraverseDirectionUp
    val descriptor = reader.getDatasetDescriptor(datasetId)
    descriptor
      .map(d => {
        pathToDatasetId.put(d.path.toString, d.datasetId)
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
    val newDestinationId = getOrSetPathDatasetId(originalComposite.destination.path, originalComposite.destination.datasetsIds.head)
    val destinationIds = Seq(newDestinationId)
    val newSources = originalComposite.sources.map(s => {
      if (s.datasetsIds.nonEmpty) {
        s.copy(datasetsIds = Seq(getOrSetPathDatasetId(s.path, s.datasetsIds.head)))
      } else {
        s
      }
    })
    val newInputs = newSources.flatMap(_.datasetsIds.headOption.toList)
    val linkedComposite = originalComposite.copy(
      destination = originalComposite.destination.copy(datasetsIds = destinationIds),
      sources = newSources,
      mainProps = originalComposite.mainProps.copy(output = newDestinationId, inputs = newInputs))
    // TODO Do I need to change also other fields of the CompositeWithDeps
    compositeWithDependencies.copy(composite = linkedComposite)
  }

  private def getOrSetPathDatasetId(path: String, datasetId: UUID): UUID = {
    pathToDatasetId.putIfAbsent(path, datasetId).getOrElse({
      // Breath first loop to subtree of path result.path.
      nextPaths.add(path)
      datasetId
    })
  }

  override def traverseDown(datasetId: UUID): Future[Unit] = {
    Future.failed(new UnsupportedOperationException)
  }

  override def traverseUp(datasetId: UUID): Future[Unit] = {
    Future.failed(new UnsupportedOperationException)
  }

  override def processAndEnqueue(lineages: GenTraversableOnce[DataLineage]): Future[Unit] = {
    lineages.foreach {
      lineage =>
        val compositeWithDeps = lineageToCompositeWithDependencies(lineage)
        // FIXME remap sources here
        accumulateCompositeDependencies(compositeWithDeps)
        val composite = compositeWithDeps.composite
        if (isTraverseDirectionUp) {
          enqueueInput(Seq(composite.mainProps.output))
        } else {
          enqueueOutput(composite.mainProps.inputs)
        }
    }
    // This launches parallel execution of the remaining elements of the queue
    processQueueAsync()
  }


}

class IntervalLineageService(reader: DataLineageReader) {

  def apply(datasetId: UUID, from: Long, to: Long): Future[DataLineage] = {
    // FIXME add down traversion
    new IntervalLineageSearch(reader)(datasetId, from, to, true)
  }
}