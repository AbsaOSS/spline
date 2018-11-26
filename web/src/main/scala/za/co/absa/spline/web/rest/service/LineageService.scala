/*
 * Copyright 2017 ABSA Group Limited
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

import za.co.absa.spline.common.ARM._
import za.co.absa.spline.model.dt.DataType
import za.co.absa.spline.model.op._
import za.co.absa.spline.model.{Attribute, DataLineage, MetaDataset, TypedMetaDataSource}
import za.co.absa.spline.persistence.api.DataLineageReader
import za.co.absa.spline.web.ExecutionContextImplicit

import scala.collection.{GenTraversableOnce, mutable}
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

  def getDatasetLineageOverview(datasetId: UUID): Future[HigherLevelLineageOverview] = {

    // Accumulation containers holding partial high order lineage
    val operations: mutable.Set[Composite] = mutable.HashSet.empty
    val datasets: mutable.Set[MetaDataset] = mutable.HashSet.empty
    val attributes: mutable.Set[Attribute] = mutable.HashSet.empty
    val dataTypes: mutable.Set[DataType] = mutable.HashSet.empty

    // Containers holding the current state of processing queue
    val inputDatasetIds: mutable.Queue[UUID] = mutable.Queue.empty
    val outputDatasetIds: mutable.Queue[UUID] = mutable.Queue.empty
    val inputDatasetIdsVisited: mutable.Set[UUID] = mutable.HashSet.empty
    val outputDatasetIdsVisited: mutable.Set[UUID] = mutable.HashSet.empty

    // Enqueue a dataset for processing all lineages it participates as a source dataset
    def enqueueInput(dsIds: Seq[UUID]): Unit = {
      val notVisitedInputIds = dsIds.filterNot(inputDatasetIdsVisited)
      inputDatasetIdsVisited.synchronized {
        inputDatasetIdsVisited ++= notVisitedInputIds
      }
      inputDatasetIds.synchronized {
        inputDatasetIds.enqueue(notVisitedInputIds: _*)
      }
    }

    // Enqueue a dataset for processing all lineages it participates as the destination dataset
    def enqueueOutput(dsIds: Seq[UUID]): Unit = {
      val notVisitedOutputIds = dsIds.filterNot(outputDatasetIdsVisited)
      outputDatasetIdsVisited.synchronized {
        outputDatasetIdsVisited ++= notVisitedOutputIds
      }
      outputDatasetIds.synchronized {
        outputDatasetIds.enqueue(notVisitedOutputIds: _*)
      }
    }

    // Accumulate all entities of a composite to the resulting high order lineage
    def accumulateCompositeDependencies(cd: CompositeWithDependencies): Unit = {
      outputDatasetIdsVisited.synchronized {
        outputDatasetIdsVisited ++= cd.composite.destination.datasetsIds
      }
      operations.synchronized {
        operations += cd.composite
      }
      datasets.synchronized {
        datasets ++= cd.datasets
      }
      attributes.synchronized {
        attributes ++= cd.attributes
      }
      dataTypes.synchronized {
        dataTypes ++= cd.dataTypes
      }
    }

    // Traverse lineage tree from an dataset Id in the direction from destination to source
    def traverseUp(dsId: UUID): Future[Unit] =
      reader.loadByDatasetId(dsId, overviewOnly = true).flatMap { a =>
        val maybeLineageToEventualUnit = processAndEnqueue(a)
        maybeLineageToEventualUnit
      }

    // Traverse lineage tree from an dataset Id in the direction from source to destination
    def traverseDown(dsId: UUID): Future[Unit] = {
      reader.findByInputId(dsId, overviewOnly = true).flatMap(managed(compositeList =>
        processAndEnqueue(compositeList.iterator)
      ))
    }

    def processAndEnqueue(lineages: GenTraversableOnce[DataLineage]) = {
      lineages.foreach {
        lineage =>
          val compositeWithDeps = lineageToCompositeWithDependencies(lineage)
          accumulateCompositeDependencies(compositeWithDeps)
          val composite = compositeWithDeps.composite
          enqueueOutput(composite.sources.flatMap(_.datasetsIds))
          enqueueInput(composite.destination.datasetsIds)
      }
      // This launches parallel execution of the remaining elements of the queue
      processQueueAsync()
    }

    def lineageToCompositeWithDependencies(dataLineage: DataLineage): CompositeWithDependencies = {
      def castIfRead(op: Operation): Option[Read] = op match {
        case a@Read(_, _, _) => Some(a)
        case _ => None
      }

      val readOps: Seq[Read] = dataLineage.operations.flatMap(castIfRead)
      val inputSources: Seq[TypedMetaDataSource] = (
        for {
          read <- readOps
          source <- read.sources
        } yield
          TypedMetaDataSource(read.sourceType, source.path, source.datasetsIds)
        ).distinct

      val outputWriteOperation = dataLineage.rootOperation.asInstanceOf[Write]
      val outputSource = TypedMetaDataSource(outputWriteOperation.destinationType, outputWriteOperation.path, Seq(outputWriteOperation.mainProps.output))

      val inputDatasetIds = readOps.flatMap(_.mainProps.inputs).distinct
      val outputDatasetId = dataLineage.rootDataset.id

      val composite = Composite(
        mainProps = OperationProps(
          outputDatasetId,
          dataLineage.appName,
          inputDatasetIds,
          outputDatasetId
        ),
        sources = inputSources,
        destination = outputSource,
        dataLineage.timestamp,
        dataLineage.appId,
        dataLineage.appName
      )

      val reducedLineage = dataLineage.copy(operations = Seq(composite)).rectified

      CompositeWithDependencies(
        composite,
        reducedLineage.datasets,
        reducedLineage.attributes,
        reducedLineage.dataTypes)
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
          _ <- futDown
          _ <- futUp
          f <- processQueueAsync()
        } yield f
      }
    }

    def finalGather() = HigherLevelLineageOverview(
      operations.toSeq,
      datasets.toSeq,
      attributes.toSeq,
      dataTypes.toSeq
    )

    // Now, just enqueue the datasetId and process it recursively
    enqueueOutput(Seq(datasetId))
    processQueueAsync().map { _ => finalGather() }
  }

  /**
    * The case class serves for associating a composite operation with its dependencies
    *
    * @param composite  A composite operation
    * @param datasets   Referenced meta data sets
    * @param attributes Referenced attributes
    */
  case class CompositeWithDependencies
  (
    composite: Composite,
    datasets: Seq[MetaDataset],
    attributes: Seq[Attribute],
    dataTypes: Seq[DataType])

}
