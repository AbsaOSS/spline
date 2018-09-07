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


import com.mongodb.{DBCollection, DBObject}
import org.slf4s.Logging
import za.co.absa.spline.model.op.Operation
import za.co.absa.spline.model.{Attribute, DataLineage, LinkedLineage, MetaDataset}
import za.co.absa.spline.persistence.api.DataLineageWriter
import za.co.absa.spline.persistence.mongo.DBSchemaVersionHelper._
import za.co.absa.spline.persistence.mongo.MongoWriterFields._

import scala.concurrent.{ExecutionContext, Future, blocking}
/**
  *
  * The class represents Mongo persistence writer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
  *
  * @param connection A connection to Mongo database
  */
class MongoDataLineageWriter(connection: MongoConnection) extends DataLineageWriter with AutoCloseable with Logging {

  /**
    * The method stores a particular data lineage to the persistence layer.
    *
    * @param lineage A data lineage that will be stored
    */
  override def store(lineage: LinkedLineage)(implicit ec: ExecutionContext): Future[Unit] = {
    val linked = lineage.linked
    log debug s"Storing lineage objects"
    import connection._
    Future.sequence(Seq(
      insertAsyncSeq(operationCollection, operationDbos(linked)),
      insertAsyncSeq(attributeCollection, attributeDbos(linked)),
      insertAsyncSeq(datasetCollection, datasetDbos(linked))))
      .map(_ => blocking(dataLineageCollection.insert(lineageDbo(linked))))
  }

  private def insertAsyncSeq(dBCollection: DBCollection, seq: Seq[DBObject])(implicit executionContext: ExecutionContext): Future[Unit] = {
    Future { blocking(dBCollection.insert(seq:_*)) }
  }

  private def putLineageId(dataLineage: DataLineage): DBObject => DBObject = {
    dbo => {
      dbo.put(lineageIdField, dataLineage.id)
      dbo
    }
  }

  private def index(dbos: Seq[DBObject]): Seq[DBObject] = {
    var index = 0
    dbos
      .foreach(dbo => {
        dbo.put(indexField, index)
        index = index + 1
      })
    dbos
  }

  private def lineageDbo(dataLineage: DataLineage): DBObject =
    serializeWithVersion[TruncatedDataLineage](TruncatedDataLineage(dataLineage))

  private def attributeDbos(lineage: DataLineage): Seq[DBObject] = {
    val seq = lineage.attributes
      .map(serializeWithVersion[Attribute])
      .map(putLineageId(lineage))
    index(seq)
  }

  private def datasetDbos(lineage: DataLineage): Seq[DBObject] = {
    val seq = lineage.datasets
      .map(serializeWithVersion[MetaDataset])
      .map(putLineageId(lineage))
    index(seq)
  }

  private def operationDbos(lineage: DataLineage): Seq[DBObject] = {
    val seq = lineage.operations
      .map(op => {
        val dbo = serializeWithVersion[Operation](op)
        dbo.put(idField, op.mainProps.id)
        dbo
      })
      .map(putLineageId(lineage))
    index(seq)
  }

  override def close(): Unit = {
    connection.close()
  }
}
