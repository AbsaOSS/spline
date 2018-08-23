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
import java.util.regex.Pattern.quote

import _root_.salat._
import com.mongodb.{Cursor, DBCursor}
import com.mongodb.casbah.AggregationOptions.{default => aggOpts}
import com.mongodb.casbah.Imports._
import org.slf4s.Logging
import za.co.absa.spline.common.UUIDExtractors.UUIDExtractor
import za.co.absa.spline.model._
import za.co.absa.spline.persistence.api.DataLineageReader.PageRequest
import za.co.absa.spline.persistence.api.{CloseableIterable, DataLineageReader}
import za.co.absa.spline.persistence.mongo.DBSchemaVersionHelper._
import za.co.absa.spline.persistence.mongo.MongoDataLineageWriter._
import za.co.absa.spline.persistence.mongo.MongoImplicits._

import scala.collection.JavaConverters._
import scala.concurrent.{ExecutionContext, Future, blocking}

/**
  * The class represents Mongo persistence writer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
  *
  * @param connection A connection to Mongo database
  */
class MongoDataLineageReader(connection: MongoConnection) extends DataLineageReader with Logging {

  import connection._
  import za.co.absa.spline.persistence.mongo.serialization.BSONSalatContext._

  private val truncatedDataLineageReader = new TruncatedDataLineageReader(connection)

  /**
    * The method loads a particular data lineage from the persistence layer.
    *
    * @param dsId An unique identifier of a data lineage
    * @return A data lineage instance when there is a data lineage with a given id in the persistence layer, otherwise None
    */
  override def loadByDatasetId(dsId: UUID)(implicit ec: ExecutionContext): Future[Option[DataLineage]] = {
    val maybeEventualLineage = truncatedDataLineageReader
      .loadByDatasetId(dsId)
      .map(truncatedDataLineageReader.enrichWithLinked)
    Future.sequence(Option.option2Iterable(maybeEventualLineage))
      .map(_.headOption)
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
      DBObject("$match" → DBObject("rootOperation.path" → path, "appId" → applicationId)),
      DBObject("$addFields" → DBObject("datasetId" → "$rootDataset._id")),
      DBObject("$project" → DBObject("datasetId" → 1)))

    import za.co.absa.spline.common.ARMImplicits._
    for (cursor <- blocking(dataLineageCollection.aggregate(aggregationQuery, aggOpts)))
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
  override def findLatestDatasetIdsByPath(path: String)(implicit ec: ExecutionContext): Future[CloseableIterable[UUID]] =
    Future {
      import za.co.absa.spline.common.ARMImplicits._

      val lastOverwriteTimestampIfExists: Option[Long] =
        for (timestampCursor <- blocking(
          dataLineageCollection.aggregate(
            asList(
              DBObject("$match" → DBObject(
                "rootOperation.path" → path,
                "rootOperation.append" → false)),
              DBObject("$project" → DBObject("timestamp" → 1)),
              DBObject("$sort" → DBObject("timestamp" → -1)),
              DBObject("$limit" → 1)),
            aggOpts))
        ) yield
          if (timestampCursor.hasNext) Some(timestampCursor.next.get("timestamp").asInstanceOf[Long])
          else None

      val lineageCursor = blocking(
        dataLineageCollection.aggregate(
          asList(
            DBObject("$match" → (DBObject(
              "rootOperation.path" → path)
              ++
              ("timestamp" $gte (lastOverwriteTimestampIfExists getOrElse 0L)))),
            DBObject("$sort" → DBObject("timestamp" → +1))),
          aggOpts))

      val dsIdIterator = lineageCursor.asScala
        .map(deserializeWithVersionCheck[TruncatedDataLineage])
        .map(_.rootDataset.id)

      new CloseableIterable[UUID](
        iterator = dsIdIterator,
        closeFunction = lineageCursor.close())
    }

