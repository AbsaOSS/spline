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

import za.co.absa.spline.model.op._
import za.co.absa.spline.model.{Attribute, DataLineage, MetaDataset}
import za.co.absa.spline.persistence.api.DataLineageReader
import za.co.absa.spline.web.ExecutionContextImplicit

import scala.collection.mutable
import scala.concurrent.Future

class LineageService
(
  val reader: DataLineageReader
) extends ExecutionContextImplicit {

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

  def getDatasetOverviewLineageAsync(datasetId: UUID): Future[DataLineage] = {

    // Accululation containers holding partial high order lineage
    val operations: mutable.Set[Operation] = new mutable.HashSet[Operation]()
    val datasets: mutable.Set[MetaDataset] = new mutable.HashSet[MetaDataset]()
    val attributes: mutable.Set[Attribute] = new mutable.HashSet[Attribute]()

    // Containers holding the current state of processing queue
    val inputDatasetIds: mutable.Queue[UUID] = new mutable.Queue[UUID]
    val outputDatasetIds: mutable.Queue[UUID] = new mutable.Queue[UUID]
    val inputDatasetIdsVisited: mutable.Set[UUID] = new mutable.HashSet[UUID]()
    val outputDatasetIdsVisited: mutable.Set[UUID] = new mutable.HashSet[UUID]()

    // Enqueue a dataset for processing all lineages it participates as a source dataset
    def enqueueInput(dsId: UUID): Unit = inputDatasetIds.synchronized {
      if (!inputDatasetIdsVisited.contains(dsId)) {
        inputDatasetIds.enqueue(dsId)
        inputDatasetIdsVisited += dsId
      }
    }

    // Enqueue a dataset for processing all lineages it participates as the destination dataset
    def enqueueOutput(dsId: UUID): Unit = outputDatasetIds.synchronized {
      if (!outputDatasetIdsVisited.contains(dsId)) {
        outputDatasetIds.enqueue(dsId)
        outputDatasetIdsVisited += dsId
      }
    }

    // Mark currenEnqueue a dataset for processing all lineages it participates as the destination dataset
    def addVisitedComposite(dsId: UUID): Unit = outputDatasetIds.synchronized {
      outputDatasetIdsVisited += dsId
    }

    // Accumulate all entities of a composite to the resulting high order lineage
    def accumulateCompositeDependencies(cd: CompositeWithDependencies): Unit = {
      val dst = cd.composite.destination.datasetId
      if (dst.nonEmpty) {
        addVisitedComposite(dst.get)
      }
      operations.synchronized {
        operations += cd.composite
      }
      datasets.synchronized {
        datasets ++= cd.datasets
      }
      datasets.synchronized {
        attributes ++= cd.attributes
      }
    }

    // Traverse lineage tree from an dataset Id in the direction from destination to source
    def traverseUp(dsId: UUID): Future[Unit] =
      reader.loadCompositeByOutput(dsId).flatMap {
        compositeWithDeps => {
          if (compositeWithDeps.nonEmpty) {
            accumulateCompositeDependencies(compositeWithDeps.get)
            compositeWithDeps.get.composite.sources.foreach(c => {
              if (c.datasetId.nonEmpty) {
                enqueueOutput(c.datasetId.get)
              }
            })
            val dst = compositeWithDeps.get.composite.destination.datasetId
            if (dst.nonEmpty) {
              enqueueInput(dst.get)
            }
          }
          // This launches parallel execution of the remaining elements of the queue
          processQueueAsync()
        }
      }

    // Traverse lineage tree from an dataset Id in the direction from source to destination
    def traverseDown(dsId: UUID): Future[Unit] = {

      reader.loadCompositesByInput(dsId).flatMap {
        import za.co.absa.spline.common.ARMImplicits._
        for (compositeList <- _) yield {
          compositeList.iterator.foreach(compositeWithDeps => {
            accumulateCompositeDependencies(compositeWithDeps)
            compositeWithDeps.composite.sources.foreach(composite => if (composite.datasetId.nonEmpty) enqueueOutput(composite.datasetId.get))
            if (compositeWithDeps.composite.destination.datasetId.nonEmpty) enqueueInput(compositeWithDeps.composite.destination.datasetId.get)
          })
          // This launches parallel execution of the remaining elements of the queue
          processQueueAsync()
        }
      }
    }

    /**
      * This recursively processes the queue of unprocessed composites
      */
    def processQueueAsync(): Future[Unit] = {
      if (inputDatasetIds.isEmpty && outputDatasetIds.isEmpty) {
        // The queue is empty, construct the final DataLineage
        Future.successful(Unit)
      }
      else {
        var dsIdUp: Option[UUID] = None
        var dsIdDown: Option[UUID] = None

        inputDatasetIds.synchronized {
          if (inputDatasetIds.nonEmpty) {
            dsIdDown = Some(inputDatasetIds.dequeue())
          }
        }
        outputDatasetIds.synchronized {
          if (outputDatasetIds.nonEmpty) {
            dsIdUp = Some(outputDatasetIds.dequeue())
          }
        }

        // The queue is not empty, construct recursive call to traverseUp/Down
        val futDown = dsIdDown map traverseDown getOrElse Future.successful(Unit)
        val futUp = dsIdUp map traverseUp getOrElse Future.successful(Unit)

        for {
          resDown <- futDown
          resUp <- futUp
          f <- processQueueAsync()
        } yield f
      }
    }

    def finalGather(): DataLineage = DataLineage("appId", "appName", 0, operations.toSeq, datasets.toSeq, attributes.toSeq)

    // Now, just enqueue the datasetId and process it recursively
    enqueueOutput(datasetId)
    processQueueAsync().map { _ => finalGather() }
    // Alternatively, for comprehension may be used:
    // for ( _ <- processQueueAsync() ) yield finalGather()
  }

}
