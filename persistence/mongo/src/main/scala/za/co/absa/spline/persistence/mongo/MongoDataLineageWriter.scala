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


import _root_.salat._
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.DataLineageWriter

import scala.concurrent.Future
import za.co.absa.spline.common.FutureImplicits._

/**
  *
  * The class represents Mongo persistence writer for the [[za.co.absa.spline.model.DataLineage DataLineage]] entity.
  *
  * @param connection A connection to Mongo database
  */
class MongoDataLineageWriter(connection: MongoConnection) extends DataLineageWriter {

  import za.co.absa.spline.persistence.mongo.serialization.BSONSalatContext._

  /**
    * The method stores a particular data lineage to the persistence layer.
    *
    * @param lineage A data lineage that will be stored
    */
  override def store(lineage: DataLineage): Future[Unit] = Future{
    val dbo = grater[DataLineage].asDBObject(lineage)
    dbo.put("_ver", connection.LATEST_SERIAL_VERSION)
    connection.dataLineageCollection.insert(dbo)
  }

}
