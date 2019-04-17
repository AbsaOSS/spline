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

package za.co.absa.spline.persistence.mongo.dao

import java.util.Arrays._
import java.util.UUID

import com.mongodb.casbah.AggregationOptions.{default => aggOpts}
import com.mongodb.casbah.Imports._
import com.mongodb.{Cursor, DBCollection}
import org.slf4s.Logging
import za.co.absa.spline.common.ARM._
import za.co.absa.spline.common.UUIDExtractors.UUIDExtractor
import za.co.absa.spline.model.DataLineageId
import za.co.absa.spline.persistence.api.CloseableIterable
import za.co.absa.spline.persistence.api.DataLineageReader.{IntervalPageRequest, PageRequest, Timestamp}
import za.co.absa.spline.persistence.mongo.MongoImplicits._
import za.co.absa.spline.persistence.mongo.dao.BaselineLineageDAO.Component
import za.co.absa.spline.persistence.mongo.dao.BaselineLineageDAO.Component.SubComponent
import za.co.absa.spline.persistence.mongo.dao.BaselineLineageDAO.NON_WORD_CHAR
import za.co.absa.spline.persistence.mongo.{DBCursorToCloseableIterableAdapter, MongoConnection}

import scala.collection.JavaConverters._
import scala.concurrent.{ExecutionContext, Future, blocking}
import scala.util.matching.Regex.quoteReplacement

abstract class BaselineLineageDAO extends VersionedLineageDAO with Logging {

  import za.co.absa.spline.persistence.mongo.dao.BaselineLineageDAO.DBOFields._

  val connection: MongoConnection

  protected lazy val subComponents: Seq[SubComponent] = SubComponent.values

  protected lazy val dataLineageCollection: DBCollection = getMongoCollectionForComponent(Component.Root)
  protected lazy val operationCollection: DBCollection = getMongoCollectionForComponent(Component.Operation)

  override def save(lineage: DBObject)(implicit e: ExecutionContext): Future[Unit] = {
    val lineageId = lineage.get(idField).toString
    val subComponentsPropNames = subComponents.map(_.name).toSet
    val rootComponentPropNames = lineage.keySet.asScala -- subComponentsPropNames

    def saveSubComponent(comp: SubComponent) = Future {
      val items = lineage.get(comp.name).asInstanceOf[Seq[DBObject]]
      val augmentedItems = items.view.zipWithIndex.map { case (item, i) =>
        item.put(lineageIdField, lineageId)
        item.put(indexField, i)
        item
      }
      if (augmentedItems.isEmpty)
        Future.successful({})
      else blocking {
        getMongoCollectionForComponent(comp).insert(augmentedItems.asJava)
      }
    }


    for (_ <- Future.traverse(subComponents)(saveSubComponent))
      yield {
        val rootProps = lineage.filterKeys(rootComponentPropNames)
        val rootItem = new BasicDBObject(rootProps.asJava)
        dataLineageCollection.insert(asList(rootItem))
      }
  }

  override def saveProgress(progressDBObject: ProgressDBObject)(implicit e: ExecutionContext): Future[Unit] =
    throw new UnsupportedOperationException("saveProgress method is supported only for DAO v5+.")

  /**
    * The method loads a particular data lineage from the persistence layer.
    *
    * @param dsId An unique identifier of a data lineage
    * @return A data lineage instance when there is a data lineage with a given id in the persistence layer, otherwise None
    */
  override def loadByDatasetId(dsId: UUID, overviewOnly: Boolean)(implicit ec: ExecutionContext): Future[Option[DBObject]] = {
    val lineageId = DataLineageId.fromDatasetId(dsId)
    val maybeLineage = Option(blocking(dataLineageCollection findOne lineageId))

    Future
      .traverse(maybeLineage.toList)(addComponents(_, overviewOnly))
      .map(_.headOption)
  }

