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

package za.co.absa.spline.consumer.service.repo

import com.arangodb.async.ArangoDatabaseAsync
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import za.co.absa.spline.consumer.service.model._
import za.co.absa.spline.persistence.ArangoImplicits.ArangoDatabaseAsyncScalaWrapper
import za.co.absa.spline.persistence.FoxxRouter
import za.co.absa.spline.persistence.model.Operation.OperationTypes

import scala.concurrent.{ExecutionContext, Future}

@Repository
class ExecutionPlanRepositoryImpl @Autowired()(db: ArangoDatabaseAsync, foxxRouter: FoxxRouter) extends ExecutionPlanRepository {

  override def findById(planId: ExecutionPlanInfo.Id)(implicit ec: ExecutionContext): Future[ExecutionPlanDetailed] = {
    foxxRouter
      .get[ExecutionPlanDetailed](s"/spline/consumer/execution-plans/$planId/_detailed")
      .filter(null.!=)
  }

  override def find(
    asAtTime: Long,
    pageRequest: PageRequest,
    sortRequest: SortRequest
  )(implicit ec: ExecutionContext): Future[(Seq[ExecutionPlanInfo], Long)] = {
    val execPlanInfoFrame: Future[Frame[ExecutionPlanInfo]] = foxxRouter.get[Frame[ExecutionPlanInfo]](s"/spline/consumer/execution-plans/", Map[String, AnyRef](
      "asAtTime" -> Long.box(asAtTime),
      "pageOffset" -> Int.box(pageRequest.page - 1),
      "pageSize" -> Int.box(pageRequest.size),
      "sortField" -> sortRequest.field,
      "sortOrder" -> sortRequest.order
    ))

    val findResult: Future[(Seq[ExecutionPlanInfo], Long)] = execPlanInfoFrame.map {
      frame =>
        val items = frame.items
        val totalCount = frame.totalCount
        (items, totalCount)
    }

    findResult
  }

  override def getWriteOperationId(planId: ExecutionPlanInfo.Id)(implicit ec: ExecutionContext): Future[Operation.Id] = {
    db.queryOne[Operation.Id](
      s"""
         |WITH operation
         |FOR op IN operation
         |    FILTER op._belongsTo == CONCAT('executionPlan/', @planId)
         |    FILTER op.type == '${OperationTypes.Write}'
         |    RETURN op._key
         |""".stripMargin,
      Map(
        "planId" -> planId
      ))
  }

  override def execPlanAttributeLineage(attrId: Attribute.Id)(implicit ec: ExecutionContext): Future[AttributeGraph] = {
    foxxRouter.get[AttributeGraph](s"/spline/consumer/attributes/$attrId/dependency-graph")
  }

  override def execPlanAttributeImpact(attrId: Attribute.Id)(implicit ec: ExecutionContext): Future[AttributeGraph] = {
    foxxRouter.get[AttributeGraph](s"/spline/consumer/attributes/$attrId/impact-graph")
  }

}
