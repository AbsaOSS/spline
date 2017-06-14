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

import za.co.absa.spline.model._
import com.mongodb.casbah.Imports.MongoClientURI
import com.mongodb.casbah.MongoClient
import org.scalatest.{BeforeAndAfterEach, FlatSpec, Matchers}

class MongoExecutionPersistorSpec extends FlatSpec with Matchers with BeforeAndAfterEach {

  private val mongoPersistor = new MongoExecutionPersistor(
    MongoTestProperties.mongoDBUri,
    MongoTestProperties.mongoDBName
  )

  override protected def afterEach(): Unit = {
    val client = MongoClient(MongoClientURI(MongoTestProperties.mongoDBUri))
    val db = client.getDB(MongoTestProperties.mongoDBName)
    val collection = db.getCollection(mongoPersistor.executionCollectionName)
    collection.drop()
  }

  "Store method" should "store execution to a database." in {
    val execution = Execution(UUID.randomUUID(), UUID.randomUUID(), "Test", 123L)

    mongoPersistor.store(execution)

    val storedExecution = mongoPersistor.load(execution.id)

    storedExecution shouldEqual Option(execution)
  }

  "List method" should "only return executions with the given lineage ID" in {
    val dataLineageId = UUID.randomUUID()
    val execution1 = Execution(UUID.randomUUID(), dataLineageId, "Test1", 456L)
    val execution2 = Execution(UUID.randomUUID(), dataLineageId, "Test2", 789L)

    val allExecutions = Seq(
      Execution(UUID.randomUUID(), UUID.randomUUID(), "Testa", 1L),
      execution1,
      Execution(UUID.randomUUID(), UUID.randomUUID(), "Testb", 2L),
      execution2,
      Execution(UUID.randomUUID(), UUID.randomUUID(), "Testc", 3L)
    )

    allExecutions foreach mongoPersistor.store

    val relatedExecutions = mongoPersistor.list(dataLineageId).toSeq

    relatedExecutions shouldEqual Seq(execution1, execution2)
  }
}
