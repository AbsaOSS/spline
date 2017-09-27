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

import com.mongodb.casbah.Imports._
import _root_.salat._
import za.co.absa.spline.model.{DataLineage, PersistedDatasetDescriptor}
import za.co.absa.spline.persistence.api.DataLineageReader
import scala.collection.JavaConverters._
import za.co.absa.spline.common.FutureImplicits._

import scala.concurrent.Future

/**
  * The class represents Mongo persistence writer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
  *
  * @param connection A connection to Mongo database
  */
class MongoDataLineageReader(connection: MongoConnection) extends DataLineageReader {

  import za.co.absa.spline.persistence.api.serialization.BSONSalatContext._

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
    * The method gets all data lineages stored in persistence layer.
    *
    * @return Descriptors of all data lineages
    */
  override def list(): Future[Iterator[PersistedDatasetDescriptor]] = Future {
    connection.dataLineageCollection
      .find(DBObject(), DBObject("_id" -> 1, "_ver" -> 1, "appId" -> 1, "appName" -> 1, "timestamp" -> 1))
      .iterator.asScala
      .map(withVersionCheck(grater[PersistedDatasetDescriptor].asObject(_)))
  }

  private def withVersionCheck[T](f: DBObject => T): DBObject => T =
    dbo => (dbo get "_ver").asInstanceOf[Int] match {
      case connection.LATEST_SERIAL_VERSION => f(dbo)
      case unknownVersion => sys.error(s"Unsupported serialized lineage version: $unknownVersion")
    }
}
