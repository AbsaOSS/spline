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


import org.slf4s.Logging
import salat.grater
import za.co.absa.spline.model.DataLineage
import za.co.absa.spline.persistence.api.DataLineageWriter
import za.co.absa.spline.persistence.mongo.dao.LineageDAO
import za.co.absa.spline.persistence.mongo.serialization.BSONSalatContext._

import scala.concurrent.{ExecutionContext, Future}

class MongoDataLineageWriter(lineageDAO: LineageDAO) extends DataLineageWriter with Logging {
  override def store(lineage: DataLineage)(implicit ec: ExecutionContext): Future[Unit] = {
    log debug s"Storing lineage objects"
    lineageDAO.save(grater[DataLineage].asDBObject(lineage))
  }
}
