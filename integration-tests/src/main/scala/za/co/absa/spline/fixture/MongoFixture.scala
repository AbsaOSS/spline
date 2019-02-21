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

package za.co.absa.spline.fixture

import org.apache.commons.configuration.SystemConfiguration
import org.scalatest.{BeforeAndAfterEach, Suite}
import za.co.absa.spline.persistence.mongo.dao.{LineageDAOv3, LineageDAOv4, LineageDAOv5, MultiVersionLineageDAO}
import za.co.absa.spline.persistence.mongo.{MongoConnection, MongoConnectionImpl, MongoDataLineageWriter}
import za.co.absa.spline.common.ConfigurationImplicits._

trait MongoFixture extends BeforeAndAfterEach {

  this: Suite =>

  val mongoUri: String = new SystemConfiguration().getRequiredString("test.spline.mongodb.url")
  val mongoConnection = new MongoConnectionImpl(mongoUri)

  private def dao = new MultiVersionLineageDAO(
      new LineageDAOv3(mongoConnection),
      new LineageDAOv4(mongoConnection),
      new LineageDAOv5(mongoConnection))

  val lineageWriter: MongoDataLineageWriter = new MongoDataLineageWriter(dao)


  def dropDb(mongoConnection: MongoConnection): Unit = {
    for {
      collectionName <- mongoConnection.db.collectionNames
      if !(collectionName startsWith "system.")
      collection = mongoConnection.db(collectionName)
    } collection.drop()
  }

  override protected def beforeEach(): Unit = {
    dropDb(mongoConnection)
    super.beforeEach()
  }


  override protected def afterEach(): Unit = {
    try super.afterEach()
    finally dropDb(mongoConnection)
  }

}