  protected def addComponents(rootComponentDBO: DBObject, overviewOnly: Boolean)(implicit ec: ExecutionContext): Future[DBObject] = {
    val lineageId = rootComponentDBO(idField).toString

    val componentFilter = if (overviewOnly) overviewComponentFilter else PartialFunction.empty

    def readLinkedComponent(comp: SubComponent): Future[BasicDBList] = Future {
      val componentQuery =
        (lineageIdField $eq lineageId) ++
          componentFilter.applyOrElse(comp, Function.const(DBObject.empty))
      new BasicDBList {
        addAll(blocking {
          getMongoCollectionForComponent(comp)
            .find(componentQuery,
              DBObject(indexField → 0, lineageIdField → 0))
            .sort(
              DBObject(indexField → 1))
            .toArray
        })
      }
    }

    val eventualSubComponents =
      Future.sequence(subComponents.map(comp => {
        readLinkedComponent(comp).map(comp -> _)
      }))

    for (subComponents <- eventualSubComponents.map(_.toMap))
      yield {
        val subEntries = subComponents.map({ case (subComp, dbos) => subComp.name -> dbos })
        MongoDBObject(rootComponentDBO.toList ++ subEntries)
      }
  }

  protected def overviewComponentFilter: PartialFunction[SubComponent, DBObject] = PartialFunction.empty

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

