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

import java.util.UUID

import com.mongodb.DBCollection
import com.mongodb.casbah.Imports.{DBObject, MongoDBObject, _}
import com.mongodb.casbah.query.dsl.QueryExpressionObject
import za.co.absa.spline.model.dt.DataType
import za.co.absa.spline.model.op.{Operation, Projection}
import za.co.absa.spline.model.{Attribute, DataLineage, DataLineageId, MetaDataset}
import za.co.absa.spline.persistence.mongo.DBSchemaVersionHelper.deserializeWithVersionCheck
import za.co.absa.spline.persistence.mongo.MongoDataLineageWriter.{indexField, lineageIdField}

import scala.collection.JavaConverters._
import scala.concurrent.{ExecutionContext, Future, blocking}


class DataLineagePOReader(connection: MongoConnection) {

  import connection._

  def loadByDatasetId(dsId: UUID)(implicit ec: ExecutionContext): Option[DataLineagePO] = {
    val lineageId = DataLineageId.fromDatasetId(dsId)
    Option(blocking(dataLineageCollection findOne lineageId))
      .map(deserializeWithVersionCheck[DataLineagePO])
  }

  def enrichWithLinked(dataLineagePO: DataLineagePO)(implicit ec: ExecutionContext): Future[DataLineage] = {
    for {
      datasets <- findLineageLinked[MetaDataset](datasetCollection, dataLineagePO)
      operations <- findLineageLinked[Operation](operationCollection, dataLineagePO)
      transformationPOs <- findLineageLinked[TransformationPO](transformationCollection, dataLineagePO)
      attributes <- findLineageLinked[Attribute](attributeCollection, dataLineagePO)
      dataTypes <- findLineageLinked[DataType](dataTypeCollection, dataLineagePO)
    } yield {
      val transformationsByOperationId = transformationPOs.groupBy(_.opId).mapValues(_.map(_.expr))
      val enrichedOperations = operations.map {
        case op@Projection(_, Nil) => op.copy(transformations = transformationsByOperationId(op.mainProps.id))
        case op => op
      }
      dataLineagePO.toDataLineage(enrichedOperations, datasets, attributes, dataTypes)
    }
  }

  private def findLineageLinked[Y <: scala.AnyRef](dBCollection: DBCollection, truncatedDataLineage: DataLineagePO)(implicit m: scala.Predef.Manifest[Y], ec: ExecutionContext): Future[Seq[Y]] =
    Future {
      blocking(dBCollection.find(inLineageOp(truncatedDataLineage)).sort(sortByIndex))
        .toArray.asScala.map(deserializeWithVersionCheck[Y])
    }

  def inLineageOp(truncatedDataLineage: DataLineagePO): DBObject with QueryExpressionObject =
    lineageIdField $eq truncatedDataLineage.id

  def sortByIndex: DBObject = MongoDBObject(indexField → 1)
}
