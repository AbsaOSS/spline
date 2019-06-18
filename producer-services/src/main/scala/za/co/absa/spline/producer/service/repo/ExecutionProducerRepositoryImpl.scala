/*
 * Copyright 2019 ABSA Group Limited
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

package za.co.absa.spline.producer.service.repo


import java.util
import java.util.UUID
import java.util.UUID.randomUUID

import com.arangodb.{ArangoCursorAsync, ArangoDatabaseAsync}
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.persistence.ArangoImplicits
import za.co.absa.spline.persistence.model.DataSource
import za.co.absa.spline.producer.rest.model._
import za.co.absa.spline.producer.service.model.{ExecutionEventTransactionParams, ExecutionPlanTransactionParams}

import scala.compat.java8.FutureConverters._
import scala.compat.java8.StreamConverters._
import scala.concurrent.ExecutionContext.Implicits._
import scala.concurrent.{ExecutionContext, Future}

@Repository
class ExecutionProducerRepositoryImpl @Autowired()(db: ArangoDatabaseAsync) extends ExecutionProducerRepository {


  override def insertExecutionPlan(executionPlan: ExecutionPlan)(implicit ec: ExecutionContext): Future[UUID] = {
    val uris = referencedUris(executionPlan)
    for {
      existingUriKey <- queryExistingToKey(uris)
      newUriKey <- generateNewKeys(uris, existingUriKey)
      res <- {
        val params = ExecutionPlanTransactionParams(executionPlan, newUriKey, newUriKey ++ existingUriKey)
        val transaction = db.transaction(params.insertScript, classOf[util.HashMap[String, String]], params.transactionOptions).toScala
        transaction.map(t => UUID.fromString(t.get("_key")))
      }
    } yield res
  }

  override def insertExecutionEvents(executionEvents: Array[ExecutionEvent])(implicit ec: ExecutionContext): Future[Array[String]] = {
    val executionIdList = executionEvents.map(e => s""""${e.planId.toString}"""").mkString(", ")
    val query = s"for ex in execution filter ex._key in [$executionIdList] return ex._key"
    val result = ArangoImplicits.ArangoDatabaseAsyncScalaWrapper(db).query[String](query)
    val existingExecutionIds = result.map((c: ArangoCursorAsync[String]) => c.streamRemaining().toScala)

    val nonExistingExecutions = existingExecutionIds.flatMap(e => Future((executionEvents.map(ev => ev.planId.toString).toSet -- e).toArray))

    existingExecutionIds.flatMap(
      execution => {
        val filteredExecutionEvents = executionEvents.filter(event => execution.contains(event.planId.toString))
        val params = ExecutionEventTransactionParams(filteredExecutionEvents)
        db.transaction(params.insertScript, classOf[util.HashMap[String, String]], params.transactionOptions)
        nonExistingExecutions
      }
    )
  }

  private def generateNewKeys(uris: Seq[String], uriToExistingKey: Map[String, String]): Future[Map[String, String]] = {
    Future((uris.toSet -- uriToExistingKey.keys).map(_ -> randomUUID.toString).toMap)
  }

  private def referencedUris(executionPlan: ExecutionPlan) = {
    val allOperations = executionPlan.operations.reads ++ executionPlan.operations.other ++ List(executionPlan.operations.write)
    allOperations.flatMap {
      case r: ReadOperation => r.inputSources
      case w: WriteOperation => Some(w.outputSource)
      case _ => None
    }.distinct
  }

  private def queryExistingToKey(uris: Seq[String]): Future[Map[String, String]] = {
    val urisList = uris
      .map(uri => s""""$uri"""")
      .mkString(", ")
    val query = s"for ds in dataSource filter ds.uri in [$urisList] return ds"
    val result = ArangoImplicits.ArangoDatabaseAsyncScalaWrapper(db).query[DataSource](query)
    result.map((c: ArangoCursorAsync[DataSource]) => {
      val dataSourceStream = c.streamRemaining().toScala
      dataSourceStream.map(ds => ds.uri -> ds._key.orNull).toMap
    })

  }

}
