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

package za.co.absa.spline.persistence.mongo

import java.util.Arrays.asList
import java.util.UUID

import _root_.salat._
import com.mongodb.casbah.Imports._
import za.co.absa.spline.common.FutureImplicits._
import za.co.absa.spline.model.op._
import za.co.absa.spline.model.{DataLineage, PersistedDatasetDescriptor}
import za.co.absa.spline.persistence.api.DataLineageReader

import scala.collection.JavaConverters._
import scala.concurrent.Future
import scala.reflect._

/**
  * The class represents Mongo persistence writer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
  *
  * @param connection A connection to Mongo database
  */
class MongoDataLineageReader(connection: MongoConnection) extends DataLineageReader {

  import za.co.absa.spline.persistence.mongo.serialization.BSONSalatContext._

  /**
    * The method loads a particular data lineage from the persistence layer.
    *
    * @param id An unique identifier of a data lineage
    * @return A data lineage instance when there is a data lineage with a given id in the persistence layer, otherwise None
    */
  override def load(id: UUID): Future[Option[DataLineage]] = Future {
    Option(connection.dataLineageCollection findOne id) map withVersionCheck(grater[DataLineage].asObject(_))
  }

  /**
    * The method loads the latest data lineage from the persistence for a given path.
    *
    * @param path A path for which a lineage graph is looked for
    * @return The latest data lineage
    */
  override def loadLatest(path: String): Future[Option[DataLineage]] = Future {
    Option(
      connection.dataLineageCollection.findOne(
        DBObject("operations.0.path" → path),
        DBObject(),
        DBObject("timestamp" → -1)
      )
    ) map withVersionCheck(grater[DataLineage].asObject(_))
  }

  private def getFieldsToFetch[T : ClassTag]() = {
    val caseClassFields = classTag[T].runtimeClass.getDeclaredFields map (_.getName)
    val auxiliaryFields = Array("_ver")
    val fieldsToFetch = caseClassFields ++ auxiliaryFields map (_ -> 1)
    fieldsToFetch
  }

  private def lineageToCompositeWithDependencies(dataLineage: DataLineage) : CompositeWithDependencies = {
    def castIfRead(op: Operation): Option[Read] = op match {
      case a@Read(_, _, _) => Some(a)
      case _ => None
    }
    val inputSources : Seq[TypedMetaDataSource] = for {
      read <- dataLineage.operations.flatMap(castIfRead)
      source <- read.sources
    } yield TypedMetaDataSource(read.sourceType, source.path, source.datasetId)

    val outputWriteOperation = dataLineage.rootOperation.asInstanceOf[Write]
    val outputSource  = TypedMetaDataSource(outputWriteOperation.destinationType, outputWriteOperation.path, Some(outputWriteOperation.mainProps.output))

    val inputDatasetIds = inputSources.flatMap(_.datasetId)
    val outputDatasetId = dataLineage.rootDataset.id
    val datasetIds = outputDatasetId +: inputDatasetIds

    val composite = Composite(
      mainProps = OperationProps(
        dataLineage.id,
        dataLineage.appName,
        inputDatasetIds,
        outputDatasetId
      ),
      sources = inputSources,
      destination = outputSource,
      dataLineage.id,
      dataLineage.timestamp,
      dataLineage.appId,
      dataLineage.appName
    )

    val datasets = dataLineage.datasets.filter(ds => datasetIds.contains(ds.id))
    val attributes = for {
      dataset <- datasets
      attributeId <- dataset.schema.attrs
      attribute <- dataLineage.attributes if attribute.id == attributeId
    } yield attribute

    CompositeWithDependencies(composite, datasets, attributes)
  }


  /**
    * The method loads a composite operation for an output datasetId.
    * @param datasetId A dataset ID for which the operation is looked for
    * @return A composite operation with dependencies satisfying the criteria
    */
  override def loadCompositeByOutput(datasetId : UUID): Future[Option[CompositeWithDependencies]] = Future{
    Option(
      connection.dataLineageCollection.findOne(
        DBObject("datasets.0._id" → datasetId)
      )
    )
    .map(withVersionCheck(grater[DataLineage].asObject(_)))
    .map(lineageToCompositeWithDependencies)
  }

  /**
    * The method loads composite operations for an input datasetId.
    * @param datasetId A dataset ID for which the operation is looked for
    * @return Composite operations with dependencies satisfying the criteria
    */
  override def loadCompositesByInput(datasetId : UUID): Future[Iterator[CompositeWithDependencies]] = Future{
    connection.dataLineageCollection.find(
      DBObject("operations.sources.datasetId" → datasetId)
    )
    .iterator.asScala
    .map(withVersionCheck(grater[DataLineage].asObject(_)))
    .map(lineageToCompositeWithDependencies)
  }

  /**
    * The method gets all data lineages stored in persistence layer.
    *
    * @return Descriptors of all data lineages
    */
  override def list(): Future[Iterator[PersistedDatasetDescriptor]] = Future {
    val fieldsToFetch = getFieldsToFetch[PersistedDatasetDescriptor]

    connection.dataLineageCollection
      .aggregate(asList(
        DBObject("$addFields" → DBObject(
          "___rootDS" → DBObject("$arrayElemAt" → Array("$datasets", 0)),
          "___rootOP" → DBObject("$arrayElemAt" → Array("$operations", 0))
        )),
        DBObject("$addFields" → DBObject(
          "lineageId" → "$_id",
          "datasetId" → "$___rootDS._id",
          "path" → "$___rootOP.path"
        )),
        DBObject("$project" → DBObject(fieldsToFetch: _*))
      ))
      .results.iterator.asScala
      .map(withVersionCheck(grater[PersistedDatasetDescriptor].asObject(_)))
  }

  private def withVersionCheck[T](f: DBObject => T): DBObject => T =
    dbo => (dbo get "_ver").asInstanceOf[Int] match {
      case connection.LATEST_SERIAL_VERSION => f(dbo)
      case unknownVersion => sys.error(s"Unsupported serialized lineage version: $unknownVersion")
    }
}
