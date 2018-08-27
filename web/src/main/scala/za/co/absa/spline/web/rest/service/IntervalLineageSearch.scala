package za.co.absa.spline.web.rest.service

import java.util.{Collections, UUID}
import java.util.concurrent.ConcurrentHashMap

import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.model.op.Operation
import za.co.absa.spline.persistence.api.{CloseableIterable, DataLineageReader}

import scala.collection.GenTraversableOnce
import scala.collection.mutable
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
    descriptor.map(_.path.toString).flatMap(relinkAndAccumulate)
      .map(_ => finalGather())
  }

  private def relinkAndAccumulate(path: String): Future[Unit] = {
    reader
      .getByDatasetIdsByPathAndInterval(path, start, end)
      .flatMap(relinkAndAccumulate)
      .flatMap(_ => {
        val originalNextPaths = nextPaths.clone()
        nextPaths.clear()
        val value: Future[Unit] = Future.sequence(originalNextPaths.map(relinkAndAccumulate)).map(_ => Unit)
        value
      })
  }

  private def relinkAndAccumulate(ids: CloseableIterable[UUID]): Future[Unit] = {
    Future.sequence(ids.iterator.map(reader.loadByDatasetId))
      .map(iterator => iterator
        .filter(_.isDefined)
        .map(_.get)
        .map(lineageToCompositeWithDependencies)
        .map(relinkComposite)
        .foreach(accumulateCompositeDependencies)
      )
  }

  private def relinkComposite(compositeWithDependencies: CompositeWithDependencies): CompositeWithDependencies = {
    val originalComposite = compositeWithDependencies.composite
    val originalDestinationId = originalComposite.destination.datasetsIds.head
    val newDestinationId = pathToDatasetId
      .putIfAbsent(originalComposite.destination.path, originalDestinationId)
      .getOrElse(originalDestinationId)
    val destinationIds = Seq(newDestinationId)
    val newSources = originalComposite.sources.map(s => {
      if (s.datasetsIds.nonEmpty) {
        val result = pathToDatasetId.putIfAbsent(s.path, s.datasetsIds.head)
        if (result.isEmpty) {
          nextPaths.add(s.path)
          // Breath first loop to subtree of path result.path.
        }
        s.copy(datasetsIds = Seq(result.getOrElse(s.datasetsIds.head)))
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

  override def traverseDown(datasetId: UUID): Future[Unit] = {
    // query events between start and end and reading from URI of dataset with datasetId.
    // TODO Cannot use these methods because these already use linking (they operate on dataset.sources nad dataset.destionation)
    // Need to rewrite such that we search by path and interval excluding lineages already found plus modifying source and destionation values.
    // Thus one needs to iterate over input datasets making sure that the sources are being properly overwritten and also making sure both sources and dests are loaded based on path and interval only.
    //    for (
    //      uuids <- loadByPath(datasetId);
    //      uuid <- uuids;
    //      lineages <- reader.findByInputId(uuid)
    //    ) yield processAndEnqueue(lineages.iterator)
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