    using(blocking(dataLineageCollection.aggregate(aggregationQuery, aggOpts))) {
      cursor =>
        if (cursor.hasNext) Some(cursor.next.get("datasetId").asInstanceOf[UUID])
        else None
    }
  }

  override def getLastOverwriteTimestampIfExists(path: String)(implicit ec: ExecutionContext): Future[Option[Timestamp]] =
    Future {
      using(
        blocking(
          dataLineageCollection.aggregate(
            asList(
              DBObject("$match" → DBObject(
                "rootOperation.path" → path,
                "rootOperation.append" → false)),
              DBObject("$project" → DBObject("timestamp" → 1)),
              DBObject("$sort" → DBObject("timestamp" → -1)),
              DBObject("$limit" → 1)),
            aggOpts))) {
        timestampCursor =>
          if (timestampCursor.hasNext) Some(timestampCursor.next.get("timestamp").asInstanceOf[Timestamp])
          else None
      }
    }

  override def findDatasetIdsByPathSince(path: String, since: Timestamp)(implicit ec: ExecutionContext): Future[CloseableIterable[UUID]] =
    Future {
      val lineageCursor = blocking(
        dataLineageCollection.aggregate(
          asList(
            DBObject("$match" → (DBObject(
              "rootOperation.path" → path)
              ++
              ("timestamp" $gte since))),
            DBObject("$sort" → DBObject("timestamp" → +1))),
          aggOpts))

      new DBCursorToCloseableIterableAdapter(lineageCursor).
        flatMap(_.getAs[UUID]("rootDataset._id"))
    }

  /**
    * The method loads composite operations for an input datasetId.
    *
    * @param datasetId A dataset ID for which the operation is looked for
    * @return Composite operations with dependencies satisfying the criteria
    */
  override def findByInputId(datasetId: UUID, overviewOnly: Boolean)(implicit ec: ExecutionContext): Future[CloseableIterable[DBObject]] = {
    val eventualOperations = Future(blocking(operationCollection.find(DBObject("sources.datasetsIds" → datasetId))))

    import scala.collection.convert.WrapAsScala.asScalaIterator

    for {
      opCursor <- eventualOperations
      opIter = opCursor.iterator
      lineageIds = opIter.map(_.get(lineageIdField).asInstanceOf[String]).toSet
      maybeLineages <- Future.traverse[String, Option[DBObject], Iterator](lineageIds.iterator) {
        lineageId => {
          val datasetId = DataLineageId.toDatasetId(lineageId)
          loadByDatasetId(datasetId, overviewOnly)
        }
      }
    } yield
      new CloseableIterable(maybeLineages.flatten, opCursor.close())
  }

  override def findDatasetDescriptors(maybeText: Option[String], intervalRequest: IntervalPageRequest)
                          (implicit ec:  ExecutionContext): Future[CloseableIterable[DescriptorDBObject]] =
    Future.successful(CloseableIterable.empty[DescriptorDBObject])

  override def findDatasetDescriptors(maybeText: Option[String], pageRequest: PageRequest)
                          (implicit ec: ExecutionContext): Future[CloseableIterable[DescriptorDBObject]] =
    Future {
      val cursor = selectPersistedDatasets(
        DBObject("$match" → getDatasetDescriptorSearchQuery(maybeText, pageRequest.asAtTime)),
        DBObject("$sort" → DBObject("timestamp" → -1, "rootDataset._id" → 1)),
        DBObject("$skip" → pageRequest.offset),
        DBObject("$limit" → pageRequest.size)
      )
      new DBCursorToCloseableIterableAdapter(cursor).map(new DescriptorDBObject(_))
  }

  override def countDatasetDescriptors(maybeText: Option[String], asAtTime: Timestamp)(implicit ec: ExecutionContext): Future[Int] =
    Future {
      val query = getDatasetDescriptorSearchQuery(maybeText, asAtTime)
      blocking(dataLineageCollection.count(query).toInt)
    }

  private def getDatasetDescriptorSearchQuery(maybeText: Option[String], asAtTime: Timestamp) = {
    val paginationDeduplicationCriteria: Seq[DBObject] = Seq(
      "timestamp" $lte asAtTime
    )
    val optionalTextSearchCriterion = maybeText map {
      text =>
        val regexMatchOnFieldsCriteria = Seq("appId", "appName", "rootOperation.path") map (_ $regex quoteSafely(text) $options "i")
        val optDatasetIdMatchCriterion = UUIDExtractor unapply text.toLowerCase map (uuid => DBObject("rootDataset._id" → uuid))
        $or(regexMatchOnFieldsCriteria ++ optDatasetIdMatchCriterion)
    }
    $and(paginationDeduplicationCriteria ++ optionalTextSearchCriterion)
  }

  /**
    * Escape special characters in a regular expression.
    * Does not use Pattern.quote() for Cosmos DB compatibility.
    * @see <a href="https://github.com/AbsaOSS/spline/issues/166">issue #166</a>
    *
    * @param text A string
    * @return A regular expression searching for the exact literal text string
    */
  private def quoteSafely(text: String): String = {
    NON_WORD_CHAR.replaceAllIn(text, m => s"\\\\${quoteReplacement(m.matched)}")
  }

  /**
    * The method returns a dataset descriptor by its ID.
    *
    * @param id An unique identifier of a dataset
    * @return Descriptors of all data lineages
    */
  override def getDatasetDescriptor(id: UUID)(implicit ec: ExecutionContext): Future[Option[DescriptorDBObject]] = Future {
    using(selectPersistedDatasets(DBObject("$match" → DBObject("rootDataset._id" → id)))) {
      cursor =>
        if (cursor.hasNext) Some(DescriptorDBObject(cursor.next))
        else None
    }
  }

  protected def selectPersistedDatasets(queryPipeline: DBObject*): Cursor = {
    val projectionPipeline: Seq[DBObject] = Seq(
      DBObject("$addFields" → DBObject(
        "datasetId" → "$rootDataset._id",
        "path" → "$rootOperation.path"
      )),
      DBObject("$project" → DBObject(persistedDatasetDescriptorFields.map(_ -> 1): _*))
    )
    val pipeline = (queryPipeline ++ projectionPipeline).asJava
    blocking(
      dataLineageCollection.
        aggregate(pipeline, aggOpts))
  }


  override def getLineagesByPathAndInterval(path: String, start: Long, end: Long)
                         (implicit ex: ExecutionContext): Future[CloseableIterable[DBObject]] =
    Future.successful(CloseableIterable.empty)

  private val persistedDatasetDescriptorFields =
    Seq("datasetId", "appId", "appName", "path", "timestamp")

  protected def getMongoCollectionForComponent(component: Component): DBCollection =
    connection.db.getCollection(getMongoCollectionNameForComponent(component))

  protected def getMongoCollectionNameForComponent(component: Component): String =
    s"${component.name}_v$version"
}

object BaselineLineageDAO {

  final val NON_WORD_CHAR = "\\W".r

  abstract class Component(val name: String)

  object Component {

    trait SubComponent extends Component

    object SubComponent {
      val values = Seq(Component.Operation, Component.Dataset, Component.Attribute)
    }

    case object Root extends Component("lineages")

    case object Operation extends Component("operations") with SubComponent

    case object Dataset extends Component("datasets") with SubComponent

    case object Attribute extends Component("attributes") with SubComponent

  }

  object DBOFields {
    val lineageIdField = "_lineageId"
    val idField = "_id"
    val indexField = "_index"
  }

}