  /**
    * The method loads composite operations for an input datasetId.
    *
    * @param datasetId A dataset ID for which the operation is looked for
    * @return Composite operations with dependencies satisfying the criteria
    */
  override def findByInputId(datasetId: UUID)(implicit ec: ExecutionContext): Future[CloseableIterable[DataLineage]] =
    Future(blocking(operationCollection.find(DBObject("sources.datasetsIds" → datasetId)))) flatMap {
      cursor => {
        val eventualMaybeLineages =
          cursor.asScala
            .map(versionCheck)
            .map(dBObject => {
              val refLineageId = dBObject.get(lineageIdField).asInstanceOf[String]
              val refDatasetId = DataLineageId.toDatasetId(refLineageId)
              loadByDatasetId(refDatasetId)
            })

        val eventualLineages = Future.sequence(eventualMaybeLineages).map(_.flatten)

        eventualLineages.map(lineages => new CloseableIterable[DataLineage](iterator = lineages, closeFunction = cursor.close()))
      }
    }

  /**
    * The method gets all data lineages stored in persistence layer.
    *
    * @return Descriptors of all data lineages
    */
  override def findDatasets(maybeText: Option[String], pageRequest: PageRequest)
                           (implicit ec: ExecutionContext): Future[CloseableIterable[PersistedDatasetDescriptor]] = Future {
    val paginationDeduplicationCriteria: Seq[DBObject] = Seq(
      "timestamp" $lte pageRequest.asAtTime
    )

    val optionalTextSearchCriterion = maybeText map {
      text =>
        val regexMatchOnFieldsCriteria = Seq("appId", "appName", "rootOperation.path") map (_ $regex quote(text) $options "i")
        val optDatasetIdMatchCriterion = UUIDExtractor unapply text.toLowerCase map (uuid => DBObject("rootDataset._id" → uuid))
        $or(regexMatchOnFieldsCriteria ++ optDatasetIdMatchCriterion)
    }

    val cursor = selectPersistedDatasets(
      DBObject("$match" → $and(paginationDeduplicationCriteria ++ optionalTextSearchCriterion)),
      DBObject("$sort" → DBObject("timestamp" → -1, "rootDataset._id" → 1)),
      DBObject("$skip" → pageRequest.offset),
      DBObject("$limit" → pageRequest.size)
    )

    new DBCursorToCloseableIterableAdapter[PersistedDatasetDescriptor](cursor)
  }

  private def selectPersistedDatasets(queryPipeline: DBObject*): Cursor = {
    val projectionPipeline: Seq[DBObject] = Seq(
      DBObject("$addFields" → DBObject(
        "datasetId" → "$rootDataset._id",
        "path" → "$rootOperation.path"
      )),
      DBObject("$project" → DBObject(persistedDatasetDescriptorFields: _*))
    )
    val pipeline = (queryPipeline ++ projectionPipeline).asJava
    blocking(
      dataLineageCollection.
        aggregate(pipeline, aggOpts))
  }

  /**
    * The method returns a dataset descriptor by its ID.
    *
    * @param id An unique identifier of a dataset
    * @return Descriptors of all data lineages
    */
  override def getDatasetDescriptor(id: UUID)(implicit ec: ExecutionContext): Future[PersistedDatasetDescriptor] = Future {
    import za.co.absa.spline.common.ARMImplicits._
    for (cursor <- selectPersistedDatasets(DBObject("$match" → DBObject("rootDataset._id" → id))))
      yield withVersionCheck(grater[PersistedDatasetDescriptor].asObject(_))(cursor.next)
  }

  private val persistedDatasetDescriptorFields = {
    val caseClassFields = classOf[PersistedDatasetDescriptor].getDeclaredFields map (_.getName)
    val auxiliaryFields = Array("_ver")
    caseClassFields ++ auxiliaryFields map (_ -> 1)
  }

  override def getByDatasetIdsByPathAndInterval(path: String, start: Long, end: Long)(implicit ex: ExecutionContext): Future[CloseableIterable[UUID]] = {
    Future {
      val cursor: DBCursor = blocking(datasetCollection.find(DBObject("path" → path, "timestamp" → DBObject("$lt" → end, "$gt" → start))))
      val iterator = cursor.asScala.map(_.get(idField).asInstanceOf[UUID])
      new CloseableIterable[UUID](iterator = iterator, closeFunction = cursor.close())
    }
  }
}
