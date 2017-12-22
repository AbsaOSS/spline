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

import java.util.Arrays._
import java.util.UUID
import java.{util => ju}

import _root_.salat._
import com.mongodb.Cursor
import com.mongodb.casbah.AggregationOptions.{default => aggOpts}
import com.mongodb.casbah.Imports._
import za.co.absa.spline.model.op._
import za.co.absa.spline.model.{DataLineage, DataLineageId, PersistedDatasetDescriptor}
import za.co.absa.spline.persistence.api.{CloseableIterable, DataLineageReader}

import scala.collection.JavaConverters._
import scala.concurrent.{ExecutionContext, Future, blocking}

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
    * @param dsId An unique identifier of a data lineage
    * @return A data lineage instance when there is a data lineage with a given id in the persistence layer, otherwise None
    */
  override def loadByDatasetId(dsId: UUID)(implicit ec: ExecutionContext): Future[Option[DataLineage]] =
    Future {
      val dbo = blocking {
        val lineageId = DataLineageId.fromDatasetId(dsId)
        connection.dataLineageCollection findOne lineageId
      }
      Option(dbo) map withVersionCheck(grater[DataLineage].asObject(_))
    }


  /**
    * The method scans the persistence layer and tries to find a dataset ID for a given path and application ID.
    *
    * @param path          A path for which a dataset ID is looked for
    * @param applicationId An application for which a dataset ID is looked for
    * @return An identifier of a meta data set
    */
  override def searchDataset(path: String, applicationId: String)(implicit ec: ExecutionContext): Future[Option[UUID]] = Future {
    val aggregationQuery = asList(
      DBObject("$match" → DBObject("operations.0.path" → path, "appId" → applicationId)),
      DBObject("$addFields" → DBObject("___rootDS" → DBObject("$arrayElemAt" → Array("$datasets", 0)))),
      DBObject("$addFields" → DBObject("datasetId" → "$___rootDS._id")),
      DBObject("$project" → DBObject("datasetId" → 1)))

    import za.co.absa.spline.common.ARMImplicits._
    for (cursor <- blocking(connection.dataLineageCollection.aggregate(aggregationQuery, aggOpts)))
      yield
        if (cursor.hasNext) Some(cursor.next.get("datasetId").asInstanceOf[UUID])
        else None

  }

  /**
    * The method loads the latest data lineage from the persistence for a given path.
    *
    * @param path A path for which a lineage graph is looked for
    * @return The latest data lineage
    */
  override def loadLatest(path: String)(implicit ec: ExecutionContext): Future[Option[DataLineage]] = Future {
    val dbo = blocking {
      connection.dataLineageCollection.findOne(
        DBObject("operations.0.path" → path),
        DBObject(),
        DBObject("timestamp" → -1))
    }
    Option(dbo) map withVersionCheck(grater[DataLineage].asObject(_))
  }

  private def lineageToCompositeWithDependencies(dataLineage: DataLineage): CompositeWithDependencies = {
    def castIfRead(op: Operation): Option[Read] = op match {
      case a@Read(_, _, _) => Some(a)
      case _ => None
    }

    val inputSources: Seq[TypedMetaDataSource] = for {
      read <- dataLineage.operations.flatMap(castIfRead)
      source <- read.sources
    } yield TypedMetaDataSource(read.sourceType, source.path, source.datasetId)

    val outputWriteOperation = dataLineage.rootOperation.asInstanceOf[Write]
    val outputSource = TypedMetaDataSource(outputWriteOperation.destinationType, outputWriteOperation.path, Some(outputWriteOperation.mainProps.output))

    val inputDatasetIds = inputSources.flatMap(_.datasetId)
    val outputDatasetId = dataLineage.rootDataset.id
    val datasetIds = outputDatasetId +: inputDatasetIds

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
    *
    * @param datasetId A dataset ID for which the operation is looked for
    * @return A composite operation with dependencies satisfying the criteria
    */
  override def loadCompositeByOutput(datasetId: UUID)(implicit ec: ExecutionContext): Future[Option[CompositeWithDependencies]] = Future {
    val dbo = blocking {
      connection.dataLineageCollection findOne DBObject("datasets.0._id" → datasetId)
    }
    Option(dbo)
      .map(withVersionCheck(grater[DataLineage].asObject(_)))
      .map(lineageToCompositeWithDependencies)
  }

  /**
    * The method loads composite operations for an input datasetId.
    *
    * @param datasetId A dataset ID for which the operation is looked for
    * @return Composite operations with dependencies satisfying the criteria
    */
  override def loadCompositesByInput(datasetId: UUID)(implicit ec: ExecutionContext): Future[CloseableIterable[CompositeWithDependencies]] = Future {
    val cursor = blocking(connection.dataLineageCollection find DBObject("operations.sources.datasetId" → datasetId))

    new CloseableIterable[CompositeWithDependencies](
      cursor.iterator.asScala
        .map(withVersionCheck(grater[DataLineage].asObject(_)))
        .map(lineageToCompositeWithDependencies),
      cursor.close())
  }

  /**
    * The method gets all data lineages stored in persistence layer.
    *
    * @return Descriptors of all data lineages
    */
  override def list()(implicit ec: ExecutionContext): Future[CloseableIterable[PersistedDatasetDescriptor]] = Future {
    val cursor = selectPersistedDatasets()
    new CloseableIterable[PersistedDatasetDescriptor](
      (cursor: ju.Iterator[DBObject]).asScala.map(withVersionCheck(grater[PersistedDatasetDescriptor].asObject(_))),
      cursor.close())
  }

  private def selectPersistedDatasets(extraPipeline: DBObject*): Cursor = {
    val basicPipeline: Seq[DBObject] = Seq(
      DBObject("$addFields" → DBObject(
        "___rootDS" → DBObject("$arrayElemAt" → Array("$datasets", 0)),
        "___rootOP" → DBObject("$arrayElemAt" → Array("$operations", 0))
      )),
      DBObject("$addFields" → DBObject(
        "datasetId" → "$___rootDS._id",
        "path" → "$___rootOP.path"
      )),
      DBObject("$project" → DBObject(persistedDatasetDescriptorFields: _*))
    )
    blocking(
      connection.dataLineageCollection.
        aggregate((basicPipeline ++ extraPipeline).asJava, aggOpts))
  }

  /**
    * The method returns a dataset descriptor by its ID.
    *
    * @param id An unique identifier of a dataset
    * @return Descriptors of all data lineages
    */
  override def getDatasetDescriptor(id: UUID)(implicit ec: ExecutionContext): Future[PersistedDatasetDescriptor] = Future {
    import za.co.absa.spline.common.ARMImplicits._
    for (cursor <- selectPersistedDatasets(DBObject("$match" → DBObject("datasetId" → id))))
      yield withVersionCheck(grater[PersistedDatasetDescriptor].asObject(_))(cursor.next)
  }

  private def withVersionCheck[T](f: DBObject => T): DBObject => T =
    dbo => (dbo get "_ver").asInstanceOf[Int] match {
      case connection.LATEST_SERIAL_VERSION => f(dbo)
      case unknownVersion => sys.error(s"Unsupported serialized lineage version: $unknownVersion")
    }

  private val persistedDatasetDescriptorFields = {
    val caseClassFields = classOf[PersistedDatasetDescriptor].getDeclaredFields map (_.getName)
    val auxiliaryFields = Array("_ver")
    caseClassFields ++ auxiliaryFields map (_ -> 1)
  }
}
