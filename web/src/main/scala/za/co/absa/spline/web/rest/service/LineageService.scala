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

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import za.co.absa.spline.model.op._
import za.co.absa.spline.model.{Attribute, DataLineage, MetaDataset}
import za.co.absa.spline.persistence.api.DataLineageReader

import scala.collection.mutable
import scala.concurrent.{Await, Future}
import scala.concurrent.duration._

@Service
class LineageService @Autowired()
(
  val reader: DataLineageReader
) {

  def getDatasetOverviewLineage(datasetId: UUID): Future[DataLineage] = {

    var operations: mutable.Set[Operation] = new mutable.HashSet[Operation]()
    var datasets: mutable.Set[MetaDataset] = new mutable.HashSet[MetaDataset]()
    var attributes: mutable.Set[Attribute] = new mutable.HashSet[Attribute]()

    var inputDatasetIds: mutable.Queue[UUID] = new mutable.Queue[UUID]
    var outputDatasetIds: mutable.Queue[UUID] = new mutable.Queue[UUID]
    var inputDatasetIdsVisited: mutable.Set[UUID] = new mutable.HashSet[UUID]()
    var outputDatasetIdsVisited: mutable.Set[UUID] = new mutable.HashSet[UUID]()

    def enqueueInput(dsId: UUID): Unit = inputDatasetIds.synchronized {
      if (!inputDatasetIdsVisited.contains(dsId)) {
        inputDatasetIds.enqueue(dsId)
        inputDatasetIdsVisited += dsId
      }
    }

    def enqueueOutput(dsId: UUID): Unit = outputDatasetIds.synchronized {
      if (!outputDatasetIdsVisited.contains(dsId)) {
        outputDatasetIds.enqueue(dsId)
        outputDatasetIdsVisited += dsId
      }
    }

    def addVisitedComposite(dsId: UUID): Unit = outputDatasetIds.synchronized {
      outputDatasetIdsVisited += dsId
    }

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

    def traverseUp(dsId: UUID): Unit = {
      val fut = reader.loadCompositeByOutput(dsId)
      val cd = Await.result(fut, 10 seconds)
      if (cd.nonEmpty) {
        accumulateCompositeDependencies(cd.get)
        cd.get.composite.sources.foreach(c => {
          if (c.datasetId.nonEmpty) {
            enqueueOutput(c.datasetId.get)
          }
        })
        val dst = cd.get.composite.destination.datasetId
        if (dst.nonEmpty) {
          enqueueInput(dst.get)
        }
      }
    }

    def traverseDown(dsId: UUID): Unit = {
      val fut = reader.loadCompositesByInput(dsId)
      val cds = Await.result(fut, 10 seconds)
      if (cds.nonEmpty) {
        for (cd <- cds) {
          accumulateCompositeDependencies(cd)
          cd.composite.sources.foreach(c => {
            if (c.datasetId.nonEmpty) {
              enqueueOutput(c.datasetId.get)
            }
          })
          if (cd.composite.destination.datasetId.nonEmpty) {
            enqueueInput(cd.composite.destination.datasetId.get)
          }
        }
      }
    }

    enqueueOutput(datasetId)

    while (inputDatasetIds.nonEmpty || outputDatasetIds.nonEmpty) {
      var dsId: Option[UUID] = None
      inputDatasetIds.synchronized {
        if (inputDatasetIds.nonEmpty) {
          dsId = Some(inputDatasetIds.dequeue())
        }
      }
      if (dsId.nonEmpty) {
        traverseDown(dsId.get)
        dsId = None
      }

      outputDatasetIds.synchronized {
        if (outputDatasetIds.nonEmpty) {
          dsId = Some(outputDatasetIds.dequeue())
        }
      }
      if (dsId.nonEmpty) {
        traverseUp(dsId.get)
        dsId = None
      }
    }

    val dataLineage: DataLineage = DataLineage("appId", "appName", 0, operations.toSeq, datasets.toSeq, attributes.toSeq)

    Future.successful(dataLineage)
  }

}
