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
import org.slf4s.Logging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.common.AsyncCallRetryer
import za.co.absa.spline.persistence.ArangoImplicits
import za.co.absa.spline.persistence.model._
import za.co.absa.spline.persistence.tx.{ArangoTx, InsertQuery, TxBuilder}
import za.co.absa.spline.producer.model.v1_1.ExecutionEvent._
import za.co.absa.spline.producer.model.{v1_1 => apiModel}
import za.co.absa.spline.producer.service.model.{ExecutionEventKeyConverter, ExecutionPlanApiModelAssembler, ExecutionPlanPersistentModel, ExecutionPlanPersistentModelBuilder}
import za.co.absa.spline.producer.service.{InconsistentEntityException, UUIDCollisionDetectedException}

import java.util.UUID
import scala.compat.java8.FutureConverters._
import scala.compat.java8.StreamConverters._
import scala.concurrent.{ExecutionContext, Future}
import scala.util.control.NonFatal

@Repository
class ExecutionProducerRepositoryImpl @Autowired()(db: ArangoDatabaseAsync, repeater: AsyncCallRetryer) extends ExecutionProducerRepository
  with Logging {

  import ArangoImplicits._
  import ExecutionProducerRepositoryImpl._

  override def isDatabaseOk()(implicit ec: ExecutionContext): Future[Boolean] = {
    try {
      val anySplineCollectionName = NodeDef.ExecutionPlan.name
      val futureIsDbOk = db.collection(anySplineCollectionName).exists.toScala.mapTo[Boolean]
      futureIsDbOk.foreach { isDbOk =>
        if (!isDbOk)
          log.error(s"Collection '$anySplineCollectionName' does not exist. Spline database is not initialized properly!")
      }
      futureIsDbOk.recover { case _ => false }
    } catch {
      case NonFatal(_) => Future.successful(false)
    }
  }

  override def insertExecutionPlan(executionPlan: apiModel.ExecutionPlan)(implicit ec: ExecutionContext): Future[Unit] = repeater.execute({
    // Here I have to use the type parameter `Any` and cast to `String` later due to ArangoDb Java driver issue.
    // See https://github.com/arangodb/arangodb-java-driver/issues/389
    val eventualMaybeExistingDiscriminatorOpt: Future[Option[String]] = db.queryOptional[Any](
      s"""
         |WITH ${NodeDef.ExecutionPlan.name}
         |FOR ex IN ${NodeDef.ExecutionPlan.name}
         |    FILTER ex._key == @key
         |    LIMIT 1
         |    RETURN ex.discriminator
         |    """.stripMargin,
      Map("key" -> executionPlan.id)
    ).map(_.map(Option(_).map(_.toString).orNull))

    val eventualPersistedDSKeyByURI: Future[Map[DataSource.Uri, DataSource.Key]] = db.queryAs[DataSource](
      s"""
         |WITH ${NodeDef.DataSource.name}
         |FOR ds IN ${NodeDef.DataSource.name}
         |    FILTER ds.uri IN @refURIs
         |    RETURN ds
         |    """.stripMargin,
      Map("refURIs" -> executionPlan.dataSources.toArray)
    ).map(_.streamRemaining.toScala.map(ds => ds.uri -> ds._key).toMap)

    for {
      persistedDSKeyByURI <- eventualPersistedDSKeyByURI
      maybeExistingDiscriminatorOpt <- eventualMaybeExistingDiscriminatorOpt
      _ <- maybeExistingDiscriminatorOpt match {
        case Some(existingDiscriminatorOrNull) =>
          // execution plan with the given ID already exists
          ensureNoExecPlanIDCollision(executionPlan.id, executionPlan.discriminator.orNull, existingDiscriminatorOrNull)
          Future.successful(Unit)
        case None =>
          // no execution plan with the given ID found
          createInsertTransaction(executionPlan, persistedDSKeyByURI).execute(db)
      }
    } yield Unit
  })

  override def fetchExecutionPlanIds()(implicit ec: ExecutionContext): Future[Seq[UUID]] = {
    db.queryAs[apiModel.ExecutionPlan.Id](
      s"""
         |WITH ${NodeDef.ExecutionPlan.name}
         |FOR ep IN ${NodeDef.ExecutionPlan.name}
         |    RETURN ep._key
         |""".stripMargin
    ).map(_.streamRemaining.toScala)
  }

  override def fetchExecutionPlan(id: UUID)(implicit ec: ExecutionContext): Future[apiModel.ExecutionPlan] = {
    val eventualExecutionPlan = db.queryOne[ExecutionPlanPersistentModel](
      s"""
         |WITH ${allPlanCollectionNames.mkString(", ")}, ${NodeDef.DataSource.name}
         |LET v_plan = FIRST(FOR ep IN executionPlan FILTER ep._key == @plan_key RETURN ep)
         |
         |LET e_executes =  FIRST (FOR e IN executes FILTER e._belongsTo == v_plan._id RETURN e)
         |LET es_depends =        (FOR e IN depends FILTER e._belongsTo == v_plan._id RETURN e)
         |LET e_affects =   FIRST (FOR e IN affects FILTER e._belongsTo == v_plan._id RETURN e)
         |
         |LET vs_operations =     (FOR v IN operation FILTER v._belongsTo == v_plan._id RETURN v)
         |LET es_follows =        (FOR e IN follows FILTER e._belongsTo == v_plan._id RETURN e)
         |LET es_reads_from =     (FOR e IN readsFrom FILTER e._belongsTo == v_plan._id RETURN e)
         |LET e_writes_to = FIRST (FOR e IN writesTo FILTER e._belongsTo == v_plan._id RETURN e)
         |LET es_emits =          (FOR e IN emits FILTER e._belongsTo == v_plan._id RETURN e)
         |LET es_uses =           (FOR e IN uses FILTER e._belongsTo == v_plan._id RETURN e)
         |LET es_produces =       (FOR e IN produces FILTER e._belongsTo == v_plan._id RETURN e)
         |
         |LET vs_sources =        (FOR ds IN 1 OUTBOUND v_plan depends, affects RETURN ds)
         |
         |LET vs_schemas =        (FOR v IN schema FILTER v._belongsTo == v_plan._id RETURN v)
         |LET es_consists_of =    (FOR e IN consistsOf FILTER e._belongsTo == v_plan._id RETURN e)
         |
         |LET vs_attributes =     (FOR v IN attribute FILTER v._belongsTo == v_plan._id RETURN v)
         |LET es_computed_by =    (FOR e IN computedBy FILTER e._belongsTo == v_plan._id RETURN e)
         |LET es_derives_from =   (FOR e IN derivesFrom FILTER e._belongsTo == v_plan._id RETURN e)
         |
         |LET vs_expressions =    (FOR v IN expression FILTER v._belongsTo == v_plan._id RETURN v)
         |LET es_takes =          (FOR e IN takes FILTER e._belongsTo == v_plan._id RETURN e)
         |
         |RETURN {
         |  // execution plan
         |  "executionPlan" : v_plan,
         |  "executes"      : e_executes,
         |  "depends"       : es_depends,
         |  "affects"       : e_affects,
         |
         |  // operation
         |  "operations"    : vs_operations,
         |  "follows"       : es_follows,
         |  "readsFrom"     : es_reads_from,
         |  "writesTo"      : e_writes_to,
         |  "emits"         : es_emits,
         |  "uses"          : es_uses,
         |  "produces"      : es_produces,
         |
         |  // data source
         |  "dataSources"   : vs_sources,
         |
         |  // schema
         |  "schemas"       : vs_schemas,
         |  "consistsOf"    : es_consists_of,
         |
         |  // attribute
         |  "attributes"    : vs_attributes,
         |  "computedBy"    : es_computed_by,
         |  "derivesFrom"   : es_derives_from,
         |
         |  // expression
         |  "expressions"   : vs_expressions,
         |  "takes"         : es_takes
         |}
         |""".stripMargin,
      Map("plan_key" -> id.toString)
    )

    eventualExecutionPlan.map(ExecutionPlanApiModelAssembler.toApiModel)
  }

  override def insertExecutionEvents(events: Array[apiModel.ExecutionEvent])(implicit ec: ExecutionContext): Future[Unit] = repeater.execute({
    val eventualExecPlanInfos: Future[Seq[ExecPlanInfo]] = db.queryStream[ExecPlanInfo](
      s"""
         |WITH executionPlan, executes, operation, dataSource
         |FOR ep IN executionPlan
         |    FILTER ep._key IN @keys
         |
         |    LET wo = FIRST(FOR v IN 1 OUTBOUND ep executes RETURN v)
         |    LET ds = FIRST(FOR v IN 1 OUTBOUND ep affects RETURN v)
         |
         |    RETURN {
         |        key           : ep._key,
         |        discriminator : ep.discriminator,
         |        details: {
         |            "executionPlanKey" : ep._key,
         |            "frameworkName"    : CONCAT(ep.systemInfo.name, " ", ep.systemInfo.version),
         |            "applicationName"  : ep.name,
         |            "dataSourceUri"    : ds.uri,
         |            "dataSourceName"   : ds.name,
         |            "dataSourceType"   : wo.extra.destinationType,
         |            "append"           : wo.append
         |        }
         |    }
         |""".stripMargin,
      Map("keys" -> events.map(_.planId))
    )

    for {
      execPlansInfos <- eventualExecPlanInfos
      (execPlanDiscrById, execPlansDetails) = execPlansInfos
        .foldLeft((Map.empty[apiModel.ExecutionPlan.Id, apiModel.ExecutionPlan.Discriminator], Vector.empty[ExecPlanDetails])) {
          case ((descrByIdAcc, detailsAcc), ExecPlanInfo(id, discr, details)) =>
            (descrByIdAcc + (UUID.fromString(id) -> discr), detailsAcc :+ details)
        }
      res <- {
        events.foreach(e => ensureNoExecPlanIDCollision(e.planId, e.discriminator.orNull, execPlanDiscrById(e.planId)))
        createInsertTransaction(events, execPlansDetails.toArray).execute(db)
      }
    } yield res
  })

  override def fetchExecutionEvents(planId: apiModel.ExecutionPlan.Id)(implicit ec: ExecutionContext): Future[Seq[apiModel.ExecutionEvent]] = {
    db.queryAs[apiModel.ExecutionEvent](
      s"""
         |WITH ${NodeDef.Progress.name}, ${EdgeDef.ProgressOf.name}
         |FOR p IN ${NodeDef.Progress.name}
         |    FILTER STARTS_WITH(p._key, CONCAT(@planKey, ":"))
         |    RETURN {
         |        planId:         @planKey,
         |        timestamp:      p.timestamp,
         |        durationNs:     p.durationNs,
         |        discriminator:  p.discriminator,
         |        error:          p.error,
         |        extra:          p.extra,
         |    }
         |""".stripMargin,
      Map("planKey" -> planId)
    ).map(_.streamRemaining.toScala)
  }
}

