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

package za.co.absa.spline.persistence.mongo.dao

import java.util.Arrays._
import java.util.UUID
import java.util.regex.Pattern.quote

import com.mongodb.casbah.AggregationOptions.{default => aggOpts}
import com.mongodb.casbah.Imports._
import com.mongodb.casbah.query.dsl.QueryExpressionObject
import com.mongodb.{Cursor, DBCollection}
import org.slf4s.Logging
import za.co.absa.spline.common.ARM._
import za.co.absa.spline.common.UUIDExtractors.UUIDExtractor
import za.co.absa.spline.model.DataLineageId
import za.co.absa.spline.persistence.api.CloseableIterable
import za.co.absa.spline.persistence.api.DataLineageReader.{PageRequest, Timestamp}
import za.co.absa.spline.persistence.mongo.MongoImplicits._
import za.co.absa.spline.persistence.mongo.dao.BaselineLineageDAO.Component
import za.co.absa.spline.persistence.mongo.dao.BaselineLineageDAO.Component.SubComponent
import za.co.absa.spline.persistence.mongo.{DBCursorToCloseableIterableAdapter, MongoConnection}

import scala.collection.JavaConverters._
import scala.concurrent.{ExecutionContext, Future, blocking}

abstract class BaselineLineageDAO extends VersionedLineageDAO with Logging {

  import za.co.absa.spline.persistence.mongo.dao.BaselineLineageDAO.DBOFields._

  val connection: MongoConnection

  protected lazy val subComponents: Seq[SubComponent] = SubComponent.values

  protected lazy val dataLineageCollection: DBCollection = getMongoCollectionForComponent(Component.Root)
  protected lazy val operationCollection: DBCollection = getMongoCollectionForComponent(Component.Operation)

  override def save(lineage: DBObject)(implicit e: ExecutionContext): Future[Unit] = {
    lineage.put("rootOperation", lineage.get(Component.Operation.name).asInstanceOf[Seq[DBObject]].head)
    lineage.put("rootDataset", lineage.get(Component.Dataset.name).asInstanceOf[Seq[DBObject]].head)

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
        val rootItem: MongoDBObject = new BasicDBObject(rootProps.asJava)
        dataLineageCollection.insert(rootItem)
      }
  }

  /**
    * The method loads a particular data lineage from the persistence layer.
    *
    * @param dsId An unique identifier of a data lineage
    * @return A data lineage instance when there is a data lineage with a given id in the persistence layer, otherwise None
    */
  override def loadByDatasetId(dsId: UUID)(implicit ec: ExecutionContext): Future[Option[DBObject]] = {
    val lineageId = DataLineageId.fromDatasetId(dsId)
    val maybeLineage = Option(blocking(dataLineageCollection findOne lineageId))

    Future
      .traverse(maybeLineage.toList)(addComponents)
      .map(_.headOption)
  }

  protected def addComponents(rootComponentDBO: DBObject)(implicit ec: ExecutionContext): Future[DBObject] = {
    def readLinkedComponent(dBCollection: DBCollection, lineageId: String): Future[BasicDBList] = Future {
      new BasicDBList {
        addAll(blocking {
          dBCollection
            .find(inLineageOp(lineageId))
            .sort(sortByIndex).toArray
        })
      }
    }

    def inLineageOp(lineageId: String): DBObject with QueryExpressionObject = lineageIdField $eq lineageId

    def sortByIndex: DBObject = MongoDBObject(indexField → 1)

    val eventualSubComponents =
      Future.sequence(subComponents.map(comp =>
        readLinkedComponent(
          getMongoCollectionForComponent(comp),
          rootComponentDBO(idField).toString)
          .map(comp -> _)))

    for (subComponents <- eventualSubComponents.map(_.toMap))
      yield {
        val subEntries = subComponents.map({ case (subComp, dbos) => subComp.name -> dbos })
        MongoDBObject(rootComponentDBO.toList ++ subEntries)
      }
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
  override def findByInputId(datasetId: UUID)(implicit ec: ExecutionContext): Future[CloseableIterable[DBObject]] = {
    val eventualCursor = Future(blocking(operationCollection.find(DBObject("sources.datasetsIds" → datasetId))))

    import scala.collection.convert.WrapAsScala.asScalaIterator

    for {
      cursor <- eventualCursor
      maybeLineages <- Future.traverse[DBObject, Option[DBObject], Iterator](cursor.iterator()) {
        dBObject => {
          val refLineageId = dBObject.get(lineageIdField).asInstanceOf[String]
          val refDatasetId = DataLineageId.toDatasetId(refLineageId)
          loadByDatasetId(refDatasetId)
        }
      }
    } yield
      new CloseableIterable(maybeLineages.flatten, cursor.close())
  }

  /**
    * The method gets all data lineages stored in persistence layer.
    *
    * @return Descriptors of all data lineages
    */
  override def findDatasetDescriptors(maybeText: Option[String], pageRequest: PageRequest)
                                     (implicit ec: ExecutionContext): Future[CloseableIterable[DBObject]] =
    Future {
      val cursor = selectPersistedDatasets(
        DBObject("$match" → getDatasetDescriptorSearchQuery(maybeText, pageRequest.asAtTime)),
        DBObject("$sort" → DBObject("timestamp" → -1, "rootDataset._id" → 1)),
        DBObject("$skip" → pageRequest.offset),
        DBObject("$limit" → pageRequest.size)
      )
      new DBCursorToCloseableIterableAdapter(cursor)
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
        val regexMatchOnFieldsCriteria = Seq("appId", "appName", "rootOperation.path") map (_ $regex quote(text) $options "i")
        val optDatasetIdMatchCriterion = UUIDExtractor unapply text.toLowerCase map (uuid => DBObject("rootDataset._id" → uuid))
        $or(regexMatchOnFieldsCriteria ++ optDatasetIdMatchCriterion)
    }
    $and(paginationDeduplicationCriteria ++ optionalTextSearchCriterion)
  }

  /**
    * The method returns a dataset descriptor by its ID.
    *
    * @param id An unique identifier of a dataset
    * @return Descriptors of all data lineages
    */
  override def getDatasetDescriptor(id: UUID)(implicit ec: ExecutionContext): Future[Option[DBObject]] = Future {
    using(selectPersistedDatasets(DBObject("$match" → DBObject("rootDataset._id" → id)))) {
      cursor =>
        if (cursor.hasNext) Some(cursor.next)
        else None
    }
  }

  private def selectPersistedDatasets(queryPipeline: DBObject*): Cursor = {
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

  private val persistedDatasetDescriptorFields =
    Seq("datasetId", "appId", "appName", "path", "timestamp")

  private def getMongoCollectionForComponent(component: Component): DBCollection =
    connection.db.getCollection(getMongoCollectionNameForComponent(component))

  protected def getMongoCollectionNameForComponent(component: Component): String =
    s"${component.name}_v$version"
}

object BaselineLineageDAO {

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

  private object DBOFields {
    val lineageIdField = "_lineageId"
    val idField = "_id"
    val indexField = "_index"
  }

}


