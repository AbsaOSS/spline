/*
 * Copyright 2021 ABSA Group Limited
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

import com.arangodb.async.ArangoDatabaseAsync
import com.fasterxml.jackson.core.`type`.TypeReference._
import com.typesafe.scalalogging.LazyLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.common.AsyncCallRetryer
import za.co.absa.spline.persistence.FoxxRouter
import za.co.absa.spline.persistence.model._
import za.co.absa.spline.producer.model.{v1_2 => apiModel}
import za.co.absa.spline.producer.service.model.{ExecutionEventKeyCreator, ExecutionPlanPersistentModelBuilder}

import scala.concurrent.{ExecutionContext, Future}
import scala.jdk.FutureConverters._
import scala.util.control.NonFatal

@Repository
class ExecutionProducerRepositoryImpl @Autowired()(
  db: ArangoDatabaseAsync,
  foxxRouter: FoxxRouter,
  retryer: AsyncCallRetryer
) extends ExecutionProducerRepository
  with LazyLogging {

  override def insertExecutionPlan(executionPlan: apiModel.ExecutionPlan)(implicit ec: ExecutionContext): Future[Unit] = retryer.execute({
    val eventualPlanExists: Future[Boolean] =
      foxxRouter.get[Boolean](
        s"/spline/execution-plans/${executionPlan.id}/_exists", Map(
          "discriminator" -> executionPlan.discriminator.orNull
        ))

    val eventualPersistedDataSources: Future[Seq[DataSource]] = {
      val dataSources = executionPlan.dataSources.map(DataSource.apply).toSeq
      Future.traverse(dataSources)(foxxRouter.post[DataSource]("/spline/data-sources", _))
    }

    for {
      persistedDSKeyByURI <- eventualPersistedDataSources
      planExists <- eventualPlanExists
      _ <- if (planExists) {
        // Execution plan with the given ID already exists.
        // Nothing else to do.
        Future.successful(())
      } else {
        // No execution plan with the given ID found.
        // Let's insert one.
        val eppm = ExecutionPlanPersistentModelBuilder.toPersistentModel(executionPlan, persistedDSKeyByURI)
        foxxRouter.post[Nothing]("/spline/execution-plans", eppm)
      }
    } yield ()
  })

  override def insertExecutionEvent(e: apiModel.ExecutionEvent)(implicit ec: ExecutionContext): Future[Unit] = retryer.execute({

    val eventKey = new ExecutionEventKeyCreator(e).executionEventKey

    val eventualEventExists: Future[Boolean] =
      foxxRouter.get[Boolean](
        s"/spline/execution-events/$eventKey/_exists", Map(
          "discriminator" -> e.discriminator.orNull
        ))

    for {
      eventExists <- eventualEventExists
      _ <- if (eventExists) {
        // Execution event with the given ID already exists.
        // Nothing else to do.
        Future.successful(())
      } else {
        // No execution event with the given ID found.
        // Let's insert one.
        val p = Progress(
          timestamp = e.timestamp,
          durationNs = e.durationNs,
          discriminator = e.discriminator,
          labels = e.labels,
          error = e.error,
          extra = e.extra,
          _key = eventKey,
          planKey = e.planId.toString,
          execPlanDetails = null // the value is populated below in the transaction script
        )
        foxxRouter.post[Nothing]("/spline/execution-events", p)
      }
    } yield ()
  })

  override def isDatabaseOk()(implicit ec: ExecutionContext): Future[Boolean] = {
    try {
      val anySplineCollectionName = NodeDef.ExecutionPlan.name
      val futureIsDbOk = db.collection(anySplineCollectionName).exists.asScala.mapTo[Boolean]
      futureIsDbOk.foreach { isDbOk =>
        if (!isDbOk)
          logger.error(s"Collection '$anySplineCollectionName' does not exist. Spline database is not initialized properly!")
      }
      futureIsDbOk.recover { case _ => false }
    } catch {
      case NonFatal(_) => Future.successful(false)
    }
  }
}