private object ExecutionProducerRepositoryImpl {

  val allPlanCollectionNames: Seq[String] = Seq(
    NodeDef.ExecutionPlan.name,
    EdgeDef.Executes.name,
    EdgeDef.Depends.name,
    EdgeDef.Affects.name,
    NodeDef.Operation.name,
    EdgeDef.Follows.name,
    EdgeDef.ReadsFrom.name,
    EdgeDef.WritesTo.name,
    EdgeDef.Emits.name,
    EdgeDef.Uses.name,
    EdgeDef.Produces.name,
    NodeDef.Schema.name,
    EdgeDef.ConsistsOf.name,
    NodeDef.Attribute.name,
    EdgeDef.ComputedBy.name,
    EdgeDef.DerivesFrom.name,
    NodeDef.Expression.name,
    EdgeDef.Takes.name
  )

  private case class ExecPlanInfo(
    key: ArangoDocument.Key,
    discriminator: ExecutionPlan.Discriminator,
    details: ExecPlanDetails) {
    def this() = this(null, null, null)
  }

  private def createInsertTransaction(
    executionPlan: apiModel.ExecutionPlan,
    persistedDSKeyByURI: Map[DataSource.Uri, DataSource.Key]
  ) = {
    val eppm: ExecutionPlanPersistentModel =
      ExecutionPlanPersistentModelBuilder.toPersistentModel(executionPlan, persistedDSKeyByURI)

    new TxBuilder()
      // execution plan
      .addQuery(InsertQuery(NodeDef.ExecutionPlan, eppm.executionPlan))
      .addQuery(InsertQuery(EdgeDef.Executes, eppm.executes))
      .addQuery(InsertQuery(EdgeDef.Depends, eppm.depends))
      .addQuery(InsertQuery(EdgeDef.Affects, eppm.affects))

      // operation
      .addQuery(InsertQuery(NodeDef.Operation, eppm.operations))
      .addQuery(InsertQuery(EdgeDef.Follows, eppm.follows))
      .addQuery(InsertQuery(EdgeDef.ReadsFrom, eppm.readsFrom))
      .addQuery(InsertQuery(EdgeDef.WritesTo, eppm.writesTo))
      .addQuery(InsertQuery(EdgeDef.Emits, eppm.emits))
      .addQuery(InsertQuery(EdgeDef.Uses, eppm.uses))
      .addQuery(InsertQuery(EdgeDef.Produces, eppm.produces))

      // data source
      .addQuery(InsertQuery(NodeDef.DataSource, eppm.dataSources))

      // schema
      .addQuery(InsertQuery(NodeDef.Schema, eppm.schemas))
      .addQuery(InsertQuery(EdgeDef.ConsistsOf, eppm.consistsOf))

      // attribute
      .addQuery(InsertQuery(NodeDef.Attribute, eppm.attributes))
      .addQuery(InsertQuery(EdgeDef.ComputedBy, eppm.computedBy))
      .addQuery(InsertQuery(EdgeDef.DerivesFrom, eppm.derivesFrom))

      // expression
      .addQuery(InsertQuery(NodeDef.Expression, eppm.expressions))
      .addQuery(InsertQuery(EdgeDef.Takes, eppm.takes))

      .buildTx
  }

  private def createInsertTransaction(
    events: Array[apiModel.ExecutionEvent],
    execPlansDetails: Array[ExecPlanDetails]
  ): ArangoTx = {
    val referredPlanIds = events.iterator.map(_.planId).toSet
    if (referredPlanIds.size != execPlansDetails.length) {
      val existingIds = execPlansDetails.map(pd => UUID.fromString(pd.executionPlanKey))
      val missingIds = referredPlanIds -- existingIds
      throw new InconsistentEntityException(
        s"Unresolved execution plan IDs: ${missingIds mkString ", "}")
    }

    val progressNodes = events
      .zip(execPlansDetails)
      .map { case (e, pd) =>
        val key = ExecutionEventKeyConverter.from(e).executionEventKey
        Progress(
          timestamp = e.timestamp,
          durationNs = e.durationNs,
          discriminator = e.discriminator,
          error = e.error,
          extra = e.extra,
          _key = key,
          execPlanDetails = pd
        )
      }

    val progressEdges = progressNodes
      .zip(events)
      .map { case (p, e) => EdgeDef.ProgressOf.edge(p._key, e.planId) }

    new TxBuilder()
      .addQuery(InsertQuery(NodeDef.Progress, progressNodes: _*).copy(ignoreExisting = true))
      .addQuery(InsertQuery(EdgeDef.ProgressOf, progressEdges: _*).copy(ignoreExisting = true))
      .buildTx
  }

  private def ensureNoExecPlanIDCollision(
    planId: apiModel.ExecutionPlan.Id,
    actualDiscriminator: apiModel.ExecutionPlan.Discriminator,
    expectedDiscriminator: apiModel.ExecutionPlan.Discriminator
  ): Unit = {
    if (actualDiscriminator != expectedDiscriminator) {
      throw new UUIDCollisionDetectedException("ExecutionPlan", planId, actualDiscriminator)
    }
  }
}
